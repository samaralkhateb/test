$(document).ready(function () {

    var token = $("#token").val();
    var time = $("#time").val();


    $("#dashboard_parent").addClass("active");
    $("#external_order").addClass("active");

    

    $('select[name="id_user_address"]').change(function () {
        var id   = $(this).find("option:selected").attr("value");
        var name = $(this).find("option:selected").text();
 
    
        $("#user_address").modal("show");
        showUserAddress(id,name);
    });

    $('input[name="search_user"]').change(function () {

            $("#whoWasChoosen").empty();
        var choose = $(this).attr("class");
        $("#" + choose).fadeIn();
        $('.search').not('#' + choose).fadeOut();
    });
    $("#user_phone").keyup(function () {


        //   $('#selected_users').empty(); 
        //   $('#selected_users').hide();   

        var phone = $("#user_phone").val();


        if (phone.length >= 5) {
            $("#result").empty();
            $("#result").show();
            var data = {
                phone: phone,
            };

            url = base_url + '/external_orders/get_all_external_users_phone';
            jQuery.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                data: data,
                success: function (response) {
                    $.each(response.done, function (i, item) {

                        $("#result").append('<li data-toggle="modal" data-target="#user_address" onclick="showUserAddress(' + item.id + ',\''+ item.name +'\');" class="list-group-item link-class">' + '<strong id="name_user_label_' + item.id + '">' + item.name + '</strong>' + '  ' + item.mobile + '</li>');
                    });
                },
                error: function (response) {
                }
            });
        } else
        {
            $('#result').empty();
        }

    });


    /* $("#selected_users").click(function(){
     
     
     var selectedOne =  $("#selected_users option:selected").text();
     var selectedOne_val =  $("#selected_users option:selected").val();
     // set the input value
     $('#user_phone').val(selectedOne);  
     $('#id_user_choosen').val(selectedOne_val);  
     
     }); */

    /*    $("li.link-class").on('click',function(){
     
     $("#result").hide();
     
     });
     */

    $("#add_new_user").click(function () {




        $("#add_new_user_form").validate({
            submitHandler: function (form) {
                var name = $("#name_user").val();
                var phone = $("#phone_user").val();
                var name_address = $("#name_address").val();
                var street = $("#street_address").val();
                var near = $("#near_address").val();
                var floor = $("#floor_address").val();
                var area = $("#area option:selected").val();
                var area_text = $("#area option:selected").text();
                var details = $("#details_address").val();
                var data = {
                    name: name,
                    phone: phone,
                    name_address: name_address,
                    street: street,
                    near: near,
                    floor: floor,
                    area: area,
                    details: details,

                };
                var url = base_url + '/users/add_new_user';
                $.ajax(
                        {
                            url: url,
                            type: "post",
                            dataType: "json",
                            data: data,
                            success: function (response) {
                                noty({text: 'Successful action', layout: 'topRight', type: 'success', timeout: 3000});

                                $('#id_user_choosen').val(response['user_id']);
                                $("#id_user_address").val(response['address_id']);
                                $("#whoWasChoosen").text(name + " " + area_text + " " + street);

                                //    $("#add_new_user").attr("data-dismiss","modal");
                                $('#new_user').modal('toggle');

                            },
                            error: function () {
                                noty({text: 'error action', layout: 'topRight', type: 'error', timeout: 3000});
                            }
                        });



            }

        });

    });

    $("button#new_external_order").click(function () {



        data = {
            "restaurant": $("#restaurant").val(),
            "driver": $("#driver_ex_order").val(),
            "fee": $("#fee").val(),
            "id_user_address": $("#id_user_address").val(),
            "order_note": $("#order_note").val(),
        };
        console.log(data);
        $.ajax({
            data: data,
            url: base_url + '/external_orders/new_external_order',
            type: "POST",
            dataType: "json",
            success: function (response) {
                noty({text: 'Successful action', layout: 'topRight', type: 'success', timeout: 3000});
                window.location.href = "external_order_view";
                $('#id_user_choosen').val(response['data']);

            },
            error: function () {
                noty({text: 'error action', layout: 'topRight', type: 'error', timeout: 3000});
            }


        });

    });


    if ($(".select").length > 0) {
        $(".select").selectpicker();

        $(".select").on("change", function () {
            if ($(this).val() == "" || null === $(this).val()) {
                if (!$(this).attr("multiple"))
                    $(this).val("").find("option").removeAttr("selected").prop("selected", false);
            } else {
                $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
            }
        });
    }

    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('input').trigger('reset');
    })

     $("#user_address").on('shown.bs.modal',function(){
     
        //$(".add_new_address").fadeOut()();  
        $(".add_new_address").hide();
         
     });

});

function showUserAddress(id,name) {

    data = {id: id};
    console.log(name);
    $("#whoWasChoosen").text(name);

    //var name = $("strong#name_user_label_" + id).text();

    $("#user_address .modal-title").empty();
    $("#user_address .modal-title").text(name);
    $("#result").hide();
    $.ajax({
        data: data,
        url: base_url + '/users/get_user_address',
        type: "POST",
        dataType: "json",
        success: function (data) {
            $(".user_address_radio").empty();
            $("#user_id_address").val(id);
            console.log(data.data.length);
            var content = "";
            if (data.data.length > 0)
            {

                $.each(data.data, function (i, item) {

                    var id = data.data[i]["id"];
                    var area = data.data[i]["ar_name"];
                    var street = data.data[i]["street"];
                    var near = data.data[i]["near"];
                    content += '<div class="radio">\n\
                                    <label id="' + id + '" ><input type="radio" name="address" value="' + id + '">' + area + '  ' + street + '  ' + near + '</label>\n\
                                 </div>';
                });
            } else
            {
                content += "<label>no address for this user</label>";
            }
            $(".user_address_radio").append(content);
            $(".user_address_radio").append('<div class="row">\n\
                                                         <a id="add_new_address" onclick="show_add_new_address();" style="cursor:pointer">\n\
                                                            <label>Add New Address</label>\n\
                                                         </a>\n\
                                                   </div><br>');
        },
    });
}

function show_add_new_address() {


    if ($(".add_new_address").css("display") === "none")
    {
        $(".add_new_address").fadeIn();
        $('input[name="address"]').attr("checked", false);
        $("#add_new_address").text("Close Add New Address");
    } else
    {

        $(".add_new_address").fadeOut();

        $("#add_new_address").text("Add New Address");
    }
}

function add_new_address() {


    var nameUser = $("#whoWasChoosen").text();

    if ($(".add_new_address").css("display") === "none")
    {
        var user_address_id = $('input[name="address"]:checked').val();
        $("#id_user_address").val(user_address_id);
        var txt = $("label#" + user_address_id).text();
        $("#whoWasChoosen").text(nameUser + " " + txt);
        console.log(user_address_id);
        $('#user_address').modal('toggle');
    } else
    {
        $("#user_address_form").validate({
            submitHandler: function (form) {

                var id = $("#user_id_address").val();
                var name_address = $("#name_new_address").val();
                var street = $("#street_new_address").val();
                var near = $("#near_new_address").val();
                var floor = $("#floor_new_address").val();
                var area = $("#new_area option:selected").val();
                var area_txt = $("#new_area option:selected").text();
                var details = $("#details_new_address").val();
                var data = {
                    user_id: id,
                    name_address: name_address,
                    street: street,
                    near: near,
                    floor: floor,
                    area: area,
                    details: details,

                };
                var url = base_url + '/users/add_new_user_address';
                $.ajax(
                        {
                            url: url,
                            type: "post",
                            dataType: "json",
                            data: data,
                            success: function (response) {
                                noty({text: 'Successful action', layout: 'topRight', type: 'success', timeout: 3000});
                                $('#id_user_address').val(response['data']);
                                $("#whoWasChoosen").text(nameUser + " " + area_txt + " " + street);
                                console.log($('#id_user_address').val());
                                $(".add_new_address").fadeOut();
                                   $('#user_address').modal('toggle');

                            },
                            error: function () {
                                noty({text: 'error action', layout: 'topRight', type: 'error', timeout: 3000});
                            }
                        });

            }

        });

    }

}