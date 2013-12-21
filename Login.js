function Login(username, password)
  {
    $.ajax({
              type: "POST",
              url: "UserLoginBridge.php",
              data:{Login:"True", username: username, password: password},
              success: function(msg)
              {
                alert(msg);
              },
              error: function(jqXHR, textStatus, errorThrown) 
              {
                alert("failed" + jqXHR + textStatus + errorThrown);
              }
             });
  }

  function Register(username, password)
  {
    $.ajax({
              type: "POST",
              url: "UserLoginBridge.php",
              data:{Register:"True", username: username, password: password},
              success: function(msg)
              {
                  alert(msg);
              },
              error: function(jqXHR, textStatus, errorThrown) 
              {
                alert("failed" + jqXHR + textStatus + errorThrown);
              }
             });
  }