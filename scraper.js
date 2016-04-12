request = require("request"),
cheerio = require("cheerio"),
db = require("./db");


swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";


var result = {
	name: "Eastern Beaches", 
	reports: []
}

exports.scrapeSwellNet = function () {
	request(swellNetUrl, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			//get the text using JQuery
			var swell = $('.views-label-nothing').siblings('.field-content').html();
			var swellArray = swell.split(/\s(?=[A-Z])/);
			var period = $('.period').html();
			var wind = $('.views-label-field-surf-report-wind').siblings('.field-content').html();
			var windArray = wind.split(/ /);
			var content = $('.views-field-body').children('.field-content').children('p').html();
			
			//add text to report object
			var report = {
						"Name" : "SwellNet",
						"swellHeight": swellArray[0],
						"swellDirection": swellArray[1].replace(/ /g,''),
						"period": period,
						"windDirection": windArray[1],
						"windSpeed": windArray[0],
						"content": content
					}	

			result.reports.push(report);
			console.log('scraping swellnet');

		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

exports.scrapeCoastalWatch = function () {
	request(coastalWatchUrl, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			//get the text using JQuery
			var swellHeight = $('.swell').children('.val').html();
			var swellDirection = $('.dir').html();
			var period = $('.swell').children('span').eq(1).html().match(/[0-9]+/);
			var windSpeed = $('.wind').children('.val').html();
			var windDirection = $('.wind').children('.dir').html();
			var content = $('.starLarge').next('.noMarginBottom').html();

			//add text to report object
			var CWreport = {
						"Name" : "CoastalWatch",
						"swellHeight": swellHeight,
						"swellDirection": swellDirection,
						"period": period + "s",
						"windDirection": windDirection,
						"windSpeed": windSpeed,
						"content": content
					}	


			result.reports.push(CWreport);
			console.log('scraping coastalwatch');

		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

exports.save = function () {
	db.save(result);
	result.reports = [];
}

