scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing

new CronJob('*/5 * * * * *', function() {	
	
	var swellNetUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches";
	var coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";

	var result = {
	name: "easternbeaches", 
	reports: [], 
	date: new Date()
	}

	function main (callback) {
		var sw = scraper.scrapeSwellNet(swellNetUrl);
		result.reports.push(sw);
		callback(result);
	}

	function save(reports)
	{
		scraper.save(reports)
	}

	main(save);
/*
	var sw = scraper.scrapeSwellNet(swellNetUrl);
	result.reports.push(sw);
	var cw = scraper.scrapeCoastalWatch(coastalWatchUrl);
	result.reports.push(cw);
	
	scraper.save(result);*/

}, null, true, 'Australia/Sydney')
