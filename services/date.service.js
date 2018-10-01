_this = this;


exports.stringToDate = function(stringToDate){


	//add regex for several format

	console.log('dateService :');
	console.log(stringToDate);

	var y = stringToDate.substring(0, 4);
	var m = stringToDate.substring(5, 7);
	var d = stringToDate.substring(8, 10);
	var h = stringToDate.substring(11, 13);
	var mm = stringToDate.substring(14, 16);
	var s = stringToDate.substring(17, 19);

	console.log(y, m, d, h, mm, s);


	var date = new Date (Date.UTC(y,m,d,h,mm,s));
	return date;



}