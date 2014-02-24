function Login(username, password)
{
  alert("Logging in" + username + password);
  $.ajax({
            type: "GET",
            url: "../UserLoginBridge.php",
            data:{Login:"True", username: username, password: password},
            success: function(msg)
            {
              console.log(msg);
              if (msg == "")
              {
                window.location = "1_HomePage.html";
              }
              else
              {
                alert(msg);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}

function Register(username, password, email, location)
{
  $.ajax({
            type: "GET",
            url: "../UserLoginBridge.php",
            data:{Register:"True", username: username, password: password, email:email},
            success: function(msg)
            {
              console.log(msg);
              if (msg == "")
              {
                 //Logging in was a success, bring them to the home page
                 window.location = "1_HomePage.html";
              }
              else
              {
                alert(msg);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           });
}