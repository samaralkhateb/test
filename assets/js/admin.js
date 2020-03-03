
var user_id_index = 0;
var user_name_index = user_id_index + 1;
var email_index = user_name_index + 1;
var password_index = email_index + 1;
var role_id_index = password_index + 1;
var city_index = role_id_index + 1;
var active_index = city_index + 1;

var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1
 
var url =  base_url + '/call_center/role_Admin';
$.ajax(
      {
          url: url,
          type: "get",
          dataType: "json",
          success: function(data) {
          
           var options = [], _options;
           for(var i in data) {
                  
                     var option = '<option value='+ data[i]["id"] +'> ' +  data[i]["name"] + '</option>';
                     
                     options.push(option);
                   }
                   _options = options.join('');
                   console.log('_options');
                   console.log(_options);
          



$(document).ready(function() {
   
    $("#accounting_parent").addClass("active");
    $("#create_admin").addClass("active");
    
     $('#user_role').DataTable({
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
          "scrollX": true,
          "sAjaxSource": base_url + '/call_center/all_user/format/json',
          "order": [user_id_index, 'asc'],
      //     dom: 'Blfrtip',
          colReorder: true,
           " responsive": true,
//              buttons: [
//            
//            {
//                extend: 'excel',
//            } 
//         ] ,
                  "columnDefs": [
                  {
                      "targets": [user_id_index],
                      "visible": false
                  },
                 //  {
                 //      "targets": comm_end_date_index,
                 //        "data": null,
                 //        "defaultContent": "<input name='end_date' type='text' class='end_date form-control datepicker'  / ><span></span></label>"
                                             
                 //    } ,
                 //  {
                 //    "targets": comm_start_date_index,
                 //      "data": null,
                 //      "defaultContent": "<input name='start_date' type='text' class='start_date form-control datepicker'  / ><span></span></label>"
    
             
                 //  } ,
            //      {
            //         "targets": role_id_index,
            //         "data": null,
            //         "defaultContent":'<select name = "role_id" class="role_id form-control"><option value = "null"> No Role </option>'+_options+'</select></label>'
            // },   
                 
                {
                    "targets": active_index,
                      "data": null,
                      "defaultContent": "<label class='switch switch-small'><input type='checkbox' name='active' class='button activate active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
    
             
                  }
               
               
               
               
              ],
"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
       
          
         
         
          
          $('td .name', nRow).attr('value', aData[user_name_index]);
          $('td .name', nRow).attr('id', aData[user_id_index]+"_name");
          
          $('td .email', nRow).attr('value', aData[email_index]);
          $('td .email', nRow).attr('id', aData[user_id_index]+"_email");

          $('td .password', nRow).attr('value', aData[password_index]);
          $('td .password', nRow).attr('id', aData[user_id_index]+"_pass");

          $('td .role_id', nRow).attr('value', aData[role_id_index]);
          $('td .role_id', nRow).attr('id', aData[user_id_index]+"_role");
          
          $('td .city', nRow).attr('value', aData[city_index]);
          $('td .city', nRow).attr('id', aData[user_id_index] +"_city");
    
        //   $('td .role_id option[value="'+aData[role_id_index]+'"]', nRow).attr("selected",true);
        //   $('td .role_id', nRow).attr('id', 'select'+aData[user_id_index]);

        
          if ( aData[active_index] == 0 )
          {
              // $('#'+aData[voucher_id_index]+"active").prop('checked',false);
             //  $('td .active', nRow).attr('checked', ' ');
          }
          else
          {
              $('td .active', nRow).attr('checked', 'checked');
          }
            // console.log(aData[active_index]);
            $('td .active', nRow).attr('id', aData[user_id_index]+"_active");
}      
}); 
});

}
}); 


$('.display').on( 'change', 'td', function () {
  
    table = $('#user_role').DataTable();
    var datarow = table.row( this ).data() ;
    var comm_active_column = active_index - invisible_columns;
        
if ($(this).index() === comm_active_column ) {

             
    var id = datarow[user_id_index];

    var checkbox_id = "#"+datarow[user_id_index]+"_active"
    var isChecked = $(checkbox_id + ':checked').val()?1:0;
     $.ajax({
       type: "post",
       url: base_url + '/call_center/update_user_active/',
       dataType: 'text',
       data :{
            active : isChecked,
            id: id
       },
       cache: false,
          success: function() {
           noty({text: 'Successful action', layout: 'topCenter', type: 'success'});
          },error: function(){
           noty({text: 'error action', layout: 'topCenter', type: 'error'});
        }
        });
     
  
     }



       });
       
