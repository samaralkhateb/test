   $(document).ready(function() {
              $("#control_panel_parent").addClass("active");
              $("#res_set").addClass("active");
               var   table =  $('#vouchers').DataTable({
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
                   
                    "sAjaxSource": base_url + '/vouchers/get_vouchers/format/json',
                     dom: 'Blfrtip',
                    colReorder: true,
                     " responsive": true,
                          colReorder: true,
                        buttons: [
                    
                      {
                          extend: 'excel',
                                     action: function ( e, dt, node, config ) {
                                         $.ajax({
                                         data : {action_id : 85},
                                         type: "post",
                                         url: base_url + '/client_log/export_log?format=json',
                                         dataType: 'json',
                                         cache: false,
                                         success: function(response) {
                                              console.log(response);
                                         if (response.done === true)
                                           {
                                             //  console.log("resp");
                                              noty({text: 'Done' , layout: 'topCenter', type: 'success',timeout:3000});  
                                              
                                           }

                                         },    
                                         error  :function(){
                                                          noty({text: 'Error' , layout: 'topCenter', type: 'error',timeout:3000});  

                                         }   

                                  });
                                            },
                      } 
                   ] ,
                 
          
      }); 
       });
       
           $('#type_code').on('change', function () {
              if($("#type_code").val() == 2){
                  $(".rests_lists").css("display","block");
           }
           });
          $("#add_new_code").click(function(event) {
           var data = {
            code : $("#cod").val(),
            value :$("#cod_val").val(),
            date : $("#to-date").val(),
            rest : $("#rest_val").val(),
            type : $("#type_code").val(),
            };
            console.log(data);
           var url =  base_url + '/vouchers/add_new_voucher';
             $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                           noty({text: 'Successful action', layout: 'topRight', type: 'success'});
//                           window.location.href= "registed_active_restaurants_view";
                        },
                        error: function(){
                      noty({text: 'error action', layout: 'topRight', type: 'error'});
                        }
                         });
     });
        $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());