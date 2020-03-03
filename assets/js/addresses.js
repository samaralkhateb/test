   $(document).ready(function() {
 
        
    $("#dashboard_parent").addClass("active");
 $("#addresses").addClass("active");
         

               var table =  $('#addresses_list').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "scrollX": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/addresses/all_addresses/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                      {
                          extend: 'excel',
                             action: function ( e, dt, node, config ) {
                                         $.ajax({
                                         data : {action_id : 79},
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
                                "targets": -1,
                                "data": null,
                                 
                                "render": function(data, type, full, meta){
                                    if(type === 'display'){
                                      data = "<button class='btn btn-success' value='"+full[0]+"' onclick= edit_address("+full[0]+"); >Edit</button>";
                                    
                                    }
                                    return data;
                                  }
                              } 
                        ] 

       
       
               
      });


   $('.datepicker').on('changeDate', function() {
        table.ajax.url(base_url + '/addresses/all_addresses/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    });
    $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());
     
    
     $('#show_address_modal').on('hidden.bs.modal', function () {
      jQuery("#address").html("");
});
     
       });
       
 

function edit_address(address_id) {
  
          var data = 'address_id=' + address_id;
          $.ajax({
            type: "GET",
            url: base_url + '/addresses/address_details',
            data: data,
            dataType: 'json',
            cache: false,
            success: function(response) {
              var areas = response["address"][0]["areas"];
                var version = response["address"][0]["user_address_version"];

                var user_lat = response["address"][0]["user_lat"];
                var user_lng = response["address"][0]["user_lng"];

                // if (version == '1.6'){
                   
                //     $(".area_v").addClass("active");
                //     console.log('active');
                // }else{
                //     $(".area_v").removeClass("active");
                //     console.log('inactive');
                // }
                    
                        /*var html = '<tr style="float:left"><td>User Name</td><td><input  class="form-control-ss input_item item" name="user_name" value="' + response["address"][0]["user_name"] + '"><hr class="separate_addons"></td>';
                              html += '<td>Mobile</td><td><input  class="form-control-ss input_item item" name="mobile" value="' + response["address"][0]["mobile"] + '"><hr class="separate_addons"></td>';
                                  
                                                    html += '<tr style="float:left"><td>Address Name</td><td><input  class="form-control-ss input_item item" name="address" id="address_name" value="' + response["address"][0]["address_name"] + '"><hr class="separate_addons"></td>/tr>';
                                                    html += '<tr style="float:left"><td>Area</td><td><select style="width:200px;height:37px;color:#252525;font-size:16px"class="form-control input-sm select-cus" name="area" id="area"  area-id="' + response["address"][0]["area_id"] + '" value="' + response["address"][0]["area_id"] + '"></select></td></tr>';
                                                   html += '<tr style="float:left"><td>Street</td><td><input style="width: 500px;"  class="form-control-ss input_item item" id="street" name="street" value="'+response["address"][0]["street"]+'"><hr class="separate_addons"></td></tr>';
                                                   html += '<tr style="float:left"><td>details</td><td><input style="width: 500px;"  class="form-control-ss input_item item" id ="details" name="details" value="'+response["address"][0]["details"]+'"><hr class="separate_addons"></td></tr>';                   
                                                  html += '<tr style="float:left"><td></td><td><button address_id ="' + response["address"][0]["id"] + '" class="update_address form-control-ss input_item item" onclick="update_user_address(' + response["address"][0]["id"] + ')" id="update_bill_address" style="background-color:#2c3f46;color:#fff" >Update Address</button></td></tr>';
    */

   var html = '<div class="row"> <div class= "col-md-8 col-md-offset-2" > <div id="map_user_address_div2" style="height: 200px; width: auto "></div> </div> </div> <br>';
   html +=  '<div class="row">';
                            html +=  '<div class="col-md-4">';
                            html +=  '    <div class="contact-info">';
                            html +=  '   <p><small>User Name</small><br/>'+response["address"][0]["user_name"]+'</p>';
                            html +=  '   <p><small>Mobile</small><br/>' + response["address"][0]["mobile"] + '</p>'; 
                            html +=  ' </div></div>';
                            html +=  '<div class="col-md-4">';
                            html +=  '    <div class="contact-info">';
                            html +=  '   <p><small>Address Name</small><br/><input  class="form-control"  id="address_name" value="' + response["address"][0]["address_name"] + '"></p>';
               
                            if (version == '1.6') {

                                html += '   <p><small>Area</small><br/><select style="width:200px;height:37px;color:#252525;font-size:16px"class="form-control input-sm select-cus area_v" name="area" id="area"  area-id="' + response["address"][0]["area_id"] + '" value="' + response["address"][0]["area_id"] + '"></select></p>';

                                console.log('active');
                            }else{

                                html += "   <p><small>Area</small><br/>" + response["address"][0]["area_name"] + "</p>";

                            }
                            html += '   <p><small>Version</small><br/>'+ response["address"][0]["user_address_version"] + '</p>'; 
                            html +=  ' </div></div>';
                            html += '<div class="col-md-4">'; 
                            html +=  '    <div class="contact-info">';
                            html +=  '   <p><small>Street</small><br/><textarea class="form-control" id="street" value="'+response["address"][0]["street"]+'">'+response["address"][0]["street"]+'</textarea></p>';
                            html +=  '   <p><small>details</small><br/><textarea class="form-control" id ="details" value="'+response["address"][0]["details"]+'">'+response["address"][0]["details"]+'</textarea></p>';
                            html +=  ' </div></div></div><hr class="separate_addons"><div class="row"><button class="btn btn-danger" onclick="update_user_address(' + response["address"][0]["id"] + ')" >Update Address</button></div>';
                $('#address').append($(html));
                

                var myLatLng ;
                if ((user_lat !== null ) && (user_lng !== null ))
                {
                
                    myLatLng = {lat: parseFloat(user_lat), lng: parseFloat(user_lng)};
                }
                else
                {
                    
                    myLatLng = {lat: parseFloat(32.5), lng: parseFloat(33.2)};
                }
                    

                map = new google.maps.Map(document.getElementById("map_user_address_div2"), {
                    center: myLatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: true,
                    streetViewControl: false,
                
                });

                var marker  = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    draggable : false,
                });
                map.setCenter(myLatLng);
    

                         $.each(areas, function(index, area) {
                    
                        if (area.id == response["address"][0]["area_id"]) {
                            console.log('asd');
                            $('#area').append($('<option/>', {
                                value: area.id,
                                text: area.ar_name,
                                selected: true
                            }));
                        } else {
                            $('#area').append($('<option/>', {
                                value: area.id,
                                text: area.ar_name
                            }));
                        }
                    });
                       $('#show_address_modal').modal('show');
                  }
             
              });
}


function update_user_address(address_id){
var street =  $('#street').val();
var details =  $('#details').val();
var name = $('#address_name').val();
var area_id = $('#area').val();
var data = {
    street: street,
    details: details,
    address_id: address_id,
    name : name ,
    area_id :area_id
    
};
 url = base_url + '/addresses/update_user_address' ; 
  jQuery.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       console.log(response);
                         jQuery("#show_address_modal").modal("hide");
                        // show_message(response["done"]);
                        noty({text: 'Done' , layout: 'topCenter', type: 'success',timeout:3000});  
                       
                        jQuery("#address").html("");

                        location.reload();
                       
  
                    },
                    error: function(response) {
                        var data = JSON.parse(response["responseText"]);
                    }
                });

}