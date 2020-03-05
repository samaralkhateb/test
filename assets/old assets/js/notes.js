
$(document).ready(function() {

      jQuery.ajax({
                    type: "GET",
                    url: base_url+'/addresses/get_all_areas',
                    dataType: "json",

                    success: function(response) {
                        
                      $.each(response.data, function (i, item) {
                           
                            var option = '<option value="'+item.id+'">'+item.ar_name+'</option>';    
                            $("#area_user_address").append(option);
                            
                          
            });  
              
                    },
                    error: function(response) {
                      //alert(response.error);
                      //location.reload();
                    }
    });

  var map ;  
get_notes();
// setInterval(get_notes, 600000);

    
  function get_notes() {
      // get all messages viw ajax 
      $('#notes_div').html("");
      var  url = base_url + '/drivers/get_unUpdated_address' ; 
       jQuery.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",

                    success: function(response) {
                        
                     $('.notes_count').html(response.res.num);
                    
                       
                     $.each(response.res.notes, function (i, item) {
                  
                         var html = '<a style="height:auto; overflow:hidden" href="#" class="list-group-item" onclick=\'show_note("' + item.note.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.user_add_name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.area.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.street.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.floor.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.near.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.details.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.username.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "")+'","'+item.user_add_id+'",'+item.lat+','+item.lng+','+item.bill_driver_id+',"'+item.area_id+'","'+item.mobile+'" )\'>';
                           
                        
                        html += '<div class="col-md-12" >';
                     
                        html += '<span class="contacts-title" style = "color:#0a0;">'+item.driver_name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "")+'</span>';
                         html += '<span class="contacts-title" >  [' + item.username.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "")+'   '+ item.mobile+ ' ]</span>';
                      
                        html += '<p>'+item.note+'</p>';
                        html += '</div>';
                        html += '</a>';
                          $('#notes_div').append(html);
                         // alert(html);
                         

                        
                      });  
              
                    },
                    error: function(response) {
                      //alert(response.error);
                      //location.reload();
                    }
    });
}
    
 $("#edit_user_address_btn").click(function(){
   
        $("#user_address_driver_note_form").validate({
            submitHandler: function (form) {
                var id = $("#user-address-id").val();
                var bill_driver_id = $("#bill_driver_id").val();
                var name_address = $("#name_address1").val();
                var street = $("#user_address_street").val();
                var near = $("#user_address_near").val();
                var floor = $("#user_address_floor").val();
                var area = $("#area_user_address option:selected").val();
                var area_text = $("#area_user_address:selected").text();
                var details = $("#user_address_details").val();
                var data = {
                    id : id,
                    bill_driver : bill_driver_id,
                    name_address: name_address,
                    street: street,
                    near: near,
                    floor: floor,
                    area: area,
                    details: details,

                };
                var url = base_url + '/users/edit_user_address';
                $.ajax(
                        {
                            url: url,
                            type: "post",
                            dataType: "json",
                            data: data,
                            success: function (response) {
                                noty({text: 'Successful action', layout: 'topRight', type: 'success', timeout: 3000});

                            

                                //    $("#add_new_user").attr("data-dismiss","modal");
                                $('#update_user_address').modal('toggle');
                                get_notes();
                            },
                            error: function () {
                                noty({text: 'error action', layout: 'topRight', type: 'error', timeout: 3000});
                            }
                        });



            }

        });
     
     
 });


    });




function show_note(note,user_add_name,area,street,floor,near,details,username,user_add_id,lat,lng,bill_driver_id,area_id,mobile)
{

   $('#update_user_address').modal('show');
 var myLatLng ;
     if ((lat !== null ) && (lng !== null ))
     {
       
          myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
     }
     else
     {
          
          myLatLng = {lat: parseFloat(32.5), lng: parseFloat(33.2)};
     }
        

         map = new google.maps.Map(document.getElementById("map_user_address_div"), {
            center: myLatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false,
        
        });
  
    $("h4.modal-title").text("Update Address   [" +username +"      " +mobile+ " ]" );
    
 
    

    var marker  = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    draggable : false,
                });
    map.setCenter(myLatLng);
    

    $("#update_user_address #user-address-id").val(user_add_id);
    $("#update_user_address #bill_driver_id").val(bill_driver_id);
    $("#update_user_address #name_address1").val(user_add_name);
    $("#update_user_address #area_user_address").val(area_id);
    $("#update_user_address #user_address_street").val(street);
    
    
    $("#update_user_address #user_address_floor").val(floor);
    $("#update_user_address #user_address_near").val(near);
    $("#update_user_address #user_address_details").val(details);
    $("#update_user_address #driver_note_label").text(note);

   
}






