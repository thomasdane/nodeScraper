request = require("request"),
cheerio = require("cheerio");

exports.GetReport = function (data) {

	var swellNetUrl = data;

	request(swellNetUrl, function (error, response, body) {
		
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
							"content": content
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