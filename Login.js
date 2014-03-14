function Login(username, password)
{
  console.log("Logging in" + username + password);
  $.ajax({
            type: "GET",
            url: "../UserLoginBridge.php",
            data:{Login:"True", username: username, password: password},
            success: function(msg)
            {
              console.log(msg);
              if (msg == "")
              {
                window.location = "home.html";
              }
              else
              {
                console.log(msg);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              console.log("failed" + jqXHR + textStatus + errorThrown);
            }
           });
}

function Register(username, password, email)
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