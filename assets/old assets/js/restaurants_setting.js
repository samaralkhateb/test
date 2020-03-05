var rest_id_index = 0;
var rest_name_index = rest_id_index + 1;
var rest_address_index = rest_name_index + 1;
var rest_wh_index = rest_address_index + 1; 
var rest_telegram_group_index = rest_wh_index + 1;
var rest_autoclose_index = rest_telegram_group_index + 1;
var rest_status_index = rest_autoclose_index + 1;
var rest_lastseen_index = rest_status_index + 1;
var rest_username_index = rest_lastseen_index + 1;
var rest_pass_index = rest_username_index + 1;
var rest_estimation_index = rest_pass_index + 1;
var rest_sim_code_index= rest_estimation_index + 1;
var rest_connection_channel_index= rest_sim_code_index + 1;
var max_delivery= rest_connection_channel_index + 1;

// var rest_position_index = rest_estimation_index + 1;

var invisible_columns = 0;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function() {
   
           $("#control_panel_parent").addClass("active");
           $("#res_set").addClass("active");
            var   table =  $('#rest_setting').DataTable({
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
                
                 "sAjaxSource": base_url + '/restaurants/registed_active_restaurants/format/json',
                 //"order": [[6, 'asc']],
           //       dom: 'Blfrtip',
                 colReorder: true,
                  " responsive": true,
                     buttons: [
                   
                   {
                   //    extend: 'excel',
                          
                   } 
                ] ,
                         "columnDefs": [
                         {
                             "targets": [rest_id_index],
                             "visible": true
                         },
                        //  {
                        //      "targets": rest_position_index,
                        //      "render": function ( data ) {
                               
                        //         if (user_role == 4)
                        //         {
                        //                       return  `    
                        //                       <input name='position' type='number' class='res_position' style='width: 60%;'  maxlength="1" min="0" max="5" oninput="this.value=(this.value>this.max+1)?this.max:(this.value===this.min-1)?this.min:this.value.slice(0,this.maxLength)" / ><span>Position</span></label>
                        //                   `;
                        //         }
                        //         else
                        //         {
                        //             return null;
                        //         }
                            
                      
                        //    }} ,
                        {
                          "targets": max_delivery,
                            "render": function(data,type,full,meta){
                              if (user_role == 4 || user_role == 12 || user_role == 11 || user_role == 15 || user_role == 5){
                              data = "<input name='mmaxd' type='number' class='max_delivery'  placeholder='per Metter '/ ></label>"
                          }else {
                            data = '';
                          }
                          return data;
                          }
                        } ,
                         {
                           "targets": rest_estimation_index,
                             "data": null,
                             "defaultContent": "<input name='ss' type='number' class='res_estimation' style='width: 50%;' / ><span>Minutes</span></label>"
           
                    
                         } ,
                         {
                              "targets": rest_status_index,
                             "data": null,
                             "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate rest_set'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
           
                         },    
                         {
                      "targets": rest_autoclose_index,
                         "render": function(data,type,full,meta){
                             if (type === 'display'){
                             data = "<input type='checkbox' class='icheckbox autoClose'  id='" + full[0] + "checkbox'/>"
                         }
                         return data;
                         }
       
                 },
                 
                        {
                             "targets": [rest_pass_index],
                             
                             "render": function ( data ) {
                               
                                 if (user_role == 4 || user_role == 12 || user_role == 11 || user_role == 15 || user_role == 5)
                                 {
                                               return data + `    
                                         <span class="fa fa-pencil edit_password" 
                                          style="margin-left:10px; cursor:pointer" 
                                          data-toggle="modal" data-target="#editPass"></sapn>
                                           `;
                                 }
                                 else
                                 {
                                     return null;
                                 }
                       
                       },    
                      },
                //       {
                //       "targets": rest_whatsapp_group_index,
                //      "data": null,
                //              "defaultContent":"<input name='gg' type='text' class='g_name form-control' / ></label>"
       
                //  },
                 {
                 "targets": rest_telegram_group_index,
                "data": null,
                        "defaultContent":"<input name='telegram' type='text' class='telegram_group form-control' / ></label>"
  
            },
                      
                      {
                             "targets": [rest_username_index],
                             "render": function ( data ) {

                              if (user_role == 4 || user_role == 12 || user_role == 11 || user_role == 15 || user_role == 5)    {
                                if (data != null){
                                  if (data.indexOf('@') > -1)
                                  {
                                    data = data.substring(0, data.indexOf('@'));
                                  }
                              } else {
                                  data = "NO EMAIL";
                                  }
                                  return data;
                          }else {
                            return null;
                          }

                       },    
                      },
                       
                      {
                        "targets":rest_connection_channel_index,
                        "data": null,
                        "defaultContent": '<select name = "connection_channel" class="connection_channel form-control"><option value = "1"> APN </option><option value = "2"> INTERNET </option></select>'
            
            
                      },
                      {
                        "targets": rest_sim_code_index,
                        "data": null,
                        "defaultContent": "<input name='sim_code' type='text' class='sim_code' maxlength='10' pattern='[0-9]' / ></label>"
            
            
                      }
            
                      
                      
                     ],
      "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                 if ( aData[rest_status_index] === "0"  )
                 {
                 }
                 else
                 {
                     $('td .rest_set', nRow).attr('checked', 'checked');
                 }
                 
                 if ( aData[rest_autoclose_index] === "0"){}
                 else{
                     $('td .autoClose', nRow).attr('checked', 'checked');
                 }
                 $('td .rest_set', nRow).attr('id', 'input'+aData[rest_id_index]);
                 $('td .res_estimation', nRow).attr('value', aData[rest_estimation_index]);
                //  $('td .res_position', nRow).attr('value', aData[rest_position_index]);
                 $('td .res_estimation', nRow).attr('id', aData[rest_id_index]+"_time");
                //  $('td .res_position', nRow).attr('id', aData[rest_id_index]+"_pos");

          
          $('td .telegram_group', nRow).attr('id', aData[rest_id_index]+ "_telegram_group");
          if (aData[rest_telegram_group_index]) { 
            $('td .telegram_group', nRow).attr('value', aData[rest_telegram_group_index] );
          }
               
          
                     if ( aData[rest_estimation_index] === "0"  )
                        $('#all_auto').prop('checked', false);
                    else
                        $('#all_auto').prop('checked', true);
                  //  $('td .g_name', nRow).attr('value', aData[rest_whatsapp_group_index]);
                  //  $('td .g_name', nRow).attr('id', aData[rest_id_index]);

           
          
                   $('td .connection_channel option[value="' + aData[rest_connection_channel_index] + '"]', nRow).attr("selected", true);
          $('td .connection_channel', nRow).attr('id', 'selectconnection_channel' + aData[rest_id_index]);
          

          
          $('td .sim_code', nRow).attr('value', aData[rest_sim_code_index]);
          $('td .sim_code', nRow).attr('id',aData[rest_id_index] + "_sim_code");

          $('td .max_delivery', nRow).attr('value', aData[max_delivery]);
          $('td .max_delivery', nRow).attr('id',aData[rest_id_index] + "_max");
      }     

   }); 
       

    });

     $('#all_auto').on( 'change',function () {
        
       noty({
       text: "Are you sure?",
       layout: 'topCenter', 
       type: 'error',
       buttons: [
                {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                          
                                     var status = "";
                                     if ($('#all_auto').is(":checked"))
                                       status = 1;
                                     else
                                       status = 0;
                                      var data ={
                                                  status :  status,
                                                 };      
                                         $.ajax({
                                                    type: "post",
                                                    url: base_url + '/restaurants/auto_close_all_restaurants',
                                                    dataType: 'json',
                                                    cache: false,
                                                    data : data,
                                                    success: function(response) {
                                                 
                                                       location.reload();
                                                     }
                                                     });
                 }},
                 {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                               $noty.close();
                           }
                       }
                   ]
               });
});
    
$('.display').on( 'change', 'td', function () {
  
            table = $('#rest_setting').DataTable();
                var datarow = table.row( this ).data() ;
                var status_column = rest_status_index - invisible_columns;
                var autoclose_column = rest_autoclose_index - invisible_columns;
    // var whatsapp_group_column = rest_whatsapp_group_index - invisible_columns;
    var telegram_group_column = rest_telegram_group_index - invisible_columns;
    var rest_estimation_column = rest_estimation_index - invisible_columns;
    var rest_connection_channel_column = rest_connection_channel_index - invisible_columns;
    var rest_sim_code_column = rest_sim_code_index - invisible_columns;

    var rest_max_delivey = max_delivery - invisible_columns;

 //  var rest_position_column = rest_position_index - invisible_columns;


     if ($(this).index() === rest_estimation_column ) {
             var rest_id = datarow[rest_id_index];
             var data ={
                    rest_id :  datarow[rest_id_index],
                    rest_est : $("#"+datarow[rest_id_index]+"_time").val(),
                };
                
     $.ajax({
                type: "post",
                url: base_url + '/restaurants/update_rest_estimation?format=json',
                dataType: 'json',
                cache: false,
                data : data,
                success: function(response) {
              
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

                
  //  else  if ($(this).index() === whatsapp_group_column ) {
  //               var rest_id = datarow[rest_id_index];
          
  //            var data ={
  //                   rest_id :  datarow[rest_id_index],
  //                   group :  $("#"+datarow[rest_id_index]).val(),
  //               };
  //    $.ajax({
  //               type: "post",
  //               url: base_url + '/restaurants/update_rest_group_name?format=json',
  //               dataType: 'json',
  //               cache: false,
  //               data : data,
  //               success: function(response) {
              
  //               // location.reload();
  //               noty({
  //                      timeout: 1500,
  //                      text: "Updated",
  //                      layout: 'topCenter', 
  //                      type: 'success'
                       
  //                              });
             
  //                }
  //                });
  //            }
             else  if ($(this).index() === telegram_group_column ) {
                var rest_id = datarow[rest_id_index];
          
             var data ={
                    rest_id :  datarow[rest_id_index],
                    group :  $("#"+datarow[rest_id_index] + "_telegram_group").val(),
         };
         
        //  console.log(data);
     $.ajax({
                type: "post",
                url: base_url + '/restaurants/update_rest_telegram_group_name?format=json',
                dataType: 'json',
                cache: false,
                data : data,
                success: function(response) {
              
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
         else  if ($(this).index() === rest_connection_channel_column ) { 
          
             var data ={
                    rest_id :  datarow[rest_id_index],
                    connection_channel: $('#selectconnection_channel' + datarow[rest_id_index] + ' option:selected').val()
         };
         
        //  console.log(data);
     $.ajax({
                type: "post",
                url: base_url + '/restaurants/update_rest_connection_channel/format/json',
                dataType: 'json',
                cache: false,
                data : data,
                success: function(response) {
              
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
             else if ($(this).index() === autoclose_column){
                 var rest_id = datarow[rest_id_index];
                 var checkbox_id = "#" + rest_id + "checkbox";
                 var isChecked = $(checkbox_id + ':checked').val()?1:0;
                 var data = {
                     'rest_id': rest_id,
                     'autoClose': isChecked
                 }

                //  console.log(data);
                 $.ajax({
                     type: "post",
                     url: base_url + '/restaurants/update_auto_close?format=json',
                     data: data,
                     success: function(){
                         noty({
                             timout: 1500,
                             text: "Updated",
                             layout: "topCenter",
                             type: "success"
                         });
                     }
                     
                 });
             }
             else if ($(this).index() === status_column ) {
            //   console.log(datarow);
                var rest_id = datarow[rest_status_index];
            
               var state;
                  var time = $("#" +  datarow[rest_id_index]  + "_time").val() 
                  console.log('time');
                  console.log(time);

                  if(time != 0)
           {  
             if(datarow[rest_status_index] === '1'){
               //$("input"+datarow[0]).removeAttr("checked");
               state = "0";
             }
             else{
               state = "1";
               //$("input"+datarow[0]).attr("checked","checked");
             }
              
         var data = {
            "url" :  'restaurants/restaurant_status/format/json',
             "data" :{ 
                 "restaurant_id": datarow[rest_id_index],
                 "restaurant_name": datarow[rest_name_index],
                 "telegram_group" :  datarow[rest_telegram_group_index],
                 "current_status" : state
             }
               
                };      
            //   console.log(data);   
            $.ajax({
                type: "post",
                url:base_url + '/home/core_apis/format/json',
                    // 'http://localhost:8080/DriverBackend/BeeOrderDashboard/index.php/restaurants/restaurant_status/format/json',
                //  base_url + '/restaurants/update_rest_status?format=json',
                dataType: 'json',
                cache: false,
                data : data,
                success: function(response) {
                 //alert(response);
                // location.reload();
                noty({
                       timeout: 1500,
                       text: "Updated",
                       layout: 'topCenter', 
                       type: 'success'
                       
                               });
             
                 }
                 });
                }else{
                  noty({
                    text: 'You can not modify the status of the restaurant, Av. preparetion time cannot be 0',
                    layout: 'topRight',
                    type: 'error'
                  });
                }
    }
    else if ($(this).index() === rest_sim_code_column) {
        var data = {
          id: datarow[rest_id_index],
          sim_code: $("#" +  datarow[rest_id_index]  + "_sim_code").val() 
        };
        console.log('data driver sim_code =>');
        console.log(data);
        $.ajax({
          type: "post",
          url: base_url + '/restaurants/update_restaurant_sim_code',
          dataType: 'json',
          cache: false,
          data: data,
          success: function (response) {
            console.log('response');
            console.log(response);
            if (response['resule'] == true) {
              noty({
                timeout: 1500,
                text: "Updated",
                layout: 'topCenter',
                type: 'success'
      
              });
            } else { 
              noty({
                text: 'error action sim code already used',
                layout: 'topRight',
                type: 'error'
              });
            }
           
          }
        });
      }   else if ($(this).index() === rest_max_delivey) { 
        var data = {
          id: datarow[rest_id_index],
          distance: $("#" +  datarow[rest_id_index]  + "_max").val() 
        };
        $.ajax({
          type: "post",
          url: base_url + '/restaurants/update_rest_max_delivery',
          dataType: 'json',
          cache: false,
          data: data,
          success: function (response) {
              noty({
                timeout: 1500,
                text: "Updated",
                layout: 'topCenter',
                type: 'success'
      
              });

          },error:() => {
            noty({
              text: 'error',
              layout: 'topRight',
              type: 'error'
            });
          }
        });
       
      }


               });
               





$("#add_new_restaurant").click(function(event) {
        var data = {
         name : $("#name_restaurant").val(),
         username:$("#username_restaurant").val(),
         password : $("#password").val(),
         type     : $("#type_restaurant").val(),
         area     : $("#area").val(),
         street   : $("#street").val(),
         commission: $("#commission").val()
         };
        var url =  base_url + '/restaurants/add_restaurant';
          $.ajax(
                 {
                     url: url,
                     type: "post",
                     dataType: "json",
                     data: data,
                     success: function(response) {
                        noty({text: 'Successful action', layout: 'topRight', type: 'success'});
                        window.location.href= "registed_active_restaurants_view";
                     },
                     error: function(){
                   noty({text: 'عذراً هذا المستحدم موجود مسبقاً , يرجى المحاولة لاحقاً', layout: 'topRight', type: 'error'});
                     }
                      });
  });

               
$("#confirm_password").change(function(){
       
     var password= $("#password").val()  ;
     var confirm= $("#confirm_password").val();
     var spanErorr = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
     
     if (password !== confirm)
     {
         $(".confirm_password").addClass("has-error");
         $("#confirm_password").after(spanErorr);
         $("#add_new_restaurant").attr("disabled","disabled");
     }
     else
     {
         $("#add_new_restaurant").removeAttr("disabled");
         $(".confirm_password").removeClass("has-error");
         $("span.glyphicon-remove").remove();
         
     }
     
     
     
 });
 
 
$("#confirm_password_edit").change(function(){
             
     var password= $("#password_edit").val()  ;
     var confirm= $("#confirm_password_edit").val();
     var spanErorr = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
     
     if ( password !== confirm)
     {
         $(".confirm_password").addClass("has-error");
         $("#confirm_password_edit").after(spanErorr);
         $("#update_password").attr("disabled","disabled");
     }
     else
     {
         $("#update_password").removeAttr("disabled");
         $(".confirm_password").removeClass("has-error");
         $("span.glyphicon-remove").remove();
         
     }
 });
 
 
 
   $('.display').on('click', 'td', function (){
   
     table = $('#rest_setting').DataTable();
     var datarow = table.row( this ).data();
     var id = datarow[0];
   
     $("#editPass #restaurant_id").val(id);
     
     
  });
  
  
  
$("#update_password").click(function(){
  
 var password = $("#password_edit").val();
 var id       = $("#restaurant_id").val(); 
 var role = 'crm';
     

 var data = {
  "url" :  'users/reset_password/format/json',
   "data" :{ 
       "id": id,
       "new_password": password,
       "role":role
   }
     
      };      
  //   console.log(data);   
  $.ajax({
      type: "post",
      url:base_url + '/home/core_apis/format/json',
          // 'http://localhost:8080/DriverBackend/BeeOrderDashboard/index.php/restaurants/restaurant_status/format/json',
      //  base_url + '/restaurants/update_rest_status?format=json',
      dataType: 'json',
      cache: false,
      data : data,
      success: function(response) {
       //alert(response);
      // location.reload();
      noty({
             timeout: 1500,
             text: "Updated",
             layout: 'topCenter', 
             type: 'success'
             
                     });
   
       }
       });
       
//  var data ={
//      id : id,
//      password : password
  
//           } ;
          
//           console.log('data');
//           console.log(data);
    //  $.ajax({
    //             type: "post",
    //             url: base_url + '/restaurants/update_restaurant_password/format/json',
    //             dataType: 'json',
    //             data : data,
    //             cache: false,
    //                success: function(response) {
    //                 noty({text: 'Successful action', layout: 'topRight', type: 'success'});
    //                   // window.location.href= "registed_active_restaurants_view";
    //                },error: function(){
    //                 noty({text: 'error action', layout: 'topRight', type: 'error'});
    //              }
    //              });
  
  
});