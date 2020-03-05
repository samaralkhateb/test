   $(document).ready(function() {
              
    $("#create_admin_parent").addClass("active");
    $("#client_log_page").addClass("active");

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
            var table;   

                 table =  $("#client_log").DataTable({
                    //"scrollX": true,
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
                    "sAjaxSource": base_url + '/client_log/client_log_list/format/json?start_date='
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
                                    // this.api().columns().every( function () {
                                    //     var column = this;
                                         //alert($(this.header()).text().trim())
                                        // var select = $('<select class="form-control col'+this.index( 'visible' )+'" data-live-search="true"><option value=""></option></select>')
                                        //     .appendTo( $(column.footer()).empty() )
                                        //     .on( 'change', function () {
                                        //         var val = $.fn.dataTable.util.escapeRegex(
                                        //             $(this).val()
                                        //         );
                         
                                        //         column
                                        //             .search( val ? '^'+val+'$' : '', true, false )
                                        //             .draw();
                                        //     });
                                        // column.data().unique().sort().each( function ( d, j ) {
                                        //     select.append( '<option value="'+d+'">'+d+'</option>' )
                                        // } );



                                        //  $(".col"+this.index( 'visible' )).selectpicker();
                                    // });

                                    // $('#client_log tfoot tr').insertAfter($('#client_log thead tr'));
                            }
            
      });




$('.datepicker').on('changeDate', function() {
    table.ajax.url(base_url + '/client_log/client_log_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    });


             
     
    });
     
    
          $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());