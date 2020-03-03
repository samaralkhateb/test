var suggested_messages = [];

    $(document).ready(function() {
        
        $.ajax({
        type: 'GET',
        url: base_url + '/call_center/suggested_replies',
        dataType: 'json',
        success: function(data){
            suggested_messages = data.done.slice();
        },
        error: function(response){
            console.log(response);
        }
    });

//          $('#messages_modal').on('hidden.bs.modal', function (e) {
//          jQuery("#model_body").html("");
//        });

   $("#reply_btn").click(function(){
       var msg_text = "";
        var other_id = "#sugMsg" + suggested_messages.length;
        if($(other_id).is(':checked'))
            msg_text = $("#msg_txt").val();
        else
            for(var i = 0 ; i < suggested_messages.length ; i++)
                if($('#sugMsg' + i).is(':checked'))
                    msg_text = $('#sugMsg' + i).val();
        
    if (msg_text == ""){
           noty({text: 'Please input your message/note', layout: 'topCenter', type: 'error',timeout : 3000});
    }else{
          noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                  var data = {
                                  msg_id : $("#reply_btn").val(),
                                  msg_txt : $("#msg_txt").val(),
                                  msg_type : $('.msg_type:checked').val(),
                                  msg_number : $(".message_number").val(),
                                  msg_email : $("#message_email").val(),
                                  };

                                  url = base_url + '/call_center/reply_to_message' ; 
                                  jQuery.ajax({
                                                type: "POST",
                                                url: url,
                                                dataType: "json",
                                                data: data,
                                                success: function(response) {
                                                  console.log(response);
                                                  $noty.close();
                                                  jQuery("#messages_modal").modal("hide");
                                                      location.reload();
                                                
                                                },
                                                error: function(response) {
                                                  //var data = JSON.parse(response["responseText"]);
                                                  //alert(response.error);
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
 


get_messages();
//setInterval(get_messages, 60000);
});

function get_messages() {
      // get all messages viw ajax 
      $('#msgs_div').html("");
      var  url = base_url + '/call_center/get_all_messages' ; 
      jQuery.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",

                    success: function(response) {
                      console.log(response.done);
                      $('.msg_count').html(response.done.length);
                      $.each(response.done, function (i, item) {
                        var html = '<a href="#" class="list-group-item" onclick=\'view_message('+item.id+',"'+item.email+'","'+item.message.toString().replace(/\n|\r/g,"").replace(/\'|\"|\s\s+/g,"")+'","'+item.phone+'","'+item.date+'")\'>';
                        html += '<div class="list-group-status status-online"></div>';
                        html += '<span class="contacts-title">'+item.email+'</span>';
                        html += '<span class="contacts-title"> ( '+item.phone+' )</span>';
                        html += '<p>'+item.message+'</p>';
                        html += '</a>';
                          $('#msgs_div').append(html);
                         // alert(html);
                         

                        
                      });
                      if (response.done != ""){
                               noty({
                              timeout: 1500,
                              text: "Check New Messages .",
                              layout: 'topCenter', 
                              type: 'error'
                              
                                      });
                            }
                    },
                    error: function(response) {
                      //alert(response.error);
                      //location.reload();
                    }
    });
}
 
 function view_message(id,email,message,number,date) {
   //var html ='<h2>'+id+email+message+'</h2>';
    
    var html = '';
    console.log(suggested_messages.length);
    for(var i = 0 ; i < suggested_messages.length ; i++){
        html += '<label class="">' + suggested_messages[i].note + '<input type="radio" style="float: left" name="suggestedMessages" value="' + suggested_messages[i].note + '" id="sugMsg' + i + '" class="sugMsgRadio reply_review" /><span class="checkmark"></span></label><br>';
    }
    html += '<label class=""><input type="radio" name="suggestedMessages" value="other" id="sugMsg' + suggested_messages.length + '" class="sugMsgRadio reply_review" />Other<span class="checkmark"></span></label><br>';
    $("#messagesRadio").append(html);
    
    var other_id = "#sugMsg" + suggested_messages.length;
    
    $('.msg_txt').hide();
    $('.sugMsgRadio').click(function(){
        if($(other_id).is(':checked')){
        $('.msg_txt').show();
    }
        else
            $('.msg_txt').hide();
    
    });
    
    $("#modal_title2").text("Reply To Message");
    $("#message_body").text(message);
    $("#message_email").text("From : "+email);
    $("#message_number").text(" ("+number+")");
    $("#reply_btn").val(id);
    $(".message_number").val(number);
    $("#message_id").val(id);
    $("#msg_date").text(date);

     
    $('#messages_modal').modal('show');
 }
 
 $('#messages_modal').on('hidden.bs.modal', function () {
    $('#msg_txt').val("");
    $('#messagesRadio').html("");
    $('[name="suggestedMessages"]').prop('checked', false);
    $('#msg_type1').prop('checked', true);
    //get_reviews();
});