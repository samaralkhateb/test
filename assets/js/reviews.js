var suggested_replies = [];
$(document).ready(function () {

    
    
    $.ajax({
        type: 'GET',
        url: base_url + '/call_center/suggested_replies',
        dataType: 'json',
        success: function(data){
            suggested_replies = data.done.slice();
        },
        error: function(response){
            console.log(response);
        }
    });
    get_reviews();
   // setInterval(get_reviews, 60000);

    
    function get_reviews() {
        // get all messages viw ajax 
        //console.log($('#msg_txt_reply_review').val("ee"));
        
        $('#reviews_div').html("");
        var url = base_url + '/call_center/get_all_reviews';
        jQuery.ajax({
            type: "GET",
            url: url,
            dataType: "json",

            success: function (response) {
                
                $('.review_count').html(response.done.length);


                $.each(response.done, function (i, item) {
                    console.log(response);

                    if (item.rate == 1) {
                        var src = "../../assets/images/sad1.svg";
                    }
                    if (item.rate == 5) {
                        var src = "../../assets/images/normal.png";
                    }
                    if (item.rate == 10) {
                        var src = "../../assets/images/happy1.png";
                    }
                    var html = '<a style="height:auto;overflow:hidden;" href="#" class="list-group-item" onclick=\'show_review("' + src + '","' + item.name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + item.bill_id + ',"' + item.mobile + '","' + item.review.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.restaurant_name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + item.order_num + ',"' + item.review_date + '","' + item.type + '")\'>';
                    html += '<div class="col-md-2" >';


                    html += '<img src=' + src + ' alt="rate" />';
                    html += '</div>';
                    html += '<div class="col-md-8" >';

                    html += '<span class="contacts-title">' + item.name.replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + ' </span>';
                    html += '<span class="contacts-title"> ( ' + item.mobile + ' )</span>';
                    html += '<p>' + item.review + '</p>';
                    html += '</div>';
                    html += '</a>';
                    $('#reviews_div').append(html);
                    // alert(html);



                });
                /*    if (response.done != ""){
                             noty({
                            timeout: 1500,
                            text: "Check New Review .",
                            layout: 'topCenter', 
                            type: 'error'
                            
                                    });
                          }*/
            },
            error: function (response) {
                //alert(response.error);
                //location.reload();
            }
        });
    
        
        
    
    }



    $("#reply_review_btn").click(function () {
        var msg_text = "";
        var other_id = "#sugReply" + suggested_replies.length;
        if($(other_id).is(':checked'))
            msg_text = $("#msg_txt_reply_review").val();
        else
            for(var i = 0 ; i < suggested_replies.length ; i++)
                if($('#sugReply' + i).is(':checked'))
                    msg_text = $('#sugReply' + i).val();
        
        if (msg_text == "") {
            noty({ text: 'Please input your reply', layout: 'topCenter', type: 'error', timeout: 3000 });
        } else {


            noty({
                text: "Are you sure?",
                layout: 'topCenter',
                type: 'error',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

                            var data = {
                                bill_id: $("#review_id").val(),
                                msg_txt: msg_text,
                                msg_type: $('input[name=reply_review]:checked').val(),
                                review_number: $("#review_number").val(),

                            };

                            url = base_url + '/call_center/reply_to_review';
                            jQuery.ajax({
                                type: "POST",
                                url: url,
                                dataType: "json",
                                data: data,
                                success: function (response) {
                                    console.log(response);
                                    $noty.close();
                                    get_reviews();
                                    ratings_reviews_datatable.ajax.reload();
                                    jQuery("#review_modal").modal("hide");
                                    $("#review_modal").on("hidden.bs.modal", function () {
                                        $('#msg_txt_reply_review').val("");
                                        $('#repliesRadio').html("");
                                        $('[name="suggestedReplies"]').prop('checked', false);
                                        $('#reply_review1').prop('checked', true);
                                    });
                                },
                                error: function (response) {
                                    //var data = JSON.parse(response["responseText"]);
                                    //alert(response.error);
                                }
                            });

                        }
                    },
                    {
                        addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]
            });
        }
    });

});

function show_review(src_rate, name, id, mobile, review, restaurant_name, order_num, date, type) {
    var html = '';
    for(var i = 0 ; i < suggested_replies.length ; i++){
        html += '<label class="">' + suggested_replies[i].note + '<input type="radio" style="float: left" name="suggestedReplies" value="' + suggested_replies[i].note + '" id="sugReply' + i + '" class="sugReplyRadio reply_review" /><span class="checkmark"></span></label><br>';
    }
    html += '<label class=""><input type="radio" name="suggestedReplies" value="other" id="sugReply' + suggested_replies.length + '" class="sugReplyRadio reply_review" />Other<span class="checkmark"></span></label><br>';
    $("#repliesRadio").append(html);
    
    var other_id = "#sugReply" + suggested_replies.length;
    
    $('.msg_txt_reply_review').hide();
    $('.sugReplyRadio').click(function(){
        if($(other_id).is(':checked')){
        $('.msg_txt_reply_review').show();
    }
        else
            $('.msg_txt_reply_review').hide();
    
    });
    $("h4#modal_title").text("Reply To Review");
    $("#review_body").text(review);
    $("#review_number").val(mobile);
    $("#review_date").text(date);
    $("#restaurant_review").text(restaurant_name);

    if (type == 1) {
        type_bill = "Pick up";
    }
    if (type == 2) {
        type_bill = "Delivery";
    }

    $("#order_num").text("#" + order_num + "  " + type_bill);
    $("#img-rate").attr("src", src_rate);
    $("#review_from").text("From : " + name + "  (" + mobile + ")");
    $("#review_modal #review_id").val(id);
    $('#review_modal').modal('show')

}

$('#review_modal').on('hidden.bs.modal', function () {
    $('#msg_txt_reply_review').val("");
    $('#repliesRadio').html("");
    $('[name="suggestedReplies"]').prop('checked', false);
    $('#reply_review1').prop('checked', true);
});
