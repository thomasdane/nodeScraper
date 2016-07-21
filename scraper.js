var request = require("request"),
cheerio = require("cheerio"),
async = require("async"),
db = require("./db");

exports.scrape = function (location) {

	var swellNetUrl = location.urls.swellNet;
	var coastalWatchUrl = location.urls.coastalWatch;
	
	var result = {
		name: location.name, 
		reports: []
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
	
	async.map([coastalWatchUrl, swellNetUrl], fetch, function(err, html){
		if (err) {
			console.log(err);
		} else {

			var cw = cheerio.load(html[0]); //coastalwatch html
			var sn = cheerio.load(html[1]); //swellnet html
			var serverTime = new Date();
			var offset = new Date();
			var sydneyTime = new Date(offset.setHours(serverTime.getHours() + 10));

			//get coastalWatch report
			var CWswellHeight = cw('.swell').children('.val').html();
			if (CWswellHeight) { //check that the scrape is not empty
				var CWswellDirection = cw('.dir').html();
				var CWperiod = cw('.swell').children('span').eq(1).html().match(/[0-9]+/);
				var CWwindSpeed = cw('.wind').children('.val').html();
				var CWwindDirection = cw('.wind').children('.dir').html();
				var CWcontent = cw('.starLarge').next('.noMarginBottom').html();
				var coastalWatchReport = {
							"Name" : "CoastalWatch",
							"swellHeight": CWswellHeight,
							"swellDirection": CWswellDirection,
							"period": CWperiod + "s",
							"windDirection": CWwindDirection,
							"windSpeed": CWwindSpeed,
							"content": CWcontent,
							"date": sydneyTime
							}
				result.reports.push(coastalWatchReport)
			};				

			//get swellNet report
			var SNswell = sn('.views-label-nothing').siblings('.field-content').html();
			if (SNswell) { //check that not empty
				var SNswellArray = SNswell.split(/\s(?=[A-Z])/);
				var SNperiod = sn('.period').html();
				var SNwind = sn('.views-label-field-surf-report-wind').siblings('.field-content').html();
				var SNwindArray = SNwind.split(/ /)
				var SNcontent = sn('.views-field-body').children('.field-content').children('p').html();
				var swellNetReport = {
							"Name" : "SwellNet",
							"swellHeight": SNswellArray[0],
							"swellDirection": SNswellArray[1].replace(/ /g,''),
							"period": SNperiod,
							"windDirection": SNwindArray[1],
							"windSpeed": SNwindArray[0],
							"content": SNcontent,
							"date": sydneyTime
							}
				result.reports.push(swellNetReport) 				
			};					

			result.reports.length > 0 ? db.save(result) : console.log("scrape was empty");
		}
	});
}	