var canvas = document.getElementById('myChart');

var ctx = canvas.getContext('2d');
var gradientFill = ctx.createLinearGradient(100,0, 100,350);;

gradientFill.addColorStop(0, "rgba(133, 246, 255, 0.8)");

gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.8)");


var data = {
    labels: [],
    datasets: [{
        label: "Avg value of month",
        fill: 'origin',
        lineTension: 0.1,
        backgroundColor: gradientFill,
        borderColor: "#0088FF",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#0088FF",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 7,
        pointHitRadius: 10,
        data:[],
        
    }],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false // hides the legend
        }
    }
};

var option = {
    showLines: true,
    responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false // hides the legend
        },

        scales: {
            xAxes: [{
              display: false, // hides the horizontal scale
              stacked: true // stacks the bars on the x axis
            }],
            yAxes: [{
              display: false, // hides the vertical scale
              stacked: true // stacks the bars on the y axis
            }]
          },
          layout: {
            padding: {
                left: 20,
                right: 20,
                top: 5,
                bottom: 5
            }
        }
};
var myLineChart = Chart.Line(canvas, {
    data: data,
    options: option
});



// [
//     {
//       "date": "Jan",
//       "value": 34
//     },
//     {
//       "date": "Feb",
//       "value": 33
//     },
//     {
//       "date": "Mar",
//       "value": 25
//     }
//   ]
function adddata() {
    myLineChart.data.datasets[0].data=[];
   for(i in avgMonths){
    myLineChart.data.datasets[0].data[i] = avgMonths[i].value;
    myLineChart.data.labels[i] = avgMonths[i].date;
    myLineChart.update();
   }
}

function thisWeek() {
    for(i in avgday){
        myLineChart.data.datasets[0].label="Average value of day";
     myLineChart.data.datasets[0].data[i] = avgday[i].value;
     myLineChart.data.labels[i] = avgday[i].date;
     myLineChart.update();
    }
}






