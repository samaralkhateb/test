function modSampleHeight(){
    var headHeight = 100;
    var sch = document.getElementById("gantt_here");
    sch.style.height = (parseInt(document.body.offsetHeight)-headHeight)+"px";
    var contbox = document.getElementById("contbox");
    contbox.style.width = (parseInt(document.body.offsetWidth)-300)+"px";

}

$( ".datepicker" ).datepicker('setDate', new Date());
$(".datepicker").datepicker({ 
    format: 'yyyy-mm-dd' ,
});  

$(".timepicker").timepicker({minuteStep: 30,sshowMeridian: false});






	gantt.config.min_column_width = 60;
	gantt.config.scale_height = 60;
	gantt.config.subscales = [
		{unit:"day",  step:1, date:"%D" },
        {unit:"hour",  step:1, date:" %H " },
        { unit: "minute", step: 30, date: "%i" }

    ];


    gantt.config.grid_resize = false;
	gantt.config.drag_links = false;
	gantt.config.drag_progress = false;
	gantt.templates.task_class =function(start, end, event){
        
        var css = "";
        
        if(event.dis == 'accepted')
            css += "event_accepted ";
         if(event.dis == 'refused') 
            css += "event_refused";

        if(event.dis == 'checkin') 
            css += "event_checkin";
        
        if(event.dis == 'checkout') 
            css += "event_checkout";
                
         return css; // default return

	}

	gantt.config.columns = [
  	];
	  $('#gantt_form').submit(function (evnt) {
         
        evnt.preventDefault();
        evnt.stopImmediatePropagation();
     
    var driver_id = $('#driver_id').val();
    var from_date = $("#from_date").val();
    var to_date = $("#to_date").val();
    
    var data = {
       driver_id : driver_id,
       from_date : from_date,
       to_date : to_date
       
    };
    gantt.config.start_date = new Date(from_date);
	gantt.config.end_date = new Date(to_date);
    console.log(from_date);
    $.ajax({
    
        type: "GET",
        url: base_url + '/drivers/gantt_drivers',
         data: data,
        dataType: 'json',
        cache: false,
        success: function(response) {
      console.log(response);
            var demo_tasks = {"data":
            response.gantt_arr
            };
  
        gantt.attachEvent("onTaskCreated", function(obj){
		obj.duration = 4;
		obj.progress = 0.25;
	})

	
    gantt.config.readonly= true;
    gantt.init("gantt_here");
    modSampleHeight();
    gantt.clearAll();
      gantt.parse(demo_tasks);
}

});
});