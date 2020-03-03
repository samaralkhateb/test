   $(document).ready(function() {
              $("#reports_parent").addClass("active");
              $("#rest_issue").addClass("active");
              if($(".select").length > 0){
                $(".select").selectpicker();
                
                $(".select").on("change", function(){
                    if($(this).val() == "" || null === $(this).val()){
                        if(!$(this).attr("multiple"))
                            $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                    }else{
                        $(this).find("option[value="+$(this).val()+"]").attr("selected",true);
                    }
                });
                }
                $("#dashboard_parent").addClass("active");
                $("#rest_issue").addClass("active");
            
   $('.datepicker').on('changeDate', function() {
              var   table =  $("#rest_issues").DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "scrollX": true,
                    "responsive": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    /*"sAjaxSource": base_url + '/controle_panel/rest_issues_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),*/
                    //"order": [[1, 'asc']],
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
                              "targets": -1,
                                "data": null,
                                "defaultContent": "<button class='pending_button btn btn-success' style='display:none' >Close</button>\n\
                             <label class='pending' style='color:2c3f46;display:none'>Solved</label>   "
                            } ,

                            {
                              "targets": -2,
                                "data": null,
                                "defaultContent": "<button class='proccess_button btn btn-alert' style='display:none' >UnderProcess</button>\n\
                             <label class='proccessing' style='color:2c3f46;;display:none'>processing</label>   "
                            }
                             ,

                            {
                              "targets": -3,
                                "data": null,
                                "defaultContent": "<button class='showbill btn btn-primery' >ViewBill</button>  "
                            },
                              {
                              "targets": -4,
                                "data": null,
                                "defaultContent":"<input name='note' type='text' class='rest_note form-control' / ></label>"
                            }
                    ],
                    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                   if ( aData[5] == "0" && aData[6] =="0" )
                    {
                        $('td .proccess_button', nRow).css('display', 'inline');
                         $('td .pending_button', nRow).css('display', 'inline');
                    }
                    else
                    {
                        //console.log('sd');
                        if(aData[5] == "1" ){
                            $('td .pending', nRow).css('display', 'inline');
                        }
                        else if (aData[6] == "1" && aData[5] == "0" ){
                        $('td .pending_button', nRow).css('display', 'inline');

                        $('td .proccessing', nRow).css('display', 'inline');
                    }
                    }
                       $('td .rest_note', nRow).attr('value', aData[9]);

                }
         

            
      });
      table.ajax.url( base_url+'/controle_panel/rest_issues_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    
            });
     });
     
    
       
   

      $('.display').on( 'change', 'td', function () {

               table = $('#rest_issues').DataTable();
                   var datarow = table.row( this ).data() ;
        if ($(this).index() === 4 ) {
           
                var data ={
                       status_id :  datarow[0],
                       note : $('.rest_note').val(),
                   };      
                  console.log(data);   
 
        $.ajax({
                   type: "post",
                   url: base_url + '/controle_panel/rest_issue_note',
                   dataType: 'json',
                   cache: false,
                   data : data,
                   success: function(response) {
                         noty({
                          timeout: 1500,
                          text: "Updated",
                          layout: 'topCenter', 
                          type: 'success'
                          
                                  });
                    }
                    });
                }
 


                  });
        
          $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());



             $('#rest_issues tbody').on('click', '.pending_button', function() {
              table = $('#rest_issues').DataTable();
          var data = table.row( $(this).parents('tr') ).data();
         var status_id = data[0];
              var data = 'status_id=' + status_id  + '&action= 2'  ;
//             
            $.ajax({
                type: "POST",
                url: base_url + '/controle_panel/close_rest_problem',
                data: data,
                dataType: 'json',
                cache: false,
                success: function(response) {
                    console.log(response);
                     table.ajax.reload();
                }

            });
           
     

    });


              $('#rest_issues tbody').on('click', '.proccess_button', function() {
              table = $('#rest_issues').DataTable();
          var data = table.row( $(this).parents('tr') ).data();
         var status_id = data[0];
              var data = 'status_id=' + status_id  + '&action=1' ;
            $.ajax({
                type: "POST",
                url: base_url + '/controle_panel/close_rest_problem',
                data: data,
                dataType: 'json',
                cache: false,
                success: function(response) {
                    console.log(response);
                     table.ajax.reload();
                }

            });
           
     

    });


              $('#rest_issues tbody').on('click', '.showbill', function() {
                       
                         table = $('#rest_issues').DataTable();
                 
          var datarow = table.row( $(this).parents('tr') ).data();
                  console.log(datarow);
                   var search_id = datarow[8];
                           var data = 'bill_id=' + search_id;
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
    
           } );
          $('body').on('hidden.bs.modal', '.modal', function () {
        $('#status').html("");
          });
          
   