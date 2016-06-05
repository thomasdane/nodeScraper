scraper = require('./scraper.js');
CronJob = require('cron').CronJob;

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
/*		{
		name: 'northernbeaches',
			urls: {
				coastalWatch:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/northern-beaches"
				, swellNet: 
				"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/curl-curl"
			}
		}*/
		/*,{
		name: 'batemansbay',
			urls: {
				coastalWatch:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/batemans-bay"
				, swellNet:
				"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/shoalhaven-heads"
			}
		}	*/
	]

	locations.forEach(function(location){
		var result = {
			name: location.name, 
			reports: [],
			date: new Date()
		}

		var swellNetReport = scraper.scrapeSwellNet(location);
    	result.reports.push(swellNetReport);
	

		var coastalWatchReport = scraper.scrapeCoastalWatch(location);
    	result.reports.push(coastalWatchReport);

   	 	scraper.save(result);
	});

}, null, true, 'Australia/Sydney')
