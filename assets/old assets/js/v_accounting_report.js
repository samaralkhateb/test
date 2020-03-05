   $(document).ready(function() {
              $("#accounting_parent").addClass("active");
              $("#v_accounting_page").addClass("active");
                   var selectVal = 0;

                var url = base_url + '/accounting/v_accounting_data_by_rest/format/json?hos_id='
                    + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
       var   table =  $('#v_accounting').DataTable({
                               "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                               "sAjaxSource": url,
});
       $('#hos_id').on('change', function () {

//     var url = base_url + '/accounting/accounting_data/format/json?start_date='
//                + $("#from-date").val()
//                + '&end_date='
//                + $("#to-date").val();
     var selectVal ;
     if(  $("#hos_id").val() === null){
         selectVal = 0;
          url =base_url + '/accounting/v_accounting_data_by_rest/format/json?hos_id='
                    + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
           }
     else{
         selectVal = $("#hos_id").val();
                 url =base_url + '/accounting/v_accounting_data_by_rest/format/json?hos_id='
                    + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
    }  
                

       table =  $('#v_accounting').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
//                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "scrollX": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                     "iDisplayLength": 25,
                    "bServerSide": false,
                    "sAjaxSource": url,
                    //"order": [[1, 'asc']],                    
                    dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                              {
                                  extend: 'excelHtml5',
                                   footer: true,
                                    header: true,
                                    title:'Sales',
                                      exportOptions: {
                                    columns: ':visible'
                                   },
                                    messageTop:"Restaurant name : " + $("#hos_id option:selected").text() + " ,Billing period: " + $("#hos_id option:selected").attr('billing_period') + " , Rate: " + $("#hos_id option:selected").attr('rate') ,
                                    customize: function ( xlsx ){
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];
                            $('row:odd c', sheet).attr( 's', '25' );
//                            $('row c[r*="10"]', sheet).attr( 's', '25' );
                               }
                                  }
                              ,
                              {
                                  extend: 'print',
                                  exportOptions: {
                                    columns: ':visible'
                                   },
                              } 
                              ,
                              {
                                  extend: 'pdf',
                                  exportOptions: {
                                    columns: ':visible'
                                   },
                              }
                              ,{
                          extend: 'colvis',
                          footer: true
                      } ,
                           ] ,
                            "footerCallback": function ( row, data, start, end, display ) {
      var api = this.api(), data;
      
     
      $( api.column( 7 ).footer(0) ).html("Total sales:" + api.column( 7 ).data().sum());
      $( api.column( 10 ).footer(0) ).html( "Total discounts:" +  api.column( 10 ).data().sum());
      $( api.column( 12 ).footer(0) ).html(   "Total commision:" +api.column( 12 ).data().sum());
      $( api.column( 13 ).footer(0) ).html(   "Due from rest:" + api.column( 13 ).data().sum());

                            }
      
    });
         table.ajax.url(url).load();
    });
    
    ///on change billing period
    
   
 
    $("#multi-sheets").on('click', function () {
         var selectVal = $("#hos_id").val();
           var periodVal = $("#period_id").val();
           if(periodVal !== 0){
               selectVal === 0;
       document.location= base_url + '/accounting/accounting_multi_data/format/json?period=' + periodVal + '&rests=' + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
               
           }else{
        document.location= base_url + '/accounting/accounting_multi_data/format/json?rests=' + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
    }
            
                 
    });
       $("#big-data").on('click', function () {
         var selectVal = $("#hos_id").val();
               selectVal === 0;
     document.location= base_url + '/accounting/accounting_multi_data/format/json?rests=' + selectVal + '&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val();
                 
    });
 
   
              
   $('.datepicker').on('changeDate', function() {
//          $('#accounting').dataTable().fnDestroy();
        var url = base_url + '/accounting/v_accounting_data_by_rest/format/json';
     var selectVal ;
     if(  $("#hos_id").val() === null)
         selectVal = 0;
     else
         selectVal = $("#hos_id").val();
             if(selectVal !== 0){
          url =base_url + '/accounting/v_accounting_data_by_rest/format/json?hos_id='
               + selectVal +'&start_date='
                + $("#from-date").val()
                + '&end_date='
                + $("#to-date").val() ;
    }
    
          table.ajax.url(url).load();

           }); 

    //for the auto complete select
    if($(".select").length > 0){
            $(".select").selectpicker();
            
            $(".select").on("change", function(){
                if($(this).val() == "" || null === $(this).val()){
                    if(!$(this).attr("multiple"))
                        $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                }else{
                    $(this).find("option[value='"+$(this).val()+"']").attr("selected",true);
                }
            });
        }
          $(".datepicker").datepicker({
	   format: 'yyyy-mm-dd' ,
	      });  
	
            $( ".datepicker" ).datepicker('setDate', new Date());
            
     
       });
       
   

      
       
    
 
