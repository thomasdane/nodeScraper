var databaseUrl =  "localhost/partywave";
var collections = ["scrapeResults", "targetSites"];
var mongojs = require("mongojs");
var db = mongojs(databaseUrl, collections);
module.exports = db;

module.exports = {
  save: function (spot) {
      db.scrapeResults.save(spot, function(err, saved) {
      if( err || !saved ) console.log("results not saved");
      else console.log("report saved at " + new Date())  
    });
  }
};
