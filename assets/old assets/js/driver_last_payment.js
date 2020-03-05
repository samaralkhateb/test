var payment_id_index = 0;
var last_order_date_index = payment_id_index + 1;
var last_payment_date_index = last_order_date_index + 1;
var payment_name_index = last_payment_date_index + 1;
var payment_balance_index = payment_name_index + 1;
 
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function () {
 

    $("#accounting_parent").addClass("active");
    $("#driver_last_payment_report").addClass("active");

    var table = $("#driver_last_payment").DataTable({
      ordering: true,
      destroy: true,
      bInfo: true,
      bPaginate: true,
      bLengthChange: false,
      searching: true,
      bSearchable: true,
      bProcessing: true,
      emptyTable: "No data available in table",
      bServerSide: false,
      scrollX: true, 
      iDisplayLength: -1,
      sAjaxSource:

          base_url + "/accounting/driver_last_payment_report/format/json" ,

      order: [payment_balance_index, "asc"],
      //  dom: 'Blfrtip',
      colReorder: true,
      " responsive": true,

      columnDefs: [
        {
              targets: [payment_id_index],
          visible: false
        }
      ],
      fnRowCallback: function(nRow,aData,iDisplayIndex,iDisplayIndexFull) {
        $("td .last_payment", nRow).attr("value", aData[last_payment_date_index]);
        $("td .last_payment", nRow).attr("id", aData[payment_id_index] + "_last_payment");

        $("td .last_order", nRow).attr("value", aData[last_order_date_index]);
        $("td .last_order", nRow).attr("id", aData[payment_id_index] + "_last_order");

        

        $("td .name", nRow).attr("value", aData[payment_name_index]);
        $("td .name", nRow).attr("id", aData[payment_id_index] + "_name");

        $("td .balance", nRow).attr("value", aData[payment_balance_index]);
        $("td .balance", nRow).attr( "id", aData[payment_id_index] + "_balance" );


      },
      "footerCallback": function ( row, data, start, end, display ) {
        var api = this.api(), data;

        var intVal = function (i) {
          return typeof i === 'string' ?
            i.replace(/[\$,]/g, '') * 1 :
            typeof i === 'number' ?
              i : 0;
        };
                   // total balance
                   balance = api
                     .column(4)
                     .data()
                     .reduce(function (a, b) {
                      return intVal(a) + intVal(b);
                     }, 0);

                   $(api.column(4).footer()).html(balance); 
        console.log('balance');
        console.log(balance);
      }

    });
  

   
});











