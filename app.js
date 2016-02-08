coastalWatch = require('./coastalWatch.js');
swellnet = require('./swellnet.js');
CronJob = require('cron').CronJob;

//run the scrape function every hour
var job = new CronJob('*/5 * * * * *', function() {
	swellnet.scrape();
	coastalWatch.scrape();
}, null, true, 'Australia/Sydney')
