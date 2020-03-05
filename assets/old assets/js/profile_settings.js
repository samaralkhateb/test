$(document).ready(function () {

  $("#control_panel_parent").addClass("active");
  $("#profile_settings").addClass("active");

  var name = $("#name");
  var password = $("#password");
  var confirm_password = $("#re-pass");
  const regex = /^[a-zA-Z0-9 ]+$/; // regex for name
  const current_name = name.val();

  $("form input").keyup(function () {
    if (( current_name != name.val()  && name.val() )|| password.val().length > 4) {
      $("#btn-save").removeAttr("disabled");
    } else if (current_name == name.val() || password.val().length == 0) {
      $("#btn-save").attr("disabled", "");
    }
  });


  function chkName() {
    const match = regex.exec(name.val());
    if (match && name.val()) {
      return true;
    } else {
      return false;
    }
  }
  function chkPassword(element) {
    if (element.val().length > 4 && element.val()) {
      return true;
    } else {
      return false;
    }
  }

  $("#btn-save").on("click", function (e) {
    e.preventDefault();
    if (chkPassword(password) || chkPassword(confirm_password)) {
      if (password.val() === confirm_password.val()) {
          if(chkName()) {
            $("#update-form").submit();
          }else {
            noty({
              timeout: 1500,
              text: "Invalid Name ! ",
              layout: "topCenter",
              type: "error"
            });
          }
      } else {
        noty({
          timeout: 2000,
          text: "Password Don't Match",
          layout: "topCenter",
          type: "error"
        });
      }
    } else {
      if(chkName()) {
        $("#update-form").submit();
      }else {
        noty({
          timeout: 1500,
          text: "Invalid Name ! ",
          layout: "topCenter",
          type: "error"
        });
      }
    }
    });

    
});
