$(document).ready(function() {
    
    $("#marketing_parent").addClass("active");
    $("#admin_dashboard_page_li").addClass("active");

	 $("#by_source_reportrange").hide();
      $("#by_dest_reportrange").hide();
      
  $("#by_offpeack_reportrange").show();
       var   table1 =  $('#by_dest').DataTable({
                    "pageLength": 2,
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": false,
                    "scrollCollapse": false,
                    "searching": false,
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],

                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_dest/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')
                     ,
                    //"order": [[1, 'asc']],                    
                       
              
        });  
      
       var   off_peack_table =  $('#off_peack').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": false,
                    "scrollCollapse": false,
                    "searching": false,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/off_peack_report/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')
                     ,                       
              
        });  
  

       var   table2 =  $('#by_source').DataTable({
                    "pageLength": 2,
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": false,
                    "searching": false,
                    "bSearchable":true,
                    "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],

                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_source/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')
                  ,
                    //"order": [[1, 'asc']],                    
                        
              
        });    


	$(".panel-fullscreen1").on("click",function(){
        panel_fullscreen($(this).parents(".panel"),1);
        return false;
    });
  
    $(".panel-fullscreen2").on("click",function(){
        panel_fullscreen($(this).parents(".panel"),2);
        return false;
    });
      	$(".panel-fullscreen3").on("click",function(){
        panel_fullscreen($(this).parents(".panel"),3);
        return false;
    });



   if($("#by_offpeack_reportrange").length > 0){   
            $("#by_offpeack_reportrange").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM.DD.YYYY',
                separator: ' to ',
                startDate: moment(),
                endDate: moment()            
              },function(start, end) {
                  $('#by_offpeack_reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   off_peack_table.ajax.url( base_url+'/call_center/off_peack_report/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#by_offpeack_reportrange span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        }
});



/* PANEL FUNCTIONS */
function panel_fullscreen(panel,id){    
    
    if(panel.hasClass("panel-fullscreened")){
        panel.removeClass("panel-fullscreened").unwrap();
        panel.find(".panel-body,.chart-holder").css("height","");
        panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");    
        $("#by_source_reportrange").hide();
        $("#by_dest_reportrange").hide();
        $("#a_orders_report_range").hide();
        if (id == 3 ) {
            var table1212 = $('#accepted_orders_report').DataTable({
                        "pageLength": 2,
                        "ordering": true,
                        "destroy": true,
                        "bInfo": false,
                        "bPaginate": true,
                        "bLengthChange": false,
                        "searching": false,
                        "bSearchable":true,
                        "bProcessing": true,
                        "deferLoading": 57,
                         "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],

                        "emptyTable": "No data available in table",
                        "bServerSide": false,
                        "sAjaxSource": base_url + '/call_center/accepted_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                          
                 "columnDefs": [
                {
                    "targets": [1],
                    "visible": false
                },{
                                  "targets": -1,
                                    "data": null,
                                     "render": function(data, type, full, meta){
                                      if(type === 'display'){
                                      data = "<form target='_blank' action='"+base_url+"/call_center/user_log' method='post'> <input type='number' class='form-control' value='"+full[5]+"' name='mobile' style='display:none;'><input type='text' class='form-control' value='"+moment(full[11], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='from_date' style='display:none;'><input type='text' class='form-control' value='"+moment(full[11], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='to_date' style='display:none;'><button class='btn btn-success' type='submit'>log!</button></form>";
                                      
                                    }
                                       return data;
                                    }
                                } 
            ]
                         
            });
            console.log(table1212)
            table1212.ajax.url( base_url+'/call_center/accepted_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        }else{
        var   table1 =  $('#by_source').DataTable({
                    "pageLength": 2,
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": false,
                    "searching": false,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_source/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    //"order": [[1, 'asc']],                    
                        
              
        });  
        table1.ajax.url( base_url+'/call_center/bill_by_source/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        var   table2 =  $('#by_dest').DataTable({
                    "pageLength": 2,
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": false,
                    "searching": false,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_dest/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    //"order": [[1, 'asc']],                    
                       
              
        });  
        table2.ajax.url( base_url+'/call_center/bill_by_dest/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        };
        $(window).resize();
    }else{
       


        /* end reportrange */
        if (id == 3 ) {
         
         var   table =  $('#accepted_orders_report').DataTable({
                   //"pageLength": 2,
                     "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/accepted_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    dom: 'Blfrtip',
                    colReorder: false,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] , 
             "columnDefs": [
            {
                "targets": [1],
                "visible": false
            },{
                              "targets": -1,
                                "data": null,
                                 "render": function(data, type, full, meta){
                                if(type === 'display'){
                                  data = "<form  target='_blank' action='"+base_url+"/call_center/user_log' method='post'> <input type='number' class='form-control' value='"+full[5]+"' name='mobile' style='display:none;'><input type='text' class='form-control' value='"+moment(full[11], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='from_date' style='display:none;'><input type='text' class='form-control' value='"+moment(full[11], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='to_date' style='display:none;'><button class='btn btn-success' type='submit'  >log!</button></form>";
                                  
                                }
                                   return data;
                                }
                            } 
        ]  
              
        });
        $('#accepted_orders_report').css({ 
          width: ''
        });
        table.ajax.url( base_url+'/call_center/accepted_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $("#a_orders_report_range").show();
        /* reportrange */
        if($("#a_orders_report_range").length > 0){   
            $("#a_orders_report_range").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM.DD.YYYY',
                separator: ' to ',
                startDate: moment(),
                endDate: moment()            
              },function(start, end) {
                  $('#a_orders_report_range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table.ajax.url( base_url+'/call_center/accepted_orders/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#a_orders_report_range span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }
        }else{

        
        var   table1 =  $('#by_dest').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                     "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_dest/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    //"order": [[1, 'asc']],                    
                     dom: 'Blfrtip',
                    colReorder: false,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] ,    
              
        });    

        table1.ajax.url( base_url+'/call_center/bill_by_dest/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&&end_date='+moment().format('YYYY-MM-DD')).load();
        var   table2 =  $('#by_source').DataTable({
                    //"pageLength": 2,
                  //  "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "scrollY":"500",
                 
               
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "lengthMenu": [[100, 75, 50, -1], ["All", 100, 75, 50]],
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/call_center/bill_by_source/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')
                    + 'null',
                    "order": [[1, 'desc']],                    
                    dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] ,    
              
        });   
        table2.ajax.url( base_url+'/call_center/bill_by_source/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $("#by_source_reportrange").show();
        /* reportrange */
        if($("#by_source_reportrange").length > 0){   
            $("#by_source_reportrange").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM.DD.YYYY',
                separator: ' to ',
                startDate: moment(),
                endDate: moment()            
              },function(start, end) {
                  $('#by_source_reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table2.ajax.url( base_url+'/call_center/bill_by_source/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#by_source_reportrange span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        }
        /* end reportrange */
         $("#by_dest_reportrange").show();
        /* reportrange */
        if($("#by_dest_reportrange").length > 0){   
            $("#by_dest_reportrange").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM.DD.YYYY',
                separator: ' to ',
                startDate: moment(),
                endDate: moment()            
              },function(start, end) {
                  $('#by_dest_reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table1.ajax.url( base_url+'/call_center/bill_by_dest/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#by_dest_reportrange span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }
        };
        var head    = panel.find(".panel-heading");
        var body    = panel.find(".panel-body");
        var footer  = panel.find(".panel-footer");
        var hplus   = 30;
        
        if(body.hasClass("panel-body-table") || body.hasClass("padding-0")){
            hplus = 0;
        }
        if(head.length > 0){
            hplus += head.height()+21;
        } 
        if(footer.length > 0){
            hplus += footer.height()+21;
        } 

       // panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
        
        
        panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
        panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        
        $(window).resize();
    }
   
}
