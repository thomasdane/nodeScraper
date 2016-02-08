// Retrieve client
var MongoClient = require('mongodb').MongoClient;

// Connect to the db using docker host
MongoClient.connect('mongodb://mongo:27017/blog', function(err, db) {
    
    if(err) {
        console.log(err);
    } 
    console.log("Hello world");	
});