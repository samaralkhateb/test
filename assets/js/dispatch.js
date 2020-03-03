$(document).ready(function () {
     
    
    $("#webdash_parent").addClass("active");
    $("#ai").addClass("active");


    dispatch_system();
    setInterval(dispatch_system, 30000);
    function dispatch_system() { 

        $(".by_driver").empty();
        $(".by_order").empty();
        $(".by_driver_badge").empty();
        $(".by_order_badge").empty();

    
    url = "http://62.138.7.75:5357/bee_order_auto_dispatch_now";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",

        success: function (response) {
            var orders_drivers_html = '';
            var drivers_orders_html  = '';
            var drivers_orders = response['drivers_orders'];
            var orders_drivers = response['orders_drivers'];
            
            
            
            for (var i in orders_drivers) {
                
                var worker_html='';
                var workersinfo =  orders_drivers[i]['workers'];
                for  (var j in workersinfo )  {
                    
                    worker_html +=
                        '<div class="col-sm-6">  ' + workersinfo[j]['worker_name'] + '      </div> ' +
                        '<div class="col-sm-6">  level '+ workersinfo[j]['level'] + '  </div>';
                }
                
                 orders_drivers_html += 
                '<div class="panel panel-primary">'+
                    '<div class="panel-heading">'+
                        '<div class="col-sm-3">'+orders_drivers[i]['departure_name']+'</div>'+
                        '<div class="col-sm-4"> </div>'+
                        '<div class="col-sm-3">#'+orders_drivers[i]['restaurant_queue']+'</div>'+
                        '<br><br>'+
                    '</div>'+
   
                    '<div class="panel-body">'+
                        '<div> <span class="glyphicon glyphicon-time"></span> '+startTime(orders_drivers[i]['ready_time'])+' </div>'+
                        '<br><br>'+
                        '<div>'+
                                '<span class="glyphicon glyphicon-user"></span>'+
                                
                '<div>' + worker_html + '</div>'+   
                        '</div>'+
                    '</div>'+
                    '</div>';
            }

            for (var i in drivers_orders) {
                // console.log( drivers_orders[i]);
                var task_html='';
                var tasksinfo = drivers_orders[i]['tasks'];
                
                
                
                for  (var j in tasksinfo )  {
                    
                    var date = new Date(tasksinfo[j]['ready_time'] * 1000); 
                     task_html +=
                        '<div class="col-sm-4"> '+ tasksinfo[j]['restaurant_name']
                        + '</div>' +
                    '<div class="col-sm-2"> #'+ tasksinfo[j]['restaurant_queue'] 
                    + '</div>' +
                        '<div class="col-sm-6"> <span class="glyphicon glyphicon-time"></span>   '+startTime(tasksinfo[j]['ready_time'])
                        +'</div>';
                }

                drivers_orders_html += 
                '<div class="panel panel-info">'+
                    '<div class="panel-heading">'+
                        '<div class="col-sm-3">'+drivers_orders[i]['name']+'</div>'+
                        '<div class="col-sm-4"> </div>'+ 
                        '<br><br>'+
                    '</div>'+
   
                    '<div class="panel-body">'+
                        '<br><br>'+
                        '<div>'+
                                '<span class="glyphicon glyphicon-th-list"></span>'+
                                
                '<div>' + task_html + '</div>'+   
                        '</div>'+
                    '</div>'+
                    '</div>';
            }

            var orders_drivers_length = orders_drivers.length;
            var drivers_orders_length = drivers_orders.length;

            // console.log(orders_drivers_length);

            $(".by_driver").append($(orders_drivers_html));
            $(".by_order").append($(drivers_orders_html));

            //badge
            $(".by_driver_badge").append(orders_drivers_length);
            $(".by_order_badge").append(drivers_orders_length);
            // console.log(orders_drivers_html);
        },
        error: function (responseerror) {
            
        }
    });

    }
 

    
});

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime(date) {
      var today = new Date(date * 1000).toISOString();
      today = new Date(today);
    var h = today.getUTCHours();
    var m = today.getMinutes();
    var s = today.getSeconds(); 
    m = checkTime(m);
    s = checkTime(s);
    var all = h + ":" + m + ":" + s;
 
      return all;
} 
 
 