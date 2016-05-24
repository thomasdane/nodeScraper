scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing
new CronJob('0 */1 * * * *', function() {	
	scraper.scrapeSwellNet();
	scraper.scrapeCoastalWatch();
	scraper.save();
}, null, true, 'Australia/Sydney')
