  $(document).ready(function() {
            $("#dirvers_parent").addClass("active");
            $("#rate_page").addClass("active");
            var   table =  $('#drivers_rate').DataTable({
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
                    "sAjaxSource": base_url + '/drivers/drivers_rate_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
            
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                    
                      {
                          extend: 'excel',
                      } 
                   ] ,
                        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },
             {
                "targets": [1],
                "visible": false
            }
                        ],
        
                   

       
       
               
      });
          $('.datepicker').on('changeDate', function() {
              table.ajax.url( base_url+'/drivers/drivers_rate_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val() ).load();
    
            });
       });
        
        
        
    
               $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());