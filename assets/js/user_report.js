var user_id = 0;
var user_mobile = user_id + 1;
var registeration_date = user_mobile + 1;
var last_login = registeration_date + 1;
var all_orders = last_login + 1;
var  last_30_days_orders = all_orders + 1;

$(function() {

    $("#marketing_parent").addClass("active");
    $("#user_report ").addClass("active");


    $(".datepicker").datepicker('setDate', new Date());   
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });


    var  table = $("#user_report_table").DataTable({ 
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
        "ajax": base_url + '/users/active_ordering_user/' + $("#from_date").val() + '/' + $("#to_date").val(),
        columnDefs: [
            {
              "targets": user_id,
              "visible": false,
              },
            ]
    });

    $('.datepicker').on('changeDate', function () {
        table.ajax.url(base_url + '/users/active_ordering_user/' + $("#from_date").val() + '/' + $("#to_date").val()) 
        .load();
     });

});