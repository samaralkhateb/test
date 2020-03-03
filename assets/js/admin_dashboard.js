$(function() {

    $("#create_admin_parent").addClass("active");


    $('#snooze_dispatch').on( 'change',function () {
        noty({
        text: "Are you sure?",
        layout: 'topCenter', 
        type: 'error',
        buttons: [
                 {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                           
                                      var status = "";
                                      if ($('#snooze_dispatch').is(":checked"))
                                        status = 1;
                                      else
                                        status = 0;
                                       var data ={
                                                   state :  status,
                                                  };      
                                          $.ajax({
                                                     type: "post",
                                                     url: base_url + '/call_center/change_snooze_dispatchh',
                                                     dataType: 'json',
                                                     cache: false,
                                                     data : data,
                                                     success: function(response) {
                                                  
                                                        location.reload();
                                                      }
                                                      });
                  }},
                  {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]
                });
    });
    $('#auto_dispatch').on( 'change',function () {
        noty({
        text: "Are you sure?",
        layout: 'topCenter', 
        type: 'error',
        buttons: [
                 {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                           
                                      var status = "";
                                      if ($('#auto_dispatch').is(":checked"))
                                        status = 1;
                                      else
                                        status = 0;
                                       var data ={
                                                   state :  status,
                                                  };      
                                          $.ajax({
                                                     type: "post",
                                                     url: base_url + '/call_center/change_auto_dispatch',
                                                     dataType: 'json',
                                                     cache: false,
                                                     data : data,
                                                     success: function(response) {
                                                  
                                                        location.reload();
                                                      }
                                                      });
                  }},
                  {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]
                });
    });

});