$(document).ready(function() {

    
        
 
    $("#dashboard_parent").addClass("active");
    $("#blocked_list").addClass("active");


     var   table =  $('#blocked_list_table').DataTable({
          "ordering": true,
          "destroy": true,
          "bInfo": false,
          "bPaginate": true,
          "bLengthChange": true,
          "searching": true,
          "bSearchable":true,
          "bProcessing": true,
          "deferLoading": 57,
          "scrollX": true,
          "emptyTable": "No data available in table",
          "bServerSide": false,
          "sAjaxSource": base_url + '/controle_panel/blocked_users_list/format/json',
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
                    "targets": -1,
                      "data": null,
                      "defaultContent": "<button class='btn btn-success'  >Unblock</button>"
             
                  } 
              ],

         



     
});



});


$('.display').on( 'click', 'td', function () {
        table = $('#blocked_list_table').DataTable();
         var datarow = table.row( this ).data() ;
if ($(this).index() === 4 ) {
var mobile = datarow[1];
    var data = {mobile:  mobile };
  $.ajax({
         type: "post",
         url: base_url + '/controle_panel/unblock_user',
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
          location.reload();
       // document.location =  base_url +'/reports/restaurant_account?restaurant_id='+ restaurant_id +'&name='+ name;
      }

  });
}

});