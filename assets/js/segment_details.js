var register_date,
last_seen_days_num,
last_order_days_num,
selected_oss,
selected_restaurants,
selected_dishes,
selected_areas,
discount_user,
active_user,
filtered_users;

init();

function show_loader() {
    $.Toast.showToast({
        "title": "loading...",
        "icon": "loading"
    });
}

function init(){
    $("#register-date").datepicker({
        format: 'yyyy-mm-dd'
           });
    $( "#register-date" ).datepicker('setDate', new Date());
    init_selects();
    if(segment)
        old_segment();
}

function old_segment(){
    fill_segment_inputs();
    if(segment.is_used)
    {
      $('#save-btn').html('duplicate');
    }
}

function fill_segment_inputs() {
    segment = segment[0];

    $("#segment-name").val(segment.name)
    if(segment.active_users == "1"){
        $('#discount-select')[0].selectize.setValue(segment.discount_users);
        $('#restaurants-select')[0].selectize.setValue(JSON.parse("[" + segment.restaurants_ids + "]"));
        $('#dishes-select')[0].selectize.setValue(JSON.parse("[" + segment.dishes_tags + "]"));
        $('#areas-select')[0].selectize.setValue(JSON.parse("[" + segment.areas_ids + "]"));
        $("#last_order").val(segment.last_order);
    }
    $( "#register-date" ).datepicker('setDate', new Date(segment.registered_from));
    $("#last_seen").val(segment.last_seen);
    $('#os-select')[0].selectize.setValue(segment.os);
    $('#active-users-select')[0].selectize.setValue(segment.active_users);

}

function init_selects(){
    var selects_ids = ['#os-select','#restaurants-select','#dishes-select','#areas-select'];
    selects_ids.forEach(function(item) {
        $(item).selectize({
            persist: true,
            createOnBlur: false,
            create: false,
            sortField: 'text'
        });
    });

    var single_selects_ids = ['#discount-select'];
    single_selects_ids.forEach(function(item) {
        $(item).selectize({
            create: true,
            openOnFocus: false
        });
    });

    init_os_select_data();
    init_restaurants_select_data();
    init_dishes_select_data();
    init_areas_select_data();
    init_discounts_select_data();
    init_active_users_select_data();
}

function init_os_select_data(){
    var selectize =  $('#os-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    var OSs = ["ios", "android", "web"];
    OSs.forEach(element => {
        selectize.addOption({value:element,text:element});
    });
    selectize.refreshOptions();
    selectize.setValue("-1");
}

function init_restaurants_select_data(){
    var selectize =  $('#restaurants-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    rests.forEach(element => {
        selectize.addOption({value:element.id,text:element.name});
    });
    selectize.refreshOptions();
}

function init_dishes_select_data(){
    var selectize = $('#dishes-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    dishes_tags.forEach(element => {
        selectize.addOption({value:element.tag,text:element.tag});
    });
    selectize.refreshOptions();
}

function init_areas_select_data(){
    var selectize = $('#areas-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    areas.forEach(element => {
        selectize.addOption({value:element.area_id,text:element.area_name});
    });
    selectize.refreshOptions();
}

function init_discounts_select_data (){
    var selectize =  $('#discount-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    var array = [{text:"Only Discount",id:1},{text:"none Discount",id:0}];
    array.forEach(element => {
        selectize.addOption({value:element.id,text:element.text});
    });
    selectize.refreshOptions();
    selectize.setValue("-1");
}

function init_active_users_select_data(){
    $('#active-users-select').selectize({
        openOnFocus: false,
        onChange: function(value) {
            if(value=="1"){
                show_active_users_properties();
            }else{
                hide_active_users_properties();
            }
        }
    });
    var selectize =  $('#active-users-select')[0].selectize;
    selectize.addOption({value:"-1",text:"All"});
    var array = [{text:"Only Active",id:1},{text:"none Active",id:0}];
    array.forEach(element => {
        selectize.addOption({value:element.id,text:element.text});
    });
    selectize.refreshOptions();
    selectize.setValue("-1");
}

function hide_active_users_properties() {
    $("#discount_group").css('display','none');
    $("#last_order_group").css('display','none');
    $("#restaurant_group").css('display','none');
    $("#dish_tags_group").css('display','none');
    $("#areas_group").css('display','none');
}

function show_active_users_properties() {
    $("#discount_group").css('display','');
    $("#last_order_group").css('display','');
    $("#restaurant_group").css('display','');
    $("#dish_tags_group").css('display','');
    $("#areas_group").css('display','');
}

function validate_segment_form(){
    var text;
    if($("#segment-name").val() == "")
        text = 'Please ente the segment name';
    if($("#active-users-select").val() == null)
        text = 'Please select the active users type';

    if(text){
        noty({text: text, layout: 'topRight', type: 'error'});
        return false;
    }
    return true;
}

function save_segment() {
    show_loader();
    if(!validate_segment_form())
        return;

    register_date = $("#register-date").val();
    last_seen_days_num = $("#last_seen").val();
    selected_oss = $("#os-select").val();
    active_user = $("#active-users-select").val();

    if(active_user!="1")
    {
        discount_user = null;
        last_order_days_num = null;
        selected_restaurants = null;
        selected_dishes = null;
        selected_areas = null;
    }else{
        discount_user = $("#discount-select").val();
        last_order_days_num = $("#last_order").val();
        selected_restaurants = $("#restaurants-select").val();
        selected_dishes = $("#dishes-select").val();
        selected_areas = $("#areas-select").val();
    }


    var data = {
        name:$("#segment-name").val(),
        register_date:register_date,
        discount_users:discount_user,
        active_users:active_user,
        last_seen:last_seen_days_num,
        last_order:last_order_days_num,
        os:selected_oss,
        restaurants_ids:selected_restaurants,
        dishes_tags:selected_dishes,
        areas_ids:selected_areas
    };

    var url;
    if(segment && !segment.is_used){
        url =  base_url + '/segments/update_segment';
        data.id = segment.id;
    }
    else{
        url =  base_url + '/segments/add_segment';
    }

    $.ajax(
        {
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        success: function(response) {
            noty({text: 'Successful action', layout: 'topRight', type: 'success'});
            window.location.href = base_url+'/segments/view_all_segments';
            hide_loader();
        },
        error: function(){
            noty({text: 'error action', layout: 'topRight', type: 'error'});
            hide_loader();
        }
    });
}

function open_send_message_model(){
  $("#send_message_modal").modal("show");
}

$('.form-horizontal').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});


//*******************************************************
//Send Message Modal Functions
//*******************************************************
//---------------------START-----------------------------

$('#message_type_select').on('change', function() {
    switch(this.value) {
        case "1":                   // text message
            hide_media_inputs();
            break;
        default:                    //other message type (Media types)
            show_media_inputs();
    }
});

function hide_media_inputs() {
    $('#message-txt-row').css('display','');
    $('#message-file-row').css('display','none');
    $('#message-caption-row').css('display','none');
    $('#message-description-row').css('display','none');
}

function show_media_inputs() {
    $('#message-txt-row').css('display','none');
    $('#message-file-row').css('display','');
    $('#message-caption-row').css('display','');
    $('#message-description-row').css('display','');
}

function upload_message_file(this_form,data) {
    $.ajax({
        url: base_url + '/segments/upload_message_file',
        type:"post",
        data:new FormData(this_form),
        processData:false,
        contentType:false,
        cache:false,
        async:false,
        dataType: "json",
        success: function (response) {
            data.message_url = response['file_name'];
            send_message_to_server(data);
        },
        error: function (response) {
            noty({text: "Uploading Error "+response.error, layout: 'topRight', type: 'error'});
        }
    });
}


function send_message(this_form){
    var data = {
        segment_id:segment.id,
        message_type:$('#message_type_select').val()
    };


    switch($('#message_type_select').val()) {
        case "1":                   // text message
            data.message_txt = $('#message-txt').val();
            send_message_to_server(data);
            break;
        default:                    //other message type (Media types)
            data.message_caption = $('#message-caption').val();
            data.message_description = $('#message-description').val();
            upload_message_file(this_form,data);
            break;
    }
};

function send_message_to_server(data){
    $.ajax({
        url: base_url + '/segments/send_message',
        type: "post",
        dataType: "json",
        data: data,
        success: function(response) {
            noty({text: 'Successful action', layout: 'topRight', type: 'success'});
            $('#send_message_modal').modal('hide');
            hide_loader();
        },
        error: function(){
            noty({text: 'error action', layout: 'topRight', type: 'error'});
            hide_loader();
        }
    });
}

$('#message-form').submit(function(e) {
    e.preventDefault();
    send_message(this);
});
