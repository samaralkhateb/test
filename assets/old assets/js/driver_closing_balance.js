

var id_index = 0;
var name_index = id_index + 1;
var accounting_code_index = name_index + 1;
var commision_index = accounting_code_index + 1;
var delivery_index = commision_index + 1;
var res_commission_index = delivery_index + 1;
var ghost_index = res_commission_index + 1; 
var balance_index = ghost_index + 1;


var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1


$(document).ready(function () {

    $("#accounting_parent").addClass("active");
    $("#driver_closing_balance_rep").addClass("active");

    $(".start_date_d").datepicker({
        autoclose: true,
        minViewMode: 1,
        startView: 1
    });
    $(".start_date_d").datepicker("setDate", new Date());
    var table;
 
    table = $("#driver_closing_balance").DataTable({
        ordering: true,
        destroy: true,
        bInfo: true,
        bPaginate: true,
        searching: true,
        bSearchable: true,
        bProcessing: true,
        //  deferLoading: 57,
        bLengthChange: true,
        emptyTable: "No data available in table",
        bServerSide: false,
        scrollX: true,
        iDisplayLength: -1,
        sAjaxSource: base_url + "/accounting/driver_closing_balance_report/format/json?start_date=" + $("#start_date").val() ,

        order: [id_index, "asc"],
        colReorder: true,
        " responsive": true,
        dom: 'Bfrtip',
        buttons: [
            'print'
        ],
        columnDefs: [
            {
                targets: [id_index],
                visible: false
            } 
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {




            $("td .name", nRow).attr("value", aData[name_index]);
            $("td .name", nRow).attr("id", aData[id_index] + "_name");

            $("td .res_accounting_code", nRow).attr("value", aData[accounting_code_index]);
            $("td .res_accounting_code", nRow).attr("id", aData[id_index] + "_accounting_code");

 

            $("td .delivery", nRow).attr("value", aData[delivery_index]);
            $("td .delivery", nRow).attr("id", aData[id_index] + "_delivery");

            $("td .commision", nRow).attr("value", aData[commision_index]);
            $("td .commision", nRow).attr("id", aData[id_index] + "_commision");
 

              
            var api = this.api(), aData;

            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            // total  due_from_restaurant
            balance = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(5).footer()).html(
                format(balance)
            );  
 

        }
    });

    function format(x) {
        return isNaN(x) ? "" : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }





    $(".start_date_d").on("changeDate", function() { 
      table.ajax
        .url(
          base_url +
            "/accounting/driver_closing_balance_report/format/json?start_date=" +
            $("#start_date").val()
        )
        .load();
    });



    






});







