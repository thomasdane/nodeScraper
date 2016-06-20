request = require("request"),
cheerio = require("cheerio");
async = require("async");
db = require("./db");

exports.scrape = function () {

	var swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
	var coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";

	var fetch = function(url, callback){
		request.get(url, function(err, response,body){
			if (err) {
				callback(err);
			} else {
				callback(null, body);
			}
		});
	}
	
	async.map([coastalWatchUrl, swellNetUrl], fetch, function(err, results){
		if (err) {

			console.log(err);

		} else {

			cw = cheerio.load(results[0]); //coastalwatch html
			sn = cheerio.load(results[1]); //swellnet html
			console.log('fetching reports');

			//get coastalWatch report
			var swellHeight = cw('.swell').children('.val').html();
			var swellDirection = cw('.dir').html();
			var period = cw('.swell').children('span').eq(1).html().match(/[0-9]+/);
			var windSpeed = cw('.wind').children('.val').html();
			var windDirection = cw('.wind').children('.dir').html();
			var content = cw('.starLarge').next('.noMarginBottom').html();
			var coastalWatchReport = {
						"Name" : "CoastalWatch",
						"swellHeight": swellHeight,
						"swellDirection": swellDirection,
						"period": period + "s",
						"windDirection": windDirection,
						"windSpeed": windSpeed,
						"content": content,
						"date": new Date()
						}	
			
			console.log('coastalwatch success');
			console.log(coastalWatchReport);

			//get swellNet report	
			var swell = sn('.views-label-nothing').siblings('.field-content').html();
			var swellArray = swell.split(/\s(?=[A-Z])/);
			var period = sn('.period').html();
			var wind = sn('.views-label-field-surf-report-wind').siblings('.field-content').html();
			var windArray = wind.split(/ /);
			var content = sn('.views-field-body').children('.field-content').children('p').html();
			var swellNetReport = {
						"Name" : "SwellNet",
						"swellHeight": swellArray[0],
						"swellDirection": swellArray[1].replace(/ /g,''),
						"period": period,
						"windDirection": windArray[1],
						"windSpeed": windArray[0],
						"content": content,
						"date": new Date()
					}	

			console.log('swellnet success');		
			console.log(swellNetReport)
		}
	});
}	