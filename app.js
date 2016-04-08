swellnet = require('./swellnet.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer 
new CronJob('*/5 * * * * *', function() {
	swellnet.scrape();
}, null, true, 'Australia/Sydney')
