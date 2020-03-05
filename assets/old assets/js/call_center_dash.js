$(document).ready(function() {
      $("#dashboard_parent").addClass("active");
      $("#dashboard_parent").addClass("active");
 


      $("#a_orders_report_range").hide();
  var    table = $('#accepted_orders_report').dataTable({
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
                                 
                                 data = "<form target='_blank' action='"+base_url+"/call_center/user_log' method='post'>\n\
                                              <input type='number' class='form-control' \n\
                                                     value='"+full[5]+"'\n\
                                                     name='mobile'\n\
                                                     style='display:none;'>\n\
                                              <input type='text' class='form-control' \n\
                                                     value='"+moment().format("YYYY-MM-DD")+"' name='from_date' \n\
                                                     style='display:none;'>\n\
                                              <input type='text' class='form-control'\n\
                                              value="+moment().format('YYYY-MM-DD')+" \n\
                                              name='to_date' style='display:none;'>\n\
                                              <button class='btn btn-success' type='submit' >log!</button>\n\
                                           </form>";
                                  
                                }
                                   return data;
                                }
              } 
        ]
                     
      });


var    table1 = $('#p_orders').dataTable({
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
                    "sAjaxSource": base_url + '/call_center/pendding_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),

            "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
        ]
                     
      });

$("#r_orders_reportrange").hide();
var    table2 = $('#r_orders').DataTable({
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
                    "sAjaxSource": base_url + '/call_center/rejected_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),

            "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                            var oSettings = this.fnSettings ();
                            $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
                            return nRow;
                       }
                     
      });

//$("#unactive_users_report_range").hide();
var    table2 = $('#unactive_users').DataTable({
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
                    "sAjaxSource": base_url + '/call_center/users_list/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    
                    "columnDefs": [
                        {
                            "targets":[0],
                            "visible":false
                        },
                        {
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"btn"+"' type='submit' onclick='sendConfirmation("+full[2]+","+full[4]+","+full[0]+")'; >Send Confirmation Code</button>";
                                  }
                                  return data;
                                }
                        }
                        
                    ],
      });
      
      
  $(".panel-fullscreen3").on("click",function(){
        panel_fullscreen($(this).parents(".panel"),3);
        return false;
  });
   $(".panel-fullscreen2").on("click",function(){
        panel_fullscreen2($(this).parents(".panel"));
        return false;
  });
  $(".panel-fullscreen1").on("click",function(){
        panel_fullscreen1($(this).parents(".panel"));
        return false;
  });

  $(".panel-fullscreen4").on("click",function(){
        panel_fullscreen4($(this).parents(".panel"));
        return false;
  });




$('body').on('hidden.bs.modal', '.modal', function () {
        $('#status').html("");
          });
});

    $('#off_pick_damascus').on( 'change',function () {
          noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                        var status = "";
                                        if ($('#off_pick_damascus').is(":checked"))
                                          status = 1;
                                        else
                                          status = 0;
                                         var data ={
                                                     state :  status,
                                                     id : 1
                                                    };      
                                            $.ajax({
                                                       type: "post",
                                                       url: base_url + '/call_center/change_off_peack',
                                                       dataType: 'json',
                                                       cache: false,
                                                       data : data,
                                                       success: function(response) {
                                                    
                                                          location.reload();
                                                        }
                                                        });
                    }},
                    {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                  $noty.close();
                              }
                          }
                      ]
                  });
   });


   $('#off_pick_aleppo').on( 'change',function () {
    noty({
    text: "Are you sure?",
    layout: 'topCenter', 
    type: 'error',
    buttons: [
             {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                       
                                  var status = "";
                                  if ($('#off_pick_aleppo').is(":checked"))
                                    status = 1;
                                  else
                                    status = 0;
                                   var data ={
                                               state :  status,
                                               id :7 
                                              };      
                                      $.ajax({
                                                 type: "post",
                                                 url: base_url + '/call_center/change_off_peack',
                                                 dataType: 'json',
                                                 cache: false,
                                                 data : data,
                                                 success: function(response) {
                                              
                                                    location.reload();
                                                  }
                                                  });
              }},
              {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]
            });
});

   
      $('#engine_auto').on( 'change',function () {
          noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                        var status = "";
                                        if ($('#engine_auto').is(":checked"))
                                          status = 1;
                                        else
                                          status = 0;
                                         var data ={
                                                     state :  status,
                                                    };      
                                            $.ajax({
                                                       type: "post",
                                                       url: base_url + '/call_center/change_engine_state',
                                                       dataType: 'json',
                                                       cache: false,
                                                       data : data,
                                                       success: function(response) {
                                                    
                                                          location.reload();
                                                        }
                                                        });
                    }},
                    {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                  $noty.close();
                              }
                          }
                      ]
                  });
   });

/* PANEL FUNCTIONS */
function panel_fullscreen(panel,id){    
    
    if(panel.hasClass("panel-fullscreened")){
        panel.removeClass("panel-fullscreened").unwrap();
        panel.find(".panel-body,.chart-holder").css("height","");
        panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");    
        $("#a_orders_report_range").hide();
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
        $(window).resize();
    }else{    
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
                                    console.log(full);
                                  data = "<form  target='_blank' action='"+base_url+"/call_center/user_log' method='post'>\n\
                                             <input type='number' class='form-control' value='"+full[5]+"' name='mobile' style='display:none;'>\n\
                                             <input type='text' class='form-control' value='"+moment(full[12], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='from_date' style='display:none;'>\n\
                                             <input type='text' class='form-control' value='"+moment(full[12], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+"' name='to_date' style='display:none;'>\n\
                                             <button class='btn btn-success' type='submit'  >log!</button></form>";
                                  
                                }
                                   return data;
                                }
                            } 
        ]  
              
        });
        $('#accepted_orders_report').css({ 
          width: ''
        });
        // Samar
        table.ajax.url( base_url+'/call_center/accepted_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $("#a_orders_report_range").show();
        /* reportrange */
        $('#datepicker').datepicker({
            language: 'en',
          //   pick12HourFormat: true
          format:'yyyy-mm-dd H:i:s'
          }); 
        if($("#a_orders_report_range").length > 0){   
            $("#a_orders_report_range").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                //    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                //    'This Month': [moment().startOf('month'), moment().endOf('month')],
                //    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    },
                opens: 'left', 
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                format: 'MM.DD.YYYY',
                separator: ' to ',
                startDate: moment().subtract('days', 29),
                endDate: moment()            
              },function(start, end) {
                  $('#a_orders_report_range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table.ajax.url( base_url+'/call_center/accepted_orders/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#a_orders_report_range span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }

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

        panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
        
        
        panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
        panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        
        $(window).resize();
    }
}

function panel_fullscreen2(panel){    
    
    if(panel.hasClass("panel-fullscreened")){
        panel.removeClass("panel-fullscreened").unwrap();
        panel.find(".panel-body,.chart-holder").css("height","");
        panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");    
        $("#r_orders_reportrange").hide();
            var table1212 = $('#r_orders').DataTable({
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
                        "sAjaxSource": base_url + '/call_center/rejected_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                          
                 "columnDefs": [
                {
                    "targets": [0],
                    "visible": false
                },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                            var oSettings = this.fnSettings ();
                            $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
                            return nRow;
                       }
                         
            });
            console.log(table1212)
            table1212.ajax.url( base_url + '/call_center/rejected_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $(window).resize();
    }else{    
         var   table =  $('#r_orders').DataTable({
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
                    "sAjaxSource": base_url + '/call_center/rejected_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    dom: 'Blfrtip',
                    colReorder: false,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] , 
             "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                            var oSettings = this.fnSettings ();
                            $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
                            return nRow;
                       }
              
        });
        $('#r_orders').css({ 
          width: ''
        });
        table.ajax.url( base_url + '/call_center/rejected_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $("#r_orders_reportrange").show();
        /* reportrange */
        if($("#r_orders_reportrange").length > 0){   
            $("#r_orders_reportrange").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                //    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                //    'This Month': [moment().startOf('month'), moment().endOf('month')],
                //    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
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
                  $('#r_orders_reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table.ajax.url( base_url+'/call_center/rejected_orders/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#r_orders_reportrange span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }

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

        panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
        
        
        panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
        panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        
        $(window).resize();
    }
}


function panel_fullscreen1(panel){    
    
    if(panel.hasClass("panel-fullscreened")){
        panel.removeClass("panel-fullscreened").unwrap();
        panel.find(".panel-body,.chart-holder").css("height","");
        panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");    

            var    table1 = $('#p_orders').dataTable({
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
                    "sAjaxSource": base_url + '/call_center/pendding_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),

                  "columnDefs": [
                  {
                      "targets": [0],
                      "visible": false
                  },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
              ]
                           
            });
            console.log(table1212)
            table1212.ajax.url( base_url + '/call_center/pendding_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $(window).resize();
    }else{    
         var   table =  $('#p_orders').DataTable({
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
                    "sAjaxSource": base_url + '/call_center/pendding_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    dom: 'Blfrtip',
                    colReorder: false,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] , 
             "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },{
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"' type='submit' onclick=view_bill("+full[0]+"); >View Bill</button>";
                                    
                                  }
                                  return data;
                                }
              }
        ]  
              
        });
        $('#p_orders').css({ 
          width: ''
        });
        table.ajax.url( base_url + '/call_center/pendding_orders/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();


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

        panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
        
        
        panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
        panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        
        $(window).resize();
    }
}


function panel_fullscreen4(panel){    
    
    if(panel.hasClass("panel-fullscreened")){
        panel.removeClass("panel-fullscreened").unwrap();
        panel.find(".panel-body,.chart-holder").css("height","");
        panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");    
        $("#unactive_users_report_range").hide();
           var    table123 = $('#unactive_users').DataTable({
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
                                  "sAjaxSource": base_url + '/call_center/users_list/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),

                          "columnDefs": [
                        {
                            "targets":[0],
                            "visible":false
                        },
                        {
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"btn"+"' type='submit' onclick='sendConfirmation("+full[2]+","+full[4]+","+full[0]+")'; >Send Confirmation Code</button>";
                                  }
                                  return data;
                                }
                        }
                        
                    ]
                                   
                    });
            table123.ajax.url( base_url + '/call_center/users_list/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
        $(window).resize();
    }else{    
         var   table =  $('#unactive_users').DataTable({
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
                    "sAjaxSource": base_url + '/call_center/users_list/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD'),
                    dom: 'Blfrtip',
                    colReorder: false,
                        buttons: [
                      
                              {
                                  extend: 'excel',
                              } 
                           ] , 
             "columnDefs": [
                        {
                            "targets":[0],
                            "visible":false
                        },
                        {
                              "targets": -1,
                              "data": null,
                               
                              "render": function(data, type, full, meta){
                                  if(type === 'display'){
                                    data = "<button class='btn btn-success bill_view' value='"+full[0]+"btn"+"' type='submit' onclick='sendConfirmation("+full[2]+","+full[4]+","+full[0]+")'; >Send Confirmation Code</button>";
                                  }
                                  return data;
                                }
                        }
                        
                    ]
        });
        $('#unactive_users').css({ 
          width: ''
        });
        table.ajax.url( base_url + '/call_center/users_list/format/json?start_date=' +moment().format('YYYY-MM-DD')+'&end_date='+moment().format('YYYY-MM-DD')).load();
         $("#unactive_users_report_range").show();
         /* reportrange */
        if($("#unactive_users_report_range").length > 0){   
            $("#unactive_users_report_range").daterangepicker({                    
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                //    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                //    'This Month': [moment().startOf('month'), moment().endOf('month')],
                //    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
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
                  $('#unactive_users_report_range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                   table.ajax.url( base_url+'/call_center/users_list/format/json?start_date=' + start.format('YYYY-MM-DD') +'&end_date='+end.format('YYYY-MM-DD')).load();
            });
            
            $("#unactive_users_report_range span").html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }
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

        panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
        
        
        panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
        panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        
        $(window).resize();
    }
}



function view_bill(bill_id) {
              var data = 'bill_id=' + bill_id;
             $.ajax({
               type: "post",
               url: base_url + '/bills/get_details',
               data: data,
               dataType: 'json',
               cache: false,
               success: function(response) {
                   console.log(response["bill"]);
           var state =  response["bill"]["state"];
    
                           var html =  '<div class="row">';
                                      html +=  '<div class="col-md-4">';
                                             html +=  '    <div class="contact-info">';
                                                 html +=  '   <p><small>User Name</small><br/>'+response["bill"]["user_details"]["user_name"]+'</p>';
                                                 html +=  '   <p><small>Mobile</small><br/>' + response["bill"]["user_details"]["mobile"] + '</p>';
                                                 html +=  '   <p><small>open time</small><br/>' + response["bill"]["open_time"] + '</p>   ';
                                                              
                                               html +=  ' </div></div>';
                                if(response["bill"]["bill_type"]!="Pick_up"){
                                        html +=  '<div class="col-md-4">';
                                             html +=  '    <div class="contact-info">';
                                                 html +=  '   <p><small>Address Name</small><br/>' + response["bill"]["user_details"]["address_name"] + '</p>';
                                                 html +=  '   <p><small>Area</small><br/>' + response["bill"]["user_details"]["ar_area_name"] + '</p>';
                                                 html +=  '   <p><small>Street</small><br/>' + response["bill"]["user_details"]["street"] + '</p>   ';
                                                 html +=  '   <p><small>details</small><br/>' + response["bill"]["user_details"]["details"] + '</p>   ';
                                                              
                                            html +=  ' </div></div>';
}
                                            html +=  '<div class="col-md-4">';
                                            html +=  '    <div class="contact-info">';
                                             html +=  '   <p><small>Rest. Name</small><br/>' + response["bill"]["restaurant_name"] + '</p>';
                                                html +=  '   <p><small>Rest. Queue</small><br/>' + response["bill"]["restaurant_queue"] + '</p>';
                                                html +=  '   <p><small>Bill State</small><br/>' + state + '</p>   ';
                                                 html +=  '   <p><small>Time to pick</small><br/>' + response["bill"]["time_to_pick"] + '</p>   ';
                                                  html +=  '   <p><small>Bill Type</small><br/>' + response["bill"]["bill_type"] + '</p>   ';
                                                             
                                            html +=  ' </div></div></div>';
                           
                                
                                html += '<div class="row">';
                                           
                                           html += ' <div class="panel panel-default">';
                                               html += ' <div class="panel-heading">';
                                               html += '     <h3 class="panel-title" >Order Bills</h3>';
                                              html += '  </div>';
                                              html += '  <div class="panel-body">';
                                             
                                               html += '     <table class="table table-bordered">';
                                               html += '         <thead>';
                                                html += '            <tr>';
                                                       html += '         <th>QTY</th>';
                                                               
                                                       html += '         <th>Dish</th>';
                                                              
                                                     html += '       </tr>';
                                                    html += '    </thead>';
                                                    html += '    <tbody>';
                                                          for (i = 0; i < response["bill"]['orders'].length; i++) {
                                                       html += '     <tr class="active">';
                                                          html += '      <td>' + response["bill"]["orders"][i]["quantity"] + ' </td>';
                                                        html += '        <td>' + response["bill"]["orders"][i]["dish_name"] + '</td>';
                                                          html += '  </tr>';
                                                          }
                                                           
                                                       html += ' </tbody>';
                                                   html += ' </table></div></div></div>';
                              
                               
                              
                              html+=  '<div class="row">';
                                      html +=  '<div class="col-md-4">';
                                             html +=  '    <div class="contact-info">';
                                                 html +=  '   <p><small>Total</small><br/>' + response["bill"]["sub_total"] + ' </p>';
                                                 html +=  '   <p><small>Tax</small><br/>' + response["bill"]["tax"] + '</p>';
                                                 if(response["bill"]["bill_type"] == "Delivery") { 
                                                    html +=  '   <p><small>Delivery fee</small><br/>' + response["bill"]["delivery"] + '</p>   ';
                                                 }
                                                html +=  '   <p><small>Net Total</small><br/>' + response["bill"]["net_total"] + '</p>   ';
                                                              
                                                html +=  ' </div></div>';

                                      html +=  '<div class="col-md-4">';
                                             html +=  '    <div class="contact-info">';
                                             if(response["bill"]["voucher_code"] != 0) {                                           
                                                     html +=  '   <p><small>v Total</small><br/>' + response["bill"]["v_total"] + ' </p>';
                                                     html +=  '   <p><small>voucher code</small><br/>' + response["bill"]["voucher_code"] + '</p>';
                                                     
                                                    html +=  '   <p><small>Discount</small><br/>' + response["bill"]["voucher"] + '</p>   ';
                                                 }
                                                 if(response["bill"]["rated"] > 0)
                                                    html +=  '   <p><small>Rate</small><br/>' + response["bill"]["rated"] + ' ,' + response["bill"]["bill_review"] + '</p>   ';
                                                if( state == "Refused")
                                                     html +=  '   <p><small>Refuse msg</small><br/>' + response["bill"]["en_msg"] + '</p>   ';
                                                html +=  ' </div></div></div>';
                               
                                 
                          if(response["bill"]["notes"]){

                              html += '<div class="row">';
                                           
                                           html += ' <div class="panel panel-default">';
                                               html += ' <div class="panel-heading">';
                                               html += '     <h3 class="panel-title" ></h3>';
                                              html += '  </div>';
                                              html += '  <div class="panel-body">';
                                             
                                               html += '     <table class="table table-bordered">';
                                               html += '         <thead>';
                                                html += '            <tr>';
                                                       html += '         <th>Call center notes</th>';
                                                               
                                                      
                                                              
                                                     html += '       </tr>';
                                                    html += '    </thead>';
                                                    html += '    <tbody>';
                                                          for (i = 0; i < response["bill"]['notes'].length; i++) {
                                                       html += '     <tr class="active">';
                                                          html += '      <td>'  + response["bill"]["notes"][i]["note"] + ' </td>';
                                                    
                                                          html += '  </tr>';
                                                    }
                                                           
                                                       html += ' </tbody>';
                                                   html += ' </table></div></div></div>';                     
                              }
                            $('#status').append($(html));
                            
                            $('#show_status_modal').find('.modal-title').text("Bill Detail");
                            $('#show_status_modal').modal('show');
                     }
                
                 });
}

function sendConfirmation(phone, code, user_id) {
    jQuery.ajax({
        type: "GET",
        url: base_url + '/call_center/send_sms/format/json?phone=' + phone + '&code=' + code + "&id=" + user_id,
        dataType: 'json',
        success: function (obj, textstatus, data) {
            noty({text: data.responseJSON.data, layout: 'topRight', type: 'success'});
        },
        error: function () {
            noty({text: "Failed to send! Please try again.", layout: 'topRight', type: 'error'});
        }
    });
}
