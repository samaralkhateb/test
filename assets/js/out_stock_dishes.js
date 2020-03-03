   $(document).ready(function() {
    $("#dashboard_parent").addClass("active");
    $("#out_stack_page").addClass("active");
    
               var   table =  $('#out_stock').DataTable({
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
                    "sAjaxSource": base_url + '/restaurants/out_stock_list/format/json',
                    "order": [[6, 'asc']],
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                      {
                          extend: 'excel',
                             action: function ( e, dt, node, config ) {
                                         $.ajax({
                                         data : {action_id : 83},
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
                            "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },{
                              "targets": -4,
                                "data": null,
                                "defaultContent": "<label class='switch switch-small'><input type='checkbox' class='button activate active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
              
                       
                            } ,{
                                 "targets": -3,
                                "data": null,
                                "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate out_stock'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
              
                            }
                        ],
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if ( aData[5] === "0"  )
                    {
                    }
                    else
                    {
                        $('td .out_stock', nRow).attr('checked', 'checked');
                    }
                       if ( aData[4] === "0"  )
                    {
                    }
                    else
                    {
                        $('td .active', nRow).attr('checked', 'checked');
                    }
                }
                   

       
       
               
      });
     
    
    
     
       });
       
         
       $('.display').on( 'change','td', function () {
                table = $('#out_stock').DataTable();
                   var datarow = table.row( this ).data() ;          
         if ($(this).index() === 3) {
          //active
                  console.log(datarow);
                   var dish_id = datarow[0];
                    var out_stock =datarow[5];
                    var active;
                  
                if(datarow[4] === '1')
                  active = "0";
                else
                 active = "1";
           var data = {
                  "url" :  'dishes/update_dish_active/format/json',
                    "data": {
                      "dish_id": datarow[0],
                      "out_stock": out_stock,
                      "active": active
                    }
                   };      
                  console.log('active');   
        $.ajax({
                   type: "post",
                   url:base_url + '/home/core_apis/format/json',
            // base_url + '/restaurants/update_rest_dish?format=json',
                   dataType: 'json',
                   cache: false,
                   data : data,
                   success: function(response) {
                    // location.reload();
                    noty({text: 'Active Updated', layout: 'topCenter', type: 'success',timeout : 1500});
                            
                    },
                    error: function(){
                  noty({text: 'error action', layout: 'topRight', type: 'error'});
                    }
                     
                    });
                }
         else if ($(this).index() === 4) {
           //out_stock
                 var dish_id = datarow[0];
                 var out_stock;
                 var active = datarow[4];
                if(datarow[5] === '1')
                  out_stock = "0";
                else
                 out_stock = "1";
           var data = {
            "url" :  'dishes/update_dish_stock/format/json',
             "data": {
               "dish_id": datarow[0],
               "out_stock": out_stock,
               "active": active
             }
           };
           console.log('out_stock');   
                   $.ajax({
                     url:base_url + '/home/core_apis/format/json',
                      //  base_url + '/restaurants/update_rest_dish?format=json',
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                            noty({text: 'Out Of Stock Updated', layout: 'topCenter', type: 'success',timeout : 1500});
                            // location.reload();
                        },
                        error: function(response){
                            noty({text: 'error action', layout: 'topRight', type: 'error'});
                        }
                         });        
       
            }
            });
 
 