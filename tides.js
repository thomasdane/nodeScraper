var date = require("datejs");

exports.getDaylightTides = function (sunrise, sunset, tides) {

	var sunriseUTC = Date.parse(sunrise);
	var sunsetUTC = Date.parse(sunset);

	var tideArray = tides.split(/\s+(?=[H,L])/);
	tideArray.shift();

	var pureTides = [];
	for (var tide of tideArray) {
		var cleanTide = tide.replace(/\s\(.*\)/, '').replace(/\s\s+/g, ' ').replace(/M\s/,'M');
	    pureTides.push(cleanTide);
	}

	var dayTimeTides = {};
	var i = 0;
	for (var simpleTide of pureTides) {
		var tideTime = simpleTide.split(/\s(?=[0-9])/);
		var tideTime = tideTime;
		var tide = Date.parse(tideTime[1]);
		 

		if(sunriseUTC.getTime() < tide.getTime() && tide.getTime() < sunsetUTC.getTime()){
			dayTimeTides[tide] = tideTime[0]
		}

		//if there is only 1 daylight tide, get the next tide
		if(i == 3 && Object.keys(dayTimeTides).length < 2) {
			dayTimeTides[tide] = tideTime[0]
		}

		i++;
	}

	var result = [];
	for (var key in dayTimeTides) {
		timeUTC = new Date(key);
		time = timeUTC.toString("hh:mm tt")
		result.push(dayTimeTides[key] + " " + time)
	}

	return result.slice(0,2).toString();
}