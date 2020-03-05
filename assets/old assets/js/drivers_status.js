$(document).ready(function() {
    $("#dashboard_parent").addClass("active");
              $("#status_page").addClass("active");

      
               var   table =  $('#drivers_status').DataTable({
                   "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "paging": false,
                    "deferLoading": 57,
                    "bSort"    : false,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/drivers/drivers_status/format/json',
                     "order" : [[7,"asc"]],
                     "scrollX": true,
                 //    dom: 'Blfrtip',
                
               //      colReorder: true,
                        buttons: [
                    
                   
                   ] ,
        "columnDefs": [
            {   
                "targets": [1,2,3,7,8,9],
                "visible": false
            },
         {   
                "targets": [1,2,3,4,5,6,7,8,9,11,13,14,17,18], 
                "orderable": false,
            },
            {
                "targets": -6,
                "data": null, 
                "defaultContent": '<span class="details-control"></span>',
                 "render": function(data,type,row,meta) { // render event defines the markup of the cell text 
                  
                    if (data[13] == "0" )
                   { 
                       return '';
                   }
                   else
                   {
                       return '<span class="dot" style=" height: 15px;  width: 15px; background-color: red; border-radius: 70%;display: inline-block;"></span>';
                   }
                  }
		  
             },
            {
                "targets": -2,
                "data": null, 
                "defaultContent": '<button data-target="#edit_driver_status" data-toggle="modal" class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil" id="ss"></span></button>'
		  
             },
             
             {
                "targets": -1,
                "data": null, 
		 "render": function(data,type,row,meta) { // render event defines the markup of the cell text 
                    var btn = '<button id="alert_'+data[2]+'" class="btn btn-default btn-rounded btn-sm"><span class="fa fa-bell"></span></button>'; 
                    return btn;
                  }
             },
           {
                "targets": 4,
                "data": null, 
                "defaultContent": '<span class="details-control"></span>',
                 "render": function(data,type,row,meta) { // render event defines the markup of the cell text 
                   if (data[10] === "free" || data[10] === "offline" )
                   {
                       return '';
                   }
                   else
                   {
                       return data;
                   }
                  }
		  
             },
      
   ],
   
        
      });

      
      
       
       $('.display').on( 'click', 'td', function () {
               
                table = $('#drivers_status').DataTable();
                var datarow = table.row( this ).data() ;
                console.log('datarow');
                console.log(datarow);
                console.log($(this).index());
                 $(".end-km-div .col-md-4 span").empty(); 
                  if ($(this).index() === 1)
                  {
                      
                        var tr = $(this).closest('tr');
                        var row = table.row( tr );

                        console.log('child');
                         console.log($(this).index());

                        if ( row.child.isShown() ) {
                            // This row is already open - close it
                            row.child.hide();
                            tr.removeClass('shown');
                        }
                        else {
                            // Open this row
                            var datarow = table.row( this ).data() ;
                            //console.log(datarow);
                            var data = { driver_id: datarow[3], status: datarow[1] };
                            console.log('data');
                            console.log(data);
                            $.ajax({
                                data: data,
                                type: "get",
                                url: base_url + '/drivers/get_child_status?format=json',
                                dataType: 'json',
                                cache: false,
                                success: function (response) {
                                    console.log('get_child_status');
                                    console.log(response);

                                    row.child( format(response)).show();
                                    tr.addClass('shown');
                                    
                                },
                                error: function () {
                                    console.log("error");
                                }
                        
                            });
                        }
                  }
               
                  if($(this).index()  === 11)
                  {
                    console.log('kilometrage');
                    console.log($(this).index());
                     $("#edit_driver_status .modal-title").text("Edit status for "+ datarow[5]);
                    //  console.log(datarow);
                    if (datarow[7] !== "0" && (datarow[8] !== "0"  ))
                     {  
                           $("#kilometrage").attr("disabled",true);
                     }
                     else
                     {
                           $("#kilometrage").attr("disabled",false);
                     }
                     
                     $("#kilometrage").val(datarow[8]);
                     $("#start_counter").val(datarow[7]);
                     $("#driver_id_st").val(datarow[3]);
                     $("#driver_fuel_id").val(datarow[2]);
                  //  console.log("data  : "+datarow);
                 if (datarow[10] === "free" ||  datarow[10] === "busy" ||datarow[10] === "delivering"
                         ||datarow[10] === "PickingUp" )
                     {
                        
                         $("#check_in_switch").prop("checked",true);
                     }
                     else
                     {
                         
                          $("#check_in_switch").prop("checked",false);
                     }
                    // $(".activate_driver_fuel").prop("checked");
                  }
                  
                  
                  
               if($(this).index()  === 12)
                  {
                    //  console.log(datarow);
                     console.log('alert_driver');
                         console.log($(this).index());

                       $.ajax({
                          data : {driver_id : datarow[3]},
                          type: "post",
                          url: base_url + '/drivers/alert_driver',
                          dataType: 'text',
                          cache: false,
                          success: function(response) {
                           
                                  noty({text: 'Successful action', layout: 'topRight', type: 'success',timeout:3000});
                               //   $(".btn-wrapper-"+datarow[2]).css({"position" : "fixed" , "top" : "calc(50%,22px)" , "left" : "10" , "width" : "100%" ,"text-align" :  "center" }); 
                             
                            $(".bell").show();  
                            $(".bell").addClass("ringing");
                      
                            
                            
                            setTimeout(function(){
                                    $(".bell").fadeOut(); 
                                    $(".bell").removeClass("ringing");
                                  }, 3500);
                                  
                                //     $.ajax({
                                //          data : {driver_id : datarow[3]},
                                //          type: "post",
                                //          url: base_url + '/drivers/check_response?format=json',
                                //          dataType: 'json',
                                //          cache: false,
                                //          success: function(response) {
                                //             //   console.log(response);
                                //          if (response.done === true)
                                //            {
                                //              //  console.log("resp");
                                //               noty({text: 'response from '+response.name , layout: 'topCenter', type: 'success',timeout:3000});  
                                //            }

                                //          },    
                                //          error  :function(){
                                //             //  console.log("error");
                                //          }   

                                //   });
                             
                          },  
                          error : function(){
                              noty({text: 'error action', layout: 'topRight', type: 'error',timeout:3000}); 
                          }
                          
                       });
                       
                      
                  }
               
     });   
     
     
     
 

     
     $("#update_driver_status").click(function(){
         var id             = $("#driver_fuel_id").val();
         var kilometrage    =  $("#kilometrage").val();
         var startCounter   = $("#start_counter").val();
         var driver_id      = $("#driver_id_st").val();
         
         $(".end-km-div  .counter_error").empty();
      
            var current_status;
      	    if($('.activate_driver_fuel').prop('checked') === true) { 
                    current_status = 1;
                    status = 1;
                    
		    }else {
                    current_status = 0;
                    status = 3;
		    }
        //   console.log(current_status);
    
        //   console.log('startCounter +"  "+kilometrage' ); 
        //   console.log(startCounter +"  "+kilometrage );  
         var data = {
                    "url" :  'drivers/check_in_out/format/json',
                    "data": {
                        "status"  : status,
                        "end_counter"     : kilometrage,
                        "id"              : id,
                        "driver_id"       : driver_id,
                    }
                    
         };
         console.log('data');
         console.log(data);
                     $.ajax({
                          data : data,
                          type: "post",
                         url:base_url + '/home/core_apis/format/json',
                            //  base_url + '/drivers/update_driver_fuel_status?format=json',
                         dataType: 'json', 
                          cache: false,
                         success: function (response) {
                            console.log('response');
                             console.log(response);
                                  noty({text: 'Successful action', layout: 'topRight', type: 'success',timeout:3000});

                               $('#edit_driver_status').modal('toggle');
                        //   window.location.href= "driver_status_view";


                          }, 


                });
         
     });
      
             });
             
 // setTimeout(function() {
   // location.reload();
   // }, 300000);
   
   
   function format ( d ) {
    // `d` is the original data object for the row
    console.log('d');
    console.log(d);

     
    if (d)
    {
       var table =  '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
       table +=  '<tr>'+
            '<td><strong>Queue</strong></td>'+
            '<td><strong>restaurant</strong></td>'+
            '<td><strong>Source</strong></td>'+
            '<td><strong>Destination</strong></td>'+
            '<td><strong>status</strong></td>'+
            '<td><strong>Open Time</strong></td>'+
            '<td><strong>Confirmation Time</strong></td>'+
            '<td><strong>Expected Arrival Time</strong></td>'+
            '<td><strong>Expected Time</strong></td>'+
            '<td><strong>Expected Ghost Distance</strong></td>'+           
            '<td><strong>Level</strong></td>'+
            '<td><strong>Dispatch by</strong></td>'+

            

            
            
        '</tr>';
 //  console.log(d);

      for(var i=0 ; i< d.length ; i++)
      {
         //    console.log(d.source);
       
      table +=
        '<tr>'+
            
            '<td>'+d[i].queue+'</td>'+
            '<td>'+d[i].restaurant+'</td>'+
            '<td>'+d[i].source+'</td>'+
            '<td>'+d[i].destination+'</td>'+
            '<td>'+d[i].status+'</td>'+
            '<td>'+d[i].open_time+'</td>'+
            '<td>'+d[i].confirmation_time+'</td>'+
            '<td>'+d[i].expected_arrival_time+'</td>'+
            '<td>'+d[i].expected_time+'</td>'+
            '<td>'+d[i].expected_ghost_distance+'</td>'+
            '<td>'+d[i].level+'</td>'+
            '<td>'+d[i].dispatch_by+'</td>'+
        '</tr>';
     
           
           
       };
   
       table += '</table>';
        return table;
    }
    else
    {
        return null;
    }
}