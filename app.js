var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
	
request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			title = $('.field-content').html();
			
		console.log(title);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});