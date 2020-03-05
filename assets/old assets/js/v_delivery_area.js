   $(document).ready(function() {

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
              $("#v_delivery_area").addClass("active");
         

               var   table =  $('#virtual_delivey_area').DataTable({
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
                    "sAjaxSource": base_url + '/controle_panel/get_virtual_delivery_area',
                    //"order": [[6, 'asc']],
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
                            } ,{
                              "targets": -1,
                                "data": null,
                                "defaultContent": '<button class="btn btn-default btn-rounded btn-sm delete_area"><span class="glyphicon glyphicon-remove" id="delete"></span></button>'
              
                       
                            } ,{
                                 "targets": -2,
                                "data": null,
                                "defaultContent":"<input name='ss' type='number' class='fee form-control' / ></label>"
              
                            }
                        ],
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                  
                    /*$('td .rest_set', nRow).attr('id', 'input'+aData[0]);*/
                    $('td .fee', nRow).attr('value', aData[3]);
                    $('td .fee', nRow).attr('id', aData[0]);
                    $('td .delete_area', nRow).attr('id', 'delete'+aData[0]);
                }
                   

       
       
               
      });
     
    
    
     
       });
       



   $('.display').on( 'change', 'td', function () {
     
               table = $('#virtual_delivey_area').DataTable();
                   var datarow = table.row( this ).data() ;
                   
        if ($(this).index() === 2 ) {
                  console.log(datarow);
                var data ={
                       area_id :  datarow[0],
                       fee : $("#"+datarow[0]).val(),
                   };      
                  console.log(data);   
 
        $.ajax({
                   type: "post",
                   url: base_url + '/controle_panel/update_virtual_area_fee',
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
     if ($(this).index() === 3 ) {
      table = $('#virtual_delivey_area').DataTable();
       var datarow = table.row( this ).data() ;
       var koko = this;
      noty({
          text: "Are you sure?",
          layout: 'topCenter', 
          type: 'error',
          buttons: [
                   {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {    
                             
                                          
                                           
                                          if ($(koko).index() === 3 ) {
                                                  var data ={
                                                         area_id :  datarow[0],
                                                     };      
                                          $.ajax({
                                                     type: "post",
                                                     url: base_url + '/controle_panel/delete_v_area',
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



   function add_area() {
      var rest = $("#rest_val").val();
      var fee = $("#fee").val();
      var area = $("#area").val();
   
      if (rest == "" || fee == "" || area =="" ){
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
                     };      
          $.ajax({
                     type: "post",
                     url: base_url + '/controle_panel/add_virtual_area',
                     dataType: 'json',
                     cache: false,
                     data : data,
                     success: function(response) {
                  
                        location.reload();
                      }
                      });
      }
   }



 


