exports.getDaylightTides = function (sunrise, sunset, tides) {

	var sunriseUTC = Date.parse(sunrise);
	var sunsetUTC = Date.parse(sunset);

	var tideArray = tide.split(/\s+(?=[H,L])/);
	tideArray.shift();

	var pureTides = [];
	for (var tide of tideArray) {
		let cleanTide = tide.replace(/\s\(.*\)/, '').replace(/\s\s+/g, ' ').replace(/M\s/,'M');
	    pureTides.push(cleanTide);
	}

	var dayTimeTides = {};
	for (var simpleTide of pureTides) {
		var tideTime = simpleTide.split(/\s(?=[0-9])/);
		var tide = Date.parse(tideTime[1]);

		if(sunrise.getTime() < tide.getTime() && tide.getTime() < sunset.getTime()){
			tideObject[tide] = tideTime[0];
		}
	}

	return dayTimeTides
}