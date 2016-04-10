request = require("request"),
cheerio = require("cheerio"),
swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";
db = require("./db");

result = {
	name: "Eastern Beaches", 
	reports: []
}

module.exports = {
	scrapeSwellNet: function () {
		request(swellNetUrl, function (error, response, body) {
			if (!error) {
				$ = cheerio.load(body),
				
				//get the text using JQuery
				swell = $('.views-label-nothing').siblings('.field-content').html();
				swellArray = swell.split(/\s(?=[A-Z])/);
				period = $('.period').html();
				wind = $('.views-label-field-surf-report-wind').siblings('.field-content').html();
				windArray = wind.split(/ /);
				content = $('.views-field-body').children('.field-content').children('p').html();
				
				//add text to report object
				report = {
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
				db.save(result);
				result.reports = [];
				

			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};


module.exports = {
	scrapeCoastalWatch: function () {
		request(coastalWatchUrl, function (error, response, body) {
			if (!error) {
				$ = cheerio.load(body),
				
				//get the text using JQuery
				swellHeight = $('.swell').children('.val').html();
				swellDirection = $('.dir').html();
				period = $('.swell').children('span');
				

				//add text to report object
				report = {
							"Name" : "SwellNet",
							"swellHeight": swellHeight,
							"swellDirection": swellDirection,
							"period": period[1],
							"windDirection": "fpp",
							"windSpeed": "bar",
							"content": "fish"
						}	

				result.reports.push(report);
				console.log('scraping coastalwatch');
				db.save(result);
				result.reports = [];


			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};

