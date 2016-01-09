request = require("request"),
cheerio = require("cheerio"),
url = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";
var db = require("./db");

module.exports = {
	scrape: function () {
		request(url, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body),
				title = $('p.noMarginBottom').html();					
				db.save(title);
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
