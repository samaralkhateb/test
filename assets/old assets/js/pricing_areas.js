$(document).ready(function(){
        $("#control_panel_parent").addClass("active");
       $("#pricing_areas").addClass("active");
       
       
       
          if ($(".select").length > 0) {
        $(".select").selectpicker();

        $(".select").on("change", function () {
            if ($(this).val() == "" || null === $(this).val()) {
                if (!$(this).attr("multiple"))
                    $(this).val("").find("option").removeAttr("selected").prop("selected", false);
            } else {
                $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
            }
        });
    }
       
var map;       
var gpolygons = [];     
var area_id ;
    function initMap() {

   
 

        var lat = 33.5138073;
        var lng = 36.27652790000002;
        
          
        var point, lat, lng, split_poly, PolyCoords;
       
   



        var myLatLng = {lat: lat, lng: lng};

         map = new google.maps.Map(document.getElementById("map"), {
            center: myLatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false,
        
        });



        var bounds = new google.maps.LatLngBounds();
        $.ajax({
            type: "get",
            dataType: "json",
            url: base_url + '/drivers/ploygons?format=json',
            success: function (data)
            {
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

                 
                    
                        var Polygon = new google.maps.Polygon({
                            paths: PolyCoords,
                            strokeColor:"rgba(220, 87, 7, 0.47)",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#aaaaaa",
                            fillOpacity: 0.4,
                            nameArea : v["ar_name"],
                            area_id : v["id"],
                            price : 0,
                        });
                       
                        
                        Polygon.setMap(map);

                        //Define position of label
                        var bounds = new google.maps.LatLngBounds();
                        for (var i = 0; i < PolyCoords.length; i++) {
                           
                                bounds.extend(PolyCoords[i]);
                            
                        }
                        var myLatlng = bounds.getCenter();
            
                        var mapLabel2 = new MapLabel({
                          text: v["ar_name"],
                          position: myLatlng,
                          map: map,
                          fontSize: 10,
                          align: 'right',
                         
                        });
                        mapLabel2.set('position', myLatlng);
                        
                        google.maps.event.addListener(Polygon, 'click', function (event) {
                            
                                   var src = $("#choose_area option:selected").text(); 
                                   area_id = Polygon.area_id;
                                   $("#polygons_details .modal-title").text(src +"  "  +"  إلى"+"  " +Polygon.nameArea);
                                   $("#polygons_details #dest").val(Polygon.area_id);
                                   $("#polygons_details #price").val(Polygon.price);
                                   
                                   if (Polygon.active == 1)
                                   {
                                       $("#polygons_details #active").prop("checked",true);
                                   }
                                   else
                                   {
                                       $("#polygons_details #active").prop("checked",false);
                                   }
                                       
                                 
                                 $("#polygons_details").modal('show');
                              });  
                            var obj = {};
                            obj.poly = Polygon;
                            obj.label = mapLabel2;
                            gpolygons.push(obj);
                         
                
                    });
                });
                
                
              
           // execute get_markers() frequently
                        
      
                      }                  
}); 
 
    }
  
    
   $(window).on("load", function () {

        initMap();
       
 
    });
    
    $("#choose_area").change(function(){
        
      var id=   $("#choose_area option:selected").val();
      $("#polygons_details #src").val(id);
       var  data = {id :  id};
           $.ajax({
            data : data,   
            type: "post",
            dataType: "json",
            url: base_url + '/polygons/area_prices?format=json',
            success: function (data)
            {
                  
                       for (var i=0 ; i< gpolygons.length ; i++){
                           
                       
                              if (gpolygons[i].poly.area_id == id)
                                {
                                      gpolygons[i].poly.setOptions({fillColor : "#aaaa00" });
                                }
                                else
                                {
                                        gpolygons[i].poly.setOptions({fillColor : "#aaaaaa" , price : 0 , active : 0});
                                }
                       }
                 $.each(data.data,function(index){
                     var dest = data.data[index]["destination"];
                     var price = data.data[index]["price"];
                     var active = data.data[index]["active"];
                     var src = data.data[index]["source"];
                   
                     
                     
                    for (var i=0 ; i< gpolygons.length ; i++){
                         
                        if (gpolygons[i].poly.area_id == dest  )
                        {
                           
                            gpolygons[i].poly.price = price;
                            gpolygons[i].poly.active = active ;
                         
                            if (active == 1 && gpolygons[i].poly.area_id != src )
                            {
                                
                              gpolygons[i].poly.setOptions({fillColor : "#00ff00"});
                            }
                            else if (active == 0 && gpolygons[i].poly.area_id != src )
                            {
                                gpolygons[i].poly.setOptions({fillColor : "#ff0000" });
                            }
                        }
                     
                                        }
                   
                     
                     
                 });
            }
        });
        
        
        
    });
    
    $("#update_price").click(function(){
        
        var src    = $("#polygons_details #src").val();
        var dest   = $("#polygons_details #dest").val();
        var price  = $("#polygons_details #price").val();
        var active = $("#polygons_details #active").prop("checked") === true  ? 1 : 0;
        var newColor = active == 1 ? "#00ff00" : "#ff0000" ;
        
        
        
             var data = {
                    "src"    :  src ,
                    "dest"   : dest,
                    "price"  : price,
                    "active" : active,
                
                };
              $.ajax({
                          data : data,
                          type: "post",
                          url: base_url + '/polygons/update_price?format=json',
                          dataType: 'json',
                          cache: false,
                          success: function(response) {
                              
                              noty({text: 'Successful action', layout: 'topRight', type: 'success',timeout:3000});
                              $("#polygons_details").modal("toggle");
                       for (var i=0 ; i<gpolygons.length ; i++)
                       {
                           
                           if (gpolygons[i].poly.area_id == area_id )
                           {
                               if (gpolygons[i].poly.area_id != src)
                               {
                                  gpolygons[i].poly.setOptions({fillColor : newColor ,"active" : active ,price : price  });
                               }
                               else
                               {
                                   gpolygons[i].poly.setOptions({"active" : active ,price : price});
                               }
                               
                            }
                              
                       }
                              
                      

                          }, 
                          error : function(){
                               noty({text: 'error action', layout: 'topRight', type: 'error',timeout:3000});
                          }


                });
        
    });
    
});


