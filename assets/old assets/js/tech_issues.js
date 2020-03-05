   $(document).ready(function() {
             
    $("#create_admin_parent").addClass("active");
$("#tech_issue").addClass("active");


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
               
   $('.datepicker').on('changeDate', function() {
              var   table =  $("#tech_issues").DataTable({
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
                    /*"sAjaxSource": base_url + '/controle_panel/tech_issues_list/format/json?start_date='
                    + '2015-3-4'
                    + '&end_date='
                    + '2017-3-3',*/
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
                              "targets": [1],
                              "visible": false
                          },
                                   {
                              "targets": [5],
                              "visible": false
                          },
                           {
                              "targets": -1,
                                "data": null,
                                "defaultContent": "<button class='button btn btn-success' style='display:none' >close</button>\n\
                             <label class='pending' style='color:2c3f46;;display:none'>Solved</label>   "
                            } 
        ],
              "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if ( aData[5] == "0" )
                    {
                        $('td .button', nRow).css('display', 'inline');
                    }
                    else
                    {
                        $('td .pending', nRow).css('display', 'inline');
                    }
                }
                
        

            
      });
      table.ajax.url( base_url+'/controle_panel/tech_issues_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    
            });
     });
     
    
       
   
    $('#tech_issues tbody').on('click', '.button', function() {
              table = $('#tech_issues').DataTable();
          var data = table.row( $(this).parents('tr') ).data();
         var status_id = data[1];
              var data = 'status_id=' + status_id ;
            $.ajax({
                type: "POST",
                url: base_url + '/controle_panel/close_tech_problem',
                data: data,
                dataType: 'json',
                cache: false,
                success: function(response) {
                    console.log(response);
                      table.ajax.reload();
                }

            });
          
     

    });
      
        
          $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());


        
             
          $('body').on('hidden.bs.modal', '.modal', function () {
        $('#status').html("");
          });