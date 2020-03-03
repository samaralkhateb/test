var url = base_url + '/drivers/all_viechle';

$.ajax({
  url: url,
  type: "get",
  dataType: "json",
  success: function (data) {

    var options = [],
      _options;
    for (var i in data) {

      var option = '<option value=' + data[i]["id"] + '> ' + data[i]["vehicle_model"] + '</option>';

      options.push(option);
    }
    _options = options.join('');
    //  console.log(_options);
    $(document).ready(function () {


      $("#dirvers_parent").addClass("active");
      $("#drivers_page").addClass("active");
      var table = $('#drivers').DataTable({
        "ordering": true,
        "destroy": true,
        "bInfo": false,
        "bPaginate": true,
        "bLengthChange": true,
        "searching": true,
        "bSearchable": false,
        "bProcessing": true,
        "scrollX": true,
        "responsive": true,
        "deferLoading": 57,
        "emptyTable": "No data available in table",
        "bServerSide": false,
        "sAjaxSource": base_url + '/drivers/all_drivers/format/json',

        //    dom: 'Blfrtip',
        colReorder: true,
        buttons: [

          {
            //     extend: 'excel',
          }
        ],
        "columnDefs": [{
            "targets": [0],
            "visible": false
          },

          {
            "targets": [1],
            "data": null,
            "defaultContent": "<input name='driver_name' type='text' class='driver_name form-control'  / ></label>"


          },
          {
            "targets": 7,
            "data": null,
            "defaultContent": "<label class='switch switch-small'><input type='checkbox' class='button activate driver_active'  style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"


          },
          {
            "targets": [4],
            "render": function (data) {
              //   if (user_role == 4)
              //   {
              return data + `    
                        <span class="fa fa-pencil edit_password" 
                         style="margin-left:10px; cursor:pointer" 
                         data-toggle="modal" data-target="#editPass"></sapn>
                        `;
              //   }
              //   else
              //   {
              //       return null   ;
              //   }

            },
          },
          {
            "targets": [6],
            "searchable": true,
          },
          {
            "targets": [5],
            "data": null,
            "defaultContent": "<input name='' type='text' class='group_whats form-control' style = 'display:none'/ ></label>"
          },
          {
            "targets": [8],
            "data": null,
            "defaultContent": '<select name = "vehicle" class="vehicle form-control"><option value = "0"> No vehicle </option>' + _options + '</select></label>'
          },
          {
            "targets": [9],
            "data": null,
            "defaultContent": "<input name='accounting_code' type='text' class='driver_accounting_code form-control'  / ></label>"


          },
          {
            "targets": [10],
            "data": null,
            "defaultContent": '<select name = "connection_channel" class="connection_channel form-control"><option value = "1"> APN </option><option value = "2"> INTERNET </option></select></label>'


          },
          {
            "targets": [11],
            "data": null,
            "defaultContent": "<input name='sim_code' type='text' class='sim_code form-control' maxlength='10' pattern='[0-9]' /></label>"


          },
          {
            "targets": [12],
            "data": null,
            "defaultContent": '<select name = "rate" class="rate form-control"><option value = "1"> 1-☆ </option><option value = "2"> 2-☆☆ </option><option value = "3"> 3-☆☆☆ </option><option value = "4"> 4-☆☆☆☆ </option><option value = "5"> 5-☆☆☆☆☆ </option></select></label>'


          },
          {
            "targets": [13],
            "data": null,
            "defaultContent": "<label class='switch switch-small'><input type='checkbox' class='button activate enable_ghost_fee' style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"


          },
          {
            "targets": [14],
            "data": null,
            "defaultContent": "<label class='switch switch-small'><input type='checkbox' class='button activate enable_flag' style='color:white;border-radius: 4px;background-color: #2f434c;'/ ><span></span></label>"


          },
          {
            "targets": [15],
            "data": null,
            "defaultContent" : "<input name='driver_mobile' type='text' class='driver_mobile form-control' style='width:100px' / ></label>"


          }

        ],




        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
 
          if (aData[7] === "0")

          {} else {
            $('td .driver_active', nRow).attr('checked', 'checked');

          }

          if (aData[14] === "1")
          {
            $('td .enable_flag', nRow).attr('checked', 'checked');

          }
         
          if (aData[13] === "0")

          {} else {
            $('td .enable_ghost_fee', nRow).attr('checked', 'checked');

          }
          console.log(aData[13]);

          $('td .group_whats', nRow).attr('value', aData[5]);
          $('td .group_whats', nRow).attr('id', aData[0]);


          $('td .vehicle option[value="' + aData[8] + '"]', nRow).attr("selected", true);
          $('td .vehicle', nRow).attr('id', 'select' + aData[0]);


          // console.log(aData[8]);
          // $('#select'+aData[0]).innerHTML = _options;

          $('td .driver_accounting_code', nRow).attr('value', aData[9]);
          $('td .driver_accounting_code', nRow).attr('id', aData[0] + "_accounting_code");

          
          $('td .connection_channel option[value="' + aData[10] + '"]', nRow).attr("selected", true);
          $('td .connection_channel', nRow).attr('id', 'selectconnection_channel' + aData[0]);

          $('td .rate option[value="' + aData[12] + '"]', nRow).attr("selected", true);
          $('td .rate', nRow).attr('id', 'selectrate' + aData[0]);


           $('td .driver_name', nRow).attr('value', aData[1]);
          $('td .driver_name', nRow).attr('id', aData[0] + "_driver_name");

          $('td .driver_mobile', nRow).attr('value', aData[15]);
          $('td .driver_mobile', nRow).attr('id', aData[0] + "_driver_mobile");

          $('td .sim_code', nRow).attr('value', aData[11]);
          $('td .sim_code', nRow).attr('id', aData[0] + "_sim_code");
          
          
 

        }




      });


    });
  }

});





$("#add_new_driver").click(function (event) {

  var check_value = 0;
  if ($("#active_switch").prop("checked") === true) {
    check_value = 1;
  } else {
    check_value = 0;
  }
  var data = {
    name: $("#d_name").val(),
    password: $("#password").val(),
    username: $("#username_driver").val(),
    start_hours: $("#start_hours").val(),
    end_hours: $("#end_hours").val(),
    type_id: $("#vehicle_type").val(),
    category: $("#category").val(),
    model: $("#model").val(),
    plate: $("#plate").val(),
    commission: $("#commission").val(),
    status: check_value
  };
  var url = base_url + '/drivers/add_driver';
  $.ajax({
    url: url,
    type: "post",
    dataType: "json",
    data: data,
    success: function (response) {
      noty({
        text: 'تمت الإضافة بنجاح',
        layout: 'topRight',
        type: 'success'
      });
      window.location.reload();
    },
    error: function () {
      noty({
        text: 'عذراً هذا المستحدم موجود مسبقاً , يرجى المحاولة لاحقاً',
        layout: 'topRight',
        type: 'error'
      });
    }
  });



});




$('.display').on('change', 'td', function () {
  console.log($(this).index());
  table = $('#drivers').DataTable();

  var datarow = table.row(this).data();

  
  if ($(this).index() === 6) {

    var id = datarow[0];
    var state;
    // console.log(datarow);
    if (datarow[7] === "1") {
      state = "0";

    } else {
      state = "1";
    }
    var data = {
      available: state,
      id: id
    };

    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_status/format/json',
      dataType: 'json',
      data: data,
      cache: false,
      success: function (response) {
        noty({
          text: 'Successful action',
          layout: 'topRight',
          type: 'success'
        });
      },
      error: function () {
        noty({
          text: 'error action',
          layout: 'topRight',
          type: 'error'
        });
      }
    });
  } else if ($(this).index() === 8) {
    //  var rest_id = datarow[rest_id_index];
    var data = {
      driver_id: datarow[0],
      accounting_code: $("#" + datarow[0] + "_accounting_code").val()
    };

    // console.log(' update');
    // console.log(data);
    $.ajax({
      type: "post",
      url: base_url + "/drivers/update_driver_accounting_code?format=json",
      dataType: "json",
      cache: false,
      data: data,
      success: function (response) {
        // location.reload();
        noty({
          timeout: 1500,
          text: "Updated accounting code",
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
  } else if ($(this).index() === 4) {
    var id = datarow[0];
    // console.log($('.group_whats').val());
    var data = {
      id: id,
      group_name: $("#" + datarow[0]).val(),
    };

    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_group_name',
      dataType: 'json',
      data: data,
      cache: false,
      success: function (response) {
        noty({
          text: 'Successful action',
          layout: 'topRight',
          type: 'success'
        });
      },
      error: function () {
        noty({
          text: 'error action',
          layout: 'topRight',
          type: 'error'
        });
      }

    });
  } else if ($(this).index() === 7) {
    var data = {
      id: datarow[0],
      vehicle_id: $('#select' + datarow[0] + ' option:selected').val()
    };
    //   console.log('data select =>');
    //  console.log(data);   
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_vehicle_id',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  } else if ($(this).index() === 9) {
    var data = {
      id: datarow[0],
      connection_channel: $('#selectconnection_channel' + datarow[0] + ' option:selected').val()
    };
    console.log('data select =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_connection_channel',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  } else if ($(this).index() === 11) {
    var data = {
      id: datarow[0],
      rate: $('#selectrate' + datarow[0] + ' option:selected').val()
    };
    console.log('data select =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_rate',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  } else if ($(this).index() === 12) {
    var id = datarow[0];
    var enable_ghost_fee;
    console.log('enable_ghost_fee');
    console.log(datarow[13]);
    if (datarow[13] === "1") {
      enable_ghost_fee = "0";

    } else {
      enable_ghost_fee = "1";
    }
    var data = {
      enable_ghost_fee: enable_ghost_fee,
      id: id
    };

    console.log('data select =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_ghost_fee',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  }
  else if ($(this).index() === 13) {
    var id = datarow[0];
    var enable_flag;
    console.log('enable_flag');
    console.log(datarow[14]);
    if (datarow[14] === "1") {
      enable_flag = "0";

    } else {
      enable_flag = "1";
    }
    var data = {
      enable_flag: enable_flag,
      id: id
    };

    console.log('data select =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_flag',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  }


  else if ($(this).index() === 0) {
    var data = {
      id: datarow[0],
      driver_name: $("#" + datarow[0] + "_driver_name").val()
    };
    console.log('data driver_name =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_name',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'

        });
      }
    });
  }   else if ($(this).index() === 10) {
    var data = {
      id: datarow[0],
      sim_code: $("#" + datarow[0] + "_sim_code").val()
    };
    console.log('data driver sim_code =>');
    console.log(data);
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_sim_code',
      dataType: 'json',
      cache: false,
      data: data,
      success: function (response) {
        console.log('response');
        console.log(response);
        if (response['resule'] == true) {
          noty({
            timeout: 1500,
            text: "Updated",
            layout: 'topCenter',
            type: 'success'
  
          });
        } else { 
          noty({
            text: 'error action sim code already used',
            layout: 'topRight',
            type: 'error'
          });
        }
       
      }
    });
  }
  else if ($(this).index() === 14) {

    let mobile = $("#" + datarow[0] + "_driver_mobile").val();
    let testPhone = /^[0-9]+$/g
    if(testPhone.test(mobile)) {
    if(mobile.length == 10 ) {
      mobile = mobile.substr(1);
    }else if (mobile.length != 9) {
      alert('الرقم خاطئ');
      return;
    }
  }else if(mobile != '') {
   alert('الرقم خاطئ  ');
   return;
  }

  var data = {
    id: datarow[0],
    driver_mobile: mobile
  };
    $.ajax({
      type: "post",
      url: base_url + '/drivers/update_driver_mobile',
      dataType: 'json',
      cache: false,
      data: data,
      success: function () {
        noty({
          timeout: 1500,
          text: "Updated",
          layout: 'topCenter',
          type: 'success'
        });
      },error:function() {
        alert('الرقم المدخل موجود سابقاً ');
      }
    });
  }

});


$(".add-new").on("click", function () {
  $('.add-driver').css('display', 'block');
  $('.update-driver').css('display', 'none');
  $("#iconPreview").modal("show");
});

$('body').on('hidden.bs.modal', '.modal', function () {
  $('#driver').html("");
  $('#last_counter').html("");
  $('.modal-body').find('input:text').val('');
  $('#foot-button').html();

});

$(".timepicker").timepicker({
  minuteStep: 5,
  sshowMeridian: false
});


$("#confirm_password").change(function () {

  var password = $("#password").val();
  var confirm = $("#confirm_password").val();
  var spanErorr = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';

  if (password !== confirm) {
    $(".confirm_password").addClass("has-error");
    $("#confirm_password").after(spanErorr);
    $("#add_new_driver").attr("disabled", "disabled");
  } else {
    $("#add_new_driver").removeAttr("disabled");
    $(".confirm_password").removeClass("has-error");
    $("span.glyphicon-remove").remove();

  }



});



$("#confirm_password_edit").change(function () {

  var password = $("#password_edit").val();
  var confirm = $("#confirm_password_edit").val();
  var spanErorr = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';

  if (password !== confirm) {
    $(".confirm_password").addClass("has-error");
    $("#confirm_password_edit").after(spanErorr);
    $("#update_password").attr("disabled", "disabled");
  } else {
    $("#update_password").removeAttr("disabled");
    $(".confirm_password").removeClass("has-error");
    $("span.glyphicon-remove").remove();
  }

});

$('.display').on('click', 'td', function () {

  table = $('#drivers').DataTable();
  var datarow = table.row(this).data();
  var id = datarow[0];

  $("#editPass #driver_id").val(id);

});

$("#update_password").click(function () {
  var password = $("#password_edit").val();
  var id = $("#driver_id").val();

  var data = {
    id: id,
    password: password,

  };

  $.ajax({
    type: "post",
    url: base_url + '/drivers/update_driver_password/format/json',
    dataType: 'json',
    data: data,
    cache: false,
    success: function (response) {
      noty({
        text: 'Successful action',
        layout: 'topRight',
        type: 'success'
      });
      window.location.href = "drivers_view";
    },
    error: function () {
      noty({
        text: 'error action',
        layout: 'topRight',
        type: 'error'
      });
    }
  });


});