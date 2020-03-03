
var bill_id_index = 0;
var res_queue_index = bill_id_index + 1;
var res_name_index = res_queue_index + 1;
var driver_name_index = res_name_index + 1;
var distance_index = driver_name_index + 1; 
var expected_time_index = distance_index + 1; 
var map_index = expected_time_index + 1;
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1
   

$(document).ready(function() {
   
    $("#dirvers_parent").addClass("active");
    $("#order_distance_report").addClass("active");
    
     $('#order_distance').DataTable({
          "ordering": true,
          "destroy": true,
          "bInfo": false, 
          "responsive": true,
          "bPaginate": true,
          "bLengthChange": true,
          "searching": true,
          "bSearchable":true,
          "bProcessing": true,
          "deferLoading": 57,
          "emptyTable": "No data available in table",
          "bServerSide": false,
          "scrollX": true,
          "sAjaxSource": base_url + '/bills/bill_report/format/json',
          "order": [bill_id_index, 'asc'], 
          colReorder: true,
           " responsive": true, 
                  "columnDefs": [
                  {
                      "targets": [bill_id_index],
                      "visible": false
                  },
                  
                {
                    "targets": map_index,
                      "data": null,
                      "render": function(data, type, full, meta){
                           data = "<button class='btn btn-success' value='' onclick= get_address("+full[0]+"); ><span class='glyphicon glyphicon-map-marker'></span>";
                        return data;
                      }
             
                  }
              ],
"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
       
          
          $('td .res_queue', nRow).attr('value', aData[res_queue_index]);
          $('td .res_queue', nRow).attr('id', aData[bill_id_index]+"_res_queue");
          
          $('td .res_name', nRow).attr('value', aData[res_name_index]);
          $('td .res_name', nRow).attr('id', aData[bill_id_index]+"_res_name");

          $('td .driver_name', nRow).attr('value', aData[driver_name_index]);
          $('td .driver_name', nRow).attr('id', aData[bill_id_index]+"_driver_name");

          $('td .distance', nRow).attr('value', aData[distance_index]);
          $('td .distance', nRow).attr('id', aData[bill_id_index]+"_distance");
           
          $('td .expected_time', nRow).attr('value', aData[expected_time_index]);
          $('td .expected_time', nRow).attr('id', aData[bill_id_index]+"_expected_time");
        
}      
}); 
});
 
 
       
var map ;  
function get_address(bill_id) {

    var data = {
        bill_id: bill_id 
        
    };
     url = base_url + '/addresses/get_address_bill' ; 
      jQuery.ajax({
                        type: "get",
                        url: url,
                        dataType: "json",
                        data: data,
          success: function (response) { 
                            var user_lng = response['user_lng']
                            var user_lat = response['user_lat']
                            var restaurant_lng = response['restaurant_lng']
                            var restaurant_lat = response['restaurant_lat']
                            
                           var html = '<div class="row"> <div class= "col-md-8 col-md-offset-2" > <div id="map_user_address_div1" style="height: 200px; width: auto "></div> </div> </div> <br>';
         
    
    
                           $('#address').append($(html));

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
                        $('#show_address_modal').modal('show');
      
                        },
                        error: function(response) {
                            var data = JSON.parse(response["responseText"]);
                        }
                    });


   
    }