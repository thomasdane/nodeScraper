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

			cw = cheerio.load(html[0]); //coastalwatch html
			sn = cheerio.load(html[1]); //swellnet html

			//get coastalWatch report
			var CWswellHeight = cw('.swell').children('.val').text();
			if (CWswellHeight) { //check that the scrape is not empty
				var CWswellDirection = cw('.dir').text();
				var CWperiod = cw('.swell').children('span').eq(1).text().match(/[0-9]+/);
				var CWwindSpeed = cw('.wind').children('.val').text();
				var CWwindDirection = cw('.wind').children('.dir').text();
				var CWcontent = cw('.starLarge').next('.noMarginBottom').text();
				var coastalWatchReport = {
							"Name" : "CoastalWatch",
							"swellHeight": CWswellHeight,
							"swellDirection": CWswellDirection,
							"period": CWperiod + "s",
							"windDirection": CWwindDirection,
							"windSpeed": CWwindSpeed,
							"content": CWcontent,
							"date": new Date()
							}
				result.reports.push(coastalWatchReport)
			};				

			//get swellNet report
			var SNswell = sn('.views-label-nothing').siblings('.field-content').text();
			if (SNswell) { //check that not empty
				var SNswellArray = SNswell.split(/\s(?=[A-Z])/);
				var SNperiod = sn('.period').text();
				var SNwind = sn('.views-label-field-surf-report-wind').siblings('.field-content').text();
				var SNwindArray = SNwind.split(/ /)
				var SNcontent = sn('.views-field-body').children('.field-content').children('p').text();
				var swellNetReport = {
							"Name" : "SwellNet",
							"swellHeight": SNswellArray[0],
							"swellDirection": SNswellArray[1].replace(/ /g,''),
							"period": SNperiod,
							"windDirection": SNwindArray[1],
							"windSpeed": SNwindArray[0],
							"content": SNcontent,
							"date": new Date()
							}
				result.reports.push(swellNetReport) 				
			};					

			result.reports.length > 0 ? db.save(result) : console.log("scrape was empty");
		}
	});
}	