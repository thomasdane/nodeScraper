// Retrieve client
var MongoClient = require('mongodb').MongoClient;

// Connect to the db using docker host
MongoClient.connect('mongodb://mongo:27017/blog', function(err, db) {
    
    
    //err ? console.log("error") : console.log("no error");
    
    if(err) {
        
        console.log(err);
    } else {
        console.log("hello")
    }
        
});