request = require("request"),
cheerio = require("cheerio"),
url = "http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";

module.exports = {
	scrape: function () {
		request(url, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body),
					title = $('p.noMarginBottom').html();
					
				console.log(title);
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
