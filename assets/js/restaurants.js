function showRest(rest_id){
    var url =  base_url +"/restaurants/details_menus/format/json/rest/" + rest_id;
    window.open(url,"_blank");
}


   $("#confirm_password").change(function(){
                alert("ds");
        var password= $("#password").val()  ;
        var confirm= $("#confirm_password").val();
        var spanErorr = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
        
        if (password !== confirm)
        {
            $(".confirm_password").addClass("has-error");
            $("#confirm_password").after(spanErorr);
            $("#add_new_driver").attr("disabled","disabled");
        }
        else
        {
            $("#add_new_driver").removeAttr("disabled");
            $(".confirm_password").removeClass("has-error");
            $("span.glyphicon-remove").remove();
            
        }
        
        
        
    });