

var id_index = 0;
var name_index = id_index + 1;
var accounting_code_index = name_index + 1;
var due_from_restaurant_index = accounting_code_index + 1; 

var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1


$(document).ready(function () {

    $("#accounting_parent").addClass("active");
    $("#closing_balance_rep").addClass("active");

 

    $(".start_date_d").datepicker({
      autoclose: true,
      minViewMode: 1,
      startView: 1
       });  
   
    $(".start_date_d").datepicker("setDate", new Date());
    var table;
    
    var start_date = $("#start_date").val(); 
    var selectPer = $("#period_id").val(); 
    
    table = $("#closing_balance").DataTable({
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
        sAjaxSource: base_url + "/accounting/closing_balance_report/format/json?start_date=" + $("#start_date").val()
            + '&period='
            + selectPer  ,

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


            $("td .due", nRow).attr("value", aData[due_from_restaurant_index]);
            $("td .due", nRow).attr("id", aData[id_index] + "_due");

        
            var api = this.api(), aData;

            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            // total  due_from_restaurant
            due  = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(3).footer()).html(
                format(due) 
            );  


        }
    });



    function format(x) {
        return isNaN(x) ? "" : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
 


    $('.start_date_d').on('changeDate', function () {
        var selectPer = $("#period_id").val();
        console.log(selectPer);
            table.ajax
                .url(
                    base_url +
                    "/accounting/closing_balance_report/format/json?start_date=" + $("#start_date").val() 
                    + '&period='
                    + selectPer 
                )
                .load();
         


    });

    $('#period_id').on('change', function () {
        var selectPer = $("#period_id").val(); 
        table.ajax
            .url(
                base_url +
                "/accounting/closing_balance_report/format/json?start_date=" + $("#start_date").val()
                + '&period='
                + selectPer
            )
            .load();



    });
 
    $('.display').on('change', 'td', function () {

        table = $('#closing_balance').DataTable();
        var datarow = table.row(this).data();
        var accounting_code_column = accounting_code_index - invisible_columns;

        if ($(this).index() === accounting_code_column) {
            var rest_id = datarow[id_index];
            var data = {
                rest_id: rest_id,
                accounting_code : $("#" + datarow[id_index] + "_accounting_code").val(),
               
            };
console.log('data');
            console.log(data);

            $.ajax({
                type: "post",
                url: base_url + '/restaurants/update_rest_accounting_code?format=json',
                dataType: 'json',
                cache: false,
                data: data,
                success: function (response) {
                      // location.reload();
                    noty({
                        timeout: 1500,
                        text: "Updated",
                        layout: 'topCenter',
                        type: 'success'

                    });

                }
            });


        }



    });









});







