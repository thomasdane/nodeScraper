request = require("request"),
cheerio = require("cheerio"),
swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
var db = require("./db");

module.exports = {
	scrape: function () {
		request(swellNetUrl, function (error, response, body) {
			if (!error) {
					var $ = cheerio.load(body),
				title = $('.field-content').html();
				

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
			
				console.log('scraping swellnet')
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
