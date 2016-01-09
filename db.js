var databaseUrl =  "localhost/partywave";
var collections = ["scrapeResults", "targetSites"];
var mongojs = require("mongojs");
var db = mongojs(databaseUrl, collections);
module.exports = db;

module.exports = {
	save: function (beach) {
			db.scrapeResults.save({beach: beach}, function(err, saved) {
			if( err || !saved ) console.log("results not saved");
			else console.log("report saved")	
		});
	}
};
