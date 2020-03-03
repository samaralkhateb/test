var bill_id_index = 0;
var rest_queue_index = 1;
var rest_name_index = 2;
var username_index = 3;
var mobile_index = 4;
var open_time_index = 5;
var rate_index = 6;
var review_index = 7;
var reply_msg_index = 8;
var bill_type_index = 9;
var app_version_index = 10;
var reply_btn_index = 11; //10;

var log_btn_index = 12;//11

var invisible_columns = 1;

var suggested_replies = [];

var ratings_reviews_datatable;  // Make the datatable global so it can be accessed from reviews.js after the form is submitted.
$.ajax({
    type: 'GET',
    url: base_url + '/call_center/suggested_replies',
    dataType: 'json',
    success: function (data) {
        suggested_replies = data.done.slice();
    },
    error: function (response) {
        console.log(response);
    }
});

$(document).ready(function () {


    $("#dashboard_parent").addClass("active");
    $("#ratings_reviews_issues_view").addClass("active");


    
        ratings_reviews_datatable = $("#ratings_reviews_issues").DataTable({
            "ordering": true,
            "destroy": true,
            "bInfo": false,
            "bPaginate": true,
            "bLengthChange": true,
            "searching": true,
            "bSearchable": true,
            "bProcessing": true,
            "scrollX": true,
            "deferLoading": 57,
            "emptyTable": "No data available in table",
            "bServerSide": false,
//            "sAjaxSource": base_url + '/controle_panel/ratings_reviews_issues/format/json?start_date='
//                    + $("#from-date-ratings").val()
//                    + '&end_date='
//                    + $("#to-date-ratings").val(),

       //     dom: 'Blfrtip',
            colReorder: true,
            buttons: [

//                {
//                    extend: 'excel',
//                }
            ],
            "columnDefs": [
                                 {
                                     "targets": [0,9],
                                     "visible": false,
                             },
                             {
                                     "targets": [log_btn_index],
                                     "data": null,
                                     "render": function (data, type, full, meta) {
                                         if (type === 'display') {
                                            data = '<button class="btn btn-success bill_view" value="' + full[0] + 'logBtn' + '" type="submit" onclick=\'showLog("' + full[mobile_index] + '","' + full[open_time_index] + '")\'; >Show Log</button>';
                                        }
                                        return data;
                                     }
                             },
                {
                    "targets": reply_btn_index,
                    "data": null,

                    "render": function (data, type, full, meta) {
                        if (type === 'display') {
                            if (full[rate_index] == 1) {
                                var src = "../../assets/images/sad1.svg";
                            }
                            if (full[rate_index] == 5) {
                                var src = "../../assets/images/normal.png";
                            }
                            if (full[rate_index] == 10) {
                                var src = "../../assets/images/happy1.png";
                            }

                            var review = full[review_index];

                            if (review == null) {
                                review = "";
                            }
                            data = '<button class="btn btn-success bill_view" value="' + full[0] + 'repBtn' + '" type="submit" onclick=\'show_review("' + src + '","' + full[username_index].toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + full[bill_id_index] + ',"' + full[mobile_index] + '","' + review.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + full[rest_name_index].toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + full[rest_queue_index] + '","' + full[open_time_index] + '","' + full[bill_type_index] + '")\' disabled>Reply</button>';
                            //data = '<button class="btn btn-success bill_view" value="' + full[1] + 'btn' + '" type="submit" onclick="showLog(' + full[mobile_index] + ')"; >Show Log</button>';
                            if (full[rate_index] !== null) {
                                if (full[reply_msg_index] === null || full[reply_msg_index] == "") {

                                    // \'show_review("' + src + '","' + item.name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + item.bill_id + ',"' + item.mobile + '","' + item.review.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + item.restaurant_name.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + item.order_num + ',"' + item.review_date + '","' + item.type + '")\'
                                    data = '<button class="btn btn-success bill_view" value="' + full[0] + 'repBtn' + '" type="submit" onclick=\'show_review("' + src + '","' + full[username_index].toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '",' + full[bill_id_index] + ',"' + full[mobile_index] + '","' + review.toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + full[rest_name_index].toString().replace(/\n|\r/g, "").replace(/\'|\"|\s\s+/g, "") + '","' + full[rest_queue_index] + '","' + full[open_time_index] + '","' + full[bill_type_index] + '")\' >Reply</button>';
                                    //data += '<button class="btn btn-success bill_view" value="' + full[1] + 'btn' + '" type="submit" onclick="showLog(' + full[mobile_index] + ')"; >Show Log</button>';
                                }

                            }

                                
                        }
                        return data;
                    }
                }
            ]


        });

    $('#from-date-byrate').on('change', function () {
        
        ratings_reviews_datatable.ajax.url(base_url + '/controle_panel/ratings_reviews_issues/format/json?start_date_byrate='
            + $("#from-date-byrate").val()
            + '&end_date='
            + $("#to-date-ratings").val()).load();
    });

    
    $('#from-date-ratings').on('change', function () {
        
        ratings_reviews_datatable.ajax.url( base_url + '/controle_panel/ratings_reviews_issues/format/json?start_date='
                    + $("#from-date-ratings").val()
                    + '&end_date='
                    + $("#to-date-ratings").val()).load();
    });
    

    $('#to-date-ratings').on('change', function () {
        ratings_reviews_datatable.ajax.url(base_url + '/controle_panel/ratings_reviews_issues/format/json?start_date='
            + $("#from-date-ratings").val()
            + '&end_date='
            + $("#to-date-ratings").val()).load();
    });

 

    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });
    $(".datepicker").datepicker('setDate', new Date());
});


function showLog(mobile, creation_date) {
    openWindowWithPost(mobile, creation_date);
}

function openWindowWithPost(mobile, creation_date) {
    var f = document.getElementById('TheForm');
    f.mobile.value = mobile;
    creation_date = creation_date.substring(0,10);
    f.from_date.value = creation_date;
    f.to_date.value = creation_date;
    window.open('', 'TheWindow');
    f.submit();
}


