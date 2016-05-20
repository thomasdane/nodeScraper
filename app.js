scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
new CronJob('0 */15 6-9,1-3 * * *', function() {
	scraper.scrapeSwellNet();
	scraper.scrapeCoastalWatch();
	scraper.save();
}, null, true, 'Australia/Sydney')
