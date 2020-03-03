   $(document).ready(function() {
       
    $("#accounting_parent").addClass("active");
    $("#drivers_orders").addClass("active");
       
             $('#show_status_modal').on('hidden.bs.modal', function (e) {
                  $('#status').html("");
                });


              $("#reports_parent").addClass("active");
              $("#drivers_orders").addClass("active");
              if($(".select").length > 0){
                $(".select").selectpicker();
                
                $(".select").on("change", function(){
                    if ($(this).val() == "" || null === $(this).val()){
                        if (!$(this).attr("multiple"))
                            $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                    }else{
                        $(this).find("option[value="+$(this).val()+"]").attr("selected",true);
                    }
                });
                }
            var table;   
             table =  $("#drivers_order").DataTable({
                    //"scrollX": true,
                    "lengthMenu": [[100,-1,50, 25, 10], [100,"All",50, 25, 10]],
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "scrollX": true,
 "responsive": true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/drivers/drivers_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
                    //"order": [[1, 'asc']],
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                                {
                                    extend: 'excel',
//                                       action: function ( e, dt, node, config ) {
//                                         $.ajax({
//                                         data : {action_id : 81},
//                                         type: "post",
//                                         url: base_url + '/client_log/export_log',
//                                         dataType: 'json',
//                                         cache: false,
//                                         success: function(response) {
//                                              console.log(response);
////                                         if (response.done === true)
////                                           {
//                                             //  console.log("resp");
//                                              noty({text: 'Done' , layout: 'topCenter', type: 'success',timeout:3000});  
//                                              
////                                           }
//
//                                         },    
//                                         error  :function(){
//                                                          noty({text: 'Error' , layout: 'topCenter', type: 'error',timeout:3000});  
//
//                                         }   
//
//                                  });
//                                            },
                                },
                                {
                                    extend : 'colvis',
                                } 
                             ] ,"columnDefs": [
                                                {
                                                    "targets": [0],
                                                    "visible": false
                                                },{
                                                      "targets": -1,
                                                        "data": null,
                                                        "defaultContent": '<button class="btn btn-default btn-rounded btn-sm edit-driver" onclick="change_bill_driver($(this))"><i class="fa fa-pencil"></i></button>'                       
                                                    }                                            
                                             ],
                "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    $('td .edit-driver', nRow).attr('value', aData[0]);
                }
                  
         
            
      });

   $('.datepicker').on('changeDate', function() {
        table.ajax.url(base_url + '/drivers/drivers_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    });


             
     
    });
     
    
          $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());

    function change_bill_driver(thisitem){
                var bill_id = thisitem.val();
                            var  html ='<tr  style="float:left">';
                              html += '<tr style="float:left"><td>Deliverd by :</td><td><select style="width:200px;height:37px;color:#252525;font-size:16px"class="form-control input-sm select-cus" name="driver" id="driver"  driver-id="" value=""></select></td></tr>';

                            html += '<hr><tr><td><button style="margin-left: 22%;margin-top: 10%;" onclick="update_bill_driver(' + bill_id + ')" class="btn btn-success" >Update</button></td></tr>';
                              $.ajax({
               type: "GET",
               url: base_url + '/call_center/drivers?bill_id=' + bill_id,
               dataType: 'json',
               cache: false,
               success: function(response) {
                      $.each(response.drivers.drivers, function(index, driver) {
                    
                        if (driver.id == response.drivers.bill_driver) {
                            $('#driver').append($('<option/>', {
                                value: driver.id,
                                text: driver.name,
                                selected: true
                            }));
                        } else {
                            $('#driver').append($('<option/>', {
                              value: driver.id,
                                text: driver.name,
                            }));
                        }
                    });
               },error:function(response){
                 console.log(response);
               }
                 });
                  
    $('#status').append($(html));
    $('#show_status_modal').modal('show');
    
    }




    function update_bill_driver(bill_id){
       
         var driver;
         driver = $("#driver").val();
       
      var data = {

    bill_id : bill_id ,
    driver :driver,
    
};
url = base_url + '/call_center/change_bill_driver' ; 
 jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       console.log(response);
                         jQuery("#show_status_modal").modal("hide");
                          jQuery("#status").html("");
                          location.reload();
                    
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
    }

