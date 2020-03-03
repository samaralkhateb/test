   $(document).ready(function() {

  
        
              $("#active_users_li").addClass("active");
              $("#marketing_parent").addClass("active");
         

               var   table =  $('#active_users').DataTable({
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
                    "sAjaxSource": base_url + "/users/activated_users_report/format/json?start_date="
                + $("#from-date").val()
                + "&end_date="
                + $("#to-date").val(),
                    //"order": [[6, 'asc']],
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                      {
                          extend: 'excel',
                      } 
                   ] ,
               
      });
     
       
              
	 
        
       $('.datepicker').on('changeDate', function() {
          table.ajax.url( base_url+'/users/activated_users_report/format/json?start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val() ).load();

           });  
       });
          
	     $(".datepicker").datepicker({
	   format: 'yyyy-mm-dd' ,
	      });  
          $(".datepicker").datepicker('setDate', new Date()
	      ); 
       











