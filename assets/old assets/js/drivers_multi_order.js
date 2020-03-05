$("#dirvers_parent").addClass("active");
$("#drivers_multi_order").addClass("active");

$(".datepicker").datepicker({
    format: 'yyyy-mm-dd' ,
       });  
$( ".datepicker" ).datepicker('setDate', new Date());
console.log( new moment().add(-6, "months"));


$('#drivertimeline_form').submit(function (evnt) {
                        
    var vars = $("#vouchers_form").serialize();
  
       evnt.preventDefault();
       evnt.stopImmediatePropagation();
         
       
       var driver_id = $('#driver_id').val();
       var from_date = $("#from_date").val();
       var to_date = $("#to_date").val();
     
     
        var from_date1 =  new Date(from_date);
        var to_date1  =  new Date(to_date);
   
    from_date1.setDate(from_date1.getDate() - 1);
    var min = from_date1.toISOString().substr(0,10);

    to_date1.setDate(to_date1.getDate() + 1);
    var max = to_date1.toISOString().substr(0,10);

        var data = {
            driver_id : driver_id,
            from_date : from_date,
            to_date : to_date
         };
         
// console.log(data);

         $.ajax({
            type: "GET",
            url: base_url + '/drivers/multi_order',
            dataType: "json",
            data: data,
       
            success: function(rtnData) {
                      console.log(rtnData);
var ctx = document.getElementById('myChart');


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                type: 'line',
                label: 'accumulated',
                data: rtnData['output3'],
                borderColor: 'rgba(6, 65, 21, 0.44)',
                backgroundColor: 'black',
                fill: false
              },
            {
                
                              label: 'Accepted',
                              data: rtnData['output1'],
                              backgroundColor: 'rgba(19, 205, 66, 0.62)', // green
                            //   hoverBackgroundColor : '#D6E9C6',
                            },
                            
                            {
                              label: 'Refused',
                              data:rtnData['output2'],
                            //   rtnData['output2'],
                              backgroundColor: 'rgba(205, 19, 19, 0.81)', // red
                            //   hoverBackgroundColor : '#EBCCD1'
                            }
                        
          ]
      },
      options: {
        events: ['click'],
        title: {
            display: true,
            text: 'Drivers Timeline'
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                        type: 'time',
                        time:{
                            unit: 'day',
                            // displayFormats: {
                            //     day: 'Y-MM-DD '
                            // },
                            min: min,
                            max: max,
                            // unit: 'days',
                            unitStepSize: 1    
                        },
                        stacked: true,
                        
                       }],
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    stepValue: 1,
                    max: 50,
                    stepSize: 5,
                    
                },
                stacked: true
            }]
        }
        // legend: { display: false }
     }
  });

},
error: function(rtnData) {
    noty({text: 'error action', layout: 'topCenter', type: 'error'});
}
});  

});
