
    
var id_index = 0;
var date_index = id_index + 1;
var type_index = date_index + 1;
var bill_id_index = type_index + 1;

var restaurant_queue_index = bill_id_index + 1;
var name_index = restaurant_queue_index + 1;
var delivery_index = name_index + 1;
var debit_index = delivery_index + 1;
var credit_index = debit_index + 1;
var balance_index = credit_index + 1; 
var payment_no_index = balance_index + 1;
var action_by_index = payment_no_index + 1;
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1


$(document).ready(function() {
   
    $("#accounting_parent").addClass("active");
    $("#drivers_daily").addClass("active");


  $(".datepicker").datepicker('setDate', new Date());
  $(".datepicker").datepicker({
    format: 'yyyy-mm-dd',
  });  

// $('#drivers_daily_form').submit(function (evnt) {
              
   
// evnt.preventDefault();
// evnt.stopImmediatePropagation();
var table;   
var driver_id = $("#driver_id").val();

  var start_date = $("#start_date").val();
  var end_date = $("#end_date").val();

  // console.log(driver_id);

               table = $("#d_daily").DataTable({
                "ordering": true,
                "destroy": true,
                "bInfo": false,
                "bPaginate": true,
                "bLengthChange": true,
                "searching": true,
                "bSearchable":true,
                "bProcessing": true,
                "deferLoading": 57,
                "emptyTable": "No data available in table",
                "bServerSide": false,
                "scrollX": true,
                "responsive": true,
                 "iDisplayLength": -1,
                 "sAjaxSource":  base_url + "/drivers/driver_statment/format/json?driver_id=" + $("#driver_id").val()+
                 "&start_date="  + $("#start_date").val()  
                 + "&end_date=" + $("#end_date").val(),
                 
                 order: [id_index, "asc"],
                 colReorder: true,
                 " responsive": true,
                 dom: 'Blfrtip',
                 
                 buttons: [

                   {
                     extend: 'excel',
                   }
                 ],
                 columnDefs: [
                   {
                     targets: [id_index],
                     visible: false
                   }
                 ],
                 fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
      
                   
                     $("td .edit-driver", nRow).attr("value", aData[id_index]);

                     $("td .bill_id", nRow).attr("value", aData[bill_id_index]);
                     $("td .bill_id", nRow).attr("id", aData[id_index] + "_bill_id");

                   $("td .delivery", nRow).attr("value", aData[delivery_index]);
                   $("td .delivery", nRow).attr("id", aData[id_index] + "_delivery");
                   

                     $("td .date", nRow).attr("value", aData[date_index]);
                     $("td .date", nRow).attr("id", aData[id_index] + "_date");

                     $("td .debit", nRow).attr("value", aData[debit_index]);
                     $("td .debit", nRow).attr("id", aData[id_index] + "_debit");

                     $("td .type", nRow).attr("value", aData[type_index]);
                     $("td .type", nRow).attr("id", aData[id_index] + "_type");

                     $("td .credit", nRow).attr("value", aData[credit_index]);
                     $("td .credit", nRow).attr("id", aData[id_index] + "_credit");

                     $("td .balance", nRow).attr("value", aData[balance_index]);
                     $("td .balance", nRow).attr("id", aData[id_index] + "_balance");

                   $("td .payment_no", nRow).attr("value", aData[payment_no_index]);
                   $("td .payment_no", nRow).attr("id", aData[id_index] + "_payment_no");
 
                   
                   $("td .queue", nRow).attr("value", aData[restaurant_queue_index]);
                   $("td .queue", nRow).attr("id", aData[id_index] + "_queue");
                   

                   $("td .name", nRow).attr("value", aData[name_index]);
                   $("td .name", nRow).attr("id", aData[id_index] + "_name");
                   
                   $("td .action_by", nRow).attr("value", aData[action_by_index]);
                   $("td .action_by", nRow).attr("id", aData[id_index] + "_action_by");

                   
                   var api = this.api(), aData;

                   var intVal = function (i) {
                     return typeof i === 'string' ?
                       i.replace(/[\$,]/g, '') * 1 :
                       typeof i === 'number' ?
                         i : 0;
                   };
                   // total  delivery
                   delivery = api
                     .column(6)
                     .data()
                     .reduce(function (a, b) {
                       return intVal(a) + intVal(b);
                     }, 0);

                   $(api.column(6).footer()).html(
                     delivery
                   );  


                   // total debit
                   debit  = api
                     .column(7)
                     .data()
                     .reduce(function (a, b) {
                       return intVal(a) + intVal(b);
                     }, 0);

                   $(api.column(7).footer()).html(
                     debit
                   ); 


                   // total credit
                   credit = api
                     .column(8)
                     .data()
                     .reduce(function (a, b) {
                       return intVal(a) + intVal(b);
                     }, 0);

                   $(api.column(8).footer()).html(
                     credit
                   ); 



                   // total balance
                   balance = api
                     .column(9)
                     .data()
                     .reduce(function (a, b) {
                       return intVal(b);
                     }, 0);

                   $(api.column(9).footer()).html(
                     balance
                   ); 

                 }
               });


               
    
$('#driver_id').bind( "change", function() {
  table.ajax.url(base_url + "/drivers/driver_statment/format/json?driver_id=" + $("#driver_id").val() +
    "&start_date=" + $("#start_date").val()
    + "&end_date=" + $("#end_date").val()).load();
 
   $("#driver").empty();
  $("#driver").attr("value", $("#driver_id option:selected").text());
  $("#driver").attr("text", $("#driver_id option:selected").text());
});


  $('.datepicker').on('changeDate', function () {
    if ($("#driver_id").val()){
      console.log('$("#driver_id").val()');
      console.log($("#driver_id").val());
      table.ajax
        .url(
          base_url +
          "/drivers/driver_statment/format/json?driver_id=" +
          $("#driver_id").val() +
          "&start_date=" +
          $("#start_date").val() +
          "&end_date=" +
          $("#end_date").val()
        )
        .load();
 }


    });  

 

 
  $("#add_new_penalty").bind("click", function(event) {
    $("#driver_penalty").empty();
    $("#driver_penalty").attr("value", $("#driver_id option:selected").text());
    $("#driver_penalty").attr("text", $("#driver_id option:selected").text()); 
  });
  $("#add_new_penalty_but").bind("click", function(event) {
    $("#driver_penalty").empty();
    $("#driver_penalty").attr("value", $("#driver_id option:selected").text());
    $("#driver_penalty").attr("text", $("#driver_id option:selected").text());
    var data = {
      driver_id: $("#driver_id").val(),
      date: $("#date1").val(),
      payment_no: $("#payment_no1").val(),
      penalty: $("#penalty").val(),
      credit : 0
    };
    

    // console.log( $("#driver_id").val());
    
    if($("#penalty").val() && $("#driver_id").val()){
  
      var url = base_url + "/drivers/new_statment?format=json";
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
          // window.location.href = "drivers_daily";
        },
        error: function() {
          noty({ text: "error action", layout: "topRight", type: "error" });
        }
      });
    }else{
       noty({ text: "fields require", layout: "topRight", type: "error" });
    }


  });



  $("#add_new_bill").bind("click", function (event) {
    $("#driver").empty();
    $("#driver").attr("value", $("#driver_id option:selected").text());
    $("#driver").attr("text", $("#driver_id option:selected").text());
   
  });

  $("#add_new_payment_but").bind("click", function (event) {

    $("#driver").empty();
    $("#driver").attr("value", $("#driver_id option:selected").text());
    $("#driver").attr("text", $("#driver_id option:selected").text()); 

    var data = {
      driver_id: $("#driver_id").val(),
      date: $("#date").val(),
      payment_no: $("#payment_no").val(),
      credit: $("#credit").val(),
      penalty: 0
    };


      
    if($("#credit").val() && $("#driver_id").val()){
 

 
        var url = base_url + '/drivers/new_statment?format=json';
        $.ajax(
          {
            url: url,
            type: "post",
            dataType: "json",
            data: data,
            success: function (response) {
              noty({ text: 'Successful action', layout: 'topRight', type: 'success' });
              // window.location.href= "drivers_daily";
            },
            error: function () {
              noty({ text: 'error action', layout: 'topRight', type: 'error' });
            }
          });

    }else{
      noty({ text: "fields require", layout: "topRight", type: "error" });
    }
  });


    });
    

    
 
  
  
  
