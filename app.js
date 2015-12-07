swellnet = require('./swellnet.js');
swellnet.scrape();
//need to call scrape on swellnet first because the value of url variable changes when require coastalwatch.js
coastalWatch = require('./coastalWatch.js');
coastalWatch.scrape();
