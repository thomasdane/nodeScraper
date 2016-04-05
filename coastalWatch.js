request = require("request"),
cheerio = require("cheerio"),
coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";
var db = require("./db");

module.exports = {
	scrape: function () {
		request(coastalWatchUrl, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body),
				title = $('p.noMarginBottom').html();
				var result = {
					"Name" : title,
					"swellHeight": "1",
					"swellDirection": "NE",
					"period": "18s",
					"windDirection": "W",
					"windSpeed": "3 Knots",
					"content": "blah"
				}	

				db.save(result);				

				console.log('scraping coastalwatch')
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
