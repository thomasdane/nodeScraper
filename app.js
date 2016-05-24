scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//for testing put cron on faster timer
new CronJob('0 */1 * * * * *', function() {	
	scraper.scrapeSwellNet();
	scraper.scrapeCoastalWatch();
	scraper.save();
}, null, true, 'Australia/Sydney')
