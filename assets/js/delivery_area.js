   $(document).ready(function() {

   $("#control_panel_parent").addClass("active");
   $("#delivery_area").addClass("active");
   
   
     //for the auto complete select
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
        
              $("#control_panel_parent").addClass("active");
              $("#delivery_area").addClass("active");
         

               var   table =  $('#delivey_area').DataTable({
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
                    "sAjaxSource": base_url + '/controle_panel/get_delivery_area',
              //   "order": [[sortColumn, "asc"]],
                     dom: 'lfrtip',
                    colReorder: true,
                      
                    "columnDefs": [
                            {
                                "targets": [0],
                                "visible": false
                            } ,{
                              "targets": -1,
                                "data": null,
                                "defaultContent": '<button class="btn btn-default btn-rounded btn-sm delete_area"><span class="glyphicon glyphicon-remove" id="delete"></span></button>'
              
                       
                            } ,{
                                 "targets": -2,
                                "data": null,
                                "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate area_active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
              
                            },{
                                 "targets": -3,
                                "data": null,
                                "defaultContent":"<input name='ss' type='number' class='fee form-control' /></label>"
              
                            },{
                                "targets": -4,
                                "data": null,
                                "defaultContent":'<select class="provider form-control"><option value="1">Restaurant</option><option value="2">BeeOrder</option><option value="3">Mix</option> </select>'
              
                            }
                        ],
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if ( aData[5] === "0"  )
                    {
                       
                    }
                    else
                    {
                        $('td .area_active', nRow).attr('checked', 'checked');
                    }
                    /*$('td .rest_set', nRow).attr('id', 'input'+aData[0]);*/
                    $('td .fee', nRow).attr('value', aData[4]);
                    $('td .fee', nRow).attr('id', aData[0]);
                    $('td .provider option[value="'+aData[3]+'"]', nRow).attr("selected",true);
                    $('td .provider', nRow).attr('id', 'select'+aData[0]);
                    $('td .delete_area', nRow).attr('id', 'delete'+aData[0]);
                    console.log(aData);
                    if ( aData[6] === "0"  )
                       $('#all_active').prop('checked',false);
                   else
                   {
                        $('#all_active').prop('checked',true);
                   }
                }
                   

       
       
               
      });
     

    
     
       });
       
     function renderColumn(value, column, row, iDataIndex) {
    //if ( $(value).find('input.fee').length > 0) {
        return $(value).find('input.fee');
    //}
    return value;
    }
    $('.display').on( 'change', 'td', function () {
     
               table = $('#delivey_area').DataTable();
                   var datarow = table.row( this ).data() ;
                   
        if ($(this).index() === 4 ) {
                  console.log(datarow);
        
                 // alert(datarow[0])
                  var state;
                  
                if(datarow[5] === '1'){
                  //$("input"+datarow[0]).removeAttr("checked");
                  state = "0";
                }
                else{
                  state = "1";
                  //$("input"+datarow[0]).attr("checked","checked");
                }
                 
                var data ={
                       area_id :  datarow[0],
                       state : state
                   };      
                  console.log(data);   
        $.ajax({
                   type: "post",
                   url: base_url + '/controle_panel/update_area_available',
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


   $('.display').on( 'change', 'td', function () {
     
               table = $('#delivey_area').DataTable();
                   var datarow = table.row( this ).data() ;
                   
        if ($(this).index() === 3 ) {
                  console.log(datarow);
                var data ={
                       area_id :  datarow[0],
                       fee : $("#"+datarow[0]).val(),
                   };      
                  console.log(data);   
 
        $.ajax({
                   type: "post",
                   url: base_url + '/controle_panel/update_area_fee',
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




   $('.display').on( 'change', 'td', function () {
     
               table = $('#delivey_area').DataTable();
                   var datarow = table.row( this ).data() ;
                   
        if ($(this).index() === 2 ) {
                  console.log(datarow);
                var data ={
                       area_id :  datarow[0],
                       provider : $('#select'+datarow[0]+' option:selected').val()
                   };      
                  console.log(data);   
        $.ajax({
                   type: "post",
                   url: base_url + '/controle_panel/update_area_provider',
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



    $('.display').on( 'click', 'td', function () {
     if ($(this).index() === 5 ) {
      table = $('#delivey_area').DataTable();
       var datarow = table.row( this ).data() ;
       var koko = this;
      noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                          
                                           
                                          if ($(koko).index() === 5 ) {
                                                  var data ={
                                                         area_id :  datarow[0],
                                                     };      
                                          $.ajax({
                                                     type: "post",
                                                     url: base_url + '/controle_panel/delete_area',
                                                     dataType: 'json',
                                                     cache: false,
                                                     data : data,
                                                     success: function(response) {
                                                      $noty.close();
                                                        location.reload();
                                                      }
                                                      });
                                          }
                    }},
                    {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                                  $noty.close();
                              }
                          }
                      ]
                  });
        }
    });



   $(".add_new_dp").click(function(event) {
          
        $("#iconPreview").modal("show");
           
           
     });

  $(".add_new_dp_v2").click(function(event) {
          
        $("#iconPreview2").modal("show");
           
           
     });

   function add_area() {
      var rest = $("#rest_val").val();
      var fee = $("#fee").val();
      var area = $("#area").val();
      var provider = $("#provider").val();
      var active;
      if ($('#active').is(":checked"))
        active = 1;
      else
        active = 0;

      if (rest == "" || fee == "" || area =="" || provider == ""){
          noty({
          timeout: 1500,
          text: "Please fill all inputs",
          layout: 'topCenter', 
          type: 'error'
          
                  });
      }else{
          var data ={
                         rest :  rest,
                         fee :  fee,
                         area :  area,
                         provider :  provider,
                         active :  active,
                     };      
          $.ajax({
                     type: "post",
                     url: base_url + '/controle_panel/add_area',
                     dataType: 'json',
                     cache: false,
                     data : data,
                     success: function(response) {
                  
                        location.reload();
                      }
                      });
      }
   }



   $('#all_active').on( 'change',function () {
          noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                        var status = "";
                                        if ($('#all_active').is(":checked"))
                                          status = 1;
                                        else
                                          status = 0;
                                         var data ={
                                                     status :  status,
                                                    };      
                                            $.ajax({
                                                       type: "post",
                                                       url: base_url + '/controle_panel/change_active_for_all_area',
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

   $("#big-data").on('click', function () {

document.location= base_url + '/controle_panel/get_Export_delivery_area';
            
});