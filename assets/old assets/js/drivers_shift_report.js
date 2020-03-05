$(document).ready(function () {
    $("#dirvers_parent").addClass("active");
    $("#drivers_shift_orders").addClass("active");


        table = $("#drivers_shift_orders_report").DataTable({
            "ordering": true,
            "destroy": true,
            "bInfo": false,
            "bPaginate": true,
            "bLengthChange": true,
            "searching": true,
            "bSearchable":true,
            "bProcessing": true,
            "scrollX": true,
            "responsive": true,
            "deferLoading": 57,
            "emptyTable": "No data available in table",
            "bServerSide": false,
            "sAjaxSource": base_url + '/drivers/driver_orders_acc_and_ref_report/format/json?start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val(),
        "order": [[4, "desc"]],
        //    dom: 'Blfrtip',

             colReorder: true,
        buttons: [


        ],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },





            {
                "targets": [1],
                "data": null,
                "defaultContent": '<span class="details-control"></span>',
                "render": function (data, type, row, meta) { // render event defines the markup of the cell text

                        return data;

                }

            },

        ],


    });




    $('.display').on('click', 'td', function () {

        table = $('#drivers_shift_orders_report').DataTable();
        var datarow = table.row(this).data();
        if (datarow){


        $(".end-km-div .col-md-4 span").empty();
        var driver_id = datarow[0];
        if ($(this).index() === 0) {

            var tr = $(this).closest('tr');
            var row = table.row(tr);
            // $.ajax({
            //     data: { driver_id: driver_id },
            //     type: "get",
            //     url: base_url + '/drivers/drivers_shift_report?format=json&start_date='
            //         + $("#from-date").val()
            //         + '&end_date='
            //         + $("#to-date").val(),
            //     dataType: 'json',
            //     cache: false,
            //     success: function (response) {
                    // console.log(response);
                    if (row.child.isShown()) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        var datarow = table.row(this).data();
                        //console.log(datarow);

                        // console.log('status');
                        // console.log(datarow[7]);
                        console.log(datarow[11]);
                        row.child(format(datarow[11])).show();
                        tr.addClass('shown');
                    }

                // },
                // error: function () {
                //     console.log("error");
                // }

            // });

        }
    }

    });






    $('.datepicker').on('changeDate', function () {
        table.ajax.url(base_url + '/drivers/driver_orders_acc_and_ref_report/format/json?start_date='
            + $("#from-date").val()
            + '&end_date='
            + $("#to-date").val()).load();

    });
});




$(".datepicker").datepicker({
    format: 'yyyy-mm-dd',
});
$(".datepicker").datepicker('setDate', new Date());




function format(d) {



    if (d) {
        var table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
        table += '<tr>' +
            '<td><strong>  CHECK IN </strong></td>' +
            '<td><strong>  CHECK OUT </strong></td>' +
            '<td><strong>  Hour Work </strong></td>' +

            '</tr>';

            console.log('d');
            console.log(d);
        for (var i = 0; i < d.length; i++) {

                table +=
                    '<tr>' +
                    '<td>' + d[i][0] + '</td>' +
                    '<td>' + d[i][1] + '</td>' +
                    '<td>' + d[i][2] + '</td>' +
                    '</tr>';
                 }

        table += '</table>';
        return table;
    }
    else {
        return null;
    }
}
