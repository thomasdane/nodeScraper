var request = require("request"),
cheerio = require("cheerio"),
async = require("async"),
db = require("./db");

exports.scrape = function (location) {

	var swellNetUrl = location.urls.swellNet;
	var coastalWatchUrl = location.urls.coastalWatch;
	
	var result = {
		name: location.name, 
		reports: [], 
		date: new Date()
	}

	var fetch = function(url, callback){
		request.get(url, function(err, response,body){
			if (err) {
				callback(err);
			} else {
				callback(null, body);
			}
		});
	}
	
	var coastalWatchSchema = {
			swellHeight = ('.swell').children('.val').html();
			swellDirection = ('.dir').html();
			period = ('.swell').children('span').eq(1).html().match(/[0-9]+/);
			windSpeed = ('.wind').children('.val').html();
			windDirection = ('.wind').children('.dir').html();
			content = ('.starLarge').next('.noMarginBottom').html();
			coastalWatchReport = {
						"Name" : "CoastalWatch",
						"swellHeight": swellHeight,
						"swellDirection": swellDirection,
						"period": period + "s",
						"windDirection": windDirection,
						"windSpeed": windSpeed,
						"content": content,
						"date": new Date()
						}	
	};


	async.map([coastalWatchUrl, swellNetUrl], fetch, function(err, results){
		if (err) {
			console.log(err);
		} else {
			cw = cheerio.load(results[0]); //coastalwatch html
			sn = cheerio.load(results[1]); //swellnet html

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
			result.reports.push(coastalWatchReport);

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
			result.reports.push(swellNetReport);

			db.save(result);
		}
	});
}	