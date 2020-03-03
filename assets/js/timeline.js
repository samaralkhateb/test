function init() {
    $("#dirvers_parent").addClass("active");
    $("#timeline").addClass("active");

    $(".datepicker2").datetimepicker({
        language: "en",
        format: "yyyy-mm-dd h:i:s"
    });

    $(".dhx_cal_container").hide();
    $('.hint-date').hide();

    scheduler.locale.labels.timeline_tab = "Timeline";
    scheduler.locale.labels.section_custom = "Section";
    scheduler.config.details_on_create = false;
    scheduler.config.details_on_dblclick = false;
    scheduler.config.start_on_monday = false;
    scheduler.config.dblclick_create = false;
    scheduler.config.drag_create = false;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.config.drag_resize = false;
    scheduler.config.drag_move = false;
    scheduler.config.readonly_form = true;
    scheduler.config.time_step = 1;
    scheduler.config.select = false;
    scheduler.config.icons_select = false;
    scheduler.clearAll();
    var cfg = scheduler.config;
    var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);
     
    scheduler.templates.xml_date = function(date){
        return str_to_date(date);
    };
    $("#timeline_form").submit(function (evnt) {
        evnt.preventDefault();
        evnt.stopImmediatePropagation();
        scheduler.clearAll();

        let driver_id = $("#driver_id").val();
        let from_date = $("#from_date").val();

        if (!driver_id || !from_date) {
            return;
        }

        $("#day_tab").css("display", "block");
        $("#week_tab").css("display", "none");
        $("#weekdriver_tab").css("display", "block");
        $("#weektimeline_tab").css("display", "none");

        // var x;

        // if ($("input[name=refused]").is(":checked")) {
        //     x = 1;
        // } else {
        //     x = 0;
        // }
        // var filter_refused = x;
        // if (filter_refused == 0) {
        //     scheduler.filter_month = scheduler.filter_day = scheduler.filter_weekdriver = scheduler.filter_weektimeline = scheduler.filter_timeline = function (
        //         id,
        //         event
        //     ) {
        //         // console.log("filter_refused == 0 2");
        //         // console.log(event);
        //         if (event.dis != "no_driver" || event.dis == scheduler.undefined) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     };
        // } else {
        //     scheduler.filter_month = scheduler.filter_day = scheduler.filter_weekdriver = scheduler.filter_weektimeline = scheduler.filter_timeline = function (
        //         id,
        //         event
        //     ) {
        //         // console.log("filter_refused !== 0 2");
        //         // console.log(event);
        //         // if ( event.dis  != "no_driver" || event.dis == scheduler.undefined) {
        //         //   return false;
        //         // } else {
        //         return true;
        //         // }
        //     };
        // }

        // $("input[name=refused]").on("change", function () {
        //     if ($("input[name=refused]").is(":checked")) {
        //         x = 1;
        //     } else {
        //         x = 0;
        //     }

        //     show_loader();

        //     var filter_refused = x;
        //     if (filter_refused == 0) {
        //         scheduler.filter_month = scheduler.filter_day = scheduler.filter_weekdriver = scheduler.filter_weektimeline = scheduler.filter_timeline = function (
        //             id,
        //             event
        //         ) {
        //             // console.log("filter_refusedevent == 0");
        //             // console.log(event);
        //             if (event.dis != "no_driver" || event.dis == scheduler.undefined) {
        //                 return true;
        //             } else {
        //                 return false;
        //             }
        //         };
        //     } else {
        //         scheduler.filter_month = scheduler.filter_day = scheduler.filter_weekdriver = scheduler.filter_weektimeline = scheduler.filter_timeline = function (
        //             id,
        //             event
        //         ) {
        //             // console.log("filter_refusedevent !== 0");
        //             // console.log(event);
        //             // if (event.dis == "no_driver" || event.dis == scheduler.undefined) {
        //             //   return false;
        //             // } else {
        //             return true;
        //             // }
        //         };
        //     }

        //     scheduler.updateView();
        //     hide_loader();
        // });

        // show_loader();

              $.ajax({
                type: "POST",
                url: base_url + '/drivers/time_drivers',
                data: {
                    'driver_id' : driver_id,
                    'from_date' : from_date
                },
                dataType: 'json',
                cache: false,
                success: function(response) {
                    // console.log(response);
                    $('.hint-date').text(`Show Data From ${response.from_date }  to   ${response.to_date} `);
                    $('.hint-date').show();

                     $(".dhx_cal_container").show();

            var sections=response.drivers;
            hide_loader();
            scheduler.attachEvent("onClick", function (id, e){ scheduler.showLightbox(id);   return true; });

            scheduler.templates.event_class=function(start, end, event){
                var css = "";

                    if(event.dis == 'accepted')
                        css += "event_accepted ";
                    if(event.dis == 'refused')
                        css += "event_refused";
                    if (event.dis == 'refused_not_delivered')
                        css += "event_refused_not_delivered";
                    if (event.dis == 'no_driver')
                        css += "event_no_driver";
                    if(event.dis == 'checkin')
                        css += "event_checkin";
                    if(event.dis == 'schedule')
                        css += "event_scheduled";
                    if(event.dis == 'checkout')
                        css += "event_checkout";

                    // console.log('css');
                    // console.log(css);
                    return css; // default return
            };

            scheduler.createTimelineView({
                name:	"timeline",
                x_unit:	"minute",
                x_date:	"%H:%i",
                x_step:	30,
                x_size: 21,
                x_start: 0,
                x_length: 21,
                y_unit:	sections,
                y_property:	"section_id",
                render:"bar"
            });

            scheduler.locale.labels.weektimeline_tab = "Week"
            scheduler.createTimelineView({
                name:	"weektimeline",
                x_unit:	"minute",
                x_date:	"%H:%i",
                x_step:	30,
                x_size: 21,
                x_length: 21,
                y_unit:	sections,
                y_property:	"section_id",
                render:"days"

            });

            scheduler.locale.labels.weekdriver_tab = "Week"
            scheduler.createTimelineView({
                name:	"weekdriver",
                x_unit:	"minute",
                x_date:	"%H:%i",
                x_step:	60,
                x_size: 24,
                x_length: 24,
                y_unit:	sections,
                y_property:	"section_id",
                render:"days"

            });

            var dateToStr = scheduler.date.date_to_str("%j %F, %l");
            scheduler.templates["weekdriver_scale_label"] = function(section_id, section_label, section_options){
                return dateToStr(section_label);
            };

            var dateToStr = scheduler.date.date_to_str("%j %F, %l");
            scheduler.templates["weektimeline_scale_label"] = function(section_id, section_label, section_options){
                return dateToStr(section_label);
            };


            //===============
            //Data loading
            //===============
            scheduler.config.lightbox.sections=[
                {name:"Driver" , type:"textarea",height:5, map_to:"name" },
                {name:"Restaurant", map_to:"type",height:5, type:"textarea" },
                {name:"Area", map_to:"en_name",height:5, type:"textarea" },
                {name:"Created At ", type:"textarea",height:5,map_to:"open_time"},
                {name:"Dispatch By ", map_to:"dispatch_by",height:5, type:"textarea" },
                {name:"Dispatch Time ", map_to:"start_date" ,height:5,type:"time" },
                {name:"Driver Confirmation Time ", map_to:"delivery_confirmation",height:5, type:"textarea" },
                {name:"Pickedup Time", map_to:"pickedup_time",height:5, type:"textarea" },
                {name:"Driver Arrival Time", map_to:"arrival_driver_time",height:5, type:"textarea" },
                {name:"Comfirmtion Time  ", map_to:"handling_time",height:5, type:"textarea" },
                {name:"Expected Time ", map_to:"bill_expected_time",height:5, type:"textarea" },
                {name:"Delivered  At ", type:"textarea",height:5 , map_to:"close_time" },
            ];

        $("#weektimeline_tab").on("click", function(){
            scheduler.clearAll();
            // console.log('time_arr_all');
            // console.log(response.time_arr_all);
            scheduler.parse(response.time_arr_all,"json");

        });

        $("#weekdriver_tab").on("click", function(){
            scheduler.clearAll();
            // console.log('time_arr');
            // console.log(response.time_arr);
            scheduler.parse(response.time_arr,"json");

        });

        $("#timeline_tab").on("click", function(){
            scheduler.clearAll();
            // console.log('time_arr');
            // console.log(response.time_arr);
            scheduler.parse(response.time_arr,"json");

        });

        $("#day_tab").on("click", function(){
            scheduler.clearAll();
            // console.log('time_arr');
            // console.log(response.time_arr);
            scheduler.parse(response.time_arr,"json");

        });
         scheduler.init('scheduler_here',new Date(from_date),"weekdriver");
        scheduler.parse(response.time_arr,"json");
        },
        error: function(response){
            console.log(response);
            hide_loader();
        }

        });
    });
    $('.dhx_right_btn_set.dhx_btn_set').text('close');
}
