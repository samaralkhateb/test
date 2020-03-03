$(function () {



    $("#dashboard_parent").addClass("active");
    $("#telegram").addClass("active");
    let chat_group ;

    function sendMessage(msg, chat_id) {

        // when msg is null 
        if (!msg) {
            noty({
                timeout: 3000,
                text: "Empty Message",
                layout: "topCenter",
                type: "error"
            });
            $('#chat-box').val('');
            return;
        }

        // send message
        $.ajax({
            data: {
                'msg': msg,
                'chat_id': chat_id
            },
            type: "post",
            url: base_url + '/chat/send_msg/',
            cache: false,
            success: function (res) {
                res = JSON.parse(res)
                let sender_name = res.from.first_name;
                
                // save message in database
                $.ajax({
                    data: {
                        'msg': msg,
                        'chat_id': chat_id,
                        'first_name' : sender_name,
                        'seen' : true,
                        'is_bot' : true,
                    },
                    type: "post",
                    url: base_url + '/chat/save_msg/',
                    cache: false,
                    success: function () {
                        //  append & get messages from database
                        // $('.messages').children().remove();
                        getMessages(chat_id , true);
                        $(".messages").animate({ scrollTop: ($('.messages').prop("scrollHeight") * 10) });
                    }
                })
            }, error: function () {
                noty({
                    timeout: 3000,
                    text: "Error to send message",
                    layout: "topCenter",
                    type: "error"
                });
            }
        });
    }

    function getMessages(chat_id , last) {
        $.ajax({
            data: {
                'chat_id': chat_id,
                'last' : last
            },
            type: "post",
            url: base_url + '/chat/get_msg/',
            cache: false,
            success: function (response) {
                if (response) {
                    let data = JSON.parse(response);
                    let profile_icon =site_url + '/../assets/images/telegram-profile.png';
                    let bot_icon =site_url + '/../assets/images/telegram-bot.png';

                    for (const msg of data) {
                        //    Append Fetched data to chatbox modal

                        let show_icon = profile_icon;
                        let seen_msg_status = 'none';
                        let status = '';

                        if(msg.is_bot == 1) {
                            show_icon = bot_icon;
                            status = 'in';
                        }
                        if(msg.is_bot == 0 &&  msg.seen == 1) {

                            seen_msg_status = 'block';
                        }
                        
                        $('.messages').append(
                            `<div class="item ${status}" style="opacity:1;">
                                    <div class="image">
                                        <img src="${show_icon}" alt="image">
                                    </div>
                                    <div class="text">
                                        <div class="heading">
                                            <p  style="opacity: 0.6" >${msg.first_name}</a>
                                            <span class="date">
                                              ${msg.date}
                                                <span class="two-check-msg-icon" style="display:${seen_msg_status};">
                                                    <i class="fa fa-check" aria-hidden="true"></i>
                                                    <i class="fa fa-check" aria-hidden="true"></i>
                                                </span>
                                            </span>
                                        </div>
                                    ${msg.message}
                                    </div>
                                </div>`
                        );
                    }
                }
            }
        });
    }
    function selectChat(chat_id) {
        $('.messages').children().remove(); // remove  all messegas 
        $('#chat-box').val('');
        $('.input-group').css('display', ' table');  // when select any content  
        // get messages from database 
       
        getMessages(chat_id)

        //    $(".messages").scrollTop(40000);
        $(".messages").animate({ scrollTop: ($('.messages').prop("scrollHeight") * 10) }, 1000);
       
    }
    
    // ==================================================================================

    $('#send').click(function () {
        let msg = ($('#chat-box').val()).trim();
        sendMessage(msg, chat_group)
        $('#chat-box').val('');
    });

    $("#chat-box").on('keypress', function (e) {   // when press enter key
        if (e.which == 13)  // enter button  : key code = 13
        {
            let msg = ($('#chat-box').val()).trim();
            sendMessage(msg, chat_group)
            $('#chat-box').val('');
        }
    })

    $('.list-group-item').on('click', function (e) {
        e.preventDefault();
        $('#res-name').text($(this).find('.contacts-title').text());
        $("#rest-name").val('');
        chat_group = $(this).attr('id');
        $(this).siblings().css('backgroundColor', '');
        $(this).css('backgroundColor', '#f49563');
        selectChat(chat_group);
    })

    $("#rest-name").on('change',  function () {
        let val = $(this).val();
        if (restaurants_name.includes(val)) {
            $('.list-group-item').css('backgroundColor', '');
            let element = $('.list-group-item').find('span:contains(' + val + ')').parent();
            element.css('backgroundColor', '#f49563');
            $(".list-group").scrollTop(0);
            $(".list-group").animate({ scrollTop: (element.offset().top - 200 )}, 1200);
            chat_group = element.attr('id');
            $('#res-name').text(val);
            selectChat(chat_group);
            // $(this).val('');
        }
    });

    let restaurants_name = [];
    $.ajax({
        data: {
            key: 'getRes'
        },
        type: "post",
        url: base_url + '/chat/get_restaurant/',
        cache: false,
        success: function (data) {
            data = JSON.parse(data)
            for (const name of data) {
                restaurants_name.push(name.name);
            }
        }
    });

    $("#rest-name").autocomplete({
        source: restaurants_name
    });
    // setTimeout(selectChat(chat_group), 1000);
}) // end Jquery