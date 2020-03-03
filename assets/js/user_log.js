			$(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
           // $( ".datepicker" ).datepicker('setDate', new Date());

            $(document).ready(function(){
			    $("#form_button").click(function(){
			        $("#form_div").toggle();
			    });
			    $('#show_status_modal').on('hidden.bs.modal', function (e) {
				  jQuery("#model_body").html("");
				});
				$('body').on('hidden.bs.modal', '.modal', function () {
		        	$('#note').html("");
		         	$('#status').html("");
              $('#note_body').html("");
		        });
                        


 
        
			});

function notes_but(bill_id){
    
       data = {
        bill_id : bill_id
   }

    $("#notes_table_" + bill_id).empty();
    url = base_url + "/call_center/get_bill_notes";
    jQuery.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: data,
        success: function (notes) {
            
            var options = [],
             option ='',
                _options;
            if (notes){
                for (var i in notes) {
                    option = " <tr><td> " + notes[i]["note"] + " by " + notes[i]["name"] + " @ " + notes[i]["action_time"] + " </tr></td> ";

                    options.push(option);
                }
            }
           
            _options = options.join("");
            var html = '<table class="table table-bordered"> <thead> <th> Order Note Logs</th> </thead> <tbody> ' + _options + ' </tbody> </table>  '
            $("#notes_table_" + bill_id).append($(html));
            console.log($("#notes_table_" + bill_id));
        },
        error: function (response) {
            
        }
    });
     
}
 
function status_log_but(bill_id) {

    data = {
        bill_id: bill_id
    }

    $("#status_log_table_" + bill_id).empty();
    url = base_url + "/call_center/get_bill_status_log";
    jQuery.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: data,
        success: function (notes) {
            // console.log(notes);

            var options = [],
                option = "",
              _options;
            if (notes) {
                console.log(notes);
                // for (var i in notes) {
                    
                     if (notes['no_answer'] == 1) {
                         option  += '<tr><td> No Answer by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['unreachable'] == 1) {
                        option += '<tr><td> Unreachable by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['busy'] == 1) {
                        option += '<tr><td> busy by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['fake_order'] == 1) {
                        option += '<tr><td> fake Order by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['rest_issue'] == 1) {
                        option = '<tr><td> Rest. problem by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['ux_issue'] == 1) {
                        option += '<tr><td> Bad user experince  by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['missing_items'] == 1) {
                        option += '<tr><td> Missing Items by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    }
                    if (notes['delivery_issue'] == 1) {
                        option += '<tr><td> Delivery Problem  by ' + notes['action_by'] + ' @ ' + notes['action_time'] + '</td></tr> ';
                    } 
                    options.push(option); 
                    
                // }
            }
            
                                          
            _options = options.join("");
            var html = '<table class="table table-bordered"> <thead>  <tr> <th>Status Log</th> </tr> </thead> <tbody> ' + _options+' </tbody>  </table> ';
            $("#status_log_table_" + bill_id).append($(html));
            // console.log(html);
        },
        error: function (response) {

        }
    });

}
function activation_notes_but(mobile){
    
       data = {
           mobile: mobile
   } 
   
    $("#activation_notes_table_" + mobile).empty();
    url = base_url + "/call_center/activation_notes";
    jQuery.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: data,
        success: function (activation_notes) {
            console.log('activation_notes');
            console.log(activation_notes);
            var options = [],
                option = '',
                _options;
            if (activation_notes) {
              for (var i in activation_notes) {
                  option = ' <tr class="active"> <td> ' + activation_notes[i]["note"] + ' </td> <td> ' + activation_notes[i]["name"] + '  </td> <td> ' + activation_notes[i]["action_time"]+'  </td> </tr> ';

                options.push(option);
              }
            }
           
            _options = options.join("");
            var html = " <table class='table table-bordered'><thead> <tr> <th>Activation Notes</th> <th>By</th>  <th>Date</th> </tr> </thead> <tbody>" + _options + " </tbody> </table>";
            $("#activation_notes_table_" + mobile).append($(html));
            console.log(html);
        },
        error: function (response) {
            
        }
    });
     
}

function add_activate_note(mobile){
    var bill_id ="0";
    var html ='<tr style="float:left"><td><textarea style="width: 500px;" class="form-control-ss input_item item" name="note" id="new_activation_note" value=""></textarea><hr class="separate_addons"><button onclick=save_note(' + bill_id + ','  + mobile + ',"new_activation_note","0")  class="btn btn-success" >Add</button></td></tr>';            
    $('#note_body').append($(html));
    $('#show_note_modal').modal('show');
}
 
 function sendvoucher() {
  //alert("asdasd");
 // alert($("input[name='v_value']:checked").val());
  if (!$("input[name='v_value']").is(':checked')){
    noty({text: 'Please select Voucher value', layout: 'topCenter', type: 'error',timeout : 3000});
    return 0;
  }
  noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                  var data = {
                                  number_phone : $("#v_phone_number").val(),
                                  v_value : $("input[name='v_value']:checked").val(),
                                 
                                  };

                                  url = base_url + '/call_center/add_voucher' ; 
                                  jQuery.ajax({
                                                type: "POST",
                                                url: url,
                                                dataType: "json",
                                                data: data,
                                                success: function(response) {
                                                  console.log(response);
                                                  $noty.close()
                                                 // jQuery("#messages_modal").modal("hide");
                                                  // show_message(response["done"]);
                                                  //jQuery("#note").html("");
                                                //   location.reload();
                                                 
                              
                                                },
                                                error: function(response) {
                                                   // var data = JSON.parse(response["responseText"]);
                                                    alert(response.error);
                                                }
                                            });
        
                              }
                    },
                    {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                  $noty.close();
                              }
                          }
                      ]
                  });
}
 
function getCreatedBy(voucher_id){

    data = {
        voucher_id: voucher_id
    }; 
    $("#but_created_by_" + voucher_id).empty();
    $("#created_by_" + voucher_id).empty();
    
    url = base_url + "/call_center/user_create_voucher";
    jQuery.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: data,
        success: function (name) {
            if (name["name"]){
                var user_name = name["name"];
            }else{
                var user_name = "";
            }
            var html = "<label>" + user_name + "<label>";
            $("#but_created_by_" + voucher_id).css('display', 'none');
            $("#created_by_" + voucher_id).append($(html));
            console.log('name');
            console.log(html);
        },
        error: function (response) {
            console.log('error'); 
        }
    });
}
function image(image){

            var html  = '<center>';
                html += '<img src="http://driver.beeorder.com/assets/images/uploaded_images/'+image+'" height="400" width="400">';                             
                html +='</center>';
                 $('#modal_value').text('Image');
         $('#status').append($(html));
          $('#show_status_modal').modal('show');
         
  }

	function change_bill_stage(bill_id,stage,flag){
     	var html ='<tr style="float:left;width:100%"><td><input style="align:right" type="radio" class="cb"   name="stage" id="not_delivered" value=""></td><td>Not delivered</td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="stage" id="canseled" value=""></td><td>Canceled</td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="stage" id="paid" value=""></td><td>Paid</td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="stage" id="fake" value=""></td><td>Fake</td></tr>';
                            if(!(flag === 0 || flag === 1)){
                                html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="stage" id="free_order" value=""></td><td>Free Order</td></tr>';
                                html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="stage" id="complementary" value=""></td><td>Complementary</td></tr>';
                            }
                            html += '<hr><td><button style="margin-top: 10%;" onclick="update_bill_stage(' + bill_id + ')" class="btn btn-success" >Update</button></td></tr>';
              
                  
	    $('#status').append($(html));
	    
	     if(stage === "1")
	              $("#paid").attr('checked',true);
	          else if (stage === "2")
	               $("#canseled").attr('checked',true);
	             else if (stage === "3")
	               $("#not_delivered").attr('checked',true);
	               else if (stage === "4")
	               $("#fake").attr('checked',true);
                   else if (stage === "7")
                       $("#free_order").attr('checked',true);
                   else if (stage === "8")
                       $("#complementary").attr('checked',true);
	//  modal_value
	  //$('#modal_value').value('');
	  $('#show_status_modal').modal('show');
    
    }
    

function change_bill_state(bill_id, state) {
    var html = '<tr style="float:left;width:100%"><td><input style="align:right" type="radio" class="cb"   name="state" id="ready" value=""></td><td>READY</td></tr>';
    html += '<hr><td><button style="margin-top: 10%;" onclick="update_bill_state(' + bill_id + ')" class="btn btn-success" >Update</button></td></tr>';


    $('#status').append($(html));

    if (state === "5")
        $("#ready").attr('checked', true);
        
    $('#show_status_modal').modal('show');

}
 

    function change_bill_flag(bill_id, stage, flag){
        var html = '<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="flag" id="free_order_flag" value="" onchange="cbChange(this)"></td><td>Free Order</td></tr>';
        html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="flag" id="complementary_flag" value="" onchange="cbChange(this)"></td><td>Complementary</td></tr>';
        html += '<hr><td><button style="margin-top: 10%;" onclick="update_bill_flag(' + bill_id + ')" class="btn btn-success" >Update</button></td></tr>';
        
        $('#status').append($(html));
        
        if(flag === "7")
            $("#free_order_flag").attr('checked',true);
        else if (flag === "8")
            $("#complementary_flag").attr('checked',true);
        
        $('#show_status_modal').modal('show');
        }
        
    function change_bill_driver(bill_id){
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



       $('body').on('hidden.bs.modal', '.modal', function () {
        $('#status').html("");
          });



        
        
        function update_bill_flag(bill_id){
            var flag;
            if ($("#free_order_flag").is(':checked'))
                flag = 7;
            else if ($("#complementary_flag").is(':checked'))
                flag = 8;
            var data = {
                bill_id : bill_id,
                flag : flag
            };
            
            url = base_url + '/call_center/change_bill_driver_flag';
            jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       console.log(response);
                         jQuery("#show_status_modal").modal("hide");
                          jQuery("#status").html("");
                          //location.reload();
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
        }

        
function update_bill_stage(bill_id) { 
           
    if ($("#not_delivered").is(':checked')) { 
             
             var data = {
                "url" :  'bills/not_delivered/format/json',
                 "data": {
                     "bill_id": bill_id, 
                     "stage": "3"
                 }
            }; 
         }

         else if ($("#canseled").is(':checked')) { 
             
             var data = {
                "url" :  'bills/canceled/format/json',
                 "data": {
                     "bill_id": bill_id, 
                     "stage": "2"
                 }
            }; 
        }
          else if($("#paid").is(':checked')){
          
            var data = {
                "url" :  'bills/delivered/format/json',
                 "data": {
                     "bill_id": bill_id, 
                     "stage": "1"
                 }
            }; 
        }
           else if($("#fake").is(':checked')){ 
        var data = {
            "url" :  'bills/fake_order/format/json',
             "data": {
                 "bill_id": bill_id, 
                 "stage": "4"
             }
        }; 
        }
        else if ($("#free_order").is(':checked')){
            var data = {
                "url" :  'bills/comp_freeorder/format/json',
                 "data": {
                     "bill_id": bill_id, 
                     "stage": "7"
                 }
            }; 
        }
        else if ($("#complementary").is(':checked')){
            var data = {
                "url" :  'bills/comp_freeorder/format/json',
                 "data": {
                     "bill_id": bill_id, 
                     "stage": "8"
                 }
            }; 
        }
        
        console.log(data);
    url = base_url + '/home/core_apis/format/json'; 
        
        jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       //console.log(response);
                         jQuery("#show_status_modal").modal("hide");
                          jQuery("#status").html("");
                        //   location.reload();
                    },
                    error: function(response) {
                        //var data = JSON.parse(response["responseText"]);
                        console.log(response.responseText);
                    }
                });
    }


function update_bill_state(bill_id) {
    var state;
    if ($("#ready").is(':checked')) {
        state = "5";

    }

 

    var data = {
        bill_id: bill_id,
        state: state
    };
    url = base_url + '/call_center/change_bill_state';

    jQuery.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: data,
        success: function (response) {
            //console.log(response);
            jQuery("#show_status_modal").modal("hide");
            jQuery("#status").html("");
            //location.reload();
        },
        error: function (response) {
            //var data = JSON.parse(response["responseText"]);
            console.log(response.responseText);
        }
    });
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
                          //location.reload();
                    
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
    }



    function change_user_status(mobile,status){
                            var html ='<tr style="float:left;width:100%"><td><input style="align:right" type="radio" class="cb"   name="user_status" id="watched" value="" onchange="cbChange(this)"></td><td>Watch</td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="user_status" id="blocked_user" value="" onchange="cbChange(this)"></td><td>Block User</td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="user_status" id="notcall_user" value="" onchange="cbChange(this)"></td><td>Do not call </td></tr>';
                            html +='<tr style="float:left;width:100%"><td><input style="display:inline-block" type="radio" class="cb"   name="user_status" id="proiority_user" value="" onchange="cbChange(this)"></td><td>Proiority </td></tr>';

                            html +='<tr  style="float:left">';
                            html += '<td><button onclick="update_user_status(' + mobile + ')" id="update_bill_note" class="btn btn-success" >Update</button></td></tr>';
                  
    $('#status').append($(html));
    console.log(status);
      if(status === "4")
              $("#watched").attr('checked',true);
          else if (status === "6")
               $("#blocked_user").attr('checked',true);
                else if (status === "9")
        $("#notcall_user").attr('checked',true);
       else if (status === "10")
        $("#proiority_user").attr('checked',true);
     $('#show_status_modal').modal('show');
    }





     function update_user_status(mobile){
         var status ;
         if($("#watched").is(':checked')){
            status = "4";
   
         }

         else if($("#blocked_user").is(':checked')){
          status = "6";
        }
          else if($("#notcall_user").is(':checked')){
          status = "9";
        }
           else if($("#proiority_user").attr('checked',true)){
          status = "10";
        }
      var data = {

    mobile : mobile ,
    status : status
    
};
console.log(data);
 url = base_url + '/call_center/change_user_status' ; 
 jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       console.log(response);
                         jQuery("#show_status_modal").modal("hide");
                          jQuery("#status").html("");
                          //location.reload();
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
    }


    var map ;  
function show_update_address_modal(address_id, street, detail, address_name, near, floor,user_lat , user_lng ,restaurant_lng ,restaurant_lat,address_restaurant_google_distance) {


    var html = '<div class="row"> <div class= "col-md-8 col-md-offset-2" > <div id="map_user_address_div1" style="height: 200px; width: auto "></div> </div> </div> <br>';
                            html +='<div class="form-horizontal"><div class="form-group"><label class="control-label col-sm-3" for="1">Street</label><div class="col-sm-6"><input name="1" style="align:right" type="text" class="form-control" id="update_street" value="'+street+'" required></div></div>';
                            html +='<div class="form-group"><label class="control-label col-sm-3" for="2">details</label><div class="col-sm-6"><textarea name="2"  style="display:inline-block" type="textarea" class="form-control" id="update_details" value="'+detail+'" required>'+detail+'</textarea></div></div>';
                            html +='<div class="form-group"><label class="control-label col-sm-3" for="3">Address Name</label><div class="col-sm-6"><input name="3" style="display:inline-block" type="text" class="form-control" id="update_address_name" value="'+address_name+'" required></div></div>';
                            html +='<div class="form-group"><label class="control-label col-sm-3" for="4">near</label><div class="col-sm-6"><input name="4" style="display:inline-block" type="text" id="near" class="form-control" value="'+near+'" required></div></div>';
                            html += '<div class="form-group"><label class="control-label col-sm-3" for="5">floor</label><div class="col-sm-6"><input name="5" style="display:inline-block" type="text" id="floor" class="form-control" value="' + floor + '" required></div></div>';
                            html += '<div class="form-group"><label class="control-label col-sm-3" for="5">distance</label><div class="col-sm-6"><label name="5" style="display:inline-block" type="text" id="address_restaurant_google_distance" class="form-control" value="' + address_restaurant_google_distance + '" >'+address_restaurant_google_distance+' m </label></div>';
                            html += '<a target="_blank" href="http://map.project-osrm.org/?z=12&center='+user_lat+'%2C'+user_lng+'&loc='+user_lat+'%2C'+user_lng+'&loc='+restaurant_lat+'%2C'+restaurant_lng+'&hl=en&alt=0">Show Map</a></div>';
                            html += '<button onclick="update_address(' + address_id + ')" class="btn btn-success" style="margin-left: 26%;" >Update</button></div>';
                  
                           
    
    $('#model_body').append($(html));

    var myLatLng;
    var restaurantLatLng;
    if ((user_lat !== null ) && (user_lng !== null ))
    {
    
        myLatLng = {lat: parseFloat(user_lat), lng: parseFloat(user_lng)};
    }
    else
    {
        
        myLatLng = {lat: parseFloat(32.5), lng: parseFloat(33.2)};
    }

    if ((restaurant_lat !== null ) && (restaurant_lng !== null ))
    {
    
        restaurantLatLng = {lat: parseFloat(restaurant_lat), lng: parseFloat(restaurant_lng)};
    }
    else
    {
        
        restaurantLatLng = {lat: parseFloat(32.5), lng: parseFloat(33.2)};
    }
    
    map = new google.maps.Map(document.getElementById("map_user_address_div1"),{
       center: restaurantLatLng,
       zoom: 13,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       mapTypeControl: true,
       streetViewControl: false,
   
    });

    var restaurant_image = site_url + 'assets/images/restaurant marke.png';
    var user_image = site_url + 'assets/images/user marke.png';
    if ((user_lat !== null) && (user_lng !== null)) { 
        var marker  = new google.maps.Marker({
            position: myLatLng,
            map: map,
            draggable : false,
            title: 'User Address',
            icon: user_image
        });
    }

    var restaurantmarker  = new google.maps.Marker({
        position: restaurantLatLng,
        map: map,
        draggable: false,
        title: 'Restaurant Address',
        icon: restaurant_image
    });
    map.setCenter(restaurantLatLng);

// console.log('restaurantmarker');
// console.log(site_url + 'assets/images/capture.png');


    
    console.log(status);
    $('#show_status_modal').modal('show');
    }

    function update_address(address_id){         
	var street =  $('#update_street').val();
	var details =  $('#update_details').val();
	var name = $('#update_address_name').val();
	var near =  $('#near').val();
	var floor = $('#floor').val();
	var data = {
	    street: street,
	    details: details,
	    address_id: address_id,
	    name : name ,
	    near : near ,
	    floor : floor
	    
	};
	 url = base_url + '/users/update_user_address' ; 
	  jQuery.ajax({
	                    type: "POST",
	                    url: url,
	                    dataType: "json",
	                    data: data,
	                    success: function(response) {
	                        jQuery("#show_status_modal").modal("hide");
                          	jQuery("#model_body").html("");
                          	//location.reload();
	                    },
	                    error: function(response) {
	                        var data = JSON.parse(response["responseText"]);
	                    }
	                });

	}

 function show_note(check_box_id,note_row_id){
    var string = check_box_id.toString();
    if (!$('#'+string).is(':checked')) {
              $("#"+note_row_id).hide();
            }else{
              $("#"+note_row_id).show();
            }
  }
	    function change_bill_status(bill_id){
//      
                var data ={
                    bill_id : bill_id
                    };
               url = base_url +'/call_center/bill_statuses';
                    $.ajax({
                    type: "get",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                      
                     
                    var status = response["status"];
                        if(status["no_answer"] === "1")
                            var n_checked = "checked";
                        else
                            n_checked="";
                             if (status["unreachable"] === "1")
                            var un_checked = "checked";
                         else
                            un_checked="";
                               if (status["busy"] === "1")
                            var b_checked = "checked";
                         else
                            b_checked="";
                               if (status["fake_order"] === "1")
                            var s_checked = "checked";
                         else
                            s_checked="";
                                if (status["rest_issue"] === "1")
                            var r_checked = "checked";
                         else
                            r_checked="";
                                 if (status["ux_issue"] === "1")
                            var u_checked = "checked";
                         else
                            u_checked="";
                             if (status["delivery_issue"] === "1")
                            var v_checked = "checked";
                         else
                            v_checked="";
                          if (status["missing_items"] === "1"){
                             var m_checked = "checked";
                          }else{
                              var m_checked = "";
                          }
                            var html ='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"no_answer"'+','+'"no_answer_note_row"'+') type="checkbox"   name="no_answer" id="no_answer"  ' + n_checked + '  ></td><td>No Answer</td></tr>';
                                html +='<tr id="no_answer_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note1" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"unrechable"'+','+'"unrechable_note_row"'+') type="checkbox"     name="unrechable" id="unrechable" ' + un_checked + ' ></td><td>Unreachable</td></tr>';
                            html +='<tr id="unrechable_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note2" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"busy"'+','+'"busy_note_row"'+') type="checkbox"    name="busy" id="busy" ' + b_checked + '></td><td>Busy</td></tr>';
                            html +='<tr id="busy_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note3" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"fake_order"'+','+'"fake_order_note_row"'+') type="checkbox"     name="fake_order" id="fake_order" ' + s_checked + ' ></td><td>fake Order</td></tr>';
                            html +='<tr id="fake_order_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note4" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"rest_prob"'+','+'"rest_prob_note_row"'+') type="checkbox"   name="rest_prob" id="rest_prob" ' + r_checked + '></td><td>Rest. problem </td></tr>';
                            html +='<tr id="rest_prob_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note5" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"deliv_prob"'+','+'"delivery_prob_note_row"'+') type="checkbox"    name="delivery_prob" id="deliv_prob" ' + v_checked + '></td><td>Delivery problem </td></tr>';
                            html +='<tr id="delivery_prob_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note6" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"user_experince"'+','+'"user_experince_note_row"'+') type="checkbox"    name="user_experince" id="user_experince" ' + u_checked + ' ></td><td>Bad user experince </td></tr>';
                            html +='<tr id="user_experince_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note7" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr style="float:left;width:100%;margin-bottom: 1%;" ><td><input onclick=show_note('+'"missing_items"'+','+'"missing_items_note_row"'+') type="checkbox"    name="missing_items" id="missing_items" ' + m_checked + ' ></td><td>Missing Items</td></tr>';
                            html +='<tr id="missing_items_note_row" style="float:left;width:100%;display:none;"><td><textarea placeholder="Add note" style="width: 500px;" class="form-control-ss input_item item" id="new_note8" value=""></textarea><hr class="separate_addons"></td></tr>';

                            html +='<tr  style="float:left">';
                            html += '<td><button onclick="update_bill_status(' + bill_id + ' )" class="btn btn-success" >Update</button></td></tr>';

   			$('#status').append($(html));
          	if(status["no_answer"] === "1"){
              $("#no_answer").attr('checked',true);
    		}
           	if (status["unrechable"] === "1")
               $("#unrechable").attr('checked',true);
               if (status["busy"] === "1")
               $("#busy").attr('checked',true);
               if (status["fake_order"] === "1")
               $("#fake_order").attr('checked',true);
               if (status["rest_prob"] === "1")
               $("#rest_prob").attr('checked',true);
               if (status["user_experince"] === "1")
               $("#user_experince").attr('checked',true);
               if (status["delivery_issue"] === "1")
               $("#deliv_prob").attr('checked',true);
                var html2 ='<hr class="separate_addons"><tr><td>Add Extra Note:</td></tr><tr style="float:left"><td><textarea style="width: 500px;" class="form-control-ss input_item item" name="note" id="new_note" value=""></textarea></td></tr>';
                               html2 +='<tr id="notes" style="float:left">';
                              html2 += '<td><button onclick=save_note(' + bill_id + ','  + 0 + ',"new_note","0")  class="btn btn-success" >Add</button></td></tr>';
                     $('#note').append($(html2));
               $('#show_status_modal').modal('show');
                    
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });

    }



    function update_bill_status(bill_id){
        var no_answer ;
        var unreach ;
        var busy;
        var fake_order;
         var rest_issue ;
         var ux_issue ;
          var delivery_issue ;
          var missing_items;
         if($("#no_answer").is(':checked')){
              console.log(no_answer);
          no_answer = "1";
      }
         else{
            no_answer = "0";  
        }
     if($("#unrechable").is(':checked'))
         unreach = "1";
         else
         unreach = "0";
      if($("#busy").is(':checked'))
         busy = "1";
     else
           busy = "0";
      if($("#fake_order").is(':checked'))
         fake_order = "1";
     else
           fake_order = "0";
      if($("#rest_prob").is(':checked')){
         
         rest_issue = "1";
     }
     else{
          rest_issue = "0";
      }
          if($("#user_experince").is(':checked'))
          ux_issue = "1";
          else
              ux_issue = "0";
          if($("#deliv_prob").is(':checked'))
          delivery_issue = "1";
          else
              delivery_issue = "0";

             if($("#missing_items").is(':checked'))
          missing_items = "1";
          else
              missing_items = "0";
        
            var data = {
       no_answer :no_answer,
       busy : busy,
       fake_order :fake_order,
       rest_issue : rest_issue,
       ux_issue : ux_issue,
       delivery_issue :delivery_issue,
       unrechable :unreach,
       bill_id : bill_id ,
       missing_items : missing_items

       };
       if ($("#no_answer_note_row").is(":visible")){
        save_note(bill_id,0,"new_note1","0");
       }
       if ($("#unrechable_note_row").is(":visible")){
        save_note(bill_id,0,"new_note2","0");
       }
       if ($("#busy_note_row").is(":visible")){
        save_note(bill_id,0,"new_note3","0");
       }
       if ($("#fake_order_note_row").is(":visible")){
        save_note(bill_id,0,"new_note4","1");
       }
       if ($("#rest_prob_note_row").is(":visible")){
        save_note(bill_id,0,"new_note5","2");
       }
       if ($("#delivery_prob_note_row").is(":visible")){
        save_note(bill_id,0,"new_note6","3");
       }
       if ($("#user_experince_note_row").is(":visible")){
        save_note(bill_id,0,"new_note7","4");
       }
       if ($("#missing_items_note_row").is(":visible")){
        save_note(bill_id,0,"new_note8","0");
       }
       //console.log(data);
        url = base_url + '/call_center/change_bill_status' ; 
         jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       console.log(response);
                       // show_message(response["done"]);
                           	jQuery("#show_status_modal").modal("hide");
                          	jQuery("#status").html("");
                      		//location.reload();
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
    }



    function add_note(bill_id){
	   var mobile = "0";
	 	var html ='<tr style="float:left"><td><textarea style="width: 500px;" class="form-control-ss input_item item" name="note" id="new_note" value=""></textarea><hr class="separate_addons"></td></tr>';
	                             html +='<tr id="notes" style="float:left">';
	                            html += '<td><button onclick=save_note(' + bill_id + ','  + mobile + ',"new_note","0")  class="btn btn-success" >Add</button></td></tr>';
	                   $('#note').append($(html));
	    $('#show_status_modal').modal('show');
	}


	function save_note(bill_id,mobile,note_row,status_id){
	    var data = {
	    bill_id :bill_id,
	    mobile: mobile,
      status_id:status_id,
	    note : $("#"+note_row).val()
	    };
	 	url = base_url + '/call_center/add_note' ; 
	  	jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                      console.log(response);
                      jQuery("#show_note_modal").modal("hide");
                       // show_message(response["done"]);
                      jQuery("#note").html("");
                     	//location.reload();
                     
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });
    }
    

//  send-tele
function sendMessageTelegram(bill_id) {
        $.ajax({
            type: "POST",
            url: base_url + '/call_center/send_telegram_message' ,
            dataType: "json",
            data: {
             'bill_id' : bill_id
            },
        });
    }
          
    
 
      
