var objPeriodMonth, objPeriodDay;
var avgday = [];
var avgMonths = [];
var json;
$(document).ready(function (){
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function retrieveData(){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					devices = JSON.parse(this.responseText);  
					count = devices.count; 
					//console.log(devices.modules);
					json = devices.modules;
		 }
};
	xhttp.open("GET", "https://pacific-garden-17395.herokuapp.com/modules/esp", true);
	xhttp.send();
	console.log("Waiting");
	await sleep(2000);
	console.log("AFter 2 secs");
	var oneDay;
var oneMonth = 30 * oneDay;
var groupByTimePeriod = function (obj, timestamp, period) {
  var objPeriod = {};
  oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  for (var i = 0; i < obj.length; i++) {
    var d = new Date(obj[i][timestamp] * 1000);
    if (period == 'day') {
      d = Math.floor(d.getTime() / oneDay);
    } else if (period == 'week') {
      d = Math.floor(d.getTime() / (oneDay * 7));
    } else if (period == 'month') {
      d = (d.getFullYear() - 1970) * 12 + d.getMonth();
    } else if (period == 'year') {
      d = d.getFullYear();
    } else {
      console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
    }
    // define object key
    objPeriod[d] = objPeriod[d] || [];
    objPeriod[d].push(obj[i]);
  }
  return objPeriod;
};

objPeriodDay = groupByTimePeriod(json, 'datetime', 'day');
// objPeriodWeek = groupByTimePeriod(json, 'datetime', 'week');
objPeriodMonth = groupByTimePeriod(json, 'datetime', 'month');
// var objPeriodYear = groupByTimePeriod(json, 'datetime', 'year');

// console.log(objPeriodDay);
// console.log(objPeriodWeek);
// console.log(objPeriodMonth);
// console.log(objPeriodYear);
// var e = objPeriodMonth[501];
// for (x in e) {
//   uts = e[x].date;
  // console.log(new Date(uts * 1000));
// }

class mday {
  constructor(date, value) {
    this.date = date;
    this.value = value;
  }

}
var currUts = new Date("2019-03-18 14:34:00").getTime()
var currMonth = new Date("2019-03-18 14:34:00").getMonth();
var currYear = new Date("2019-03-18 14:34:00").getFullYear()
//**** !imp */



function averageDays() {
  var avg = 0;
  d = currUts;
  d = Math.round(d / oneDay);
  // console.log(d);
  var i = 7;
  offset = 0;

  while ((i--) != 0) {
    ++offset;
    --d;
    avg = 0;
    var x = objPeriodDay[d]
    // console.log(x);
    if (x) {
      for (j in x) {
        avg += parseInt(x[j].value,10);
      }
      avg /= x.length;
      avgday.push(new mday(new Date(currUts - (oneDay * offset)), avg));
    } else {
      console.log(0);
    }
  }
}

months=['Jan','Feb','Mar','Apr','May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



function averageMonths() {
  var d=0;
  var avg = 0;
  var count = 0;
  i= currMonth;
  while (i >= 0) {
  for (d in json) {
    date = json[d].datetime * 1000;
    //console.log(new Date(date));
    if (i === new Date(date).getMonth() && currYear === new Date(date).getFullYear()) {
      ++count;
       //console.log(new Date(date).getMonth());
       //console.log(json[d].value + "  --  " + new Date(date));
      typeof( json[d].value);

      avg = avg + parseInt(json[d].value, 10) ;
     
    }
  }
  avg /= count;
  // console.log(avg);
  avgMonths.push(new mday(months[i],Math.round(avg)));
  count = 0;
  i--;
  }
  avgMonths.reverse()
}

// $( document ).ready(function() {
averageDays()
averageMonths();
thisWeek();
}
retrieveData();

});