swellnet = require('./SwellNetSchema.js');
coastalwatch = require('./CoastalWatchSchema.js');
db = require("./db");

exports.scrapeSwellNet = function (location) {
	//console.log(location);
	//console.log(location.urls.swellNet);
	request(location.urls.swellNet, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			console.log('scraping swellnet');
			
			try {
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
							"content": content,
							"date": new Date()
						}	
				console.log('swellnet success');		

				return report;
			} catch (err) {
				console.log("Failed to scrape swellnet")
			}; 

		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

exports.scrapeCoastalWatch = function (location) {
	//console.log(location);
	//console.log(location.urls.coastalWatch);
	request(location.urls.coastalWatch, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			console.log('scraping coastalwatch');

			try {
				//get the text using JQuery
				var swellHeight = $('.swell').children('.val').html();
				var swellDirection = $('.dir').html();
				var period = $('.swell').children('span').eq(1).html().match(/[0-9]+/);
				var windSpeed = $('.wind').children('.val').html();
				var windDirection = $('.wind').children('.dir').html();
				var content = $('.starLarge').next('.noMarginBottom').html();

				//add text to report object
				var report = {
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
				return report;

				} catch (err) {
				console.log("Failed to scrape coastalwatch")
			}; 
			
		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

exports.save = function (result) {
	db.save(result);
}
