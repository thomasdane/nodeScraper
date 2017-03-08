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
	for (var simpleTide of pureTides) {
		var tideTime = simpleTide.split(/\s(?=[0-9])/);
		var tideTime = tideTime;
		var tide = Date.parse(tideTime[1]);

		if(sunriseUTC.getTime() < tide.getTime() && tide.getTime() < sunsetUTC.getTime()){
			dayTimeTides[tide] = tideTime[0]
		}
	}

	var result = [];
	for (var key in dayTimeTides) {
		timeUTC = new Date(key);
		time = timeUTC.toString("hh:mm tt")
		result.push(dayTimeTides[key] + " " + time)
	}

	return result.slice(0,2).toString();
}