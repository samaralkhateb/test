 
  $(document).ready(function() {
  var myDropDown=$("#selected_numbers");
    $("#selected_numbers").click(function(){
        myDropDown.attr('size',0);
    }); 

$('#msgs_scroll').scrollTop($('#msgs_scroll')[0].scrollHeight);

   $("#reply_btn2").click(function(){
    if ($("#msg_txt2").val() == ""){
           noty({text: 'Please input your message/note', layout: 'topCenter', type: 'error',timeout : 3000});
    }else{
          noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                  var data = {
                                  msg_id : $("#reply_btn2").val(),
                                  msg_txt : $("#msg_txt2").val(),
                                  msg_type : $('.msg_type2:checked').val(),
                                  msg_number : $("#message_number2").val(),
                                  };

                                  url = base_url + '/call_center/reply_to_message' ; 
                                  jQuery.ajax({
                                                type: "POST",
                                                url: url,
                                                dataType: "json",
                                                data: data,
                                                success: function(response) {
                                                  console.log(response);
                                                  $noty.close()
                                                  jQuery("#messages_modal").modal("hide");
                                                  // show_message(response["done"]);
                                                  //jQuery("#note").html("");
                                                  location.reload();
                                                 
                              
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
});



  });




 function get_select_menue() {
     
     console.log($("input.phone").val());
                    $('#selected_numbers').empty(); 
                    $('#selected_numbers').hide();  
                    if ($("input.phone").val().length >= 5){   
                          /*$('#selected_numbers').append($('<option>', { 
                              value: "null",
                              text : "" 
                          }));      */   
                          var data = {
                          num : $("input.phone").val(),
                          };

                          url = base_url + '/call_center/get_all_customer_users' ; 
                          jQuery.ajax({
                                        type: "GET",
                                        url: url,
                                        dataType: "json",
                                        data: data,
                                        success: function(response) {
                                          console.log(response.done);
                                          $("#selected_numbers").css("display","block");
                                          $.each(response.done, function (i, item) {
                                              
                                              $('#selected_numbers').append($('<option>', { 
                                                  value: item.value,
                                                  text : item.value 
                                              }));
                                              var myDropDown=$("#selected_numbers");
                                              var length = $('#selected_numbers option').length;
                                              myDropDown.attr('size',length);   
                                              
                                         
                                              $('#selected_numbers').show();   
                                              
                                      
                                              
                                              /* $('#selected_numbers').append($('<li class="list-group-item">'
                                                       +  item.value + '</li>'
                                              ));
                                              var myDropDown=$("#selected_numbers");
                                              var length = $('#selected_numbers> option').length;
                                              myDropDown.attr('size',length);   
                                              
                                         
                                              $('#selected_numbers').show();  */
                                              
                                              console.log(item.value);
                                          });
                                        },
                                        error: function(response) {
                                          alert(response.error);
                                        }
                        });
                    }
 }