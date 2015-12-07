var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
	
request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			temperature = $('.field-content').html();
			
		console.log("It’s " + temperature + " degrees Fahrenheit.");
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});

////*[@id="curTemp"]/span/span[1]
//#curTemp > span > span.wx-value