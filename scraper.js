request = require("request"),
cheerio = require("cheerio");
db = require("./db");


exports.scrape = function(request, result){
	
	var result = {
		name: "easternBeaches", 
		reports: [],
		date: new Date()
	}

	async.parallel([

		function(callback) {
			var swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
			
		}

		swellNetUrl, coastalWatchUrl], scraper.scrapeSwellNet, function(err, results){
		if ( err ) {
			console.log("error callback")
		} else {
			console.log(results[0]);
			console.log(results[1]);
		}
	})

}


exports.scrapeSwellNet = function (swellNetUrl, callback) {
	
	request(swellNetUrl, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			console.log('scraping swellnet');
			
			try {
				//get the text using JQuery
				var swell = $('.views-label-nothing').siblings('.field-content').html();
				var swellArray = swell.split(/\s(?=[A-Z])/);
				var period = $('.period').html();
				var wind = $('.views-label-field-surf-report-wind').siblings('.field-content').html();
				var windArray = wind.split(/ /);
				var content = $('.views-field-body').children('.field-content').children('p').html();
				
				//add text to report object
				var report = {
							"Name" : "SwellNet",
							"swellHeight": swellArray[0],
							"swellDirection": swellArray[1].replace(/ /g,''),
							"period": period,
							"windDirection": windArray[1],
							"windSpeed": windArray[0],
							"content": content,
							"date": new Date()
						}	

				console.log('swellnet success');
				console.log('report is ' + report.swellHeight);		

				callback(null, body);

			} catch (err) {
				console.log("Failed to scrape swellnet")
			}; 

		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

var scrapeCoastalWatch = function (coastalWatchUrl) {
	request(coastalWatchUrl, function (error, response, body) {
		if (!error) {
			$ = cheerio.load(body);
			
			console.log('scraping coastalwatch');

			try {
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
				result.reports.push(report);

				} catch (err) {
				console.log("Failed to scrape coastalwatch")
			}; 
			
		} else {
			console.log("We’ve encountered an error: " + error);
		}
	});
}

var save = function (result) {
	db.save(result);
}
