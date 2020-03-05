$("#control_panel_parent").addClass("active");
$("#n_page").addClass("active");

 function notyConfirmNtf(){
                    noty({
                        text: 'Do you want to continue?',
                        layout: 'topCenter',
                         container: '.custom-container',
                        buttons: [
                                {
                                    addClass: 'btn btn-success btn-clean ntf-send', text: 'Send', onClick: function($noty) {
                             var url =  base_url + '/marketing_cpanel/send_notification';
                             var data = {
                                 android_ids :JSON.parse($('.ntf-send').attr('android_ids')),
                                 ios_ids : JSON.parse($('.ntf-send').attr('ios_ids')),
                                 rest_id : JSON.parse($('.ntf-send').attr('rest_id')),
                                 en_msg : JSON.parse($('.ntf-send').attr('en_msg')),
                                 ar_msg : JSON.parse($('.ntf-send').attr('ar_msg')),
                             };
                                    $.ajax(
                                     {
                                         url: url,
                                         type: "post",
                                         dataType: "json",
                                         data: data,
                                         success: function(response) {
                                             console.log(response);
                                         //  noty({text: 'You clicked "Ok" button', layout: 'topRight', type: 'success'});
                                         },error: function(){
                                                noty({text: 'error action', layout: 'topRight', type: 'error'});
                                         }
                                          });
                                          $noty.close();


                                }
                                },
                                {addClass: 'btn btn-danger btn-clean', text: 'Cancel', onClick: function($noty) {
                                    $noty.close();
                                        $('.modal-body').find('button .ntf-send').attr('ios_ids','');
                                    noty({text: 'You clicked "Cancel" button', layout: 'topRight', type: 'error'});
                                    }
                                }
                            ]
                    })
                }
                function notyConfirmSms(){
                   noty({
                        text: 'Do you want to continue?',
                        layout: 'topCenter',
                         container: '.custom-container',
                        buttons: [
                                {
                                    addClass: 'btn btn-success btn-clean ntf-send', text: 'Send', onClick: function($noty) {
                             var url =  base_url + '/marketing_cpanel/send_notification';
                             var data = {
                                 android_ids :JSON.parse($('.ntf-send').attr('android_ids')),
                                 ios_ids : JSON.parse($('.ntf-send').attr('ios_ids')),
                                 rest_id : JSON.parse($('.ntf-send').attr('rest_id')),
                                 en_msg : JSON.parse($('.ntf-send').attr('en_msg')),
                                 ar_msg : JSON.parse($('.ntf-send').attr('ar_msg')),
                             };
                                    $.ajax(
                                     {
                                         url: url,
                                         type: "post",
                                         dataType: "json",
                                         data: data,
                                         success: function(response) {
                                             console.log(response);
                                         //  noty({text: 'You clicked "Ok" button', layout: 'topRight', type: 'success'});
                                         },error: function(){
                                                noty({text: 'error action', layout: 'topRight', type: 'error'});
                                         }
                                          });
                                          $noty.close();


                                }
                                },
                                {addClass: 'btn btn-danger btn-clean', text: 'Cancel', onClick: function($noty) {
                                    $noty.close();
                                        $('.modal-body').find('button .ntf-send').attr('ios_ids','');
                                    noty({text: 'You clicked "Cancel" button', layout: 'topRight', type: 'error'});
                                    }
                                }
                            ]
                    })
                }
            if($(".select").length > 0){
                $(".select").selectpicker();

                $(".select").on("change", function(){
                    if($(this).val() == "" || null === $(this).val()){
                        if(!$(this).attr("multiple"))
                            $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                    }else{
                        $(this).find("option[value='"+$(this).val()+"']").attr("selected",true);
                    }
                });
            }


 $(".open-modal").click(function(event) {
       var action_type  =  $(this).attr('action-type');
          if(action_type === '1'){
         $('.send-ntf').css('display','block');
     }
         else if(action_type === '2'){
         $('.send-sms').css('display','block');
     }
         else if(action_type === '3'){
         $('.send-wh').css('display','block');
     }
         else if(action_type === '4'){
         $('.send-emails').css('display','block');
     }

    var type =$(this).attr('data-type');

       if(type === '1'){
               $('.send-button').attr('data_type',type);
           $('#all-row').css('display','block');


         $.ajax({
                   type: "get",
                   url: base_url + '/marketing_cpanel/user_count?format=json',
                   dataType: 'json',
                   cache: false,
                   success: function(response) {
                        $(".modal-body #all-users").val(response.data);
                      console.log(response.data);

                    }
                    });
       }
       else if(type  ===  '2'){
         $('#area-row').css("display","block");
         $('.send-button').attr('data_type',type);

       }
       else if(type  ===  '3'){
           $('.send-button').attr('data_type',type);
         $('#dish-row').css('display','block');

     }
       else if(type  ===  '4'){
           $('.send-button').attr('data_type',type);
         $('#mobile-row').css('display','block');
       }
        else if(type  ===  '5'){
           $('.send-button').attr('data_type',type);
         $('#dish-tag-row').css('display','block');
       }
       $("#iconPreview").modal("show");
          });
          $("#send_new_notif").click(function(event) {


            var action_type= $(this).attr('action-type');
             var data_type= $(this).attr('data_type');
            if( data_type ===  '1'){

                        var data = {
                        users : $(".area-select").val(),
                        rest_id : $(".rest-select").val(),
                        ar_msg : $("#sent-ar-msg").val(),
                        en_msg : $("#sent-en-msg").val(),
                        data_type :  data_type
                  };
              }
                  else if(data_type  === '2'  ){

                    var data = {
                    areas : $(".area-select").val(),
                    rest_id : $(".rest-select").val(),
                    en_msg : $("#sent-en-msg").val(),
                    data_type :  data_type
                    };
              }
                  else if(data_type  === '3'  ){

                    var data = {
                    dishes : $(".dish-select").val(),
                    rest_id : $(".rest-select").val(),
                    ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                    data_type :  data_type
                    };
              }
             else if(data_type  === '4'  ){
             var data = {
                      mobiles : $(".area-select").val(),
                      rest_id : $(".rest-select").val(),
                      ar_msg : $("#sent-ar-msg").val(),
                      en_msg : $("#sent-en-msg").val(),
                      data_type :  data_type
                      };
                }
              else if(data_type  === '5'  ){
                  var data = {
                      dishes_tag : $(".dish-tag-select").val(),
                      rest_id : $(".rest-select").val(),
                      ar_msg : $("#sent-ar-msg").val(),
                      en_msg : $("#sent-en-msg").val(),
                        data_type :  data_type
                      };
                }
         console.log(data);
                  var url =  base_url + '/marketing_cpanel/notifications_tokens';
              $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                            console.log(response);
                            var android_ids=response.android_tokens ;
                            var ios_ids=response.ios_tokens ;
                            var msg=response.message ;
                            var rest_id=response.rest_id ;
                             $('.ntf-send').attr('android_ids',JSON.stringify(android_ids));
                             $('.ntf-send').attr('ios_ids',JSON.stringify(ios_ids));
                             $('.ntf-send').attr('ar_msg',JSON.stringify(msg));
                             $('.ntf-send').attr('en_msg',JSON.stringify(msg));
                             $('.ntf-send').attr('rest_id',JSON.stringify(rest_id));

                            console.log(android_ids);
                        },error: function(){
                               noty({text: 'error action', layout: 'topRight', type: 'error'});
                        }
                         });
     });


               $("#send_new_sms").click(function(event) {
            var data_type= $(this).attr('data_type');
            if( data_type ===  '1'){

                        var data = {
                        users : $(".area-select").val(),
                        rest_id : $(".rest-select").val(),
                       ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                        data_type :  data_type
                  };
              }
                  else if(data_type  === '2'  ){

                    var data = {
                    areas : $(".area-select").val(),
                    rest_id : $(".rest-select").val(),
                    ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                    data_type :  data_type
                    };
              }
                  else if(data_type  === '3'  ){

                    var data = {
                    dish : $(".area-select").val(),
                    rest_id : $(".rest-select").val(),
                    ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                    data_type :  data_type
                    };
              }
             else if(data_type  === '4'  ){


                 var data = {
                      mobiles : $(".area-select").val(),
                      rest_id : $(".rest-select").val(),
                      ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                      data_type :  data_type
                      };
                }
                   else if(data_type  === '5'  ){
                  var data = {
                      dishes_tag : $(".dish-tag-select").val(),
                      rest_id : $(".rest-select").val(),
                     ar_msg : $("#sent-ar-msg").val(),
                    en_msg : $("#sent-en-msg").val(),
                      data_type :  data_type
                      };
                }

                  var url =  base_url + '/marketing_cpanel/send_sms';
              $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                       noty({text: 'Successful action', layout: 'topRight', type: 'success'});
                        location.reload();
                        },error: function(){
                           noty({text: 'error', layout: 'topRight', type: 'error'});
                        }
                         });
                              });

              $('body').on('hidden.bs.modal', '.modal', function () {
             $(this).find("input,textarea,select").val('').end();

//           $('.modal-body').find('input:text').val('');
            $('.modal-body').find('div .elem').css('display','none');
            $('.modal-footer').find('.btn-success').css('display','none');


          });
