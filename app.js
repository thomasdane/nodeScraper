var scraper = require('./scraper.js'),
CronJob = require('cron').CronJob,
locations = require('./locations.js'),
locationsArray = locations.locationsArray;

//scrape faster for testing
//new CronJob('*/5 * * * * *', function() {
new CronJob('0 */15 3-6,20-23 * * *', function() {
	locationsArray.forEach(function(location){
		scraper.scrape(location);
	});	
}, null, true, 'Australia/Sydney')
