$(document).ready(function() {
    $("#control_panel_parent").addClass("active");
    $("#restaurants_page").addClass("active");

    // console.log('rest_h_id');
    // console.log($('#rest_h_id').val());
     
        var url = base_url + '/restaurants/get_restaurants?format=json'
     
               var   table =  $('#rest-list').DataTable({
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
                    "sAjaxSource": url,
                    //"order": [[6, 'asc']],
                     dom: 'Blfrtip',
                    colReorder: true,
                     " responsive": true,
                        buttons: [
                      
                      {
                          extend: 'excel',
                                     action: function ( e, dt, node, config ) {
                                         $.ajax({
                                         data : {action_id : 84},
                                         type: "post",
                                         url: base_url + '/client_log/export_log?format=json',
                                         dataType: 'json',
                                         cache: false,
                                         success: function(response) {
                                            //   console.log(response);
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
                            "columnDefs": [
                            {
                                "targets": [0],
                                "visible": false
                            },
                            {
                                "targets": [1],
                                "data": null,
                                "render": function(data){
                                    //console.log(data);
                                    data = '<form id="hidden_form" method="POST" action="'+base_url+'/restaurants/restaurant_details"><input name="rest_id" type="number" value="'+ data[0] +'" hidden /><button id="rest-details-btn" onclick="document.getElementById("#hidden_form").submit();">'+data[1]+'</button></form>';
                                    return data;
                                }
                                
                            },
                            {
                                "targets": [4],
                                "data": null,
                                "render": function(data){
                                    if(data[4] == 1)
                                        data = "STANDARD";
                                    else if(data[4] == 2)
                                        data = "VIRTUAL";
                                    else if(data[4] == 3)
                                        data = "EXTERNAL";
                                    return data;
                                }
                            },
                            {
                                "targets": [3],
                                "data": null,
                                "render": function(data){
                                    if(data[3] == 0)
                                        data = 'No';
                                    else
                                        data = 'Yes';
                                    return data;
                                }
                            }
                        ]   
      }); 
       });