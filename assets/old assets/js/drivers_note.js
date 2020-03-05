    $(document).ready(function() {
        
        
        
        $("#dashboard_parent").addClass("active");
               $("#drivers_note").addClass("active");
               
     $(".datepicker").datepicker({
	   format: 'yyyy-mm-dd' ,
	      });  
	       var yesterday = new Date();
	        var dd = yesterday.getDate() - 1;
	        var mm = yesterday.getMonth()+1; 
	
	        var yyyy = yesterday.getFullYear();
	        yesterday =  yyyy+'-'+mm+'-'+dd;
        
            $( ".datepicker" ).datepicker('setDate', new Date());
            
            
            
               var   table =  $('#drivers_note_table').DataTable({
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
                    "sAjaxSource": base_url + '/drivers/get_driver_notes/format/json?start_date='
                    + $("#from-date-driver-note").val()
                    + '&end_date='
                    + $("#to-date-driver-note").val(),
            
                    dom: 'Blfrtip',
                    colReorder: true,
                    buttons: [
	                
	                  {
	                      extend: 'excel',
	                  } 
                    ] ,
                    "columnDefs": [
		            {
		                "targets": [0,1,2,3,4,5,6,7,8],
		                "visible": false
		            },
		          {
	                     "targets": -2,
	                    "data": null,
	                    "defaultContent": '<button class="btn btn-default btn-rounded btn-sm "  data-target="#edit_user_address" data-toggle="modal" ><span class="fa fa-pencil" id="ss"></span></button>'
		  
		            },
                            {
	                     "targets": -1,
	                    "data": null,
	                    "defaultContent": '<button class="btn btn-default btn-rounded btn-sm"  data-target="#map_user_address" data-toggle="modal"  ><span class="fa fa-map-marker" id="ss"></span></button>'
		  
		            }
		           ],
          
              });
              
              
     $('.datepicker').on('changeDate', function() {
          table.ajax.url( base_url+'/drivers/get_driver_notes/format/json?start_date='
                + $("#from-date-driver-note").val()
                + '&end_date='
                + $("#to-date-driver-note").val() ).load();

           });  
           
           
    $('.display').on( 'click', 'td', function () {
                
               console.log($(this).index());
               table = $('#drivers_note_table').DataTable();
             
               var datarow = table.row( this ).data() ;
               console.log(datarow);
           
            if ($(this).index() === 8) {

               console.log(datarow[12] + " "  + datarow[0]);
               $("#driver-note-label").text(datarow[12]);
               $("#id-user-address").val(datarow[0]);
               $("#name_address").val(datarow[1]);
               $("#area").val(datarow[2]);
               $("#street_address").val(datarow[3]);
               $("#near_address").val(datarow[4]);
               $("#floor_address").val(datarow[5]);
               $("#details_address").val(datarow[6]);
               
                
          }
          
          if($(this).index() === 9)
          {
              
        var myLatLng = {lat: Number(datarow[7]), lng: Number(datarow[8])};

     var    map = new google.maps.Map(document.getElementById("map-address"), {
            center: myLatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false,
        
        });
        
            $("#map_user_address").on("shown.bs.modal", function () {
             google.maps.event.trigger(map, "resize");
});

    var marker  = new google.maps.Marker({
                                                position: myLatLng,
                                                map: map,
                                                draggable: true,
                                              
                                                    draggable : false,
                                            });
              
          }
                  });
              
    $("#update_user_address_btn1").click(function(){
      
        
       $("#user_address_driver_note").validate({
            submitHandler: function (form) {
                var id    =$("#id-user-address").val();
                var name_address = $("#name_address").val();
                var street = $("#street_address").val();
                var near = $("#near_address").val();
                var floor = $("#floor_address").val();
                var area = $("#area option:selected").val();
                var area_text = $("#area option:selected").text();
                var details = $("#details_address").val();
                var data = {
                    id : id,
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
                                $('#edit_user_address').modal('toggle');

                            },
                            error: function () {
                                noty({text: 'error action', layout: 'topRight', type: 'error', timeout: 3000});
                            }
                        });



            }

        });
        
    });      
    

              
    });