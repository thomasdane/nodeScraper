scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
new CronJob('*/5 * * * * *', function() {
	scraper.scrapeSwellNet();
	scraper.scrapeCoastalWatch();
	scraper.save();
}, null, true, 'Australia/Sydney')
