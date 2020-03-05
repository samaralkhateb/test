 $(document).ready(function() {


 	$("#marketing_parent").addClass("active");
    $("#search").addClass("active");
    if($(".select").length > 0){
                $(".select").selectpicker();
                
                $(".select").on("change", function(){
                    if ($(this).val() == "" || null === $(this).val()){
                        if (!$(this).attr("multiple"))
                            $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                    }else{
                        $(this).find("option[value="+$(this).val()+"]").attr("selected",true);
                    }
                });
                }


$('body').on('hidden.bs.modal', '.modal', function () {
              $('#note_body').html("");
});

           var table =  $("#search_table").DataTable({
                    //"scrollX": true,
                    "lengthMenu": [[100,-1,50, 25, 10], [100,"All",50, 25, 10]],
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
                    "sAjaxSource": base_url + '/search/user_search_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
                    //"order": [[1, 'asc']],
                  //   dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                                {
//                                    extend: 'excel',
//                            
                                },
                                {
                                    extend : 'colvis',
                                } 
                             ] ,"columnDefs": [
                                                {
                                                    "targets": [0],
                                                    "visible": false
                                                }/*,{
                                                      "targets": -1,
                                                        "data": null,
                                                        "defaultContent": '<button class="btn btn-default btn-rounded btn-sm edit-driver" onclick="change_bill_driver($(this))">Change Driver</button>'                       
                                                    }     */                                       
                                             ]/*,
                "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    $('td .edit-driver', nRow).attr('value', aData[0]);
                }*/
                  
         
            
      });

 $('.datepicker').on('changeDate', function() {
        table.ajax.url(base_url + '/search/user_search_list/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    });


 $('#search_table tbody').on( 'click', 'tr', function () {
               
                var datarow = table.row( this ).data() ;
                var search_id = datarow[0];
//                var name = datarow[1];
                        var data = 'search_id=' + search_id;
//
          $.ajax({

            type: "POST",
            url: base_url + '/search/show_search_result',
            data: data,
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log(response);
                    if (response["results"].length) {
                    	var html ='<table class="table table-bordered">';
                                        html +='<thead>';
                                            html +='  <tr>';
                                            html +='       <th>Results</th>';
                                            html +='   </tr>';
                                           html +=' </thead>';
                                           html +=' <tbody>';
                    for (i = 0; i < response["results"].length; i++) {
                        html += '<tr class="active"><td>' + response["results"][i]["result"] + '</td><tr>';
                    }
                     html += '</tbody>';
                     html += ' </table> ';
                     $('#modal_value').text('');
                     $('#note_body').append($(html));
                }
                else{
                }
             $('#show_note_modal').modal('show');
                  }
             
              });

        } );

 });



 $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
 $( ".datepicker" ).datepicker('setDate', new Date());