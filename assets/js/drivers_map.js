$(document).ready(function () {
    
    $("#dashboard_parent").addClass("active");
       $("#map_drivers").addClass("active");

    // var session = $("#session_city").val();
    // console.log('session');
    // console.log( session );
    
var count =0;
var all_markers=[];
var map;
var status =null;
var getAll,getByStatus,getByDriver;
var driverLat ,driverLng;

var minPoint = {lat: 100, lng: 100};
var maxPoint = {lat: 0, lng: 0};


    function initMap() {



        var allPath = [];
        var point, lat, lng, split_poly, PolyCoords;
        var letters = '0123456789ABCDEF';
        var color = '#';
        var all_markers = [];
        var gpolygons = [];
 
        // if (session == 1){
        //      var lat = 33.3138073;
        //      var lng = 36.17652790000002;
        // }
        // else if (session == 3){
        //     var lat = 36.2021;
        //     var lng = 37.1343;
        // }
       
        
       

        // var myLatLng = {lat: lat, lng: lng};

         map = new google.maps.Map(document.getElementById("map"), {
            // center: myLatLng,
            zoom:12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false,
        
        });

        var bounds = new google.maps.LatLngBounds();
        $.ajax({
            type: "get",
            dataType: "json",
            url: base_url + '/drivers/polygons_new?format=json',
            success: function (data)
            {
                console.log('data');
                console.log(data);

                $.each(data, function () {

                   
                    $.each(this, function (k, v) {

                        // empty PolyCoords
                        PolyCoords = [];
                        
                        $.each(v["poly"], function (i, item) {
                               
                            split_poly = item.split(" ");
                            
                           if (split_poly[0] !== "" && split_poly[1] !== "")
                           {
                                  lat = parseFloat(split_poly[1]);
                                  lng = parseFloat(split_poly[0]);
                                  point = {lat: lat, lng: lng};
                                  PolyCoords[i] = point;
                           }
                         
                        });

                      for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                      }
                    
                        var Polygon = new google.maps.Polygon({
                            paths: PolyCoords,
                            strokeColor:"rgba(220, 87, 7, 0.47)",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: color,
                            fillOpacity: 0.4
                        });
                        color = "#";
                        
                        Polygon.setMap(map);

                        //Define position of label
                        var bounds = new google.maps.LatLngBounds();
                        for (var i = 0; i < PolyCoords.length; i++) {
                           
                                bounds.extend(PolyCoords[i]);
                            
                        }
                        var myLatlng = bounds.getCenter();
                  //     console.log(PolyCoords);
                   //     console.log(myLatlng.lat() +"   "+myLatlng.lng());    
                        var mapLabel2 = new MapLabel({
                          position: myLatlng,
                          map: map,
                          fontSize: 10,
                          align: 'right',
                         
                        });
                        mapLabel2.set('position', myLatlng);
                        
                            var obj = {};
                            obj.poly = Polygon;
                            obj.label = mapLabel2;
                            gpolygons.push(obj);
                
                    });
                });
             
            $.each(PolyCoords,function(index , value) {
                // console.log(value.lat)
                if(minPoint.lat > value.lat) {
                    minPoint.lat = value.lat;
                }
                if(minPoint.lng > value.lng) {
                    minPoint.lng = value.lng;
                }
                if(maxPoint.lat <  value.lat) {
                    maxPoint.lat = value.lat;
                }
                if(maxPoint.lng < value.lng) {
                    maxPoint.lng = value.lng;
                }
            });
            bounds=  new google.maps.LatLngBounds(minPoint, maxPoint);
            map.fitBounds(bounds);  
           // execute get_markers() frequently
                        
            // console.log('27-05-19 16:27:46 assets/js/drivers_map.js'); console.log("I am starting thw websocket");
            // init_websocket();

          get_markers(map);
                      }                  
}).promise().done(function(){
    //                     init_websocket(map);
    // console.log('27-05-19 16:44:04 assets/js/drivers_map.js'); console.log("I am done ajaxing");
}); 
    }
    
    
                         
      $(".driver_status").click(function(){
              
             status = $(this).attr("id");
             $(this).css({"border-bottom": "3px solid "});
             $(this).parent().siblings().children().css({"border-bottom": ''});
             $("#choose_driver").val("");
             
             
             driverLat = null;
             driverLng = null;
             clearInterval(getAll);
             clearInterval(getByDriver);
            if (status === "all")
            {
                 status = null;
                //  get_markers(map);
             //    setInterval(function(){get_markers(map)} ,15000);      
            }
            else
            {
            
              get_markers(map,status);
                getByStatus =   setInterval(function(){get_markers(map,status); } ,15000);      
            }
     
   
     
    });
       if (status === null )
       {
           
           getAll = setInterval(function(){
            //    get_markers(map); 
            // console.log("all");
        } ,15000);        
       } 
    
function get_markers(map,status){
 
    var lat,lng,dest_label;
// console.log("status");
        map.setZoom(12); 
    //   console.log(status);
        if (typeof (status) !== undefined  )
        {
            data = {status : status};
        }
  
        $.ajax({
                        data : data,
                        type: "get",
                        dataType: "json",
                        url: base_url + '/drivers/markers?format=json',
                        success: function (response)
                        {
                            
                          // remove old markers   
                          for(var i=0 ; i <all_markers.length ; i++)
                          {
                              all_markers[i].setMap(null);
                           
                          }
                        
                          $.each(response, function () {
                                 $.each(this, function (k, v) {
                                      $.each(this, function (index, item) {
                                       
                                      
                                          
                                          if (index === "current_lng")
                                          {
                                              lng = parseFloat(v[index]);
                                          }
                                         else if (index === "current_lat")
                                          {
                                              lat = parseFloat(v[index]);
                                          }
                                          else{
                                              lat = "";
                                              lng = "";
                                          }
                                       
                                        if (lat !== undefined  && lng !== undefined)
                                        {
                                        
                                           if (v["status"] == "free" || v["status"] == "offline" )
                                           {
                                              //dest_label = "Last Destination";
                                              v["area"] = " ";
                                           }
                                          
                                           v["model"] = v["model"]  == null ? " " : v["model"];
                                           v["area"]  = v["area"]   == null ? " " : v["area"];
                                           
                                      
                                             
                                          
                                            var contentString = '<div id="content" style="overflow-x:hidden;" >'+
                                                    '<div class="container">'+
                                                        '<div class="row" style="padding-top:10px; ">'+
                                                              '<div class="col-md-1"><strong>Name: </strong></div>'+
                                                              '<div class="col-md-9">'+v["name"]+'</div>'+
                                                         '</div>'+
                                                        '<div class="row" style="padding-top:10px; ">'+
                                                              '<div class="col-md-1"><strong>Last Update: </strong></div>'+
                                                              '<div class="col-md-9" >'+v["last_seen"]+'</div>'+
                                                         '</div>'+
                                                   '<div class="row" style="padding-top:10px; ">'+
                                                              '<div class="col-md-1"><strong>Vehicle: </strong></div>'+
                                                              '<div class="col-md-9">'+ v["model"] +'</div>'+
                                                         '</div>'+
                                                        '<div class="row" style="padding-top:10px; ">'+
                                                              '<div class="col-md-1"><strong>Time: </strong></div>'+
                                                              '<div class="col-md-9">'+v["time"]+'</div>'+
                                                         '</div>'+   
                                                         '<div class="row" style="padding-top:10px; ">'+
                                                         
                                                              '<div class="col-md-1"><strong>Destination : </strong></div>'+
                                                              '<div class="col-md-9">'+v["area"]+'</div>'+
                                                         '</div>'+   
                                                  '</div>'+
                                                '</div>';
                                      
                                          if (v["vehicle_type"] === "Electrical Bike")
                                          {  // change Electric Bike to Bike to choose right photo 
                                              v["vehicle_type"] = "Bike";
                                          }
                                             var icon = base_url + "/../assets/images/"+v["vehicle_type"]+"_"+v["status"]+ ".png" ; 
                                
                                            
                                             var latlang = new google.maps.LatLng(lat,lng); 
                                             var marker  = new google.maps.Marker({
                                                position: latlang,
                                                map: map,
                                                icon : icon,
                                                draggable : false,
                                            });

                                         all_markers.push(marker);
                                            
                                  var infowindow = new google.maps.InfoWindow({
                                            content: contentString,
                                            maxWidth : 250,
                                          });
                                   marker.addListener('mouseover', function() {
                                        infowindow.open(map, marker);
                                      });
                                       marker.addListener('mouseout', function() {
                                        infowindow.close(map, marker);
                                      }); 
                                      
                                      
                                   }
                                      });
                                   
                                 });
                                  
                                  
                              });
                              
                              
                         if (driverLat && driverLng)
                         {
                              var latlang = new google.maps.LatLng(driverLat,driverLng); 
                             
                              map.setCenter(latlang);
                              map.setZoom(20);
                              map.panTo(latlang);
                         }
                        }
                    });
}

function panToDriver(map){

    var  id =   $("#names  option[value='" + $('#choose_driver').val() + "']").attr('data-id');
    if ( (id) )
    {
       
            var data = {id :  id };
                 $.ajax({
                    data : data, 
                    type: "post",
                    dataType: "json",
                    url: base_url + '/drivers/driver_by_id',
                    success: function (data)
                    {
                     //   var lat = data.data["current_lat"];
                     //   var lng = data.data["current_lng"]
                     
                        driverLat = data.data["current_lat"];
                        driverLng = data.data["current_lng"];
                        var latlang = new google.maps.LatLng(driverLat,driverLng); 
                     
                        // console.log(driverLat +"  "+driverLng);  
                        map.setZoom(20);
                        map.panTo(latlang);

                    }
                 });
     }

        
    }

    $(window).on("load", function () {

        initMap();
       
 
    });
   
    
   $("#choose_driver").change(function(){

     clearInterval(getAll);
     clearInterval(getByStatus);
      
      
       panToDriver(map); 
       
       
//      getByDriver =  setInterval(function(){
            
              get_markers(map);
            
            if (driverLat && driverLng  && !(status))
                panToDriver(map);
            // console.log("one driver");
//        },15000)
    
    });
    
    $('#choose_driver').click(function() {
    $(this).val('');
    map.setZoom(12);
    });
    
});


