
              $("#dirvers_parent").addClass("active");
              $("#drivers_timeline").addClass("active");

$('#drivertimeline_form').submit(function (evnt) {
                        
     var vars = $("#vouchers_form").serialize();
   
        evnt.preventDefault();
        evnt.stopImmediatePropagation();
          
       
        var driver_id = $('#driver_id').val();
        var from_date = $("#from_date").val();
        var to_date = $("#to_date").val();
         
        var data = {
            driver_id : driver_id,
            from_date : from_date,
            to_date : to_date
         };
                 console.log('data =>');   
                 console.log(data);  
                //  console.log($('input[name=type3]').val());                  
          $.ajax({
              type: "GET",
              url: base_url + '/drivers/time_drivers',
              dataType: "json",
              data: data,
         
              success: function(rtnData) {
                        console.log('rtnData');
                        console.log(rtnData);

                        var ctx = document.getElementById("myChart");
                        var chart1 = new Chart(ctx, 
                            {
                                type: 'bar',
                            data: {
                                
                            datasets:
                            
                                [
                                {   type: "line",
                                    label: 'WORK',
                                    data:rtnData['output'],
                                    "backgroundColor" : "rgba(255, 98, 0, 0.58)",
                                    "borderColor" : "rgba(255, 98, 0)",
                                    fill: false
                                
                                },{
                                    type: "bar",
                                    label: 'CHECKIN',
                                    data:rtnData['check_in_time'],
                                    "backgroundColor" : "rgba(0, 224, 146, 0.52)",
                                    "borderColor" : "rgba(0, 224, 146)",
                                    
                                },
                                {
                                    type: "bar",
                                    label: 'CHECKOUT',
                                    data:rtnData['check_out_time'],
                                    "backgroundColor" : "rgba(224, 0, 0, 0.72)",
                                    "borderColor" : "rgba(224, 0, 0)",
                                   
                                }
                            ]
                            
                        
                          },
                            options: {
                                scales: {
                                    xAxes:[{
                                        type: 'time',
                                          time: {
                                                displayFormats: {
                                                    day: 'Y-MM-DD HH:mm:ss'
                                                },
                                                unit: 'day',
                                                min: from_date,
                                            max: to_date
                                            },
                                            ticks: {
                                                stepSize: 0,
                                            } 
                                            
                                        // }
                                       
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero:true,
                                            stepValue: 1,
                                            max: 2,
                                            stepSize: 1
                                        },
                                        
                                    }]
                                },
                                // legend: { display: false }
                             }
                        });
                      
 
                
            },
            error: function(rtnData) {
                noty({text: 'error action', layout: 'topCenter', type: 'error'});
            }
        });




});
$(".datepicker").datepicker({
    format: 'yyyy-mm-dd' ,
       });  
$( ".datepicker" ).datepicker('setDate', new Date());


