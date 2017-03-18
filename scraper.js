var request = require("request"),
cheerio = require("cheerio"),
async = require("async"),
tides = require("./tides"),
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
			var cw_content = cw('.starLarge').next('.noMarginBottom').text();
			var cw_description = cw_content ? cw_content : "Report not posted yet";
			var CWswellDirection = cw('.dir').html();
			var CWperiod = cw('.swell').children('span').eq(1).html().match(/[0-9]+/);
			var CWwindSpeed = cw('.wind').children('.val').html();
			var CWwindDirection = cw('.wind').children('.dir').html();
			var CWswellHeight = cw('.swell').children('.val').html();
			var sunrise = cw('.sunrise').html();
			var sunset = cw('.sunset').html();
			var tide = tides.getDaylightTides(sunrise, sunset, cw('.tide').text());
			var coastalWatchReport = {
				"name": "CoastalWatch",
				"url": location.urls.coastalWatch,
				"swellHeight": CWswellHeight,
				"swellDirection": CWswellDirection,
				"period": CWperiod + "s",
				"windDirection": CWwindDirection,
				"windSpeed": CWwindSpeed,
				"sunrise" : sunrise,
				"sunset" : sunset, 
				"tide" : tide,
				"content": cw_description,
				"date": sydneyTime
			}
			result.reports.push(coastalWatchReport)

			//get swellNet report
			//get swellNet report
			var SNcontent = sn('.views-field-body').children('.field-content').children('p').text();
			if (SNcontent) {
				var SNswell = sn('.views-label-nothing').siblings('.field-content').html();
				var SNswellArray = SNswell.split(/\s(?=[A-Z])/);
				var SNperiod = sn('.period').html();
				var SNwind = sn('.views-label-field-surf-report-wind').siblings('.field-content').html();
				var SNwindArray = SNwind.split(/ /)
				var swellNetReport = {
							"name": "SwellNet",
							"url": location.urls.swellNet,
							"swellHeight": SNswellArray[0],
							"swellDirection": SNswellArray[1].replace(/ /g,''),
							"period": SNperiod,
							"windDirection": SNwindArray[1],
							"windSpeed": SNwindArray[0],
							"sunrise" : sunrise,
							"sunset" : sunset, 
							"tide" : tide,
							"content": SNcontent,
							"date": sydneyTime
							}
				result.reports.push(swellNetReport) 				
			} else {console.log('swellnet report was not posted yet')}			

			result.reports.length > 1 ? db.save(result) : console.log("reports not posted yet"); 				

			db.save(result);
		}
	});
}	
