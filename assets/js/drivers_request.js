
$(document).ready(function () {

    $("#dirvers_parent").addClass("active");
    $("#drivers_request_view").addClass("active");
 
    $(".datepicker").datepicker('setDate', new Date()); 
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });
 

    $('.datepicker').on('changeDate', function () {
       table.ajax.url( '/drivers/drivers_request_report/' + $("#from-date-driver").val() + '/' + $("#to-date-driver").val())
       .load();
    });


    var  table = $("#drivers_request").DataTable({ 
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
        "ajax": base_url + '/drivers/drivers_request_report/' + $("#from-date-driver").val() + '/' + $("#to-date-driver").val(),
        columnDefs: [
            {
              "targets": 0,
              "visible": false,
              },
              {
              "targets": -2,
              "data": null,
              "searchable": false,
              "defaultContent": "<button class='btn-proccess button btn btn-alert' style='display:none' >UnderProcess</button>" +
                "<label class='lab-proccess' style='color:2c3f46;;display:none'>processing</label>   "
              },
              {
                "targets": -1,
                "data": null,
                "searchable": false,
                "defaultContent": "<button class='btn-close btn btn-success' style='display:none' >Close</button>" +
                " <label class='lab-close' style='color:2c3f46;display:none'>Solved</label>   "
               
                }
              
            ],
            "fnRowCallback" : function( nRow, aData) {
                if ( aData[11] == "0" && aData[12] =="0" )
                {
                    $('td .btn-proccess', nRow).css('display', 'inline');
                     $('td .btn-close', nRow).css('display', 'inline');
                }else if (aData[12] == '1' ){
                    $('td .lab-close', nRow).css('display', 'inline');
                }else if (aData[11] == "1" && aData[12] =="0") {
                    $('td .lab-proccess', nRow).css('display', 'inline');
                    $('td .btn-close', nRow).css('display', 'inline');
                }
            }
    });
        
    $('.datepicker').on('changeDate', function () {
        table.ajax.url( base_url + '/drivers/drivers_request_report/'
         + $("#from-date-driver").val() + '/'
         + $("#to-date-driver").val())
         .load();
    });

    $('tbody').on('click','.btn-close',function() {
        var id = table.row($(this).parents('tr')).data()[0];
        update(id,"changeToClose")
    })
    $('tbody').on('click','.btn-proccess',function() {   
        var id = table.row($(this).parents('tr')).data()[0];
        update(id,"changeToProccess")
      
    })




    function update(id , stmt) {
        $.ajax({
            type: "POST",
            url : base_url + '/drivers/update_driver_request/',
            cache: false,
            data: {
                key: stmt ,
                id : id
            },
            success : function() {
                table.ajax.url( base_url + '/drivers/drivers_request_report/'
                + $("#from-date-driver").val() + '/'
                + $("#to-date-driver").val())
                .load();
            }
           
        })
        
    }


});
