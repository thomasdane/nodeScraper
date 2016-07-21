var scraper = require('./scraper.js'),
CronJob = require('cron').CronJob,
locations = require('./locations.js'),
locationsArray = locations.locationsArray;

//scrape websites on a timer 
new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape faster for testing
//new CronJob('*/5 * * * * *', function() {

	locationsArray.forEach(function(location){
		scraper.scrape(location);
	});	

}, null, true, 'Australia/Sydney')
