var allTags = [];
var allTagsIds = [];
$('#start-dish-time').timepicker({
    showMeridian: false,
    showSeconds: false
});

$('#end-dish-time').timepicker({
    showMeridian: false,
    showSeconds: false
});
$(document).ready(function () {
    $('#dish-tags').select2(); 
    $.ajax({
        type: 'GET',
        url: base_url + '/dishes/get_all_tags',
        dataType: 'json',
        success: function(response){
            // console.log('tags');
            // console.log(response.data);
            for(var i = 0 ; i < response.data.length; i++){
                allTagsIds.push('tag: ' + response.data[i].id);
                allTags.push(response.data[i].tag);
                var option = new Option(response.data[i].tag, response.data[i].tag, false, false);
                $('#dish-tags').append(option).trigger('change'); 
            }
            // console.log(allTags);
        }
    });

    $('#restaurant-tags').select2(); 
    var restaurant_id = $('#restaurant_id').val(); 
    $.ajax({
        type: 'GET',
        url: base_url + '/restaurants/get_all_tags',
        dataType: 'json',
        data:{restaurant_id:restaurant_id},
        success: function(response){
            // console.log('tags response');
            // console.log(response.data);
            for(var i = 0 ; i < response.data.length; i++){
                allTagsIds.push('tag: ' + response.data[i].id);
                allTags.push(response.data[i].tag);
                var option = new Option(response.data[i].tag, response.data[i].id, false, false);
                $('#restaurant-tags').append(option).trigger('change'); 
            }
            // console.log(allTags);
        }
    });


    $('#restaurant-cuisines').select2();  
    $.ajax({
        type: 'GET',
        url: base_url + '/restaurants/get_all_cuisines',
        dataType: 'json',
        data:{
            restaurant_id:restaurant_id
        },
        success: function(response){ 
            console.log('cuisines response');
            console.log(response.data);
            for(var i = 0 ; i < response.data.length; i++){
                allTagsIds.push('tag: ' + response.data[i].id);
                allTags.push(response.data[i].cuisine);
                var option = new Option(response.data[i].cuisine, response.data[i].id, false, false);
                $('#restaurant-cuisines').append(option).trigger('change'); 
            }
            // console.log(allTags);
        }
    });


    $("#rest-type").selectpicker();
    $("#rest-country").selectpicker();
    $("#rest-city").selectpicker();
    $("#rest-area").selectpicker();
    $("#dish-days").selectpicker();
    $('#start-dish-time').timepicker({
        showMeridian: false,
        showSeconds: false,
        defaultTime:false
    });
    
    $('#end-dish-time').timepicker({
        showMeridian: false,
        showSeconds: false,
        defaultTime:false
    });
            
    $('#rest-start-delivery').timepicker({
        showSeconds: false
    });
            
    $('#rest-end-delivery').timepicker({
        showSeconds: false
    });
            
    $('#rest-open-time').timepicker({
        showSeconds: false,
        minuteStep : 30,
        defaultTime:false,
        minMinutes: 0,
        maxMinutes: 30,
    }).on('keypress paste', function (e) {
        e.preventDefault(); 
    });
            
    $('#rest-close-time').timepicker({
        showSeconds: false,
        minuteStep : 30,
        defaultTime:false,
        minMinutes: 0,
        maxMinutes: 30,

    }).on('keypress paste', function (e) {
        e.preventDefault(); 
    });

    // Add city options according to the selected country
    $('#rest-country').on('change', function(){
        
        var data = {
            country_id: this.value
        };
        $.ajax({
            type: 'POST',
            url: base_url + '/areas/get_cities_of_country',
            data: data,
            dataType: 'json',
            success: function(response){
                $('#rest-city').children('option:not(:first)').remove();
                $('#rest-area').children('option:not(:first)').remove();
                $('#rest-area').selectpicker('refresh');
                $.each(response.data, function(key, value) {
                    $('#rest-city')
                        .append($("<option></option>")
                        .attr("value",value.id)
                        .text(value.name));
               });
               $('#rest-city').selectpicker('refresh');
            }
        });
      });
    // Add area options according to the selected city  
    $('#rest-city').on('change', function(){
        
        var data = {
            city_id: this.value
        };
        $.ajax({
            type: 'POST',
            url: base_url + '/areas/get_areas_of_city',
            data: data,
            dataType: 'json',
            success: function(response){
                // console.log(response.data);
                $('#rest-area').children('option:not(:first)').remove();
                $.each(response.data, function(key, value) {
                    $('#rest-area')
                        .append($("<option></option>")
                        .attr("value",value.id)
                        .text(value.name));
               });
               $('#rest-area').selectpicker('refresh');
            }
        });
      });
            
     
      // Select your input element.
    var dishPrice = document.getElementById('dish-price');
    var dishqueue = document.getElementById('dish-queue');
    var newCatQueue = document.getElementById('new-cat-queue');
    var dish_purchase_price = document.getElementById('dish-purchase-price');

    // Listen for input event on numInput.
    keyListener(dishPrice);
    keyListener(dishqueue);
    keyListener(newCatQueue);
    keyListener(dish_purchase_price);
    keyListener2(document.getElementById('rest-tax'));
            var rest_location = {lat: restaurant_latitude, lng: restaurant_longitude};
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 15, center: rest_location, mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: false});
        var marker = new google.maps.Marker({position: rest_location, map: map});
        google.maps.event.addListener(map, 'click', function(event) {
            marker.setPosition(event.latLng);
           
            

            // console.log('-----------');
            // console.log(marker);



        });
    
    // $('#map-btn').on('click', function(){
    //     if($($('#map')).is(":hidden")){
    //         $('#map').show();
    //         $('#map-btn').html('Hide Map');
    //     }
    //     else{
    //         $('#map').hide();
    //         $('#map-btn').html('Show Map');
    //     }
    // });

    $('#submit-rest-location').unbind('click').click(function(e){
        var street = $('#rest-street').val();
        var area_id = $('#rest-area').val();
          var longitude = marker.getPosition().lng();
        var latitude = marker.getPosition().lat();
        var city_id = $('#rest-city').val();

        if(street != '' && area_id != null && area_id != 'x'){
            var data = {
                area_id: area_id,
                street: street,
                city_id: city_id,
                street_ar: $('#rest-street-ar').val(),
                full_address: $('#rest-full-address').val(), 
                longitude: longitude,
                latitude: latitude,
                rest_id: restaurant_id
            };
            $.ajax({
                type: 'POST',
                url: base_url + '/restaurants/update_rest_location',
                data: data,
                dataType: "json",
                success: function(dateres){
                    map.setCenter({lat: latitude, lng: longitude});
                    marker.setPosition({lat: latitude, lng: longitude});
                   
                    noty({text: 'Restaurant Location Updated', layout: 'topCenter', type: 'success',timeout : 3000});
                },
                error: function(response){
                    // noty({ text: 'Select Restaurant Location', layout: 'topCenter', type: 'success', timeout: 3000 });
                    // console.log(response);
                }
            });
            e.preventDefault();
        }
    });
    
    $('#rest-location-form').submit(function(e){
        e.preventDefault();
    });
    
    $('#submit-rest-form').unbind('click').click(function (){
        var rest_name_ar = $('#rest-name-ar').val();
        var rest_name = $('#rest-name').val();
        var rest_welcome = $('#rest-welcome').val();
        var rest_welcome_ar = $('#rest-welcome-ar').val();
        var longitude = marker.getPosition().lng();
        var latitude = marker.getPosition().lat();

        // console.log('dateres');
        // console.log(dateres);
        // console.log("latitudeww");
        // console.log(latitude);
        // console.log("longitudeww");
        // console.log(longitude);
        // if(rest_name_ar != '' && rest_name != '' && rest_welcome != '' && rest_welcome_ar != ''){
            var active;
            var take_away;
            var delivery;
            active = $("#rest-active").is(':checked')?1:0;
            take_away = $("#rest-take-away").is(':checked')?1:0;
        delivery = $("#rest-delivery").is(':checked') ? 1 : 0;
        if ($('#rest-open-time').val()) {
            var open_time = $('#rest-open-time').val();
        } else { 
            var open_time = '10:00 am';
        }
        if ($('#rest-close-time').val()) {
            var close_time = $('#rest-close-time').val();
        } else { 
            var close_time = '10:00 pm';
        }

        var selectedTagsr2 = $('#restaurant-tags').select2('data');
                var selectedTagsr = [];
                    // debugger;
                for(var i = 0; i < selectedTagsr2.length; i++) 
                         selectedTagsr.push(selectedTagsr2[i].text); 

        var selectedcuisinesr2 = $('#restaurant-cuisines').select2('data');
        var selectedcuisinesr = [];
        // debugger;
        for(var i = 0; i < selectedcuisinesr2.length; i++) 
        selectedcuisinesr.push(selectedcuisinesr2[i].text); 

            var data = {
                rest_id: restaurant_id,
                name_ar: rest_name_ar,
                name: rest_name,
                restaurant_type: $('#rest-type').val(),
                phone: $('#rest-phone').val(),
                phone2: $('#rest-phone2').val(),
                active: active,
                take_away: take_away,
                delivery: delivery,
                description: $('#rest-welcome').val(),
                arabic_description: $('#rest-welcome-ar').val(),
                open_time: $('#rest-open-time').val(),
                close_time: $('#rest-close-time').val(),
                tax: $('#rest-tax').val(),
                start_delivery: $('#rest-start-delivery').val(),
                end_delivery: $('#rest-end-delivery').val(),
                res_tags: $('#res-tags').val(),
                latitude: latitude,
                longitude: longitude,
                restaurant_tags:selectedTagsr,
                restaurant_cuisines:selectedcuisinesr

                


                
            };
            console.log('data res=>');
            console.log(data);
            $.ajax({
                type: "POST",
                url: base_url + '/restaurants/update_rest_info',
                data: data,
                dataType: "json",
                success: function (dataresult){
                    // console.log("data dataresult =>");
                    // console.log(dataresult['ok']);
                    if (dataresult['ok'] == false){
                       
                        noty({ text: "You Can't Update Please Check Location", layout: 'topCenter', type: 'error', timeout: 3000 });
                    }else{
                        noty({ text: 'Restaurant Info Updated', layout: 'topCenter', type: 'success', timeout: 3000 });
                    }
                   
                },
                error: function(response){
                    // console.log(response);
                    noty({ text: "Restaurant Info Updated Error", layout: 'topCenter', type: 'error', timeout: 3000 });
                }
            });
        // }
    });
    
    $('#rest-form').submit(function (e){
        e.preventDefault();
    });
});
// function to prevent number input from being negative or float
function keyListener(number){
    number.onkeydown = function(e) {
                if(!((e.keyCode > 95 && e.keyCode < 106)
                  || (e.keyCode > 47 && e.keyCode < 58) 
                  || e.keyCode == 8)) {
                    return false;
                }
            }
}

function keyListener2(number){
    number.onkeydown = function(e) {
                if(!((e.keyCode > 95 && e.keyCode < 106)
                  || (e.keyCode > 47 && e.keyCode < 58) 
                  || e.keyCode == 8 || e.keyCode == 110)) {
                    return false;
                }
            }
}

function show_tab(e,num){
    $('.tab-pane').hide();
    if( num == 1)
        $('#MENU').show();
    if( num == 2)
        $('#SERVICES').show();
    if( num == 3)
        $('#SETTINGS').show();
}



function show_subcategory(menu_id, menu_name, rest_id, status) {        // status to know if it is a newly created category or an old category, used on success in add_new_category
   
    $('#edit-dish-form').hide();
    $('.open-list i').addClass('fa-plus-square-o');
    $('.open-list i').removeClass('fa-minus-square-o');
    if(status == 1){
        $('#list-subcategories').html("");
        $('#subcategories').show();
        $('#subcategories-title').html('');
        var html = '<h3 class="panel-title" >' + menu_name + ' has no dishes or subcategories</h3>';
        $('#subcategories-title').append(html);
        $('#subcategories-title').show();
        html = '<div class="list-group-item" style="height: 50px;" id="add-category-dish-btn"><button onclick="add_new_category(' + 0 + ', '+rest_id+','+menu_id+', ' + 2 + ',\''+menu_name+'\')" class="btn btn-primary btn-rounded" style="float: right;">Add New Subcategory</button></div>';
        html += '<div class="list-group-item" style="height: 50px;" id="category-dish-btn"><button  onclick="update_dish(' + 0 + ', '+ 1 + ', ' + menu_id + ')" class="btn btn-primary btn-rounded" style="float: right;">Add New Dish</button></div>';
        $('#list-subcategories').append(html);
    }
    else {
        if (!$('#category' + menu_id ).hasClass('active')) {
            $('#sign' + menu_id).toggleClass('fa-plus-square-o fa-minus-square-o');
            $('.all-categories').css('background-color', '#FFF');
            $('.all-categories .active').removeClass('active');
            $('#category' + menu_id).addClass('active');
            $('#subcategories-title').html("");
            $('#list-subcategories').html("");

            $('#category-' + menu_id).css('background-color', '#f0f0fa');
            
                get_subcategories(menu_id, menu_name, rest_id);
                
            
        }
        else {
            //$('.open-list i').toggleClass('fa-plus-square-o fa-minus-square-o');
            //$('#sign' + menu_id).toggleClass('fa-minus-square-o fa-plus-square-o');
            $('.all-categories').css('background-color', '#FFF');
            $('.all-categories .active').removeClass('active');
            $('#subcategories-title').hide();
            $('#subcategories-title').html("");
            $('#list-subcategories').html("");
        }
    }
}

function show_dishes(menu_id, menu_name) {
    $('#edit-dish-form').hide();
    $('.open-sub-list i').addClass('fa-plus-square-o');
    $('.open-sub-list i').removeClass('fa-minus-square-o');
    $('.all-subcategories').css('background-color','#FFF');
    if (!$('#dishes-' + menu_id).hasClass('active')) {
        $('#sign-sub' + menu_id).toggleClass('fa-plus-square-o fa-minus-square-o');
        $('.subcategories').removeClass('active');
        $('#dishes-' + menu_id).addClass('active');
        $('#subcategory-' + menu_id).css('background-color','#F0F0FA');
        $('.subcategories').html('');
        get_dishes(menu_id, menu_name, 2);      // pass 2 to specify that there are subcategories to show.
    }
    else {
        $('.subcategories').removeClass('active');
        $('.subcategories').html('');
    }
}

function edit_category(menu_id, menu_name, menu_name_en, queue, active, type, rest_id, parent_menu_id, category) {         // type = 1 for category, 2 for subcategory, parent_menu_id and name are for subcategories
    $('#delete-category').show();
    $('#category-modal-title').html('Edit Category');
    $('#submit-category').val('Edit Category');
    $('#delete-category').val('Delete Category');
    $('#new-cat-name-ar').val(menu_name);
    $('#new-cat-name-en').val(menu_name_en);
    if(category != null)
        category = category.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    if($('#delete-cat-btn').length == 0)    // Check if the delete button existed before clicking the edit category button
        $('#category-modal-form').append('<button class="btn btn-danger" id="delete-cat-btn" style="float: right;" onclick="delete_category('+menu_id+', \'' + menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;') + '\','+rest_id+', '+type+', '+parent_menu_id+', \''+category+'\')">Delete Category</button>');
    if(active === 1)
        $('#new-cat-active').attr('checked', true);
    else
        $('#new-cat-active').attr('checked', false);
    $('#new-cat-queue').val(queue);

 
    $('#delete-category').unbind('click').click( function(){
        
        var data = {
            menu_id : menu_id
        }

        $.ajax({
            type: 'POST',
            url: base_url + '/restaurants/update_menu_deleted',
            data: data,
            dataType: 'json',
            success: function(response){
               
               
                $('#category-modal').modal('hide');
                $('#list-subcategories').html('');
                $('.all-categories .active').removeClass('active');
                if(type == 1){
                    // self['location']['reload'](); 
                    get_categories(rest_id);

                }
                if (type == 2){
                    $('#add-category-dish-btn').remove();
                    $('#category' + parent_menu_id).removeClass('active');
                    $('#subcategories-title').html('');
                    show_subcategory(parent_menu_id, category, rest_id);
                    show_dishes(response.data.menu_id, response.data.menu_name, 2);
                }
                
            },
            error: function(response){
                // console.log(response.responseText);
            }
        });
        // self['location']['reload']();
    });

    $('#submit-category').unbind('click').click( function(){
        var queue = $('#new-cat-queue').val();
        if($('#new-cat-name-ar').val() != '' && $('#new-cat-name-en').val() != '' && queue != '' && Number.isInteger(parseFloat(queue)) && queue >= 1){      // To keep HTML5 form validation working
            
            var data = {
                menu_id : menu_id,
                name_ar : $('#new-cat-name-ar').val(),
                name_en : $('#new-cat-name-en').val(),
                active : $('#new-cat-active').is(':checked')?1:0,
                queue: $('#new-cat-queue').val()
            };
            var active = $('#new-cat-active').is(':checked')?1:0;
            $.ajax({
                type: 'POST',
                url: base_url + '/restaurants/update_category',
                data: data,
                dataType: 'json',
                success: function(response){

                    $('#category-modal').modal('hide');
                    $('#list-subcategories').html('');
                    $('.all-categories .active').removeClass('active');
                    if(type == 1){
                        // self['location']['reload']();
                        get_categories(rest_id);
                    }
                    if (type == 2){
                        $('#add-category-dish-btn').remove();
                        $('#category' + parent_menu_id).removeClass('active');
                        $('#subcategories-title').html('');
                        show_subcategory(parent_menu_id, category, rest_id);
                        show_dishes(response.data.menu_id, response.data.menu_name, 2);
                    }

                },
                error: function(response){
                    // console.log(response.responseText);
                }
            });
            // self['location']['reload']();
        }
    });
    
    $('#category-modal').submit(function(e){    // To prevent refreshing the page.
        e.preventDefault();
    });
    
    $('#category-modal').modal('show');
}

function delete_category(menu_id, menu_name, rest_id, type, parent_menu_id, category) {
    var data = {
        menu_id: menu_id
    };

    $.ajax({
        type: "POST",
        url: base_url + '/restaurants/update_menu_deleted',
        data: data,
        dataType: "json",
        success: function (response) {
            // console.log(response);
            $('#category-modal').modal('hide');
            if(type == 1){
                get_categories(rest_id);
                //show_subcategory(response.data.menu_id, response.data.menu_name, rest_id, 1);           // 1 is a status to know it's a new category
                $('#list-subcategories').html();
            }
            if (type == 2){
                $('#add-category-dish-btn').remove();
                $('#category' + parent_menu_id).removeClass('active');
                show_subcategory(parent_menu_id, category, rest_id);
                show_dishes(response.data.menu_id, response.data.menu_name, 2);
            }
            //location.reload();
        },
        error: function (response) {
            // console.log(response.responseText);
        }
    });
}

function update_dish(max_queue, type, menu_id, dish_id){       // type = 2 => there are subcategories to show
    var data;
    $('.edit-dish-btn').css('background-color', '#FFF');
    $('#purchase_price').hide();
    if(rest_type == 2){
        $('#purchase_price').show();
        $('#dish-purchase-price').val('');
    }
    $('#delete-dish-btn').remove();
    $('#dish-title').html('Add New Dish');
    $('#submit-dish').val('Add Dish');
    $('#dish-queue').val(max_queue);
    $('#dish-name-ar').val('');
    $('#dish-name-en').val('');
    $('#dish-description-ar').val('');
    $('#dish-description-en').val('');
    $('#dish-price').val('');
    $('#dish-active').prop('checked', false);
    $('#dish-out-stock').prop('checked', false);
    $('#start-dish-time').timepicker('setTime', '');
    $('#end-dish-time').timepicker('setTime', '');
    $('#dish-days').selectpicker('val', []);
    $('#dish-tags').val([]).select2();
    $('#edit-dish-form').show();
    
    if(dish_id == null){
        $('#submit-dish').unbind('click').click(function (){
            var queue = $('#dish-queue').val();
                var price = $('#dish-price').val();
                if($('#dish-name-ar').val() != '' && $('#dish-name-en').val() != '' && price != '' && queue != '' && Number.isInteger(parseFloat(queue)) && queue >= 1 && Number.isInteger(parseFloat(price)) && price >= 0){
                    if(rest_type == 2)
                        if($('#dish-purchase-price').val() != '' && $('#dish-purchase-price').val() >= 0 && Number.isInteger(parseFloat($('#dish-purchase-price').val())))
                            var purchase_price = $('#dish-purchase-price').val();
                    var name_ar = $('#dish-name-ar').val();
                    var name_en = $('#dish-name-en').val();
                    var description_ar = $('#dish-description-ar').val();
                    var description_en = $('#dish-description-en').val();
                    var active;
                    if ($("#dish-active").is(':checked'))
                        active = 1;
                    else
                        active = 0;
                    var out_stock;
                    var active_days = $('#dish-days').val();
                    var start_time = $('#start-dish-time').val();
                    var end_time = $('#end-dish-time').val();
 

                    var selectedTags2 = $('#dish-tags').select2('data');
                    var selectedTags = [];
                        // debugger;
                    for(var i = 0; i < selectedTags2.length; i++)
                        selectedTags.push(selectedTags2[i].id);
                    // console.log(selectedTags);
                    if ($('#dish-out-stock').is(':checked'))
                        out_stock = 1;
                    else
                        out_stock = 0;
                    
                    
                    data = {
                        name_ar: name_ar,
                        name_en: name_en,
                        description_ar: description_ar,
                        description_en: description_en,
                        price: price,
                        purchase_price: purchase_price,
                        active: active,
                        queue: queue,
                        out_stock: out_stock,
                        menu_id: menu_id,
                        active_days: active_days,
                        start_time: start_time,
                        end_time: end_time,
                        tags: selectedTags,
                        image: ''
                    };
                    $.ajax({
                        type: "POST",
                        url: base_url + '/dishes/add_dish',
                        data: data,
                        dataType: 'json',
                        success: function (response) {
                            // console.log(response);
                            $('#edit-dish-form').hide();
                            $('#dishes-' + menu_id).html('');
                            $('#dishes-' + menu_id).addClass('active');
                            // console.log($('#dish-days').val());
                            $('#add-category-dish-btn').remove();
                            $('#category-dish-btn').remove();
                            get_dishes(menu_id, '', type);
                        },
                        error: function (response) {
                            // console.log(response.responseText);
                        }
                    });
                    
                }
        });
        
        $('#edit-dish-form').submit(function(e){
            e.preventDefault();
        });
    }
    
    if(dish_id != null){
        data = {
            dish_id: dish_id
        };
    
    $.ajax({
        type: "POST",
        url: base_url + '/dishes/get_dish',
        data: data,
        dataType: "json",
        success: function (response) {
            var dish = response.data;
           
            
            // if (dish.tags != null){
            //     var tagsIds = [];
            //     for(var i = 0 ; i < dish.tags.length ; i++){
            //         tagsIds.push(dish.tags[i].id);
            //     }
                
            //     // console.log('dish.tags ');
            //     // console.log(tagsIds);
            // }
            
            var tagsIds = [];
            if (dish.tag) {
                $.each(dish.tag.split(","), function (r, e) {
                    tagsIds.push(e);
                }); 
            }

            $('#purchase_price').hide();
            if(rest_type == 2){
                $('#purchase_price').show();
                $('#dish-purchase-price').val(dish.purchase_price);
            }
            $('.edit-dish-btn').css('background-color', '#FFF');
            $('#edit-dish-btn-' + dish.id).css('background-color', '#F0F0FA');
            
            if(!$('#delete-dish-btn').length){
                var html = '<input type="button" value="Delete Dish" class="btn btn-danger" id="delete-dish-btn" onclick="delete_dish(' + dish.id + ', ' + dish.menu_id + ', \''+dish.menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\', '+type+')" />';
                $('#edit-dish-form-footer').prepend(html);
            }
                $('#dish-title').html(dish.name);
                $('#submit-dish').val('Update Dish');
                $('#dish-queue').val(dish.queue);
            
            $('#dish-name-ar').val(dish.name);
            $('#dish-name-en').val(dish.eng_name);
            $('#dish-description-ar').val(dish.description);
            $('#dish-description-en').val(dish.eng_description);
            $('#dish-price').val(dish.price);
            if (dish.active_days != null){
                dish.active_days = dish.active_days.split(',');
                $('#dish-days').selectpicker('val', dish.active_days);
            }
            else
                $('#dish-days').selectpicker('val', []);
            $('#start-dish-time').timepicker('setTime', dish.active_start);
            $('#end-dish-time').timepicker('setTime', dish.active_end);
            $('#dish-tags').val(tagsIds).select2();
            if (dish.active == 1)
                $('#dish-active').prop('checked', true);
            else
                $('#dish-active').prop('checked', false);
            if (dish.out_stock == 1)
                $('#dish-out-stock').prop('checked', true);
            else
                $('#dish-out-stock').prop('checked', false);

            $('#edit-dish-form').show();
            
            $('html, body').animate({
                        scrollTop: $("#dish-heading").offset().top
                    }, 500);
                    
    
    
            $('#submit-dish').unbind('click').click(function(){
                var $this = $(this);
                var queue = $('#dish-queue').val();
                var price = $('#dish-price').val();
                if($('#dish-name-ar').val() != '' && $('#dish-name-en').val() != '' && price != '' && queue != '' && Number.isInteger(parseFloat(queue)) && queue >= 1 && Number.isInteger(parseFloat(price)) && price >= 0){
                    if(rest_type == 2)
                        if($('#dish-purchase-price').val() == '' || $('#dish-purchase-price').val() < 0 || !Number.isInteger(parseFloat($('#dish-purchase-price').val())))
                            return;
                        else
                            var purchase_price = $('#dish-purchase-price').val();
                    var name_ar = $('#dish-name-ar').val();
                    var name_en = $('#dish-name-en').val();
                    var description_ar = $('#dish-description-ar').val();
                    var description_en = $('#dish-description-en').val();
                    var active;
                    if ($("#dish-active").is(':checked'))
                        active = 1;
                    else
                        active = 0;
                    var new_out_stock;
                    var active_days = $('#dish-days').val();
                    var start_time = $('#start-dish-time').val();
                    var end_time = $('#end-dish-time').val();
                    
                    
                    var selectedTags2 = $('#dish-tags').select2('data');
                    var selectedTags = [];
                    
                    for(var i = 0; i < selectedTags2.length; i++)
                        selectedTags.push(selectedTags2[i].id);
                    // console.log('selectedTags');
                    // console.log(selectedTags);
                    if ($('#dish-out-stock').is(':checked'))
                        new_out_stock = 1;
                    else
                        new_out_stock = 0;
                    if(dish_id != null){             // Update dish - you need dish id
                        var data = {
                        id: dish_id,
                        name_ar: name_ar,
                        name_en: name_en,
                        description_ar: description_ar,
                        description_en: description_en,
                        price: price,
                        purchase_price: purchase_price,
                        active: active,
                        queue: queue,
                        out_stock: new_out_stock,
                        menu_id: dish.menu_id,
                        active_days: active_days,
                        start_time: start_time,
                        end_time: end_time,
                        tags: selectedTags
                        };
                        url = base_url + '/dishes/update_dish';
                    }
                    
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        dataType: 'json',
                        success: function (response) {
                            // console.log(response);
                            $('#edit-dish-form').hide();
                            $('#dishes-' + dish.menu_id).html('');
                            $('#dishes-' + dish.menu_id).addClass('active');
                            $this.removeClass('processing-dish');
                            // console.log($('#dish-days').val());
                            $('#add-category-dish-btn').remove();
                            $('#category-dish-btn').remove();
                            if(dish.out_stock != new_out_stock && dish.out_stock != null){
                                send_sms(new_out_stock, name_ar, dish.menu_name);
                            }
                            get_dishes(dish.menu_id, dish.menu_name, type);
                        },
                        error: function (response) {
                            // console.log(response.responseText);
                        }
                    });
                }
            });
            
            $('#edit-dish-form').submit(function(e){
            e.preventDefault();
        });
    }
    });
    }
}

    //function edit_dish(max_queue, type, menu_id, menu_name, id, name, name_en, description, description_en, price, purchase_price, active, queue, old_out_stock, active_days, active_start, active_end, tags) {      // type for dish if has subcategories then type = 2
                //    if (tags != null){
                //        tags = tags.split(',');
                //        var tagsIds = [];
                //        for(var i = 0 ; i < tags.length ; i += 2){
                //            tagsIds.push(tags[i]);
                //        }
                //    }
                //    $('#purchase_price').hide();
                //    if(rest_type == 2){
                //        $('#purchase_price').show();
                //        $('#dish-purchase-price').val(purchase_price);
                //    }
                //    $('.edit-dish-btn').css('background-color', '#FFF');
                //    $('#edit-dish-btn-' + id).css('background-color', '#F0F0FA');
                //    $('#delete-dish-btn').remove();
                //    if(id == null){
                //        $('#dish-title').html('Add New Dish for ' + menu_name);
                //        $('#submit-dish').val('Add Dish');
                //        $('#dish-queue').val(max_queue);
                //    }
                //    else{
                //        var html = '<input type="button" value="Delete Dish" class="btn btn-danger" id="delete-dish-btn" onclick="delete_dish(' + id + ', ' + menu_id + ', \''+menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\', '+type+')" />';
                //        $('#edit-dish-form-footer').prepend(html);
                //        $('#dish-title').html(name);
                //        $('#submit-dish').val('Update Dish');
                //        $('#dish-queue').val(queue);
                //    }
                //    $('#dish-name-ar').val(name);
                //    $('#dish-name-en').val(name_en);
                //    $('#dish-description-ar').val(description);
                //    $('#dish-description-en').val(description_en);
                //    $('#dish-price').val(price);
                //    
                //    if (active_days != null){
                //        active_days = active_days.split(',');
                //        $('#dish-days').selectpicker('val', active_days);
                //    }
                //    else
                //        $('#dish-days').selectpicker('val', []);
                //    $('#start-dish-time').timepicker('setTime', active_start);
                //    $('#end-dish-time').timepicker('setTime', active_end);
                //    $('#dish-tags').val(tagsIds).select2();
                //        
                //    if (active === 1)
                //        $('#dish-active').prop('checked', true);
                //    else
                //        $('#dish-active').prop('checked', false);
                //    if (old_out_stock === 1)
                //        $('#dish-out-stock').prop('checked', true);
                //    else
                //        $('#dish-out-stock').prop('checked', false);
                //    
                //    $('#edit-dish-form').show();
                //    
                //    $('html, body').animate({
                //                        scrollTop: $("#dish-heading").offset().top
                //                    }, 500);
                //                    
                //    
                //    
                //    $('#submit-dish').unbind('click').click(function(){
                //        var $this = $(this);
                //        var queue = $('#dish-queue').val();
                //        var price = $('#dish-price').val();
                //        if($('#dish-name-ar').val() != '' && $('#dish-name-en').val() != '' && price != '' && queue != '' && Number.isInteger(parseFloat(queue)) && queue >= 1 && Number.isInteger(parseFloat(price)) && price >= 0){
                //            if(rest_type == 2)
                //                if($('#dish-purchase-price').val() == '' || $('#dish-purchase-price').val() < 0 || !Number.isInteger(parseFloat($('#dish-purchase-price').val())))
                //                    return;
                //                else
                //                    purchase_price = $('#dish-purchase-price').val();
                //            var name_ar = $('#dish-name-ar').val();
                //            var name_en = $('#dish-name-en').val();
                //            var description_ar = $('#dish-description-ar').val();
                //            var description_en = $('#dish-description-en').val();
                //            var active;
                //            var dish_id = id;
                //            if ($("#dish-active").is(':checked'))
                //                active = 1;
                //            else
                //                active = 0;
                //            var out_stock;
                //            var active_days = $('#dish-days').val();
                //            var start_time = $('#start-dish-time').val();
                //            var end_time = $('#end-dish-time').val();
                //            var selectedTags2 = $('#dish-tags').select2('data');
                //            var selectedTags = [];
                //            for(var i = 0; i < selectedTags2.length; i++)
                //                selectedTags.push(selectedTags2[i].id);
                //            if ($('#dish-out-stock').is(':checked'))
                //                out_stock = 1;
                //            else
                //                out_stock = 0;
                //            if(dish_id != null){             // Update dish - you need dish id
                //                var data = {
                //                id: dish_id,
                //                name_ar: name_ar,
                //                name_en: name_en,
                //                description_ar: description_ar,
                //                description_en: description_en,
                //                price: price,
                //                purchase_price: purchase_price,
                //                active: active,
                //                queue: queue,
                //                out_stock: out_stock,
                //                menu_id: menu_id,
                //                active_days: active_days,
                //                start_time: start_time,
                //                end_time: end_time,
                //                tags: selectedTags
                //                };
                //                url = base_url + '/dishes/update_dish';
                //            }
                //            else{                       // Add new dish - no need for dish id
                //                var data = {
                //                name_ar: name_ar,
                //                name_en: name_en,
                //                description_ar: description_ar,
                //                description_en: description_en,
                //                price: price,
                //                purchase_price: purchase_price,
                //                active: active,
                //                queue: queue,
                //                out_stock: out_stock,
                //                menu_id: menu_id,
                //                active_days: active_days,
                //                start_time: start_time,
                //                end_time: end_time,
                //                tags: selectedTags,
                //                image: 'white_photo.jpg'
                //                };
                //                url = base_url + '/dishes/add_dish';
                //            }
                //            $.ajax({
                //                type: "POST",
                //                url: url,
                //                data: data,
                //                dataType: 'json',
                //                success: function (response) {
                //                    console.log(response);
                //                    $('#edit-dish-form').hide();
                //                    $('#dishes-' + menu_id).html('');
                //                    $('#dishes-' + menu_id).addClass('active');
                //                    $this.removeClass('processing-dish');
                //                    console.log($('#dish-days').val());
                //                    $('#add-category-dish-btn').remove();
                //                    $('#category-dish-btn').remove();
                //                    if(old_out_stock != out_stock && old_out_stock != null){
                //                        send_sms(out_stock, name_ar, menu_name);
                //                    }
                //                    get_dishes(menu_id, menu_name, type);
                //                },
                //                error: function (response) {
                //                    console.log(response.responseText);
                //                }
                //            });
                //        }
                //    });
                //    
                //    $('#edit-dish-form').submit(function(e){
                //            e.preventDefault();
                //        });
    //}

function send_sms(out_stock, name_ar, menu_name){
    var data = {
        rest_id: restaurant_id,
        out_stock: out_stock,
        name_ar: name_ar,
        menu_name: menu_name
    };
    
    $.ajax({
        type: 'POST',
        url: base_url + '/dishes/send_out_stock_message',
        data: data,
        dataType: 'json',
        success: function(response){
            // console.log(response);
        }
    })
}

function add_new_category(max_queue, rest_id, parent_menu_id, type, category){           // type to know if it's a new category or new subcategory : 1 for category , 2 for subcategory
    $('#category-modal-title').html('Add Category');
    $('#delete-cat-btn').remove();
    $('#new-cat-name-ar').val('');
    $('#new-cat-name-en').val('');
    $('#new-cat-active').attr('checked', false);
    $('#new-cat-queue').val(max_queue);
    $('#delete-category').hide();
    $('#submit-category').val('Add Category');
    $('#submit-category').unbind('click').bind('click',function(e){
        var queue = $('#new-cat-queue').val();
        if($('#new-cat-name-ar').val() != '' && $('#new-cat-name-en').val() != '' && queue != '' && Number.isInteger(parseFloat(queue)) && queue >= 1){
            var data = {
                rest_id : rest_id,
                name_ar : $('#new-cat-name-ar').val(),
                name_en : $('#new-cat-name-en').val(),
                active : $('#new-cat-active').is(':checked')?1:0,
                queue: $('#new-cat-queue').val(),
                parent_menu_id : parent_menu_id
            };
            $.ajax({
                type: 'POST',
                url: base_url + '/restaurants/add_category',
                data: data,
                dataType: 'json',
                success: function(response){
                    // console.log(response.data);
                    $('#category-modal').modal('hide');
                    // console.log(rest_id);
                    // console.log(type);
                    if(type == 1){
                        // self['location']['reload']();
                        get_categories(rest_id);
                    }
                    if (type == 2){
                        $('#add-category-dish-btn').remove();
                        $('#category' + parent_menu_id).removeClass('active');
                        show_subcategory(parent_menu_id, category, rest_id);
                        show_dishes(response.data.menu_id, response.data.menu_name, 2);
                    }
                        
                },
                error: function(response){
                    // console.log(response.responseText);
                }
            });
            // self['location']['reload']();
        }
        
    });
    
    $('#category-modal').submit(function(e){
        e.preventDefault();
    });
    
    $('#category-modal').modal('show');
    
}

function delete_dish(dish_id, menu_id, menu_name, type){    // type to know if there are subcategories = 2, type=1 for no subcategories
    var data = {
        id: dish_id
    };
    
    $.ajax({
        type: 'POST',
        url: base_url + '/dishes/delete_dish',
        data: data,
        dataType: 'json',
        success: function(){
            alert('Dish Deleted');
            if(type == 2){
                $('subcategories-title').html('<h3 class="panel-title" >Subcategories of ' + menu_name + '</h3>');
            }
            $('#edit-dish-form').hide();
            get_dishes(menu_id, menu_name, type);
        },
        error: function(response){
            // console.log(response);
        }
    });
}

function get_dishes(menu_id,menu_name, type, rest_id){
    var data = {
            menu_id: menu_id
        };
    if (type == 2){     // There are subcategories to show
    $.ajax({
            type: "POST",
            url: base_url + '/dishes/get_dishes_by_category',
            data: data,
            dataType: "json",
            success: function (response) {
                $('#dishes-' + menu_id).html('');
                $('#subcategories-title').show();
                var dishes = response.data;
                // console.log(dishes);
                var dishes_queues = [];
                for (var i = 0 ; i < dishes.length ; i++)
                    dishes_queues.push(parseInt(dishes[i].queue));
                var maxQueue = Math.max.apply(null, dishes_queues)+1;
                html = '<div class="list-group-item" id="dishes-title"><h4>Dishes of ' + menu_name + '</h4></div>';
                $('#dishes-' + menu_id).append(html);
                if (dishes.length === 0){
                    // console.log('No dishes for this subcategory');
                    html = '<div class="list-group-item" style="height: 50px;"><button onclick="update_dish(' + 0 + ', '+ 2 + ', ' + menu_id + ')" class="btn btn-primary btn-rounded" style="float: right;">Add New Dish</button></div>';
                    $('#dishes-' + menu_id).append(html);
                }
                else {
                    menu_name = dishes[0].menu_name;
                    html = '<div class="list-group-item" style="height: 50px;"><button onclick="update_dish(' + maxQueue + ', '+ 2 + ', ' + menu_id + ')" class="btn btn-primary btn-rounded" style="float: right;">Add New Dish</button></div>';
                    $('#dishes-' + menu_id).append(html);
                    html = '<div class="list-group-item" id="dishes-table">';
                    html += '<div class="table-responsive"><table class="table table-hover"><thead><tr><th style="width: 100px;">Image</th><th>Dish Name</th><th>Price</th></tr></thead><tbody>';
                for (var i = 0; i < dishes.length; i++) {

                    // var tags = [];
                    // if (dishes[i].tag) {
                    //     $.each(dishes[i].tag.split(","), function (r, e) {
                    //         tags.push(e);
                    //     });
                    // }

                   
                    var tags = [];
                    
                       for (var j = 0 ; j < dishes[i].tags.length ; j++) 
                           tags.push([dishes[i].tags[j].id,dishes[i].tags[j].tag]);
                                    // console.log(dishes[i].image);
                                    if (dishes[i].image == null || dishes[i].image == ''){
                                        $img = 'assets/images/capture.png';
                                       
                                    }else{
                                        $img = 'assets/images/uploaded_images/'+dishes[i].image;
                                        
                                    }
                                    var tmp_menu_name = menu_name;
                                    if(dishes[i].eng_name != null)
                                        dishes[i].eng_name = dishes[i].eng_name.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    if(dishes[i].description != null)
                                        dishes[i].description = dishes[i].description.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    if(dishes[i].eng_description != null)
                                        dishes[i].eng_description = dishes[i].eng_description.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    if(tmp_menu_name != null)
                                        tmp_menu_name = tmp_menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    html += '<tr draggable="true" ondragstart="drag(event,'+dishes[i].id+')" class="edit-dish-btn" id="edit-dish-btn-'+dishes[i].id+'" onclick="update_dish('+ 0 +', '+ 2 + ', ' + dishes[i].menu_id + ', ' + dishes[i].id + ')"><td><form id="change-img-form" action="" method="post" enctype="multipart/form-data"><div class="container"><input type="hidden" class="dish_id_hidden"  value="' + dishes[i].id + '"/><img name=" " class="dish-images" id="image_dish'+dishes[i].id+'" style="width: 100px;" src="' +
                                    site_url + $img + '" alt="" /><div class="overlay"></div><div id="edit-img-btn" onclick="edit_image('+ dishes[i].id + ', ' + menu_id+')" class="button"><label for="change-img-'+dishes[i].id+'"><i style="color: white;" class="fa fa-plus" type = "submit" ></i></label><input class="change-img" id="change-img-'+dishes[i].id+'" type="file" name="file" style="display: none;"   /></div><div id="delete-img-btn" onclick="delete_image(' + 1 + ', '+ dishes[i].id + ', ' + menu_id+')" class="button"><a href="#"><i style="color: white;" class="fa fa-minus"></i></a></div></div></form></td>\n\
                                            <td>' + dishes[i].name + '</td><td>' + dishes[i].price + ' S.P</td></tr>';
                                
                                                }
                    html += '</tbody></table><div>';
                    $('#dishes-' + menu_id).append(html);
                    $('#dishes-' + menu_id).show();
                    $('html, body').animate({
                                    scrollTop: $("#subcategory-" + menu_id).offset().top
                                }, 500);
         
                }
                },
            error: function (response) {
                // console.log(response.responseText);
            }
        });
    }
    else {
        $.ajax({
                        type: "POST",
                        url: base_url + '/dishes/get_dishes_by_category',
                        data: data,
                        dataType: "json",
                        success: function (response) {
                            var dishes = response.data;
                            var dishes_queues = [];
                            for (var i = 0 ; i < dishes.length ; i++)
                                dishes_queues.push(parseInt(dishes[i].queue));
                            var maxQueue = Math.max.apply(null, dishes_queues)+1;
                            
                            if(dishes.length == 0){
                              
                                show_subcategory(menu_id,menu_name, rest_id, 1);
                            }
                            else {
                                $('#dishes-' + menu_id).html('');
                                $('#subcategories').show();
                                $('#subcategories-title').hide();
                                html = '<div class="subcategories" id="dishes-' + menu_id + '"></div>';
                                $('#list-subcategories').append(html);
                                html = '<div class="list-group-item" id="dishes-title"><h4>Dishes of ' + menu_name + '</h4></div>';
                                html += '<div class="list-group-item" style="height: 50px;"><button onclick="update_dish(' + maxQueue + ', '+ 1 + ', ' + menu_id + ')" class="btn btn-primary btn-rounded" style="float: right;">Add New Dish</button></div>';
                                $('#dishes-' + menu_id).append(html);
                                html = '<div class="list-group-item" id="dishes-table">';
                                html += '<div class="table-responsive"><table class="table table-hover"><thead><tr><th style="width: 100px;">Image</th><th>Dish Name</th><th>Price</th></tr></thead><tbody>';
                                for (var i = 0; i < dishes.length; i++) {

                                    var tags = [];
                                    if (dishes[i].tag){
                                        $.each(dishes[i].tag.split(","), function (r, e) {
                                            tags.push(e);
                                        }); 
                                    }
                                   


                                    // var tags = [];
                                    // for (var j = 0 ; j < dishes[i].tags.length ; j++)
                                    //     tags.push([dishes[i].tags[j].id,dishes[i].tags[j].tag]);
                                    
                                    if (dishes[i].image == null || dishes[i].image == ''){
                                        $img = 'assets/images/capture.png';
                                       
                                    }else{
                                        $img = 'assets/images/uploaded_images/'+dishes[i].image;
                                        
                                    }
                                    if(dishes[i].eng_name != null)
                                        dishes[i].eng_name = dishes[i].eng_name.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    if(dishes[i].description != null)
                                        dishes[i].description = dishes[i].description.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    if(dishes[i].eng_description != null)
                                        dishes[i].eng_description = dishes[i].eng_description.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                                    // update_dish first parameter 0 as the max queue, 1 is the type to know there are no subcategories
                                    html += '<tr draggable="true" ondragstart="drag(event,'+dishes[i].id+')" class="edit-dish-btn" id="edit-dish-btn-'+dishes[i].id+'" onclick="update_dish('+ 0 +', '+ 1 + ', ' + dishes[i].menu_id + ' , ' + dishes[i].id + ')"><td><form id="change-img-form" action="" method="post" enctype="multipart/form-data"><div class="container"><input type="hidden" class="dish_id_hidden"  value="' + dishes[i].id + '"/><img class="dish-images" name=" "  id="image_dish'+dishes[i].id+'" style="width: 100px;" src="' +
                                    site_url + $img + '" alt="" /><div class="overlay"></div><div id="edit-img-btn"  class="button"><label onclick="edit_image('+ dishes[i].id + ', ' + menu_id+')" for="change-img-'+dishes[i].id+'"><i style="color: white;" class="fa fa-plus" type = "submit" ></i></label><input class="change-img" id="change-img-'+dishes[i].id+'" type="file" name="file" style="display: none;"   /></div><div id="delete-img-btn" onclick="delete_image(' + 1 + ', '+ dishes[i].id + ', ' + menu_id+')" class="button"><a href="#"><i style="color: white;" class="fa fa-minus"></i></a></div></div></form></td>\n\
                                            <td>' + dishes[i].name + '</td><td>' + dishes[i].price + ' S.P</td></tr>';
                                
                                                }
                                html += '</tbody></table><div>';
                                $('#dishes-' + menu_id).append(html);
            
                                $('html, body').animate({
                                    scrollTop: $("#dishes-" + menu_id).offset().top
                                }, 500);
                            }
                        },
                        error: function (response){
                            // console.log(response.responseText);
                        }
                    });
    }
}

function get_subcategories(menu_id, menu_name, rest_id){
    var data = {
            menu_id: menu_id
        };

        $.ajax({
            type: "POST",
            url: base_url + '/restaurants/get_subcategories',
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.data);
                var subcategories = response.data;
                var subcategories_queues = []
                for(var i = 0 ; i < subcategories.length ; i++)
                    subcategories_queues.push(parseInt(subcategories[i].subcategory_queue));
                var maxQueue = Math.max.apply(null, subcategories_queues)+1;
                if (subcategories.length === 0) {
                    //alert('No subcategories for ' + menu_name);
                    $('#subcategories-title').hide();
                    get_dishes(menu_id,menu_name,1, rest_id);            // 1 means there are no subcategories to show.
                } else {
                    // console.log(subcategories);
                    menu_name = subcategories[0].category;
                    //$('#subcategories').append('<div class="panel-heading"><h3 class="panel-title">Subcategories</h3></div>');
                    $('#subcategories').show();
                    var html = '<h3 class="panel-title" >Subcategories of ' + menu_name + '</h3>';
                    $('#subcategories-title').append(html);
                    html = '<div class="list-group-item" style="height: 50px;"><button onclick="add_new_category('+maxQueue+', '+rest_id+','+menu_id+',' + 2 + ',\''+menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')" class="btn btn-primary btn-rounded" style="float: right;">Add New Subcategory</button></div>';
                    $('#list-subcategories').append(html);
                    $('#subcategories-title').show();
                    $('html, body').animate({
                        scrollTop: $("#subcategories").offset().top
                    }, 500);
                    for (var i = 0; i < subcategories.length; i++) {
                       
                        if(subcategories[i].subcategory_en != null)
                            subcategories[i].subcategory_en = subcategories[i].subcategory_en.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                        // pass 2 to show_dishes function to specify there are subcategories.
                        var tmp_menu_name = menu_name;
                        tmp_menu_name = tmp_menu_name.replace(/'/g,"\\'").replace(/"/g,'&quot;');
                        html = '<div class="list-group-item all-subcategories" id="subcategory-'+subcategories[i].subcategory_id+'" style="padding: 0px;"><a ondrop="drop(event)" ondragover="allowDrop(event)" id="'+subcategories[i].subcategory_id+'-sub" onclick="show_dishes(' + subcategories[i].subcategory_id + ',\''+ subcategories[i].subcategory.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;') +'\',' + 2 + ')"><p id="'+subcategories[i].subcategory_id+'-parag">' + subcategories[i].subcategory + '</p></a>\n\
                                <div class="list-group-controls" style="float: right; margin-right: 40px;"><button class="btn btn-primary btn-rounded" onclick="edit_category(' + subcategories[i].subcategory_id + ',\''+ subcategories[i].subcategory.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;') +'\',\''+ subcategories[i].subcategory_en +'\','+subcategories[i].subcategory_queue+','+subcategories[i].subcategory_active+','+2+','+rest_id+','+menu_id+',\''+tmp_menu_name+'\')"><span class="fa fa-pencil"></span></button></div>\n\
                                <div class="list-group-controls open-sub-list"><i class="fa fa-plus-square-o fa-lg" id="sign-sub'+subcategories[i].subcategory_id+'"></i></div></div>';
                        html += '<div class="subcategories" id="dishes-' + subcategories[i].subcategory_id + '"></div>';
                        //$('#category' + menu_id).removeClass('active');
                        $('#list-subcategories').append(html);
                        $('.all-categories').css('background-color','#FFF');
                        $('#category-' + menu_id).css('background-color','#F0F0FA');
                        $('#sign' + menu_id).toggleClass('fa-plus-square-o');
                        //$('dishes-'+ subcategories[i].subcategory_id).show();
                    }
                }

            },
            error: function (response) {
                // console.log(response.responseText);
            }

        });
}

function allowDrop(e){
    e.preventDefault();
}

function drag(e,dish_id){
    e.dataTransfer.setData('dish_id', dish_id);
}

function drop(e){
    e.preventDefault();
    var menu_id = parseInt(e.target.id);
    var dish_id = e.dataTransfer.getData('dish_id');
    $('.all-categories').css('background-color','#FFF');
    $('.all-categories .active').removeClass('active');
    move_dish(dish_id, menu_id);
    
}

function move_dish(dish_id, menu_id, old_menu_id, type){
    var data = {
        dish_id : dish_id,
        menu_id : menu_id
    };
    // console.log(menu_id);
    $.ajax({
        type: 'POST',
        url: base_url + '/dishes/move_dish',
        data: data,
        dataType: 'json',
        success: function(response){
            // console.log(response);
            $('.open-list i').removeClass('fa-minus-square-o');
            $('.open-list i').removeClass('fa-plus-square-o');
            $('.open-list i').addClass('fa-plus-square-o');
            $('#sign' + menu_id).toggleClass('fa-plus-square-o fa-minus-square-o');
            var hasSubcategories = response.subcategories>0?1:0;
            var hasDishes = response.dishes>0?1:0;
            var isSubcategory = response.isSubcategory;
            if(hasSubcategories == 0){
                    if(type == 2){          // there are subcategories to show
                        var subcategories = response.data;
                        $('#list-subcategories').html('');
                        $('#subcategories-title').html('');
                        // console.log(subcategories);
                        get_subcategories(old_menu_id,subcategories[0].subcategory,subcategories[0].restaurant_id);
                    }
                    else{
                            if(isSubcategory){
                                var dishes = response.data;
                                //debugger;
                                $('#dishes-' + menu_id).html('');
                                show_dishes(menu_id, dishes[0].menu_name,2);
                            }
                            else{
                            var dishes = response.data;
                            $('#list-subcategories').html('');
                            $('.all-categories').css('bcakground-color', '#FFF');
                            $('#dishes-' + menu_id).html('');
                            get_dishes(menu_id, dishes[0].menu_name);
                            }
                    }
            }
            else{
                var subcategories = response.data;
                $('#select-container').html('');
                var html = '<select class="form-control select" id="select-move-'+menu_id+'"></select>';
                $('#select-container').append(html);
                for( var i = 0 ; i < subcategories.length ; i++){
                    $('#select-move-' + menu_id).append(new Option(subcategories[i].subcategory,subcategories[i].subcategory_id));
                }
                $('#select-move-' + menu_id).selectpicker();
                $('#move-modal').modal('show');
                $('#move-modal').unbind('submit').submit(function(e){
                    e.preventDefault();
                    move_dish(dish_id,$('#select-move-' + menu_id).val(),menu_id,2);        // 2 is type to know if there are subcategories to show
                    $('#move-modal').modal('hide');
                });
            }
        },
        error: function(response){
            // console.log(response);
        }
    });
}

function get_categories(restaurant_id){
    var data = {
        restaurant_id: restaurant_id
    };
    
    $.ajax({
        type: 'POST',
        url: base_url + '/restaurants/get_categories',
        data: data,
        dataType: 'json',
        success: function(response){
            // console.log(response);
            var main_id = response.main.id;
            var categories = response.data;
            var categories_queues = []
            for(var i = 0 ; i < categories.length ; i++)
                categories_queues.push(parseInt(categories[i].queue));
            var maxQueue = Math.max.apply(null, categories_queues)+1;
                
            $('#categories').html('');
            var html = '<div class="list-group-item" style="height: 50px"><button class="btn btn-primary btn-rounded" style="float: right;" onclick="add_new_category('+maxQueue+', '+restaurant_id+', '+main_id+', ' + 1 + ')">Add New Category</button></div>';
            for(var i = 0 ; i < categories.length ; i++){
                html += '<div class="list-group-item all-categories"  id="category-' + categories[i].menu_id + '"><a onclick="show_subcategory('+categories[i].menu_id+',\''+categories[i].category.replace(/'|\\'/g,"\\'").replace(/"/g,'&quot;')+'\','+restaurant_id+')"><p>'+categories[i].category+'</p></a>';
                html += '<div class="list-group-controls" style="float: right; margin-right: 40px;"><button class="btn btn-primary btn-rounded" id="category'+categories[i].menu_id+'" onclick="edit_category('+categories[i].menu_id+', \''+categories[i].category.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\', \''+categories[i].category_en+'\', '+categories[i].queue+', '+categories[i].active+','+1+','+restaurant_id+', '+categories[i].parent_menu_id+')"><span class="fa fa-pencil"></span></button></div>';
                html += '<div class="list-group-controls open-list"><i class="fa fa-plus-square-o fa-lg"></i></div></div>';
            }
            $('#categories').append(html);
        },
        error: function(response){
            // console.log(response.responseText);
        }
    });
}


function edit_image(id , menu_id){
    // console.log('fun id =>' + id);
     jQuery('#change-img').bind('click').unbind('change').unbind('click').click(function () {
        //  console.log('click id =>' + id);      
        
        //  jQuery('#change-img').trigger('click');
     });
 
   jQuery('#change-img-'+id).unbind('change').change(function () {
    //  console.log('change id =>' + id);
   readURL8(1,this , menu_id , id);
  });
    $('#rest-logo-input').unbind('change').change(function () {
        // console.log('changed');
        readURL8(2,this);
    });
    
    $('#rest-cover-input').unbind('change').change(function () {
        // console.log('changedcover');
        readURL8(3,this);
    });
 }
 
 function delete_image(flag, id , menu_id){
    //  console.log('fun delete id =>' + id);
     $('#delete-img-btn').on("click", function () {
 });
         
         $('#delete-img-btn').attr("value", "true");
         //  var id;
         //  id = $('input[name=id]').attr("value"); 
         var remove = null; 
         if(menu_id != null){
         var data = {
             menu_id:menu_id,
             id:id,
             remove:remove
         }
          
         $.ajax({
              type: 'POST',
                 url: base_url + '/dishes/update_image_dish',
                 dataType: "json",
                 data: data,
                 success: function (response) {
                     $('#image_dish'+id).attr('src', site_url + 'assets/images/capture.png');
                    //  console.log('Hello It Is Done delete');
                 },
                 error: function (response) {
                    //  console.log('Errorrrrr deleted');
                    //  console.log(response.responseText);
                 }
             }); 
         }
         else{
             var data = {
             rest_id:restaurant_id,
             remove:remove,
             flag: flag
         };
          
         $.ajax({
              type: 'POST',
                 url: base_url + '/restaurants/update_rest_image',
                 dataType: "json",
                 data: data,
                 success: function (response) {
                     if(flag == 2){
                         $('#restaurant-logo').attr('src',site_url + 'assets/images/capture.png');
                         noty({text: 'Logo Deleted!', layout: 'topCenter', type: 'success',timeout : 3000});
                     }
                     if(flag == 3){
                         $('#restaurant-cover').attr('src', site_url + 'assets/images/capture.png');
                         noty({text: 'Cover Photo Deleted', layout: 'topCenter', type: 'success',timeout : 3000});
                     }
                    //  console.log('DELETED');
                 },
                 error: function (response) {
                    //  console.log('Errorrrrr deleted');
                    //  console.log(response.responseText);
                 }
             }); 
         }
           
     
 }
 
 function readURL8(flag, input , menu_id , id) {                // flag is used to know if it is a dish image, logo or cover photo.
     if (input.files && input.files[0]) {
        if(input.files[0].size > 300000 ) {
            noty({text: ' the image is too larg ,  max size it 300KB   ', layout: 'topCenter', type: 'error',timeout : 4000});
            return false;
        }
        
         var reader = new FileReader();
         reader.onload = function (e) {
             var image = new Image();
             image.src = e.target.result;
             var surce = image.src;
            //  console.log('url id =>' + id);
                       image.onload = function () {
                    
                    jQuery('#image_dish'+id).attr('src',image.src );
 
 
                    var image_type
                    var data = new FormData(input[0]); 
                    var file_input = $('input[name=file]').val();
                    
             if (input.files[0].type == 'image/png'){
                     image_type = 'png'; }
             else if (input.files[0].type == 'image/jpg'){
                  image_type = 'jpg'; }
             else if(input.files[0].type == 'image/jpeg'){
                  image_type = 'jpeg';}  
             
            var type = input.files[0].type;
            var remove = '';
            var result = e.target.result;
             data.append('file_input', file_input);
             if(menu_id != null){
                data.append('menu_id', menu_id);
                data.append('id', id);
            }
            else{
                data.append('rest_id', restaurant_id);
                data.append('flag', flag);
            }
             data.append('file',result);
             data.append('image_type',image_type);
             data.append('type',type);
            if(menu_id != null)  {       
             $.ajax({
                     type: 'POST',
                         url: base_url + '/dishes/update_image_dish',
                         dataType: "html",
                         mimeType: "multipart/form-data",
                         contentType: false,
                         processData: false,
                         fileElementId	: 'change-img-'+id,
                         data: data,
                         success: function (response) {
                            //  console.log('Hello It Is Done');
                         },
                         error: function (response) {
                            //  console.log('Errorrrrr');
                            //  console.log(response.responseText);
                         }
                     }); 
                     e.preventDefault();
             }
             else{
                 $.ajax({
                     type: 'POST',
                         url: base_url + '/restaurants/update_rest_image',
                         dataType: "html",
                         mimeType: "multipart/form-data",
                         contentType: false,
                         processData: false,
                         data: data,
                         success: function (response) {
                             var new_image = JSON.parse(response)['Data'];
                             if(flag == 2){
                                $('#restaurant-logo').attr('src',site_url + '/assets/images/uploaded_images/' + new_image);
                                noty({text: 'Logo Updated', layout: 'topCenter', type: 'success',timeout : 3000});
                            }
                            if(flag == 3){
                                $('#restaurant-cover').attr('src',site_url + '/assets/images/uploaded_images/' + new_image);
                                noty({text: 'Cover Photo Updated', layout: 'topCenter', type: 'success',timeout : 3000});
                            }
                         },
                         error: function (response) {
                            //  console.log('ErrorrrrrFFFFFFFFF');
                            //  console.log(response.responseText);
                         }
                     }); 
                     e.preventDefault();
             }
                       }
              
             }
 
        reader.readAsDataURL(input.files[0]);
       
     }
 
 }
 
 
 