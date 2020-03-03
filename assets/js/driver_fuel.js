    $(document).ready(function() {
               $("#dirvers_parent").addClass("active");
               $("#fuel_page").addClass("active");
               var   table =  $('#drivers_fuel').DataTable({
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
                    "sAjaxSource": base_url + '/drivers/drivers_fuel_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
            
                    dom: 'Blfrtip',
                    colReorder: true,
                    buttons: [
	                
	                  {
	                      extend: 'excel',
	                  } 
                    ] ,
                    "columnDefs": [
		            {
		                "targets": [0],
		                "visible": false
		            },
		            {
		                "targets": [1],
		                "visible": false
		            },{
	                     "targets": -1,
	                    "data": null,
	                    "defaultContent": '<button class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil" id="ss"></span></button>'
		  
		            }
		           ],
          
              });
      
      
              
             
    //sending the post request
      $("#add_new_trip").click(function(event) {
      	  
      	   var check_value = 0;
      	    if($('#check_in_switch').prop('checked') === true) { 
		      check_value = 1;
		    }else {
	          check_value = 0;
		    }
                    var last = $('#last_counter').attr('d_c');
                    var start = $("#start_km").val();
                    if(start < last){
                      noty({text: 'The kilometrage must be bigger or equal the last kilometrage value.', layout: 'topRight', type:'error'});
                  }
else{
                        
           var data = {
            driver_id : $("#driver").val(),
            vehicle_id :  $("#vehicle").val(),
            start_km : $("#start_km").val(),
            date : $("#date").val(),
            start_hours : $("#start_hours").val(),
            last_km :  $('#last_counter').attr('d_c'),
            check_switch : check_value
            };
           
           var url =  base_url + '/drivers/add_driver_fuel';
             $.ajax(
                   {
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: data,
                    success: function(response) {
                       noty({text: 'Successful action', layout: 'topRight', type: 'success',timeout:3000});
                       $('#drivers_fuel').DataTable().ajax.reload(null, false);
                    },error: function(response){
                       console.log(response["responseJSON"]["error"]);
                       var error_s = response["responseJSON"]["error"];
                        noty({text: ""+ error_s+"", layout: 'topRight', type: 'error',timeout:3000});
                      $('#drivers_fuel').DataTable().ajax.reload(null, false);

                    }
                  });
              }
     });
     
    
     //uptate post
      $(".update-trip").click(function(event) {
      	   var check_value = 0;
      	    if($('#check_in_switch').prop('checked') === true) { 
		      check_value = 1;
		    }else {
	          check_value = 0;
		    }
		    var veh_id;
		    if($("#vehicle").val() !== ""){
		    	veh_id = $("#vehicle").val();
		    }else{
		    	veh_id = $(".update-trip").attr('current_veh_id');
		    }
		     console.log(veh_id);
                       var end = $("#end_km").val();
                    var start = $("#start_km").val();
                     console.log(end);
                    if(end < start){
                      noty({text: 'The end  must be bigger or equal the  start.', layout: 'topRight', type:'error'});
                  }else{
            var data = {
            id : $(".update-trip").attr('data-id'),
            end_km : $("#end_km").val(),
            date : $("#date").val(),
            end_hours : $("#end_hours").val(),
            vehicle_id : veh_id,
            driver_id :$(".update-trip").attr('driver_id'),
            check_switch : check_value

            };
            
            console.log(data);
            var url =  base_url + '/drivers/update_driver_fuel';
             $.ajax(
                    {
	                    url: url,
	                    type: "post",
	                    dataType: "json",
	                    data: data,
	                    success: function(response) {
//	                        $('#drivers_fuel').DataTable().ajax.reload(null, false);
	                        ({text: 'Successful action', layout: 'topRight', type: 'success',timeout:3000});
	                       
	                    },error: function(response){
                               
                       console.log(response["responseJSON"]["error"]);
                       var error_s = response["responseJSON"]["error"];
                        noty({text: ""+ error_s+"", layout: 'topRight', type: 'error',timeout:3000});

	                        $('#drivers_fuel').DataTable().ajax.reload(null, false);
	                     
	                    }
                   });
               }
           });
           
           
           
       $('.datepicker').on('changeDate', function() {
          table.ajax.url( base_url+'/drivers/drivers_fuel_list/format/json?start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val() ).load();

           });  
       });
       
       
       
       $('.display').on( 'click', 'td', function () {
                
               console.log($(this).index());
               table = $('#drivers_fuel').DataTable();
             
               var datarow = table.row( this ).data() ;
               console.log(datarow);
               console.log($(this).index());
                 if ($(this).index() === 9 ) {

                var id = datarow[0];
                var date =  datarow[5];
                           

             $.ajax({
                   type: "get",
                   url: base_url + '/drivers/get_driver_fuel?format=json&id=' + id ,
                   dataType: 'json',
                   cache: false,
                   success: function(response) {
                
                    $.each( response.data, function(value ) {
                        console.log(response.data[0]);
		                    if( response.data[0]['current_status'] == 1){
		                    	$('#check_in_switch_lable').text('Checked In');
			      	            $("#check_in_switch").prop("checked", true);
				      	    }else{
				      	    	$('#check_in_switch_lable').text('Checked Out');
				      	        $("#check_in_switch").prop("checked", false);
				      	    }
			      	        $('.driver_input_div').css('display', 'block');
			      	        $("#current_drive").val(response.data[0]['name']);
			      	        $("#current_drive").attr('readonly',true);
                             	        $('.vehicle_input_div').css('display', 'block');

                                            $("#current_vehicle").val(response.data[0]['model']);
			      	        $("#current_vehicle").attr('readonly',true);
                                        $("#start_hours").attr('readonly',true);
			      	        console.log(response.data[0]['driver_id']);
                            $(".to-div").css('display','block');
                            $(".end-km-div").css('display','block');
                            $(".modal-body #start_km").attr('readonly',true);
                            $(".modal-body #date").attr('readonly',true);
                            $(".modal-body #start_km").val(response.data[0]['start_counter']);
                            $(".modal-body #end_km").val(response.data[0]['end_counter']);
                            $(".modal-body #start_hours").val(response.data[0]['start_hours']);
                            $(".modal-body #end_hours").val(response.data[0]['end_hours']);
                            $(".modal-body #date").val(response.data[0]['date']);
                            $('.add-trip').css('display', 'none');
                            $('.update-trip').css('display', 'block');
                            $('.update-trip').attr('data-id', response.data[0]['id']);
                            $('.update-trip').attr('driver_id', response.data[0]['driver_id']);
                          
                      });
                        $("#iconPreview").modal("show");
                      }
                    });
                }
     });


    //open the add medel and load the content in it
     $(".add-new-trip").on("click",function(){
     	$('.driver_select_div').css('display', 'block');
     	$('.vehicle_select_div').css('display', 'block');
       $(".to-div").css('display','none');
          $(".end-km-div").css('display','none');
         $("#check_in_switch").prop("checked", true);
           $('.add-trip').css('display', 'block');
	   $('.update-trip').css('display', 'none');
           $("#iconPreview").modal("show");
     
        
    });
       
        $('#vehicle').on('change', function() {

                $('#last_counter').html("");
                $.ajax({
                    type: "GET",
                    url: base_url + '/drivers/driver_last_counter?format=json&vehicle_id=' + $('#vehicle').val(),
                    dataType: "json",
                    data: null,
                    success: function(data) {
                        console.log(data.data['0']['end_counter']);
                        var last =  data.data['0']['end_counter'];
                    $('#last_counter').html("Yesterday : " + last);
                    $('#last_counter').attr('d_c', last);
           
                    },
                    error: function() {
                        alert('an error ocure while loading data , kindly refresh the page');
                    }
                });
            }); 
            
       
       $('body').on('hidden.bs.modal', '.modal', function () {
       	    //jvalidate.resetForm();
       	    //$('#gender').next('.bootstrap-select').removeClass('error').removeClass('valid');
       	    $('#current_car').css('display', 'none');
       	    $('.driver_select_div').css('display', 'none');
       	    $('.driver_input_div').css('display', 'none');
            $('.vehicle_select_div').css('display', 'none');
            $('.vehicle_input_div').css('display', 'none');
            $('#driver').html("");
            $('#vehicle').html("");
            $('#driver').removeClass('error').removeClass('valid');
            $('#driver').parent().removeClass('error').removeClass('valid');
            $('#driver-error').remove();
            $('#vehicle').removeClass('error').removeClass('valid');
            $('#vehicle').parent().removeClass('error').removeClass('valid');
            $('#vehicle-error').remove().removeClass('valid');
            $('#date').removeClass('error').removeClass('valid');
            $('#date-error').remove();
            $('#start_km').removeClass('error').removeClass('valid');
            $('#start_km-error').remove();
            $('#end_km').removeClass('error').removeClass('valid');
            $('#end_km-error').remove();
            $('#start_hours').removeClass('error').removeClass('valid');
            $('#start_hours-error').remove();
            $('#end_hours').removeClass('error').removeClass('valid');
            $('#end_hours-error').remove();
            $('#last_counter').html("");
            $('.modal-body').find('input:text').val('');
            $('select').empty();
           $('.modal-body').find('input:text').attr('readonly',false);  
            $('#foot-button').html();

          });
            
	     $(".datepicker").datepicker({
	   format: 'yyyy-mm-dd' ,
	      });  
	       var yesterday = new Date();
	        var dd = yesterday.getDate() - 1;
	        var mm = yesterday.getMonth()+1; 
	
	        var yyyy = yesterday.getFullYear();
	        yesterday =  yyyy+'-'+mm+'-'+dd;
        
            $( ".datepicker" ).datepicker('setDate', new Date());
            
//            if($(".timepicker24").length > 0)
            $(".timepicker24").timepicker({minuteStep: 5,sshowMeridian: false
                  
});
            $(".timepicker").timepicker({minuteStep: 5,sshowMeridian: false
});

    
      $('#check_in_switch').click(function() { 
		    if (this.checked) {
		      $('#check_in_switch_lable').text('Checked In');
		    } else {
	          $('#check_in_switch_lable').text('Checked Out'); 
		    }
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
//        }

    