scraper = require('./scraper.js');
CronJob = require('cron').CronJob;
async = require("async");

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing

new CronJob('*/5 * * * * *', function() {

	var coastalWatchUrl = "http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra";


	
	

}, null, true, 'Australia/Sydney')
