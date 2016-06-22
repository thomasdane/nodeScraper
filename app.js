var scraper = require('./scraper.js');
var CronJob = require('cron').CronJob;
var locations = require('./locations.js');
var locationsArray = locations.locationsArray;

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing
new CronJob('*/5 * * * * *', function() {

	locationsArray.forEach(function(location){
		scraper.scrape(location);
	});	

}, null, true, 'Australia/Sydney')
