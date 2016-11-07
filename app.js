var scraper = require('./scraper.js'),
CronJob = require('cron').CronJob,
locations = require('./locations.js'),
locationsArray = locations.locationsArray;

//scrape faster for testing
//new CronJob('*/5 * * * * *', function() {
new CronJob('0 */30 6,7,8,9,14,15 * * *', function() {
	locationsArray.forEach(function(location){
		scraper.scrape(location);
	});	
}, null, true, 'Australia/Sydney')
