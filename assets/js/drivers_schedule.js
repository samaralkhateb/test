
    var record_id_index = 0;
    var driver_name_index = record_id_index + 1;
    var days_index = driver_name_index + 1;
    var start_date_index = days_index + 1;
    var end_date_index = start_date_index + 1;
    var start_time_index = end_date_index + 1;
    var end_time_index = start_time_index + 1; 
    var active_index = end_time_index + 1;
    var edit_index = active_index + 1; 

    var invisible_columns = 1;
    
$(document).ready(function () {
    $("#dirvers_parent").addClass("active");
    $("#drivers_schedule_view").addClass("active");

    var table = $("#drivers_schedule").dataTable({
        ordering: true,
        destroy: true,
        bInfo: false,
        bPaginate: true,
        bLengthChange: false,
        searching: true,
        bSearchable: true,
        bProcessing: true,
        emptyTable: "No data available in table",
        bServerSide: false,
        scrollX: true,
        iDisplayLength: -1,
        sAjaxSource: base_url +"/drivers/drivers_schedule_report/format/json",   
        // order: [id_index, "asc"],
        colReorder: true,
        " responsive": true,
        columnDefs: [
          {
            targets: [record_id_index],
            visible: false
            },
            {
                targets: [active_index],
                data: null,
                defaultContent:
                  "<label class='switch switch-small'><input type='checkbox' class='button activate active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
            },
            {
                targets: [edit_index],
                data: null, 
                render: function(data, type, full, meta) {
                    data =
                      "<button class='btn btn-success' value='" +
                      full[0] +
                      "' onclick= edit_schedule(" +
                      full[0] +
                      "); >Edit</button>";
                   
                  return data;
                } 
              }
        ],
        fnRowCallback: function(nRow, aData,iDisplayIndex,iDisplayIndexFull) {
            
            $("td .driver_name", nRow).attr("value", aData[driver_name_index]);
            $("td .driver_name", nRow).attr("id", aData[record_id_index] + "_driver_name");

            $("td .days", nRow).attr("value", aData[days_index]);
            $("td .days", nRow).attr("id", aData[record_id_index] + "_days");
            
            $("td .start_date", nRow).attr("value", aData[start_date_index]);
            $("td .start_date", nRow).attr("id", aData[record_id_index] + "_start_date");
  
            $("td .end_date", nRow).attr("value", aData[end_date_index]);
            $("td .end_date", nRow).attr("id", aData[record_id_index] + "_end_date");

            $("td .start_time", nRow).attr("value", aData[start_time_index]);
            $("td .start_time", nRow).attr("id", aData[record_id_index] + "_start_time"); 

            $("td .end_time", nRow).attr("value", aData[end_time_index]);
            $("td .end_time", nRow).attr("id", aData[record_id_index] + "_end_time");
            
            $("td .active", nRow).attr("id", aData[record_id_index] + "_active");
            if (aData[active_index] == 0) {
            } else {
              $("td .active", nRow).attr("checked", "checked");
            }
  
        }
      });
 

  $(".display").on("change", "td", function () {
    table = $("#drivers_schedule").DataTable();
    var datarow = table.row(this).data();
    var active_id_column = active_index - invisible_columns; 
    
      if ($(this).index() === active_id_column) {
        // var active = datarow[active_index]; 
          
        var checkbox_id = "#" + datarow[record_id_index] + "_active";
        var isChecked = $(checkbox_id + ':checked').val() ? 1 : 0;
        
        var data = {
          id: datarow[record_id_index],
          active: isChecked
        }; 

        console.log('data');
        console.log(data);
        $.ajax({
          type: "post",
          url: base_url + "/drivers/update_drivers_schedule?format=json",
          dataType: "json",
          cache: false,
          data: data,
          success: function(response) { 
            noty({
              timeout: 1500,
              text: "Updated",
              layout: "topCenter",
              type: "success"
            });
          }
        });
      } 
  });
  
    $("#new_Sch").bind("click", function (event) {
      var now = new Date();
      var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() ;
        $('#add_new_schedule').removeData();
        $('#start_time').timepicker('setTime', formatted);
        $('#end_time').timepicker('setTime',formatted);
        $('#start_date').datepicker('setDate', new Date());
        $('#end_date').datepicker('setDate',new Date());
        $('#schedule_id').val();
        $('#driver_id').selectpicker('val', '');
        $('#days').selectpicker('val', []); 
    });

    $("#add_new_schedule_but").bind("click", function(event) {
      
        var data = { 
            driver_id: $("#driver_id").val(), 
            days: $("#days").val(), 
            start_date: $("#start_date").val(), 
            end_date: $("#end_date").val(), 
            start_time: $("#start_time").val(), 
            end_time: $("#end_time").val(), 
            schedule_id: $("#schedule_id").val(), 
        };
  
        console.log('data');
        console.log(data);
        var url = base_url + "/drivers/drivers_schedule?format=json";
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
              window.location.href = "drivers_schedule_view";
          },
          error: function() {
            noty({ text: "error action", layout: "topRight", type: "error" });
          }
        });
    });
     


    $(".datepicker").datepicker('setDate', new Date());
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });
    

});

function edit_schedule(record_id_index) { 
 
    $("#add_new_schedule").modal("show");
    

    var data = {
        "id" : record_id_index
    }
    var url = base_url + "/drivers/get_drivers_schedule?format=json";
        $.ajax({
          url: url,
          type: "get",
          dataType: "json",
          data: data,
          success: function(response) { 
            var days = response['days']; 
            $('#driver_id').selectpicker('val', response['driver_id']);
            if (days != null){
              days = days.split(',');
              $('#days').selectpicker('val', days);
          }
          else
          $('#days').selectpicker('val', []);
          
            $('#start_time').timepicker('setTime', response['start_time']);
            $('#end_time').timepicker('setTime', response['end_time']);
            $('#start_date').datepicker('setDate', response['start_date']);
            $('#end_date').datepicker('setDate', response['end_date']);
            $('#schedule_id').val(record_id_index);
            
            
          },
          error: function() {
            noty({ text: "error action", layout: "topRight", type: "error" });
          }
        });
   
  

}
 

  $('#start_time').timepicker({
    showMeridian: false,
    showSeconds: false
  });


  $('#end_time').timepicker({
    showMeridian: false,
    showSeconds: false,
  });
 