var comm_id_index = 0;
var rest_name_index = comm_id_index + 1;
var comm_rate_index = rest_name_index + 1;
var comm_billing_period_index = comm_rate_index + 1;
var comm_start_date_index = comm_billing_period_index + 1;
var comm_end_date_index = comm_start_date_index + 1;

var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function() {
   
    $("#accounting_parent").addClass("active");
    $("#accounting_commission").addClass("active");
            var   table =  $('#rest_commission').DataTable({
                 "ordering": true,
                 "destroy": true,
                 "bInfo": false,
                 "bPaginate": true,
                 "bLengthChange": true,
                 "searching": true,
                 "bSearchable":true,
                 "bProcessing": true,
                 "deferLoading": 57,
                 "emptyTable": "No data available in table",
                 "bServerSide": false,
                 "scrollX": true,
                
                 "sAjaxSource": base_url + '/accounting/get_commission/format/json',
                 "order": [rest_name_index, 'asc'],
                  dom: 'Blfrtip',
                 colReorder: true,
                  " responsive": true,
                     buttons: [
                   
                   {
                       extend: 'excel',
                   } 
                ] ,
                         "columnDefs": [
                         {
                             "targets": [comm_id_index],
                             "visible": false
                         },
                        //  {
                        //      "targets": comm_end_date_index,
                        //        "data": null,
                        //        "defaultContent": "<input name='end_date' type='text' class='end_date form-control datepicker'  / ><span></span></label>"
                                                    
                        //    } ,
                        //  {
                        //    "targets": comm_start_date_index,
                        //      "data": null,
                        //      "defaultContent": "<input name='start_date' type='text' class='start_date form-control datepicker'  / ><span></span></label>"
           
                    
                        //  } ,
                         {
                              "targets": comm_billing_period_index,
                             "data": null,
                             "defaultContent":"<input type='text' class='rate form-control' name='rate' / ><span></span></label>"
           
                         },    
                        
                      
                      
                      
                      
                      
                     ],
      "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
              
                 
                
                
                 $('td .end_date', nRow).attr('value', aData[comm_end_date_index]);
                 $('td .end_date', nRow).attr('id', aData[comm_id_index]+"_end");

                 $('td .start_date', nRow).attr('value', aData[comm_start_date_index]);
                 $('td .start_date', nRow).attr('id', aData[comm_id_index]+"_start");
                 
                 $('td .rate', nRow).attr('value', aData[comm_rate_index]*100);
                 $('td .rate', nRow).attr('id', aData[comm_id_index]+"_rate");

                 $('td .rate', nRow).attr('value', aData[comm_billing_period_index]);
                 $('td .rate', nRow).attr('id', aData[comm_id_index]+"_period");


                   
      }      
   }); 
    });
    

$('.display').on( 'change', 'td', function () {
  
            table = $('#rest_commission').DataTable();
                var datarow = table.row( this ).data() ;
                 var comm_billing_period_column = comm_billing_period_index - invisible_columns;
                
     if ($(this).index() === comm_billing_period_column ) {
             var rest_id = datarow[comm_id_index];
             var data ={
                    comm_id :  datarow[comm_id_index],
                    billing_period : $("#"+datarow[comm_id_index]+"_period").val(),
                    rest_id:rest_id
                };
                
     $.ajax({
                type: "post",
                url: base_url + '/accounting/update_billing_period?format=json',
                dataType: 'json',
                cache: false,
                data : data,
                success: function(response) {
              console.log(data);
                // location.reload();
                noty({
                       timeout: 1500,
                       text: "Updated",
                       layout: 'topCenter', 
                       type: 'success'
                       
                               });
             
                 }
                 });
             
          
             }



               });
               





$("#add_new_commission_but").click(function(event) {
        var data = {
        restaurant_id : $("#restaurant_id").val(),
         rate:$("#rate").val(),
         from_date : $("#from_date").val(),
        //  to_date     : $("#to_date").val(),
         };
        var url =  base_url + '/accounting/add_commission?format=json';
          $.ajax(
                 {
                     url: url,
                     type: "post",
                     dataType: "json",
                     data: data,
                     success: function(response) {
                        noty({text: 'Successful action', layout: 'topRight', type: 'success'});
                        window.location.href= "accounting_commission";
                     },
                     error: function(){
                   noty({text: 'error action', layout: 'topRight', type: 'error'});
                     }
                      });
  });



 
 
  
  
  

  $(".datepicker").datepicker({
    format: 'yyyy-mm-dd' ,
       });  
// $( ".datepicker" ).datepicker('setDate', new Date());