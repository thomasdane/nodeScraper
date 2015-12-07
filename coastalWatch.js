request = require("request"),
cheerio = require("cheerio"),
url = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";

module.exports = {
	scrape: function () {
		request(url, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body),
					swellHeight = $('.report.scrIcon.swell .val').html(),
					swellDirection = $('.report.scrIcon.swell .dir').html(),
					windDirection = $('.report.scrIcon.wind .dir').html(),
					windSpeed = $('.report.scrIcon.wind .val').html(),
					report = $('p.noMarginBottom').html()
					;

				console.log(swellHeight + ' ' + swellDirection);
				console.log(windSpeed + ' ' + windDirection);
				//console.log(report);
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
