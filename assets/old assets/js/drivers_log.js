$(document).ready(function() {
    
    
              
            $(".datepicker").datepicker({
	   format: 'yyyy-mm-dd' ,
	      }); 
              

              	var yesterday = new Date();
	        var dd = yesterday.getDate() - 1;
	        var mm = yesterday.getMonth()+1; 
	
	        var yyyy = yesterday.getFullYear();
	        yesterday =  yyyy+'-'+mm+'-'+dd;
        
            $( ".datepicker" ).datepicker('setDate', new Date());
            
//            if($(".timepicker24").length > 0)
            $(".timepicker24").timepicker({minuteStep: 5,sshowMeridian: false
                  
});
            $(".timepicker").timepicker({minuteStep: 5,sshowMeridian: false
}); 
$("#create_admin_parent").addClass("active");
$("#drivers_log").addClass("active");


               var   table =  $('#drivers_log_table').DataTable({
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
                    "sAjaxSource": base_url + `/drivers/drivers_log_list/format/json?start_date=`
                    + $("#from-date").val()
                    + `&end_date=`
                    + $("#to-date").val(),
            
                    dom: 'Blfrtip',
                    colReorder: true,
                    buttons: [
	                
	                  {
	                      extend: 'excel',
	                  } 
                    ] ,
            
          
              });   
              
           
           
       $('.datepicker').on('changeDate', function() {   
      
           table.ajax.url( base_url+'/drivers/drivers_log_list/format/json?start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val() ).load();
        
           
            });  
          
 
       });