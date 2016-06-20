scraper = require('./scraper.js');
CronJob = require('cron').CronJob;
async = require("async");

//scrape websites on a timer 
//new CronJob('0 */15 6-9,1-3 * * *', function() {
//scrape every minute for testing

new CronJob('*/5 * * * * *', function() {

	
	var locations = [
		{
			name: 'easternbeaches',
			urls: {
				coastalWatch:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra"
				, swellNet: 
				"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches"
			}
		}, 
		{
		name: 'northernbeaches',
			urls: {
				coastalWatch:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/curl-curl"
				, swellNet: 
				"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/northern-beaches"

			}
		}
		/*,{
		name: 'batemansbay',
			urls: {
				coastalWatch:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/shoalhaven-heads"
				, swellNet:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/batemans-bay"
			}
		}*/
	]

	locations.forEach(function(location){
		scraper.scrape(location);
	});	

}, null, true, 'Australia/Sydney')
