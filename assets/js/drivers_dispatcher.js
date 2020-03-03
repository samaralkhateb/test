


var id_index = 0;
var orders_index = id_index + 1;
var name_index = orders_index + 1;
var date_index = name_index + 1;
var bill_driver_status_index = date_index + 1;
var level_index = bill_driver_status_index + 1;
var route_index = level_index + 1;
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function () { 

    $("#dashboard_parent").addClass("active");
    $("#dispatcher_table").addClass("active");

    var url =   base_url+'/drivers/driver_dispatcher_report/format/json?start_date='+ $("#start_date").val()+'&end_date='+ $("#end_date").val();
   var table = $("#dispatcher_table").DataTable({
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
      sAjaxSource:url,
      order: [id_index, "asc"],
      //  dom: 'Blfrtip',
      colReorder: true,
      " responsive": true,

      columnDefs: [
        {
              targets: [id_index],
              visible: false
        },
        {
            "targets": orders_index,
            "data": null, 
            "defaultContent": '<span class="details-control"></span>',
             "render": function(data,type,row,meta) { // render event defines the markup of the cell text 
                
                   return data; 
              }
      
         },
      ],
      fnRowCallback: function(nRow,aData,iDisplayIndex,iDisplayIndexFull) { 
 

        $("td .driver_route", nRow).attr("value", aData[route_index]);
        $("td .driver_route", nRow).attr("id", aData[id_index] + "_driver_route");

      }
    });
  
  
  
    $('.datepicker').on('changeDate', function() {
        var url =   base_url+'/drivers/driver_dispatcher_report/format/json?start_date='+ $("#start_date").val()+'&end_date='+ $("#end_date").val();
        table.ajax.url(url).load();

         });  
  

         $('.display').on( 'click', 'td', function () {
               
            table = $('#dispatcher_table').DataTable();
            var datarow = table.row( this ).data() ;
            console.log('datarow');
            console.log(datarow);
            console.log($(this).index());

            var orders_index_column = orders_index - invisible_columns;  
              if ($(this).index() === orders_index_column)
              {
                var tr = $(this).closest('tr');
                var row = table.row( tr );

                var data = {
                  id: datarow[id_index], 
                  rote:   datarow[route_index] 
                  
                }; 
        
                if ( row.child.isShown() ) { 
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else { 
                    console.log('data');
                    console.log(data);
                    $.ajax({
                        data: data,
                        type: "get",
                        url: base_url + '/drivers/get_child_dispatcher?format=json',
                        dataType: 'json',
                        cache: false,
                        success: function (response) {
                            console.log('get_child_status');
                            console.log(response);

                            row.child( format(response)).show();
                            tr.addClass('shown');
                            
                        },
                        error: function () {
                            console.log("error");
                        }
                
                    });
                }

              }
            
            
            });
  
});



function format ( d ) {
    // `d` is the original data object for the row
    console.log('d');
    console.log(d);

     
    if (d)
    {
       var table =  '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
       table +=  '<tr>'+ 
            '<td><strong>restaurant</strong></td>'+ 
            '<td><strong>Destination</strong></td>'+ 
 
        '</tr>';
 //  console.log(d);

      for(var i=0 ; i< d.length ; i++)
      {

        console.log('d[i] => ');
            console.log(d[i]);
       
      table +=
        '<tr>'+
             
            '<td>'+d[i].restaurant+'</td>'+ 
            '<td>'+d[i].destination+'</td>'+ 
        '</tr>';
     
           
           
       };
   
       table += '</table>';
        return table;
    }
    else
    {
        return null;
    }
}


$(".datepicker").datepicker({
    format: 'yyyy-mm-dd' ,
       });   
     
$( ".datepicker" ).datepicker('setDate', new Date());
         











