$(function () {
    // $('.singleDevice').addClass('none');
    // $('.topic').addClass('none');

    var useUserToken = false;
    var temp_1 = false;
    var temp_2 = false;
    var android_token = false;
    var ios_token = false;

    $("#marketing_parent").addClass("active");
    $("#notifications_v").addClass("active");

    $('.topic').hide();
    $('.singleDevice').hide();
    $('.userSegment').show(400);
    $('.area_div').hide();
    $('.res_div').hide();
    $('.userToken').hide();
    // $('.app_div').hide();
    $('.range_div').hide();
    $('.polygon_div').hide();
    $('input[type=radio][name=Target]').on('change', function () {



        if (this.value == "1") {
            // $('.topic').addClass('none');
            // $('.singleDevice').addClass('none');
            // $('.userSegment').removeClass('none');

            $('.topic').hide();
            $('.singleDevice').hide();
            $('.userToken').hide();
            $('.userSegment').show(400);
            useUserToken = false;
        }
        if (this.value == '0') {
            $('.userToken').show(400);
            $('.topic').hide();
            $('.singleDevice').hide();
            $('.userSegment').hide();
            useUserToken = true;
        }

        if (this.value == "topic") {
            // $('.singleDevice').addClass('none');
            // $('.userSegment').addClass('none');
            // $('.topic').removeClass('none');
            $('.topic').show(400);
            $('.singleDevice').hide();
            $('.userSegment').hide();
            $('.userToken').hide();
            useUserToken = false;


        }

        if (this.value == "singleDevice") {
            // $('.topic').addClass('none');
            // $('.userSegment').addClass('none');
            // $('.singleDevice').removeClass('none');
            $('.topic').hide();
            $('.singleDevice').show(400);
            $('.userSegment').hide();
            $('.userToken').hide();
            useUserToken = false;
        }

    });




    // var row = [
    //     '<tr>',
    //     '<th scope="row"></th>',
    //     '<td style="padding-top: 10px; font-size: 15px">Area</td>',
    //     '<td style="border-right: 1px solid rgba(0,0,0,0.26)"></td>',
    //     '<td><select id="area" style="border: none; background: #fff" class=" selectpicker select "  data-live-search="true"  multiple>',
    //     '<option value="-1" >Select Area</option>',
    //     _options,
    //     '</select></td>',
    //     '<td><div class="btn btn-default btn-and">and</div></td>',
    //     '<td style="font-size: 18px; padding-top: 15px; padding-right:20px;"><span class="fa fa-times close"></span></td>',
    //     '</tr>',


    // ]



    $('.btn-and').click(function () {
        // row = $(row.join(''));
        // $("table").append(row);
        $('.app_div').show(400)
    });

    $('.btn-and_app').click(function () {
        // row = $(row.join(''));
        // $("table").append(row);
        $('.area_div').show(400)
    });

    $('.btn-and1').click(function () {
        // row = $(row.join(''));
        // $("table").append(row);
        $('.res_div').show(400)
    });

    $('.btn-and2').click(function () {
        // row = $(row.join(''));
        // $("table").append(row);
        $('.range_div').show(400)
    });

    $('.btn-and3').click(function () {
        // row = $(row.join(''));
        // $("table").append(row);
        $('.polygon_div').show(400)
    });

    $('.close').click(function () {
        $(this).closest("tr").remove();
    });

    $('.table-responsive').on('show.bs.dropdown', function () {
        $('.table-responsive').css("overflow", "inherit");
    });

    $('.table-responsive').on('hide.bs.dropdown', function () {
        $('.table-responsive').css("overflow", "auto");
    });

    // var id_area = document.getElementById("area");
    // console.log('id_area');  
    // console.log(id_area);

    // $('#version').on('change', function () {
    //     var version = $('#version').val();
    //     if (version.length > 1) {

    //     } else {
    //         if (version == 1.6) {

    //          }
    //         else {

    //          }

    //     }
    // });



    $('#token_android').on('change', function (event) {
        android_token = false;
        temp_1 = false;
        var fileInputController = event.target;
        var file = fileInputController.files[0];

        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            temp_1 = event.target.result.split(',').map(function (line) { return line.split(',') })
        }

        fileReader.readAsText(file);

        fileReader.onloadend = function () {
            android_token = temp_1;
        }
    });


    $('#token_ios').on('change', function () {
        ios_token = false;
        temp_2 = false;
        var fileInputController = event.target;
        var file = fileInputController.files[0];

        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            temp_2 = event.target.result.split(',').map(function (line) { return line.split(',') })
        }
        fileReader.readAsText(file);

        fileReader.onloadend = function () {

            ios_token = temp_2;
            temp_2 = false;
        }
    })









    $('#type').on('change', function () {
        var version = $('#version').val();
        var type = $('#type').val();

        if (version.length > 1) {
            $('.area_div').show(400);
            $('.res_div').show(400);
            $('.range_div').show(400);
            $('.polygon_div').show(400);
        } else {
            if (version == 1.6) {
                if (type.length > 1) {
                    $('.area_div').show(400);
                    $('.res_div').show(400);
                    $('.polygon_div').show(400);
                    $('.range_div').hide();
                } else {
                    if (type == 'area') {
                        $('.area_div').show(400);
                        $('.res_div').hide();
                        $('.range_div').hide();
                        $('.polygon_div').hide();
                    } else if (type == 'restaurant') {
                        $('.area_div').hide();
                        $('.res_div').show(400);
                        $('.range_div').hide();
                        $('.polygon_div').hide();
                    } else if (type == 'polygon') {
                        $('.area_div').hide();
                        $('.res_div').hide();
                        $('.range_div').hide();
                        $('.polygon_div').show(400);
                    }
                }

            }
            else if (version == 2) {
                if (type == 'area') {
                    $('.area_div').show(400);
                    $('.res_div').hide();
                    $('.range_div').show(400);
                    $('.polygon_div').hide();
                } else if (type == 'restaurant') {
                    $('.res_div').show(400);
                    $('.area_div').hide();
                    $('.range_div').show(400);
                    $('.polygon_div').hide();
                } else if (type == 'polygon') {
                    $('.area_div').hide();
                    $('.res_div').hide();
                    $('.range_div').hide();
                    $('.polygon_div').show(400);
                }
            }

        }
    });

    $("#notifications").validationEngine();

    $('#notifications').submit(function (evnt) {


        if (useUserToken) {

            if (!$('#message').val()) {
                event.preventDefault();
                noty({ text: 'Empty Message', layout: 'topCenter', type: 'error', timeout: 2000 });
                return;
            }
            if (!android_token && !ios_token) {
                event.preventDefault();
                noty({ text: 'please select a token file ', layout: 'topCenter', type: 'error', timeout: 2000 });
                return;
            } else {
                if (confirm(' Are You Sure ? ')) {

                    if (android_token) {
                        var message = $('#message').val();

                        $.ajax({
                            type: "POST",
                            url: base_url + '/notifications/send_android_token_notifications',
                            dataType: "json",
                            data: {
                                useToken: true,
                                message: message,
                                tokens: android_token
                            },
                            success: function () {
                                noty({ text: 'success', layout: 'topCenter', type: 'success', timeout: 2000 });
                                $('#message').val('');
                            },
                            error: function () {
                                noty({ text: 'Error with send android token', layout: 'topCenter', type: 'error', timeout: 2000 })

                            }
                        })
                    }
                    if (ios_token) {
                        var message = $('#message').val();

                        $.ajax({
                            type: "POST",
                            url: base_url + '/notifications/send_ios_token_notifications',
                            dataType: "json",
                            data: {
                                useToken: true,
                                message: message,
                                tokens: ios_token
                            },
                            success: function () {
                                noty({ text: 'success', layout: 'topCenter', type: 'success', timeout: 2000 });
                                $('#message').val('');


                            },
                            error: function () {
                                noty({ text: 'Error with send ios token', layout: 'topCenter', type: 'error', timeout: 2000 });
                            }
                        })
                    }
                }
            }
        } else {


            var valid = $("#notifications").validationEngine('validate');
            var vars = $("#notifications").serialize();

            if (valid == true) {
                evnt.preventDefault();
                evnt.stopImmediatePropagation();

                if ($('#area').val() == []) {
                } else {
                    console.log('area');
                    console.log($('#area').val());
                }

                // } else {
                //     noty({ text: 'Error', layout: 'topCenter', type: 'error', timeout: 3000 });
                // }
                var app = $('#app').val();
                // var data = $(this).serialize();
                if (($('#message').val()) && (app.length > 0)) {
                    noty({
                        text: 'Do you want to continue?', layout: 'topCenter', container: '.custom-container', buttons: [
                            {
                                addClass: 'btn btn-success btn-clean ntf-send', text: 'Send', onClick: function ($noty) {

                                    var message = $('#message').val();
                                    var sendTime = $('#sendTime').val();
                                    var inlineRadio1 = $('#inlineRadio1').val();
                                    var app = $('#app').val();
                                    var area = $('#area').val();
                                    var restaurant = $('#restaurant').val();
                                    var range = $('#range').val();
                                    var polygon = $('#polygon').val();
                                    var version = $('#version').val();

                                    data = {
                                        message: message,
                                        sendTime: sendTime,
                                        inlineRadio1: inlineRadio1,
                                        app: app,
                                        area: area,
                                        restaurant: restaurant,
                                        range: range,
                                        polygon: polygon,
                                        version: version

                                    }
                                    console.log('polygon data');
                                    console.log(data);
                                    if (app.length > 1) {
                                        show_loader();
                                        $.ajax({
                                            type: "POST",
                                            url: base_url + '/notifications/send_ios_token_notifications',
                                            dataType: "json",
                                            data: data,
                                            success: function (data) {
                                                hide_loader();
                                                // document.location = base_url + '/notifications/notifications_view';
                                            },
                                            error: function (response) {

                                                noty({ text: 'Error with send ios token', layout: 'topCenter', type: 'error', timeout: 3000 });
                                            }
                                        });
                                        show_loader();
                                        $.ajax({
                                            type: "POST",
                                            url: base_url + '/notifications/send_android_token_notifications',
                                            dataType: "json",
                                            data: data,
                                            success: function (data) {
                                                hide_loader();
                                                // document.location = base_url + '/notifications/notifications_view';
                                            },
                                            error: function (response) {

                                                noty({ text: 'Error with send android token', layout: 'topCenter', type: 'error', timeout: 3000 });
                                            }
                                        });




                                    } else {

                                        show_loader();

                                        if (app[0] == 'IOS') {

                                            $.ajax({
                                                type: "POST",
                                                url: base_url + '/notifications/send_ios_token_notifications',
                                                dataType: "json",
                                                data: data,
                                                success: function (data) {

                                                    // document.location = base_url + '/notifications/notifications_view';
                                                },
                                                error: function (response) {
                                                    hide_loader();
                                                    noty({ text: 'Error with send ios token', layout: 'topCenter', type: 'error', timeout: 3000 });
                                                }
                                            });

                                        }
                                        if (app[0] == 'Android') {
                                            $.ajax({
                                                type: "POST",
                                                url: base_url + '/notifications/send_android_token_notifications',
                                                dataType: "json",
                                                data: data,
                                                success: function (data) {

                                                },
                                                error: function (response) {
                                                    noty({ text: 'Error with send android token', layout: 'topCenter', type: 'error', timeout: 3000 });
                                                }
                                            });

                                        }


                                    }


                                    $.ajax({
                                        type: "POST",
                                        url: base_url + '/notifications/add_notification',
                                        dataType: "json",
                                        data: data,
                                        success: function (data) { },
                                        error: function (response) {

                                            noty({ text: 'Error with add notification', layout: 'topCenter', type: 'error', timeout: 3000 });
                                        }
                                    });

                                    $noty.close();
                                }
                            }
                            ,
                            {
                                addClass: 'btn btn-danger btn-clean', text: 'Cancel', onClick: function ($noty) {
                                    $noty.close();
                                    noty({ text: 'You clicked "Cancel" button', layout: 'topRight', type: 'error', timeout: 3000 });
                                }
                            }
                        ]

                    });
                } else {
                    if ((!($('#message').val())) && (app.length == 0)) {
                        noty({ text: 'Please Input Message And Select App', layout: 'topRight', type: 'error', timeout: 3000 });
                    }
                    else if (app.length == 0) {
                        noty({ text: 'Please Select App', layout: 'topRight', type: 'error', timeout: 3000 });
                    } else if (!($('#message').val())) {
                        noty({ text: 'Please Input Message', layout: 'topRight', type: 'error', timeout: 3000 });
                    }

                }
            }
        }
    });


    $('.clear').click(function () {
        document.location.reload();
    });

});
