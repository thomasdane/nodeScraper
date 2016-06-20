request = require("request"),
cheerio = require("cheerio");
async = require("async");
db = require("./db");


var scrape = function(url, callback){
	request.get(url, function(err, response,body){
		if (err) {
			callback(err);
		} else {
			callback(null, body);
		}
	});
}

var swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
var coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";

async.map([coastalWatchUrl], scrape, function(err, results){
	if (err) {
		console.log(err);
	} else {
		$ = cheerio.load(results[0]);

		console.log('scraping coastalwatch');
		console.log($);
		//get the text using JQuery
		var swellHeight = $('.swell').children('.val').html();
		var swellDirection = $('.dir').html();
		var period = $('.swell').children('span').eq(1).html().match(/[0-9]+/);
		var windSpeed = $('.wind').children('.val').html();
		var windDirection = $('.wind').children('.dir').html();
		var content = $('.starLarge').next('.noMarginBottom').html();
		//add text to report object
		var report = {
					"Name" : "CoastalWatch",
					"swellHeight": swellHeight,
					"swellDirection": swellDirection,
					"period": period + "s",
					"windDirection": windDirection,
					"windSpeed": windSpeed,
					"content": content,
					"date": new Date()
					}	
		
		console.log('coastalwatch success');
		console.log(report);
	}
});
