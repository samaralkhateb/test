
   $(document).ready(function() {
    $("#marketing_parent").addClass("active");
    $("#accounting_report").addClass("active");
  
  
   window.matchMedia("print").addListener(function() {
          //alert('Functionality to run before printing.');
          $("#side_bar").css("display", "none");
          $(".submit-button").css("display", "none");
          $("#page_content").css("margin-left", "0px");
          $("#navigation").css("display", "none");
          $("#submite").css("display", "none");
          $("#form_id").css("display", "none");
          $("#description").css("display", "block");
          $("#title").css("display", "none");
          $("hr").css("display", "none");
          $(".n_label").css("font-size", "10px");

    });
   window.matchMedia("onafterprint").addListener(function() {
        $("#side_bar").css("display", "block");
        $("#page_content").css("margin-left", "220px");
        $("#navigation").css("display", "block");
    });
    

    

     $('button > .cancel').click(function (e) {                
      alert('Cancel');
 });

 $('button > .print').click(function (e) {                
      alert('Print');
 });

   window.onafterprint = function(){
        $("#side_bar").css("display", "block");
        $("#page_content").css("margin-left", "220px");
        $("#navigation").css("display", "block");
    }
     
    //for the auto complete select
    if($(".select").length > 0){
            $(".select").selectpicker();
            $(".select").on("change", function(){
                if($(this).val() == "" || null === $(this).val()){
                    if(!$(this).attr("multiple"))
                        $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                }else{
                    $(this).find("option[value='"+$(this).val()+"']").attr("selected",true);
                }
            });
        }
          $(".datepicker").datepicker({
	           format: 'yyyy-mm-dd' ,
	         }); 
          $(".datepicker2").datepicker({
	           format: 'yyyy-mm-dd' ,
	         }); 

            $(".datepicker").change(function(){
                $(".datepicker2").datepicker({
                 format: 'yyyy-mm-dd' ,
                 minDate: new Date()
              });
            });


            $(".datepicker2").change(function(){
                var from = new Date($(".datepicker").val());
                var to = new Date($(".datepicker2").val());
                if (from > to ){
                   noty({
                          timeout: 1500,
                          text: "Please select real date",
                          layout: 'topCenter', 
                          type: 'error'
                          
                                  });
                  $(".datepicker").val("");
                  $(".datepicker2").val("");
                }
            });
            
       });
       
   

      
       
    
 
