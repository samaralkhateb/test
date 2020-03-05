

var id_index = 0;
var start_date_index = id_index + 1;
var end_date_index = start_date_index + 1;
var commission_index = end_date_index + 1;
var driver_name_index = commission_index + 1;
 
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1


$(document).ready(function () {

    $("#accounting_parent").addClass("active");
  $("#drivers_commission_report").addClass("active");


    $(".datepicker").datepicker('setDate', new Date());
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });

    // $('#drivers_daily_form').submit(function (evnt) {


    // evnt.preventDefault();
    // evnt.stopImmediatePropagation();
    var table;
    // var driver_id = $("#driver_id").val();

    // var start_date = $("#start_date").val();
    // var end_date = $("#end_date").val();

    // console.log(driver_id);

    table = $("#drivers_commission").DataTable({
      ordering: true,
      destroy: true,
      bInfo: true,
      bPaginate: true,
      bLengthChange: false,
      searching: true,
      bSearchable: true,
      bProcessing: true,
      //  deferLoading: 57,
      emptyTable: "No data available in table",
      bServerSide: false,
      scrollX: true,
      iDisplayLength: -1,
      sAjaxSource:
        base_url +
        "/drivers/drivers_commission/format/json",
        // ?driver_id=" +
        // $("#driver_id").val() +
        // "&start_date=" +
        // $("#start_date").val() +
        // "&end_date=" +
        // $("#end_date").val(),
        

      order: [id_index, "asc"],
      colReorder: true,
      " responsive": true,
      columnDefs: [
        {
          targets: [id_index],
          visible: false
        }
      ],
      fnRowCallback: function(
        nRow,
        aData,
        iDisplayIndex,
        iDisplayIndexFull
      ) {
        $("td .edit-driver", nRow).attr("value", aData[id_index]);

          $("td .start_date", nRow).attr("value", aData[start_date_index]);
          $("td .start_date", nRow).attr("id", aData[id_index] + "_start_date");

          $("td .end_date", nRow).attr("value", aData[end_date_index]);
          $("td .end_date", nRow).attr("id", aData[id_index] + "_end_date");

          $("td .commission", nRow).attr("value", aData[commission_index]);
          $("td .commission", nRow).attr("id", aData[id_index] + "_commission");

          $("td .driver_name", nRow).attr("value", aData[driver_name_index]);
          $("td .driver_name", nRow).attr("id", aData[id_index] + "_driver_name");

      }
    });


     

    $("#add_new_drivers_commission").bind("click", function(event) {
      $("#driver").empty();
      $("#driver").attr("value", $("#driver_id option:selected").text());
      $("#driver").attr("text", $("#driver_id option:selected").text());
    });

    $("#add_new_drivers_commission_but").bind("click", function(event) {
      $("#driver").empty();
      $("#driver").attr("value", $("#driver_id option:selected").text());
      $("#driver").attr("text", $("#driver_id option:selected").text());

      var data = { 
                driver_id: $("#driver_id").val(), 
                start_date: $("#start_date").val(), 
                // end_date: $("#end_date").val(), 
                commission: $("#commission").val() };

      console.log(data);
        var url = base_url + "/drivers/new_drivers_commission?format=json";
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        success: function(response) {
          noty({
            text: "Successful action",
            layout: "topRight",
            type: "success"
          });
            window.location.href = "drivers_commission_report";
        },
        error: function() {
          noty({ text: "error action", layout: "topRight", type: "error" });
        }
      });
    });







});







