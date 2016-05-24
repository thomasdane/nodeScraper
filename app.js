scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing
new CronJob('0 */1 * * * *', function() {	
>>>>>>> 04acc29cf3d21ade8f2da449e745468e247d1cf1
	scraper.scrapeSwellNet();
	scraper.scrapeCoastalWatch();
	scraper.save();
}, null, true, 'Australia/Sydney')
