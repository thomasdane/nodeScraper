var databaseUrl =  "localhost:27017/partywave";
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


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  //console.log(db)
  var collection = db.collection('test');
  collection.insert({test:'test'}, function (err, result) {
      if (err) {
          console.log(err)
      } else {
          console.log('succcess')        
      }
  })
  db.close();
});