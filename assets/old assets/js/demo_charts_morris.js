var ctx = document.getElementById("myChart");
var data = [
//     {
//     x: new Date(),
//     y: 0.1
// }, {
//     t: new Date(),
//     y: 0.2
// }
];


var chart = new Chart(ctx, {
    type: 'line',
    data:  [{x:'2:06 pm', y:0.1}, {x:'2:07 pm', y:0.2}],
    options: {
        scales: {
            xAxes: [{
                
                type: 'time',
                time: {
                    unit: 'minute'
                },
                ticks: {
                    min = '1:00 pm',
                    max = '1:00 am'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: 2
                },
                // type: 'number',
                // number:{
                //     min : 0,
                //     max: 2
                // }
            }]
        },
        // Bar:false
    }
})