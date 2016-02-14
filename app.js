coastalWatch = require('./coastalWatch.js');
swellnet = require('./swellnet.js');
CronJob = require('cron').CronJob;

//scrape websites on a timer
var job = new CronJob('*/5 * * * * *', function() {
	swellnet.scrape();
	coastalWatch.scrape();
}, null, true, 'Australia/Sydney')
