request = require("request"),
cheerio = require("cheerio"),
url = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";

module.exports = {
	scrape: function () {
		request(url, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body),
					title = $('.field-content').html();
					
				console.log(title);
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
