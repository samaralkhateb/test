var ShiftsRangeBars = [];

$(document).ready(function() {
    init();
});

function init() {
    init_shift_datepicker();
    get_shifts_from_server( $("#current-date").val());
    init_drivers_html_blocks();
}

function init_shift_datepicker() {
    $("#current-date").datepicker({
        format: 'yy-mm-dd',
        onSelect: function(dateText) {
            get_shifts_from_server(dateText);
            init_drivers_html_blocks();
            $('#to-date').multiDatesPicker('resetDates', 'picked');
            $('#to-date').multiDatesPicker('addDates', dateText);

        }
    });
    $( "#current-date" ).datepicker('setDate', new Date());
    $( "#current-date" ).datepicker('option', 'dateFormat', 'yy-mm-dd');

    $.datepicker._selectDateOverload = $.datepicker._selectDate;
    $.datepicker._selectDate = function(id, dateStr) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        inst.inline = true;
        $.datepicker._selectDateOverload(id, dateStr);
        inst.inline = false;
        this._updateDatepicker(inst);
    };

    $('#to-date').multiDatesPicker({
        dateFormat: "yy-mm-dd",
        addDates: [new Date()]

    });



}

function init_drivers_html_blocks() {
    $('#driver-form').html('');
    ShiftsRangeBars = [];
    $(drivers).each(function (index,driver) {
        build_driver_html_block(driver);
        initRangeSlider(driver);
    });
}

function build_driver_html_block(driver) {
    var html = '<div class="form-group row driver-shift-block" driver_id="'+driver['driver_id']+'" id="driver_'+driver['driver_id']+'">' +
        '    <div class="col-md-2">' +
        '        <div class="driver-details">' +
        '            <label>'+driver['name']+'</label>' +
        '        </div>' +
        '    </div>' +
        '    <div class="col-md-10">' +
        '<div class="row">'+
        '    <div class="col-md-6">'+
        '        <label class="col-md-4 _4am">4:00 AM</label>'+
        '        <label class="col-md-2 _9am">9:00 AM</label>'+
        '        <label class="col-md-5 _2pm">2:00 PM</label>'+
        '    </div>'+
        '    <div class="col-md-6">'+
        '    <label class="col-md-4 _5pm">5:00 PM</label>'+
        '    </div>'+
        '</div>'+
        '        <div  class="rangeSlider" ></div>' +
        '    </div>' +
        '</div>';
    $('#driver-form').append(html);
}

function initRangeSlider(driver){
    var values = [];
    if (driver.driver_shifts.length!=0) {
        $(driver.driver_shifts).each(function () {
            let shift_start = moment(this.shift_start, 'hh:mm');
            let shift_end = moment(this.shift_end, 'hh:mm');
            if(shift_start.diff(moment().startOf('day').add(4, 'hours'), 'minutes')<0){
                shift_start.add(1, 'days');
                shift_end.add(1, 'days');
            }
            if(shift_end.diff(moment().startOf('day').add(4, 'hours'), 'minutes')<0){
                shift_end.add(1, 'days');
            }
            values.push([
                shift_start.format('LLLL'),
                shift_end.format('LLLL')]
            );
        });
    }

    var r = new RangeBar({
        allowDelete: true,
        deleteTimeout:500,
        min: moment().startOf('day').add(4, 'hours').format('LLLL'),
        max: moment().endOf('day').add(4, 'hours').format('LLLL'),
        valueFormat: function (ts) {
            return moment(ts).format('LLLL');
        },
        valueParse: function (date) {
            return moment(date).valueOf();
        },
        values: values,
        label: function (a) {
            return moment(a[0]).format('h:mm a') + " - " + moment(a[1]).format('h:mm a');
        },
        snap: 1000 * 60 * 15,
        minSize: 1000 * 60 * 60,
        barClass: 'progress',
        rangeClass: 'bar'
    });
    ShiftsRangeBars.push(r);
    $('#driver_' + driver.driver_id + ' .rangeSlider').html(r.$el);
}

function get_shifts_from_server(date) {
    show_loader();
    $.ajax({
        url: base_url + '/drivers_shifts/get_shifts_by_date?date='+date,
        type: "get",
        dataType: "json",
        async:false,
        success: function(response) {
            drivers = response.data;
            hide_loader();
        },
        error: function(){

            hide_loader();
        }
    });
}

function save_shifts() {
    show_loader();
    var shifts = get_shifts_data();
    var dates = $('#to-date').multiDatesPicker('getDates');
    var data = {
        shift_dates: dates,
        shifts: shifts
    };
    $.ajax({
        url: base_url + '/drivers_shifts/add_shifts',
        type: "post",
        dataType: "json",
        data: data,
        success: function(response) {
            noty({text: 'Successful action', layout: 'topRight', type: 'success'});
            hide_loader();
        },
        error: function(){
            noty({text: 'error action', layout: 'topRight', type: 'error'});
            hide_loader();
        }
    });
}

function get_shifts_data() {
    var shifts = [];
    $('.driver-shift-block').each(function( key, htmlElement ) {
            $(ShiftsRangeBars[key].val()).each(function (index, val) {
                var shift = {
                    driver_id:$(htmlElement).attr("driver_id"),
                    shift_start: moment(val[0]).format('YYYY-MM-DD H:mm'),
                    shift_end: moment(val[1]).format('YYYY-MM-DD H:mm')
                };

                shifts.push(shift);
            });
    });
    return shifts;
}

function PrintShifts()
{
    var shifts_html = '<tr>\n' +
        '<th>Driver Name</th>\n' +
        '<th>Shift Start</th> \n' +
        '<th>Shift End</th>\n' +
        '</tr>';
    $(drivers).each(function (index,driver) {
        if (driver.driver_shifts.length!=0){
            $(driver.driver_shifts).each(function () {
                shifts_html += '<tr>'
                    + '<td>' + driver['name'] + '</td>'
                    + '<td>' + moment(this.shift_start, 'hh:mm').format('h:mm a') + '</td>'
                    + '<td>' + moment(this.shift_end, 'hh:mm').format('h:mm a') + '</td>'
                    +'<tr>';
            });
        }
    });

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>Drivers Shifts</title>');
    mywindow.document.write('</head>');
    mywindow.document.write('<style>table, th, td {padding:0px ;border: 1px solid black;} td{text-align: center}</style>');
    mywindow.document.write('<body ><h1>Drivers Shifts on: ' + $("#current-date").val() + '</h1>');
    mywindow.document.write('<table  style="width:100%">'+shifts_html +'</table>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    return true;
}




