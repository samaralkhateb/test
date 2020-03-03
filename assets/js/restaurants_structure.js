var rest_id_index = 0;
var rest_name_index = rest_id_index + 1;
var rest_area_index = rest_name_index + 1;
var rest_type_index = rest_area_index + 1;
var rest_beeorder_registed_index = rest_type_index + 1;


var rest_free_delivery = rest_beeorder_registed_index + 1;


var rest_later_order_index = rest_free_delivery + 1;
var rest_voucher_index = rest_later_order_index + 1;
var rest_bill_calculation_type_index = rest_voucher_index + 1;
var rest_position_index = rest_bill_calculation_type_index + 1;
var rest_max_distance_index = rest_position_index + 1;
var accounting_code_index = rest_max_distance_index + 1;

var rest_min_order= accounting_code_index + 1;
var rest_max_order= rest_min_order + 1;
;
var invisible_columns = 1;       // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1


$(document).ready(function() {
   
           $("#accounting_parent").addClass("active");
           $("#rest_structure").addClass("active");
            var   table =  $('#r_structure').DataTable({
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
                
                 "sAjaxSource": base_url + '/call_center/restaurants_structure/format/json',
                 //"order": [[6, 'asc']],
               //   dom: 'Blfrtip',
                 colReorder: true,
                  " responsive": true,
//                     buttons: [
//                   
//                   {
//                       extend: 'excel',
//                   } 
//                ] ,
                         "columnDefs": [
                         {
                             "targets": [rest_id_index],
                             "visible": false
                         },
                        //  {
                        //      "targets": rest_position_index,
                        //      "render": function ( data ) {
                               
                        //         if (user_role == 4)
                        //         {
                        //                       return  `    
                        //                       <input name='position' type='number' class='res_position' style='width: 60%;'  maxlength="1" min="0" max="5" oninput="this.value=(this.value>this.max+1)?this.max:(this.value===this.min-1)?this.min:this.value.slice(0,this.maxLength)" / ><span>Position</span></label>
                        //                   `;
                        //         }
                        //         else
                        //         {
                        //             return null;
                        //         }
                            
                      
                        //    }} ,


                        //  {
                        //    "targets": [rest_type_index],
                        //      "data": null,
                        //      "defaultContent":'<select name = "type" class="type form-control"><option value = "1"> STANDARD </option><option value = "2"> VIRTUAL </option><option value = "3"> EXTERNAL </option></select></label>',
                        //      "visible": false
                    
                        //  } ,
                         {
                              "targets": [rest_beeorder_registed_index],
                             "data": null,
                             "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate beeorder_registed'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
           
                         },   
                         {
                          "targets": [rest_free_delivery],
                         "data": null,
                         "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate free_stat'  style='color:white;border-radius: 4px;background-color: #2f434c;' / ><span></span></label>"
       
                     },  
                     {
                      "targets": [rest_min_order],
                        "data": null,
                        "defaultContent": "<input name='min_order' type='number' class='min_order  form-control'  style='width:90px' autocomplete='off' / ></label>"
        
               
                    } ,
                    {
                      "targets": [rest_max_order],
                        "data": null,
                        "defaultContent": "<input name='max_order' type='number' class='max_order  form-control' style='width:90px' autocomplete='off'  / ></label>"
        
               
                    } ,

                         {
                            "targets": [rest_later_order_index],
                           "data": null,
                           "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate later_order'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
         
                       },    
                       
                       {
                        "targets": [rest_voucher_index],
                       "data": null,
                       "defaultContent":"<label class='switch switch-small'><input type='checkbox' class='button activate voucher'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
     
                         },    
                         {
                            "targets": [rest_bill_calculation_type_index],
                              "data": null,
                              "defaultContent":'<select name = "bill_calculation_type" class="bill_calculation_type form-control"><option value = "10"> STDV_ </option><option value = "1"> STVD </option><option value = "2"> SDVT </option><option value = "3"> STDV </option><option value = "4"> SDTV </option><option value = "5"> SVTD </option><option value = "6"> SVDT </option><option value = "7"> STV </option><option value = "8"> SVT </option><option value = "9"> SVTD_ </option></select></label>'
            
                     
                          } ,
                          {
                            "targets": [rest_position_index],
                              "data": null,
                              "defaultContent":"<input name='position' type='number' class='position' style='width: 60%;'  maxlength='2' min='0' max='10' oninput='this.value=(this.value>10)?this.max:(this.value===this.min-1)?this.min:this.value.slice(0,this.maxLength)' / ><span>Position</span></label>"
            
                     
                          } ,
                           {
                             "targets": [rest_max_distance_index],
                             "data": null,
                             "defaultContent": "<input name='max_distance' type='number' class='res_max_distance form-control'  / ></label>"


                           }
                           ,
                             {
                                 "targets": [accounting_code_index],
                                 "data": null,
                               "defaultContent": "<input name='accounting_code' type='text' class='res_accounting_code form-control'  / ></label>"


                             }
                             
                          
                     ],
      "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                 //console.log(aData);
                 //console.log(nRow);
              
                 if ( aData[rest_beeorder_registed_index] === "0"  )
                 {
                 }
                 else
                 {
                     $('td .beeorder_registed', nRow).attr('checked', 'checked');
                 }

                 if ( aData[rest_free_delivery] === "0"  )
                 {
                 }
                 else
                 {
                     $('td .free_stat', nRow).attr('checked', 'checked');
                 }



                 if ( aData[rest_later_order_index] === "0"  )
                 {
                 }
                 else
                 {
                     $('td .later_order', nRow).attr('checked', 'checked');
                 }

                 if ( aData[rest_voucher_index] === "0"  )
                 {
                 }
                 else
                 {
                     $('td .voucher', nRow).attr('checked', 'checked');
                 }
                 
                 
                 $('td .beeorder_registed', nRow).attr('id', aData[rest_id_index]+"_beeorder_registed");
                 $('td .later_order', nRow).attr('id', aData[rest_id_index]+"_later_order");
                 $('td .voucher', nRow).attr('id', aData[rest_id_index]+"_voucher");

                $('td .min_order', nRow).attr('id', aData[rest_id_index]+"_min");
                $('td .min_order', nRow).attr('value', aData[rest_min_order]);

                $('td .max_order', nRow).attr('id', aData[rest_id_index]+"_max");
                $('td .max_order', nRow).attr('value', aData[rest_max_order]);
                $('td .position', nRow).attr('value', aData[rest_position_index]);
                $('td .position', nRow).attr('id', aData[rest_id_index]+"_pos");

          $('td .res_accounting_code', nRow).attr('value', aData[accounting_code_index]);
          $('td .res_accounting_code', nRow).attr('id', aData[rest_id_index] + "_accounting_code");
      
        $('td .res_max_distance', nRow).attr('value', aData[rest_max_distance_index]);
        $('td .res_max_distance', nRow).attr('id', aData[rest_id_index] + "_max_distance");

          
                $('td .bill_calculation_type option[value="'+aData[rest_bill_calculation_type_index]+'"]', nRow).attr("selected",true);
                $('td .bill_calculation_type', nRow).attr('id', 'bill_calculation_type'+aData[rest_id_index]);

 
        
                // $('td .type option[value="'+aData[rest_type_index]+'"]', nRow).attr("selected",true);
                // $('td .type', nRow).attr('id', 'select'+aData[rest_id_index]);

      }     

   }); 
       

    });



        
$('.display').on( 'change', 'td', function () {
  
    table = $('#r_structure').DataTable();
        var datarow = table.row( this ).data() ;


 
        var beeorder_registed_column = rest_beeorder_registed_index - invisible_columns;
        var later_order_column = rest_later_order_index - invisible_columns;
        var voucher_column = rest_voucher_index - invisible_columns;
        var bill_calculation_type_column = rest_bill_calculation_type_index - invisible_columns;
        var position_column = rest_position_index - invisible_columns;
        var accounting_code_column = accounting_code_index - invisible_columns;
        var rest_max_distance_column = rest_max_distance_index - invisible_columns;

        var rest_min_order_column = rest_min_order - invisible_columns;

        var rest_max_order_column = rest_max_order - invisible_columns;

        var rest_free_delivery_column = rest_free_delivery - invisible_columns;


    if ($(this).index() === accounting_code_column) {
      //  var rest_id = datarow[rest_id_index];
      var data = {
        rest_id: datarow[rest_id_index],
          accounting_code: $("#" + datarow[rest_id_index] + "_accounting_code").val()
      };

      $.ajax({
        type: "post",
          url: base_url + "/restaurants/update_rest_accounting_code?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Type",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    // } else if ($(this).index() === type_column) {
    //   //  var rest_id = datarow[rest_id_index];
    //   var data = {
    //     rest_id: datarow[rest_id_index],
    //     type: $(
    //       "#select" + datarow[rest_id_index] + " option:selected"
    //     ).val()
    //   };

    //   $.ajax({
    //     type: "post",
    //     url: base_url + "/restaurants/update_rest_type?format=json",
    //     dataType: "json",
    //     cache: false,
    //     data: data,
    //     success: function(response) {
    //       // location.reload();
    //       noty({
    //         timeout: 1500,
    //           text: "Updated accounting code",
    //         layout: "topCenter",
    //         type: "success"
    //       });
    //     },
    //     error: function() {
    //       noty({
    //         text: "error action",
    //         layout: "topCenter",
    //         type: "error"
    //       });
    //     }
      // });
    } else if ($(this).index() === bill_calculation_type_column) {
      //  var rest_id = datarow[rest_id_index];
      var data = {
        rest_id: datarow[rest_id_index],
        bill_calculation_type: $(
          "#bill_calculation_type" +
            datarow[rest_id_index] +
            " option:selected"
        ).val()
      };

      $.ajax({
        type: "post",
        url:
          base_url +
          "/restaurants/update_bill_calculation_type?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Bill Calculation Type",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    } else if ($(this).index() === beeorder_registed_column) {
      //  var rest_id = datarow[rest_id_index];
      var checkbox_id = "#" + datarow[rest_id_index] + "_beeorder_registed";
      var beeorder_registed = $(checkbox_id + ":checked").val() ? 1 : 0;
      var data = {
        rest_id: datarow[rest_id_index],
        beeorder_registed: beeorder_registed
      };

      $.ajax({
        type: "post",
        url: base_url + "/restaurants/update_beeorder_registed?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Beeorder Registed",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    } else if ($(this).index() === later_order_column) {
      //  var rest_id = datarow[rest_id_index];
      var checkbox_id = "#" + datarow[rest_id_index] + "_later_order";
      var later_order = $(checkbox_id + ":checked").val() ? 1 : 0;
      var data = {
        rest_id: datarow[rest_id_index],
        later_order: later_order
      };

      $.ajax({
        type: "post",
        url: base_url + "/restaurants/update_later_order?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Later Order",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    } else if ($(this).index() === voucher_column) {
      //  var rest_id = datarow[rest_id_index];
      var checkbox_id = "#" + datarow[rest_id_index] + "_voucher";
      var voucher = $(checkbox_id + ":checked").val() ? 1 : 0;
      var data = {
        rest_id: datarow[rest_id_index],
        voucher: voucher
      };

      $.ajax({
        type: "post",
        url: base_url + "/restaurants/update_voucher?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Voucher",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    } else if ($(this).index() === position_column) {
      var rest_id = datarow[rest_id_index];
      var data = {
        rest_id: datarow[rest_id_index],
        rest_position: $("#" + datarow[rest_id_index] + "_pos").val()
      };
      console.log($("#" + datarow[rest_id_index] + "_pos").val());
      $.ajax({
        type: "post",
        url: base_url + "/restaurants/update_rest_position?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function(response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Position",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function() {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    }

    else if ($(this).index() === rest_max_distance_column) {
      var rest_id = datarow[rest_id_index];
      var data = {
        rest_id: datarow[rest_id_index],
        rest_max_distance: $("#" + datarow[rest_id_index] + "_max_distance").val()
      };
      console.log(data);
      $.ajax({
        type: "post",
        url: base_url + "/restaurants/update_rest_max_distance?format=json",
        dataType: "json",
        cache: false,
        data: data,
        success: function (response) {
          // location.reload();
          noty({
            timeout: 1500,
            text: "Updated Position",
            layout: "topCenter",
            type: "success"
          });
        },
        error: function () {
          noty({
            text: "error action",
            layout: "topCenter",
            type: "error"
          });
        }
      });
    }    else if ($(this).index() === rest_min_order_column) {
                  // var rest_id = datarow[rest_id_index];
                  let data ={
                          rest_id :  datarow[rest_id_index],
                          rest_minorder : $("#"+datarow[rest_id_index]+"_min").val(),
                      };
                      $.ajax({
                        type: "post",
                        url: base_url + '/restaurants/update_rest_min_order',
                        dataType: 'json',
                        cache: false,
                        data : data,
                        success: function() {
                        noty({
                               timeout: 1500,
                               text: "Updated",
                               layout: 'topCenter', 
                               type: 'success'
                               
                            });
                         }
                         });
            }

            else if ($(this).index() === rest_max_order_column) {
                  let data ={
                    rest_id :  datarow[rest_id_index],
                    rest_maxorder : $("#"+datarow[rest_id_index]+"_max").val(),
                };

                $.ajax({
                  type: "post",
                  url: base_url + '/restaurants/update_rest_max_order',
                  dataType: 'json',
                  cache: false,
                  data : data,
                  success: function() {
                  noty({
                         timeout: 1500,
                         text: "Updated",
                         layout: 'topCenter', 
                         type: 'success'
                      });
                   }
                   });
           }



           else if ($(this).index() === rest_free_delivery_column) {
               
            let rest_id = datarow[rest_free_delivery];
            let state;
            if(datarow[rest_free_delivery] === '1'){
              state = "0";
            }
            else{
              state = "1";
            }
            datarow[rest_free_delivery] = state;  
            let data = { 
              "restaurant_id": datarow[rest_id_index],
              "current_status" : state
          }
          
          $.ajax({
            type: "post",
            url: base_url + '/restaurants/update_rest_free_delivery',
            dataType: 'json',
            cache: false,
            data : data,
            success: function() {
            noty({
                   timeout: 1500,
                   text: "Updated",
                   layout: 'topCenter', 
                   type: 'success'
                });
                // window.location.reload();
             }
             });

          }

  
   

       });
       


