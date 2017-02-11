var scraper = require('./scraper.js'),
CronJob = require('cron').CronJob,
locations = require('./locations.js'),
locationsArray = locations.locationsArray;

//summer scrape times
new CronJob('0 */30 7,8,9,14,15 * * *', function() {
//winter scrape times
//new CronJob('0 */30 6,7,8,13,14 * * *', function() {
	locationsArray.forEach(function(location){
		scraper.scrape(location);
	});	
}, null, true, 'Australia/Sydney')
