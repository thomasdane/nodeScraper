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
	
	async.map([coastalWatchUrl, swellNetUrl], fetch, function(err, results){
		if (err) {
			console.log(err);
		} else {

			cw = cheerio.load(results[0]); //coastalwatch html
			sn = cheerio.load(results[1]); //swellnet html

			//get coastalWatch report
			var CWswellHeight = cw('.swell').children('.val').html();
			if (CWswellHeight) { //exit when the scrape comes back empty
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
							"date": new Date()
							}
			};				

			//get swellNet report
			//if null, do not save
			var SNswell = sn('.views-label-nothing').siblings('.field-content').html();
			if (SNswell) {
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
							"date": new Date()
							}
			};					
				
			if (coastalWatchReport) { result.reports.push(coastalWatchReport) }			
			if (swellNetReport) {result.reports.push(swellNetReport)} 

			db.save(result);
		}
	});
}	