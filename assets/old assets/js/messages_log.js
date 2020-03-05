 
  $(document).ready(function() {






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
                             
                                  url = base_url + '/call_center/reply_to_message' ; 
                                  $.ajax({
                                                type: "POST",
                                                url: url,
                                               DataType: "json",
                                                data: {
                                                    msg_id : $("#reply_btn2").val(),
                                                    msg_txt : $("#msg_txt2").val(),
                                                    msg_type : $('.msg_type2:checked').val(),
                                                    msg_number : $("#message_number2").val(),
                                                },
                                                success: function() {
                                                  $noty.close()
                                                  $("#messages_modal").modal("hide");
                                                  location.reload();
                                                },
                                                error: function(response) {
                                                    noty({text: 'error', layout: 'topCenter', type: 'error',timeout : 3000});
                                                    console.log(response.error);
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

///////////////////////////////////////////////////////////////////////////////////


$('#search_phone').on('click',(e) => {
    e.preventDefault();

    let regex = /^[0-9]+$/
    let val = $('#phone').val().trim();

    if(regex.test(val) && val.length == 9) {

            $.ajax({
                data : {
                    number : val
                },
                type: 'post',
                dataType: "json",
                url :base_url + '/call_center/get_all_customer_users',
                success:function(res) {  
                    if(res.done) {
                        $('#selectuser').submit();
                    }else {
                        noty({timeout: 2000,text: "user not found  ",layout: "topCenter", type: "error" });
                        $('#phone').val('');
                    }
                }
            })
    }else {
        noty({timeout: 2000,text: "Invalid Number ",layout: "topCenter", type: "error" });
          $('#phone').val('');
    }
});



// $('#reply_btn2').on('click',(e) => {

//     $('#reply_message_form').submit();
// })



});
