var msg_id = 0;
var arabic_message = msg_id + 1;
var english_message = arabic_message + 1;
var city = english_message + 1;
var type = city + 1;
var created = type + 1;
var start_date = created + 1;
var end_date = start_date + 1;
var available = end_date + 1;



$(document).ready(function () {
  
    var ar_msg = $('#ar_msg');
    var en_msg = $('#en_msg');
    var str_date = $('#str_date');
    var end_date = $('#end_date');
    var end_date2 = $('#end_date2');
    var type = $('#type');
    var city = $('#city');

    ar_msg.val('');
    en_msg.val('');
    $("#marketing_parent").addClass("active");
    $("#report_page ").addClass("active");

    $("#str_date").datepicker({
        format: 'yyyy-mm-dd',
    });
    $("#str_date").datepicker('setDate', new Date());
    $("#end_date").datepicker({
        format: 'yyyy-mm-dd',
    });
    $("#end_date").datepicker('setDate', new Date());

    $("#str_date2").datepicker({
        format: 'yyyy-mm-dd',
    });
    $("#str_date2").datepicker('setDate', new Date());
    $("#end_date2").datepicker({
        format: 'yyyy-mm-dd',
    });
    $("#end_date2").datepicker('setDate', new Date());

    $(".add-new").on("click", function () {
        $("#iconPreview").modal("show");
        $("#iconPreview3").modal("hide");
    });

    var table = $('#report_table').DataTable({
        "ordering": true,
        "destroy": true,
        "bInfo": false,
        "bPaginate": true,
        "bLengthChange": true,
        "searching": true,
        "scrollX": true,
        "bSearchable": true,
        "bProcessing": true,
        "emptyTable": "No data available in table",
        "ajax": base_url + '/marketing_cpanel/report_json/',
        columnDefs: [
            {
                "targets": msg_id,
                "visible": false,
            },
            {
                "targets": available,
                "render": function (data) {
                    var status = '';
                    if (data == 1) {
                        status = "checked";
                    }
                    return '<label class="switch switch-small">' +
                        ' <input type="checkbox" class="btn-active" ' + status + '>' +
                        ' <span></span>' + ' </label>'
                }
            }
        ]
    });

    $('tbody').on('click', '.btn-active', function () {
        var id = table.row($(this).parents('tr')).data()[0];
        let exp_date = Date.parse(table.row($(this).parents('tr')).data()[7]);
        let now = Date.now();
        console.log($(this).is(':checked'));
        
        if($(this).is(':checked') == false){
            var status = 0;
            var data = [id, status];
            update_report('update', data)
        }else{
            if (now < exp_date) {
                var status = 0;
                if ($(this).is(':checked')) {
                    status = 1;
                }
                var data = [id, status];
                update_report('update', data)
            } else {
                if (confirm('out of date , change ? ')) {
                    $("#iconPreview_date").modal("show");
                    $('#change-date').click(function (e) {
                        e.preventDefault();
                        update_report('changeExpire', [id, end_date2.val()]);
                        update_report('update', [id, 1]);
                        $("#iconPreview_date").modal("hide");  
                    });
                } else {
                    window.location.reload();
                }
            }
        }

  

    })

    $('#add-new').click(function (e) {
        e.preventDefault();
        var data = new Array();
        data.push(ar_msg.val());
        data.push(en_msg.val());
        data.push(str_date.val());
        data.push(end_date.val());
        data.push(type.val());
        data.push(city.find(':selected').attr('id'));
        update_report("add", data);
        $("#iconPreview").modal("hide");
    });



    function update_report(key, data) {
        if (key == 'update')  // update available 
        {
            $.ajax({
                type: "POST",
                url: base_url + '/marketing_cpanel/update_report/',
                cache: false,
                data: {
                    id: data[0],
                    status: data[1]
                },
                success: function () {
                    table.ajax.url(base_url + '/marketing_cpanel/report_json/')
                        .load();
                    noty({
                        text: "Successful Update",
                        layout: "topCenter",
                        type: "success",
                        timeout: 1000
                    });
                }
            })
        } else if (key == 'add') {
            $.ajax({
                type: "POST",
                url: base_url + '/marketing_cpanel/add_popup_msg/',
                cache: false,
                data: {
                    ar_msg: data[0],
                    en_msg: data[1],
                    str_date: data[2],
                    end_date: data[3],
                    type: data[4],
                    city: data[5]
                },
                success: function (data) {

                    if (data != 'empty') {
                        table.ajax.url(base_url + '/marketing_cpanel/report_json/')
                            .load();
                        noty({
                            text: "Added Successfuly",
                            layout: "topCenter",
                            type: "success",
                            timeout: 1000
                        });
                        ar_msg.val('');
                        en_msg.val('');
                    } else {
                        noty({ text: "Empty ", layout: "topCenter", type: "error", timeout: 1000 });
                    }
                }
            })
        } else if (key == 'changeExpire') {
            $.ajax({
                data: {
                    id: data[0],
                    expire_date: data[1]
                },
                type: "POST",
                url: base_url + '/marketing_cpanel/update_expire_date/',
                cache: false
                ,error:function() {
                    noty({
                        text: "can not change date , please try again",
                        layout: "topCenter",
                        type: "error",
                        timeout: 1000
                    });
                    return false;
                },
            })

        }
    }


}); // end Jquery