_this = this;


exports.stringToDate = function(stringToDate){


	//add regex for several format

	console.log('dateService :');
	console.log(stringToDate);

	var y = stringToDate.substring(0, 4);
	var m = stringToDate.substring(5, 7);
	var d = stringToDate.substring(8, 10);

//	var h = stringToDate.substring(11, 13);
	var h, mm, s;
	stringToDate.substring(11, 13) ? h = stringToDate.substring(11, 13) : h = 0 ;
//	var mm = stringToDate.substring(14, 16);
	stringToDate.substring(14, 16) ? mm = stringToDate.substring(14, 16) : mm = 0;
//	var s = stringToDate.substring(17, 19);
	stringToDate.substring(17, 19) ?  s = stringToDate.substring(17, 19):  s=0;

	console.log(y, m, d, h, mm, s);


	var date = new Date (Date.UTC(y,m,d,h,mm,s));
	return date;



}