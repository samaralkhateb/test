var voucher_id_index = 0;
var voucher_index = voucher_id_index + 1;
var category_index = voucher_index + 1;
var type_index = category_index + 1;
var value_index = type_index + 1;
var creation_index = value_index + 1;
var validate_index = creation_index + 1;
var restaurant_index = validate_index + 1;
var customer_index = restaurant_index + 1;
var active_id_index = customer_index + 1;
var min_order_index = active_id_index + 1;

var invisible_columns = 1; // IF VISIBLE IS SET TO FALSE IN columnDefs, THIS VARIABLE MUST BE INCREASED BY 1

$(document).ready(function() {
  $("#marketing_parent").addClass("active");
  $("#add_vouchers").addClass("active");

  $("#datetimepicker2").datetimepicker({
    language: "en",
    //   pick12HourFormat: true
    format: "yyyy-mm-dd h:i:s"
  });
   

  var table = $("#voucher_rep").dataTable({
    ordering: true,
    destroy: true,
    bInfo: false,
    bPaginate: true,
    bLengthChange: false,
    searching: true,
    bSearchable: true,
    bProcessing: true,
    emptyTable: "No data available in table",
    bServerSide: false,
    scrollX: true,
    iDisplayLength: -1,
    sAjaxSource: base_url + "/call_center/get_all_vouchers/format/json",
    order: [voucher_id_index, "desc"],
    dom: "lfrtip",

    //  colReorder: true,
    //  " responsive": true,

    columnDefs: [
      {
        targets: [voucher_id_index],
        visible: false
      },
      {
        targets: [customer_index],
        data: null,
        //   defaultContent:
        //     ' <input type="text" name="customer"  data-role="tagsinput" class="form-control input-lg customer" /><span></span> '
        // },
        render: function(data, type, full, meta) {
          if (data[type_index] == "PromoCode") {
            if (type === "display") {
              data =
                "<button class='btn btn-success customer' id='customer_but' value='" +
                full[0] +
                "' onclick= edit_phones(" +
                full[0] +
                "); >Edit</button>";
            }
            return data;
          } else {
            return "";
          }
        }
      },

      {
        targets: [active_id_index],
        data: null,
        defaultContent:
          "<label class='switch switch-small'><input type='checkbox' class='button activate active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
      },
      {
        targets: [min_order_index],
        data: null,
        defaultContent:
          "<label class='switch switch-small'><input type='checkbox' class='button activate active_min_order'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"
      },

      {
        targets: [restaurant_index],
        data: null,
        //  defaultContent:
        //  '<select name = "restaurant_id" class=" selectpicker restaurant_m "  multiple  data-live-search="true" list="restaurant_id" data-hide-disabled="true" style="width: auto;" data-virtual-scroll="false">'
        //  + _options  +
        //  '</select>'

        render: function(data, type, full, meta) {
          if (type === "display") {
            data =
              "<button class='btn btn-success restaurant_m' value='" +
              full[0] +
              "' onclick= edit_restaurant(" +
              full[0] +
              "); >Edit</button>";
          }
          return data;
        }

        //  "<button class='btn btn-success restaurant_m' value='" +
        //  [voucher_id_index] +
        //  "' onclick= edit_restaurant(" +
        //  [voucher_id_index] +
        //  "); >Edit</button>"
      }
    ],
    fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      // $('td .active', nRow).attr('value', aData[active_id_index]);
      //  $('td .active', nRow).attr('id', aData[voucher_id_index]+"active");

      $("td .voucher_id", nRow).attr("value", aData[voucher_id_index]);
      $("td .voucher_id", nRow).attr(
        "id",
        aData[voucher_id_index] + "voucher_id"
      );

      $("td .validate", nRow).attr("value", aData[validate_index]);
      $("td .validate", nRow).attr(
        "id",
        aData[voucher_id_index] + "validate_index"
      );

      $("td .creation", nRow).attr("value", aData[creation_index]);
      $("td .creation", nRow).attr(
        "id",
        aData[voucher_id_index] + "creation"
      );

      $("td .restaurant_m", nRow).attr("value", aData[restaurant_index]);
      $("td .restaurant_m", nRow).attr(
        "id",
        aData[voucher_id_index] + "_restaurant_m"
      );

      $("td .value", nRow).attr("value", aData[value_index]);
      $("td .value", nRow).attr("id", aData[voucher_id_index] + "value");

      $("td .type", nRow).attr("value", aData[type_index]);
      $("td .type", nRow).attr("id", aData[voucher_id_index] + "type");

      // if (aData[type_index] != "PromoCode") {

      //   $("#customer_but").css("display", "none");
      //   console.log($("#customer_but"));
      // }
      $("td .category", nRow).attr("value", aData[category_index]);
      $("td .category", nRow).attr(
        "id",
        aData[voucher_id_index] + "category"
      );

      $("td .voucher", nRow).attr("value", aData[voucher_index]);
      $("td .voucher", nRow).attr("id", aData[voucher_id_index] + "voucher");

      $("td .customer", nRow).attr("value", aData[customer_index]);
      $("td .customer", nRow).attr(
        "id",
        aData[voucher_id_index] + "_customer"
      );

      if (aData[active_id_index] == 0) {
      } else {
        $("td .active", nRow).attr("checked", "checked");
      }
      if (aData[min_order_index] == 0) {  
      } else {
        $("td .active_min_order", nRow).attr("checked", "checked");  
       
      }
      $('td .active_min_order', nRow).attr('id', aData[voucher_id_index] + "_active_min_order");
     
    }
  });




});


function edit_restaurant(voucher_id_index) {
  $("#address").html(""); 
  $("#show_address_modal").modal("hide");
  
  var allres = $("#" + voucher_id_index + "_restaurant_m").val();
   
  var url = base_url + "/call_center/get_res";
  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    success: function(data) {
      var options = [],
        _options;
      for (var i in data) {
        var option = "<option value=" +  data[i]["id"] + "> " + data[i]["name"] +  "</option>";

        options.push(option);
      }
      _options = options.join("");

 html = '<div class="row">';
      html += '<div class="col-md-4">';
      html += "Restaurant";
      html +='<select id="restaurant_id_m" class=" selectpicker restaurant_m select"  multiple  data-live-search="true" list="restaurant_id"  >' +
        _options + '</select>';
        // html +=
        //   '<select class="form-control input-sm select-cus restaurant_m" name="area"  id="area" >' +
        //   _options +
        //   "</select>";

      html += " </div></div>";
 html +=
   ' </div></div></div><hr class="separate_addons"><div class="row"><button class="btn btn-danger" onclick="update_restaurant_voucher(' +
   voucher_id_index +
   ')" >Update Restaurant</button></div>';

   $("#address").append($(html));
      if (allres) {
        $.each(allres.split(","), function(i, e) {
          $(".select option[value='" + e + "']").attr("selected", true);
          // console.log(e);
        });
      }

          if ($(".select").length > 0) {
            $(".select").selectpicker();

            $(".select").on("change", function() {
              if ($(this).val() == "" || null === $(this).val()) {
                if (!$(this).attr("multiple"))
                  $(this)
                    .val("")
                    .find("option")
                    .removeAttr("selected")
                    .prop("selected", false);
              } else {
                $(this)
                  .find("option[value=" + $(this).val() + "]")
                  .attr("selected", true);
              }
            });
          }

     
  
  
    
    }
  });
 
 $("#show_address_modal").modal("show");

}

function addSelectItem(t, ev) {
  ev.stopPropagation();  
  var res = $("#input_select").val();  
  if ($.trim(res) == "") return;
 
  $("#customer_ids").append(new Option(res, res)); 
  $("#customer_ids option").each(function() {
    if ($(this).val() == res) {
      $(this).prop("selected", true);
    }
  });

  $("#customer_ids").selectpicker("refresh"); 
}

function addSelectInpKeyPress(t, ev) {
  ev.stopPropagation(); 
  if (ev.which == 124) {
    ev.preventDefault(); 
  } 
  if (ev.which == 13) { 
    var res = $("#input_select").val(); 
  ev.preventDefault();
    
    addSelectItem(res, ev);
    $("#customer_ids").selectpicker("refresh");
  }
}
function edit_phones(voucher_id_index) {
  $("#address").html("");
  $("#show_address_modal").modal("hide");

  var phones = $("#" + voucher_id_index + "_customer").val();
 
  var url = base_url + "/call_center/get_Phones"; 
      var options = [],
        _options;
  if (phones) {
    $.each(phones.split(","), function (i, e) {
     
     
      var option = "<option value=" + e + " selected> " + e + "</option>";
      $(".select option[value='" + e + "']").attr("selected", true);
      options.push(option);
    });
  }
 
      _options = options.join(""); 
      html = '<div class="row">';
      html += '<div class="col-md-4">';
      html += "Phones";
      html +=
        '<select id="customer_ids" class=" selectpicker customer_ids select"  multiple  data-live-search="true" list="customer_ids"  >' +
        _options +
        "</select>";
       html += " </div></div>";
      html +=
        ' </div></div></div><hr class="separate_addons"><div class="row"><button class="btn btn-danger" onclick="update_phones_voucher(' +
        voucher_id_index +
        ')" >Update Phones</button></div>';

      $("#address").append($(html));
     
      /**/ 
  
  var content =
    "<input type='number' id='input_select' class='bss-input' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event)' onClick='event.stopPropagation()' placeholder='Add item'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";

    var divider = $('<option/>')
      .addClass('divider')
      .data('divider', true);


    var addoption = $('<option/>', { class: 'addItem' })
      .data('content', content)
  var t = $("#input_select").val();
  $("#customer").append( '<option value="' + t + ' selected">' + t + "</option>" );

    $('.selectpicker')
      .append(divider)
      .append(addoption)
      .selectpicker();
  $("#customer").selectpicker("refresh");


  /**/
      if ($(".select").length > 0) {
        $(".select").selectpicker();

        $(".select").on("change", function() {
          if ($(this).val() == "" || null === $(this).val()) {
            if (!$(this).attr("multiple"))
              $(this)
                .val("")
                .find("option")
                .removeAttr("selected")
                .prop("selected", false);
          } else {
            $(this)
              .find("option[value=" + $(this).val() + "]")
              .attr("selected", true);
          }
        });
      } 

  $("#show_address_modal").modal("show");
}
 
 function update_restaurant_voucher(voucher_id) {
   var restaurant_id = $("#restaurant_id_m").val(); 

   var data = {
     voucher_id: voucher_id,
     restaurant_: restaurant_id
   };

   console.log("data");
   console.log(data);

   $.ajax({
     type: "post",
     url: base_url + "/call_center/update_restaurant?format=json",
     dataType: "json",
     cache: false,
     data: data,
     success: function(response) {
       // console.log(data);
       // location.reload();
       noty({
         timeout: 1500,
         text: "Updated",
         layout: "topCenter",
         type: "success"
       });

       window.location.href = "Add_vouchers";
     }
   });
 }

function update_phones_voucher(voucher_id) {

  var customer_ids = $("#customer_ids").val();


  // console.log("data");
  // console.log(data);
  $.ajax({
    type: "POST",
    url: base_url + "/call_center/update_phones_voucher",
    DataType: "json",
    data: {
      voucher_id: voucher_id,
      customer_ids: customer_ids
    },
    success: function(response) {
      noty({
        timeout: 1500,
        text: "Updated",
        layout: "topCenter",
        type: "success"
      });

      window.location.href = "Add_vouchers";
    },error:function(res) {
      console.log(res);
      noty({
        timeout: 1500,
        text: "error",
        layout: "topCenter",
        type: "error"
      });
      $("#show_address_modal").modal("hide");
    }
  });
}
 
////////////////////////////////////////////////////////////////////
$(".dropdown-item").click(function() {
  $(this).toggleClass("active");
});
$("#customer").on("beforeItemAdd", function(event) {
  /* Validate url */
  if (/^\d*$/.test(event.item)) {
    event.cancel = false;
  } else {
    event.cancel = true;
  }
});

$(function() {
  $("#datetimepicker2").datetimepicker({
    language: "en",
    //   pick12HourFormat: true
    format: "yyyy-mm-dd h:i:s"
  });
});

var showshowtype = $(".promotype");
var showresturent = $(".res");
var showvouchercode = $(".vouchercode");
var shownumber = $(".number");
let min_order = $('.min_order');

showresturent.hide();
showvouchercode.hide();
shownumber.hide();
min_order.hide();

$("#promocode").on("change", function(e) {
  e.preventDefault();
  showresturent.show(400);
  showvouchercode.show(400);
  min_order.show(400);

  shownumber.hide();
  $("input[name=type1]").prop("checked", false);
  $("input[name=type2]").prop("checked", true);
  $("input[name=type3]").prop("checked", false);
});
$("#feedall").on("change", function(e) {
  e.preventDefault();
  showresturent.hide();
  showvouchercode.show(400);
  shownumber.hide();
  min_order.show(400);

  $("input[name=type1]").prop("checked", false);
  $("input[name=type2]").prop("checked", false);
  $("input[name=type3]").prop("checked", true);
});

$("#voucherC").on("change", function(e) {
  e.preventDefault();
  showresturent.hide();
  showvouchercode.hide();
  shownumber.show(400);
  min_order.hide();
  $("input[name=type1]").prop("checked", true);
  $("input[name=type2]").prop("checked", false);
  $("input[name=type3]").prop("checked", false);
});

$("#vouchers_form").submit(function(evnt) {
  var valid = $("#vouchers_form").validationEngine("validate");
  var vars = $("#vouchers_form").serialize();

  if (valid == true) {
    evnt.preventDefault();
    evnt.stopImmediatePropagation();
    var type;
    if ($("input[name=type2]").is(":checked")) {
      type = 2;
    } else if ($("input[name=type3]").is(":checked")) {
      type = 3;
    } else if ($("input[name=type1]").is(":checked")) {
      type = 1;
    }
    var restaurant_id = $("#restaurant_id").val();
    // var type =  $('input[name=type2]').val();
    var category = $("#category").val();
    var value = $("#value").val();
    var validate_time = $("input[name=validate_time]").val();
    var voucher = $("input[name=voucher]").val();
    var number = $("input[name=number]").val();
    var customer = $("input[name=customer]").val();
    let min_order = $('#min_order').val();
    let  reg = /^[0-9]+$/;
    if(min_order.length > 0) {
      if(!reg.test(min_order)) {
        noty({
          timeout: 1500,
          text: "min order should be number ",
          layout: "topCenter",
          type: "error"
        });
        return;
      }
    }

    var data = {
      restaurant_id: restaurant_id,
      type: type,
      category: category,
      value: value,
      validate_time: validate_time,
      voucher: voucher,
      number: number,
      customer: customer,
      min_order : min_order
    };
    // console.log(data);
    $.ajax({
      type: "POST",
      url: base_url + "/call_center/create_vouchers",
      dataType: "json",
      data: data,
      success: function() {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: "topCenter",
          type: "success"
        });
        if ($("input[name=type1]").is(":checked")) {
          var number = data.number;
          document.location =
            base_url +
            "/call_center/export_voucher_report/format/json?number=" +
            number;
          $("input[name=number]").val(0);
        } else {
          $("input[name=number]").val(0);
          document.location = base_url + "/call_center/Add_vouchers";
        }
        // $('#number').off('click');
      },
      error: function(response) {
        // console.log(response);
        noty({
          text: "Error with Voucher eliments",
          layout: "topCenter",
          type: "error",
          timeout: 3000
        });
      }
    });
  }
});

$(".display").on("change", "td", function() {
  table = $("#voucher_rep").DataTable();
  var datarow = table.row(this).data();
  var active_id_column = active_id_index - invisible_columns;
  var customer_column = customer_index - invisible_columns;
  var restaurant_column = restaurant_index - invisible_columns;
  var min_order_column = min_order_index - invisible_columns;
  
  if ($(this).index() === active_id_column) {
    var status = datarow[active_id_index];

       if ($('.active').is(":checked")){
        status = 1;
       }

       else{
       status = 0;
       }
    var data = {
      voucher_id: datarow[voucher_id_index],
      status: status
    };

    //    $("#"+datarow[active_id_column]+"voucher").val(),
console.log(data);
    $.ajax({
      type: "post",
      url: base_url + "/call_center/update_voucher?format=json",
      dataType: "json",
      cache: false,
      data: data,
      success: function(response) {
        // console.log(data);
        // location.reload();
        noty({
          timeout: 1500,
          text: "Updated",
          layout: "topCenter",
          type: "success"
        });
      }
    });
  }  else if ($(this).index() === restaurant_column) {
    // var restaurant_id = $("#" + datarow[voucher_id_index] + "restaurant").val();
    var data = {
      voucher_id: datarow[voucher_id_index],
      restaurant_: $("#" + datarow[voucher_id_index] + "_restaurant").val()
    };

    // console.log('data');
    //  console.log(data);

    $.ajax({
      type: "post",
      url: base_url + "/call_center/update_restaurant?format=json",
      dataType: "json",
      cache: false,
      data: data,
      success: function(response) {
        // console.log(data);
        // location.reload();
        noty({
          timeout: 1500,
          text: "Updated",
          layout: "topCenter",
          type: "success"
        });
      }
    });
  } else if ($(this).index() === min_order_column) {
       
    var checkbox_id = "#" + datarow[voucher_id_index] + "_active_min_order";
    var isChecked = $(checkbox_id + ':checked').val() ? 1 : 0;
           var data = {
             voucher_id: datarow[voucher_id_index],
             min_order: isChecked
           };
 
    console.log('data');
    console.log(data);
         
 
           $.ajax({
             type: "post",
             url: base_url + "/call_center/update_min_order_voucher?format=json",
             dataType: "json",
             cache: false,
             data: data,
             success: function(response) { 
               noty({
                 timeout: 1500,
                 text: "Updated",
                 layout: "topCenter",
                 type: "success"
               });
             }
           });
         }
});
