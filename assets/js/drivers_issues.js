$(document).ready(function () {

   $("#dirvers_parent").addClass("active");
   $("#driver_issue").addClass("active");

   $(".datepicker").datepicker({ format: 'yyyy-mm-dd', });



   let ajaxsrc = null;
   
   let url = location.href.split('/');
   // if get param 

   if(url[6] && url[7] && url[[8]]) {

      let from = url[6]
      let to = url[7]
      let id = url[8]

       from = from.split('%')[0];
       to = to.split('%')[0];
       
       let regex = /^[0-9-]+$/;
       if(regex.test(id) && regex.test(from) && regex.test(to)){
      // valid params 
      $('#select_driver').val(id);
      $('#from-date').val(from);
      $('#to-date').val(to);
      
      ajaxsrc = base_url + '/controle_panel/driver_issues/' + from + '/' + to +  '/' + id;
       }else {
         // invalid params    
         window.location.href = base_url + '/drivers/productivity_report_view';
       }
   }else if (url[6] ||  url[7] ||  url[[8]]) {
      window.location.href = base_url + '/controle_panel/driver_issues_view'; 
   }
   
   var table = $("#drivers_issues").DataTable({
      "ordering": true,
      "destroy": true,
      "bInfo": false,
      "bPaginate": true,
      "bLengthChange": true,
      "searching": true,
      "bSearchable": true,
      "bProcessing": true,
      "scrollX": true,
      "responsive": true,
      "deferLoading": 57,
      "emptyTable": "No data available in table",
      "bServerSide": false,
      "sAjaxSource":ajaxsrc,
      dom: 'Blfrtip',
      colReorder: true,
      buttons: [
         {
            extend: 'excel',
         }
      ],
   });

   function reloadDate() {

      if( ajaxsrc ) {
         window.location.href = base_url + '/controle_panel/driver_issues_view';
      }

      if($('#from-date').val() && $('#to-date').val() ) {
         let id =  $('#select_driver').val();
         let from = $('#from-date').val();
         let to = $('#to-date').val();
         let url = `${base_url}/controle_panel/driver_issues/${from}/${to}/${id}`;
         table.ajax.url(url).load();
       }
   }

   $('.datepicker').on('changeDate', reloadDate); 
   $('#select_driver').on('change',reloadDate);



});