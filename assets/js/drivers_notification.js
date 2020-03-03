$(function () {
   

    $("#marketing_parent").addClass("active");
    $("#d_notification").addClass("active");
 


 
 

    $("#drivers_notification").validationEngine();

    $('#drivers_notification').submit(function (evnt) {
 
            var valid = $("#drivers_notification").validationEngine('validate');
            var vars = $("#drivers_notification").serialize();

            if (valid == true) {
                evnt.preventDefault();
                evnt.stopImmediatePropagation();

                                    let drivers_options = $('#drivers_options').val();
                                    let message = $('#message').val().trim();
                                    let vehicle_type =$('#vehicle_type').val();
                                    let exp_date = $('#expire_msg').val()
                                    if(exp_date <= 0 ) {
                                        noty({
                                            timeout: 1500,
                                            text: "invalid expire date",
                                            layout: "topCenter",
                                            type: "error"
                                          });
                                          return;
                                    }
                                    if(message.length < 3) {
                                        noty({
                                            timeout: 1500,
                                            text: "invalid message",
                                            layout: "topCenter",
                                            type: "error"
                                          });
                                          return;
                                    }  
                                    exp_date *= 3600;
                                    data = {
                                        message: message, 
                                        drivers_options: drivers_options,
                                        vehicle_type : vehicle_type ,
                                        exp_date : exp_date
                                    }
                                    console.log(data); 
                                        show_loader();
                                         $.ajax({
                                             type: "POST",
                                             url: base_url + '/notifications/send_drivers_notifications',
                                             dataType: "json",
                                             data: data,
                                            success: function (data) {
                                               hide_loader();
                                          },
                                         error: function (response) {

                                               noty({ text: 'Error with send ios token', layout: 'topCenter', type: 'error', timeout: 3000 });
                                           }
                                       });
                                       
        }
    });


    $('.clear').click(function () {
        document.location.reload();
    });

});
