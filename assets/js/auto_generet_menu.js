$(document).ready(function () {

    $("#marketing_parent").addClass("active");
    $("#auto_generet_menu").addClass("active");


    $('#submit').on("click", function () {

        
        
        
            var new_rest_id = $('#new_rest_id').val();
            var old_rest_id = $('#old_rest_id').val();
      
            var data = {
                new_rest_id: new_rest_id,
                old_rest_id: old_rest_id
            }
        console.log(data);
        noty({  text: 'Do you want to continue?',  layout: 'topCenter',  container: '.custom-container',  buttons: [
                        {
                            addClass: 'btn btn-success btn-clean ntf-send', text: 'Send', onClick: function ($noty) {

                                 $.ajax({
                type: "POST",
                url: base_url + '/dishes/auto_generet_menu',
                dataType: "json",
                data: data,
                success: function (datae) {
                    noty({
                        timeout: 1500,
                        text: "Updated",
                        layout: 'topCenter',
                        type: 'success'
                    });

                }
                ,
                error: function (response) {

                    // console.log(response);
                    noty({ text: 'Error with Auto Generet Menu', layout: 'topCenter', type: 'error', timeout: 3000 });
                }
            });

                                  $noty.close();
                            }}
                            ,
                        {
                            addClass: 'btn btn-danger btn-clean', text: 'Cancel', onClick: function ($noty) {
                                $noty.close();
                                noty({ text: 'You clicked "Cancel" button', layout: 'topRight', type: 'error', timeout: 3000});
                            }
                        }
                        ]
                    })
           
        });
}); 