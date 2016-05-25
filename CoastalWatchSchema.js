request = require("request"),
cheerio = require("cheerio");

exports.GetReport = function (data) {

	var coastalWatchUrl = data;

	request(coastalWatchUrl, function (error, response, body) {
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
				var CWreport = {
							"Name" : "CoastalWatch",
							"swellHeight": swellHeight,
							"swellDirection": swellDirection,
							"period": period + "s",
							"windDirection": windDirection,
							"windSpeed": windSpeed,
							"content": content
						}	

				console.log('coastalwatch success');		
				return CWreport;

				} catch (err) {
				console.log("Failed to scrape coastalwatch")
			}; 
			
		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}
