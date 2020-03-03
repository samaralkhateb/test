var id_index = 0;
var driver_name = id_index + 1;

var vehicle_type = driver_name + 1;
var commission = vehicle_type + 1;

var delivered_orders = commission + 1;
var refused_orders = delivered_orders + 1;
var delivery_fees = refused_orders + 1;
var working_hours = delivery_fees + 1;
var free_time = working_hours + 1;
var driver_issue = free_time + 1; 

  $(document).ready(function() { 

    $("#dirvers_parent").addClass("active");
    $("#new_daily_drivers").addClass("active");

    // $( ".datepicker" ).datepicker('setDate', new Date());
    // $(".datepicker").datepicker({ format: 'yyyy-mm-dd' ,  });  

    $(".datepicker2").datetimepicker({
      language: "en",
      format: "yyyy-mm-dd h:i:s"
    });
           
var table =     $('#daily_drivers_table').DataTable({
      "ordering": true,
      "destroy": true,
      "bInfo": false,
      "bPaginate": true,
      "bLengthChange": true,
      "searching": true,
      "bSearchable": true,
      "bProcessing": true,
      "emptyTable": "No data available in table",
      "bServerSide": false,
      "scrollX" : true,
      // "ajax":base_url+'/drivers/drivers_productivity_report/'+ $("#date-from").val() + '/' + $("#date-to").val() ,
      "columnDefs": [
      {
          "targets": id_index,
          "visible": false
      },
      {
        "targets": driver_issue,
        "render": function (data,type,full) {
          let url = `../controle_panel/driver_issues_view/${$("#date-from").val()}/${$("#date-to").val()}/${full[0]} `
          return '<a class="btn btn-success" href="'+url+'" target="_blank"> Driver Issue </a>';
        }
    },
 ],

});

    // handle change date 

       $('.datepicker2').on('changeDate', function() {
          if( $("#date-from").val()  && $("#date-to").val() ) {
            table.ajax.url(base_url+'/drivers/drivers_productivity_report/'+ $("#date-from").val() + '/' + $("#date-to").val() ).load();
          }
           });  


    // handle select box 

           $('#res_polygon').on('change',function() { 
              let val = $(this).val();
              table.ajax.url(base_url+'/drivers/drivers_productivity_report/'+ $("#date-from").val() + '/' + $("#date-to").val() + '/' + val  + '/' + $('#user_polygon').val() ).load();
           })

           $('#user_polygon').on('change',function() { 
               let val = $(this).val();
             table.ajax.url(base_url+'/drivers/drivers_productivity_report/'+ $("#date-from").val() + '/' + $("#date-to").val() + '/' +  $('#res_polygon').val() + '/' + + val ).load();
           })


            });