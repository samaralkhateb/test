   $(document).ready(function() {
              $("#create_admin_parent").addClass("active");
              $("#all_log_page").addClass("active");

                var table =  $("#all_log").DataTable({
                    "scrollX": true,
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "lengthMenu": [[100, 75, 50, 25], [ 100, 75, 50,25]],
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/client_log/log_all_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
                    //"order": [[1, 'asc']],
                    dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                                {
                                    extend: 'excel',
                                },
                                {
                                    extend : 'colvis',
                                } 
                             ] ,
                     "drawCallback": function( settings ) {
        //   setTimeout(function(){
        //       table.ajax.reload();

        //   },60000);
         
      }
                        
            
      });






             
      $('.datepicker').on('changeDate', function() {
        table.ajax.url(base_url + '/client_log/log_all_list/format/json?start_date='
                        + $("#from-date").val()
                        + '&end_date='
                        + $("#to-date").val()).load();

                      

        });
    
    
                 
         
        });
         
        
              $(".datepicker").datepicker({
                           format: 'yyyy-mm-dd' ,
                              });  
                $( ".datepicker" ).datepicker('setDate', new Date());