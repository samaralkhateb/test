 $(document).ready(function() {
               $("#control_panel_parent").addClass("active");
               $("#phones_page").addClass("active");
               var   table =  $('#phones').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "scrollX": true,
 "responsive": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/restaurants/phones_numbers/format/json',
            
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                 
                      {
                          extend: 'excel',
                                     action: function ( e, dt, node, config ) {
                                         $.ajax({
                                         data : {action_id : 82},
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
            },
            {
                              "targets": -1,
                                "data": null,
                                "defaultContent": '<button class="btn btn-default btn-rounded btn-sm"><span class="fa fa-pencil" id="ss"></span></button>'
              
                       
                            } 
                        ]
        
                   

       
       
               
      });
      $(".add-number").on("click",function(){
             $.ajax({
               type: "GET",
               url: base_url + '/restaurants/registed_restaurants',
               dataType: 'json',
               cache: false,
               success: function(response) {
                   console.log(response.restaurants);
                      $.each(response.restaurants, function(index, restaurant) {
                    
                        //     $('#rest').append($('<option/>', {
                        //       value: restaurant.id,
                        //         text: restaurant.name ,
                        //     }));

                           $('.add-trip').css('display', 'block');
                     $('.update-trip').css('display', 'none');
                        $("#iconPreview").modal("show");
                        
                    });
                    
               },error:function(response){
                 console.log(response);
               }
                 });
      $("#add_new_number").css("display","block");
      $("#update_number").css("display","none");
        $("#iconPreview").modal("show");
    });
    
      $("#add_new_number").click(function(event) {
            var data = {
            name : $('#shift-name').val(),
            number :$('#number').val(),
            rest_id :$('#rest').val(),
        

            };
            console.log(data);
           var url =  base_url + '/restaurants/add_phone';
             $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                            location.reload();
                        }
                         });
     });
       $("#update_number").click(function(event) {
               var data = {
            number : $('#number').val(),
            name :$('#shift-name').val(),
            rest_id :$('#rest').val(),
            id: $("#update_number").attr("num-id"),

            };
             event.preventDefault();
           var url =  base_url + '/restaurants/update_number';
             $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                        location.reload();
                        }
                         });
           
            });
       });
       
      $('.display').on( 'click', 'td', function () {
                    table = $('#phones').DataTable();
                   var datarow = table.row( this ).data() ;
                   if ($(this).index() === 3 ) {
                        var search_id = datarow[0];
                        var id =  search_id;
                      
        $.ajax({
                   type: "get",
                   url: base_url + '/restaurants/number_details?format=json&id=' + id,
                   dataType: 'json',
                   cache: false,
                   success: function(details) {
                       console.log(details.number);
                           
                    //    $("#rest option[value="+ details.number['rest_id']+"]").remove();
                       $('#rest').append($('<option/>', {
                              value: details.number['rest_id'],
                                text: details.number['rest_name'],
                                selected : true,
                            }));

                    
                    $("#rest").find("option[value="+ details.number['rest_id']+"]").attr("selected",true);

                    $('.selectpicker').selectpicker('refresh');
                    
                           $('.add-trip').css('display', 'block');
                     $('.update-trip').css('display', 'none');
                        $("#iconPreview").modal("show");
                        
             
                  $(".modal-body #shift-name").val(details.number['shift']);
                   $(".modal-body #number").val(details.number['number']);
                $('#update_number').attr('num-id', id);
                            $('#add_new_number').css('display', 'none');
                            $('#update_number').css('display', 'block');
                          
                        
                        $("#iconPreview").modal("show");
                    }
                    
                    });
                    }
     });
     $('body').on('hidden.bs.modal', '.modal', function () {
             $('#modal-body').html("");
             $('#foot-button').html("");

          });
