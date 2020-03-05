var payment_id_index = 0;
var balance_date_index = payment_id_index + 1; 
var payment_name_index = balance_date_index + 1;
var payment_balance_index = payment_name_index + 1;
 
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function () {
  $("#start_date").datepicker("setDate", new Date());
    $("#accounting_parent").addClass("active");
    $("#driver_balance_report").addClass("active");

    var table = $("#driver_balance").DataTable({
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
          base_url + "/accounting/driver_balance_report/format/json?start_date=" + $("#start_date").val() ,
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

        $("td .balance_date", nRow).attr("value", aData[balance_date_index]);
        $("td .balance_date", nRow).attr("id", aData[payment_id_index] + "_balance_date");

        

        $("td .name", nRow).attr("value", aData[payment_name_index]);
        $("td .name", nRow).attr("id", aData[payment_id_index] + "_name");

        $("td .balance", nRow).attr("value", aData[payment_balance_index]);
        $("td .balance", nRow).attr( "id", aData[payment_id_index] + "_balance" );



        var api = this.api(), aData;

        var intVal = function (i) {
          return typeof i === 'string' ?
            i.replace(/[\$,]/g, '') * 1 :
            typeof i === 'number' ?
              i : 0;
        };


          
                   // total balance
                   balance = api
                     .column(3)
                     .data()
                     .reduce(function (a, b) {
                      return intVal(a) + intVal(b);
                     }, 0);

                   $(api.column(3).footer()).html(balance); 
        console.log('balance');
        console.log(balance);
      }
    });
  
  
  
    $("#start_date").on("changeDate", function() { 
      table.ajax
        .url(
          base_url + "/accounting/driver_balance_report/format/json?start_date=" + $("#start_date").val() 
        )
        .load();
    });
  
  
});











