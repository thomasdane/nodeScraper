request = require("request"),
cheerio = require("cheerio"),
swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
//coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";
db = require("./db");

result = {
	name: "Eastern Beaches", 
	reports: []
}

module.exports = {
	scrape: function () {
		request(swellNetUrl, function (error, response, body) {
			if (!error) {
				$ = cheerio.load(body),
				//title = $('.field-content').html();
				report = {
							"Name" : "SwellNet",
							"swellHeight": "1",
							"swellDirection": "NE",
							"period": "18s",
							"windDirection": "W",
							"windSpeed": "3 Knots",
							"content": "fishes"
						}	

				result.reports.push(report);
				console.log('scraping swellnet')
				db.save(result);
			} else {
				console.log("We’ve encountered an error: " + error);
			}
		});
	}
};
