   $(document).ready(function() {
    $("#marketing_parent").addClass("active");
    $("#dishes_page").addClass("active");
           
     
    
    $('#hos_id').on('change', function () {
     var selectVal = $("#hos_id option:selected").val();
        var   table =  $('#dishes').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "scrollX": true,
 "responsive": true,
                    "scrollX": true,
                      "responsive": true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/dishes/dishes_report_withno_tag/format/json?hos_id='
                    + $("#hos_id option:selected").val(),
                    //"order": [[1, 'asc']],                    
                    dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                                          //   action: function ( e, dt, node, config ) {
                                         // $.ajax({
                                         // data : {action_id : 78},
                                         // type: "post",
                                         // url: base_url + '/client_log/export_log',
                                     //   dataType: 'json',
                                       // cache: false,
                                         // success: function(response) {
                                             // console.log(response);
                                         // if (response.done === true)
                                           // {
                                              // console.log("resp");
                                         //     noty({text: 'Done' , layout: 'topCenter', type: 'success',timeout:3000});  
                                              
                                           //}

                                         // },    
                                         // error  :function(){
                                                          // noty({text: 'Error' , layout: 'topCenter', type: 'error',timeout:3000});  

                                         // }   

                                  // });
                                       //     },
                              } 
                           ] ,
                           "columnDefs": [
                              {
                                  "targets": [0],
                                  "visible": false
                              } ,
                              {
                                  "targets": [6],
                                  "visible": false
                              } ,{
                                 "targets": [7],
                                 "data" : null,
                                 "defaultContent" :""
                               
              
                            },{
                              "targets": [9],
                                "data" : null,
                                "defaultContent" :""
                       
                            }
                            ,{
                                 "targets": [10],
                                 "data" : null,
                                 "defaultContent" :""

              
                            }
                        ],
                         "createdRow": function ( row, data, index ) {
                         if ( data[7] == "0" ) {
                          
                          }else{
                            $('td', row).eq(5).addClass("glyphicon glyphicon-ok");
                          }
                          if ( data[9] == "0" ) {
                      
                          }else{
                            $('td', row).eq(7).addClass("glyphicon glyphicon-ok");
                          }
                          if ( data[10] == "0" ) {
                          
                          }else{
                            $('td', row).eq(8).addClass("glyphicon glyphicon-ok");
                          }
                    },
                   
      
                   

       
       
               
      });
      table.ajax.url( base_url+'/dishes/dishes_report_withno_tag/format/json?hos_id='
                    + selectVal ).load();
    });



    //for the auto complete select
    if($(".select").length > 0){
            $(".select").selectpicker();
            
            $(".select").on("change", function(){
                if($(this).val() == "" || null === $(this).val()){
                    if(!$(this).attr("multiple"))
                        $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                }else{
                    $(this).find("option[value="+$(this).val()+"]").attr("selected",true);
                }
            });
        }
     
       });
       
   

      
       
    
 
