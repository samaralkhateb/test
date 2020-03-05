 $(document).ready(function() {


 	$("#marketing_parent").addClass("active");
    $("#search_group").addClass("active");
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

           var table =  $("#search_group_table").DataTable({
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
                    "scrollX": true,
                    "responsive": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/search/search_grouping/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
                    //"order": [[1, 'asc']],
               //      dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                      
                                {
//                                    extend: 'excel',
                                    }
                                
                             ]
         
            
      });

 $('.datepicker').on('changeDate', function() {
        table.ajax.url(base_url + '/search/search_grouping/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val()).load();
    });
 });



 $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
 $( ".datepicker" ).datepicker('setDate', new Date());