    $(document).ready(function() {
      $("#dirvers_parent").addClass("active");
               $("#all_vehicles_page").addClass("active");
               var   table =  $('#vehicles_table').DataTable({
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
                    "sAjaxSource": base_url + '/vehicles/vehicles_list/format/json',
               //      dom: 'Blfrtip',
                     colReorder: true,
                        buttons: [
                    
                      {
                         // extend: 'excel',
                           
                      } 
                      ] ,
                        "columnDefs": [
		              {
		                "targets": [0],
		                "visible": false
		              },
		              {
	                    "targets": -1,
	                    "data": null,
	                    "defaultContent": "<label class='switch switch-small'><input type='checkbox' class='button activate vehicle_active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
		  
		              }
		              ],
                                 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if ( aData[5] === "1"  )
                    {
                       $('td .vehicle_active', nRow).attr('checked', 'checked');

                    }
                  
                   
                }
            });
          
      });
      
     //show add model 
     $(".add-new-car").on("click",function(){
     	$("#active_switch").prop("checked", true);
     	$.ajax({
               type: "GET",
               url: base_url + '/vehicles/vehicles_types',
               dataType: 'json',
               cache: false,
               success: function(response) {
                   console.log(response.data);
                   $.each(response.data, function(index, d) {
                       $('#vehicle_type').append($('<option/>', {
                          value: d.id,
                          text: d.name ,
                        }));
	                     $('.add-vehicle').css('display', 'block');
	                     $('.update-vehicle').css('display', 'none');
	                     $("#iconPreview_car").modal();
                    });
               },error:function(response){
               	alert('error');
                 console.log(response);
               }
          });
        
    });
    
     //sending the add post request 
     $("#add_new_vheicle").click(function(event) {
     	   var check_value = 0;
      	    if($('#active_switch').prop('checked') === true) { 
		      check_value = 1;
		    }else {
	          check_value = 0;
		    }
           var data = {
            type_id : $("#vehicle_type").val(),
            category: $("#category").val(),
            model: $("#model").val(),
            plate : $("#plate").val(),
            status : check_value
            };
           
           var url =  base_url + '/vehicles/add_new_vehicles';
           $.ajax(
               {
                url: url,
                type: "post",
                dataType: "json",
                data: data,
                success: function(response) {
                noty({text: 'Successful action', layout: 'topRight', type: 'success'});
                   location.reload();
                  //$('#drivers_fuel').DataTable().ajax.reload(null, false);
                },error: function(){
                noty({text: 'error action', layout: 'topRight', type: 'error'});
                }
              });
     });
     
     
     
     // display update model
     $('.display_car').on( 'change', 'td', function () {
           table = $('#vehicles_table').DataTable();
           var datarow = table.row( this ).data() ;
      
           if ($(this).index() === 4) {
                    console.log(datarow[5]);
	           var id = datarow[0];
	   var check_value ;
  	    if(datarow[5] === '1') { 
	      check_value = "0";
	    }else {
          check_value = "1";
	    }
        var data = {
        id : id,
        status : check_value
        };
	           $.ajax({
	               type: "post",
	               url: base_url + '/vehicles/update_vehicle/format/json' ,
	               dataType: 'json',
	               cache: false,
                      data:data,
	               success: function(response) {
                       noty({text: 'Successful action', layout: 'topRight', type: 'success'});
//                      $('#vehicles_table').DataTable().ajax.reload(null, false);	           
	                  },error: function(){
                       noty({text: 'error action', layout: 'topRight', type: 'error'});
                    }
	          });
          }

                
     });
     
   
       
    $('#active_switch').click(function() { 
		    if (this.checked) {
		      $('#active_switch_lable').text('Active');
		    } else {
	          $('#active_switch_lable').text('Inactive'); 
		    }
	  });
	  
    $('body').on('hidden.bs.modal', '.modal', function () {
            $('#driver').html("");
            $('.modal-body_car"').find('input:text').val('');  
            $('.modal-body_car"').find('input:text').attr('readonly',false);  
            $('#foot-button_car').html();

          });
     
      
   