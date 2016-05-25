swellnet = require('./SwellNetSchema.js');
coastalwatch = require('./CoastalWatchSchema.js');
db = require("./db");

easternBeachesUrls = 
["http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/eastern-beaches"
,"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/maroubra",
];

northernBeachesUrls = 
["http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/northern-beaches"
,"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/curl-curl",
];

southernBeachesUrls = [
"http://webcache.googleusercontent.com/search?q=cache:http://www.swellnet.com/reports/australia/new-south-wales/batemans-bay"
,"http://webcache.googleusercontent.com/search?q=cache:http://www.coastalwatch.com/surf-cams-surf-reports/nsw/shoalhaven-heads"
];

exports.scrapeEasternBeaches = function () {
	
	var result = {
		name: "easternbeaches", 
		reports: []
	}
	
	var sn = swellnet.GetReport(easternBeachesUrls[0]);
	var cw = coastalwatch.GetReport(easternBeachesUrls[1]);

	result.reports.push(sn);
	result.reports.push(cw);

	db.save(result);
};
