var LoginShowing = false;
var RegisterShowing = false;

$('document').ready(function()
{
	$("#UsernameLabel").hide();
        $("#PasswordLabel").hide();
        $("#NameLabel").hide();
        $("#EmailLabel").hide();
        $("#UsernameTxt").hide();
        $("#PasswordTxt").hide();
        $("#NameTxt").hide();
        $("#EmailTxt").hide();
        $("#GoButton").hide();

        checkCookie();
});

$('body').click(function(e)
  {
      if(( $(e.target).parents().index($("#LoginText")) >= 0) || 
        ( $(e.target).parents().index($("#LoginButtons")) >= 0)
        )
      {
          return true;            
      }
      else
      {
        if (LoginShowing)
        {
          removeLoginInputs();
          LoginShowing = false;
        }  
       else if (RegisterShowing)
       {

        removeRegisterInputs();
        RegisterShowing = false;
       }  
      }
  });

function showLoginInputs(event)
  {
      $("#UsernameLabel").show();
      $("#PasswordLabel").show();
      $("#UsernameTxt").show();
      $("#PasswordTxt").show();
      $("#GoButton").show();
      LoginShowing = true; 
      //event.stopPropogation();
  }

  function removeLoginInputs()
  {
      $("#UsernameLabel").hide();
      $("#PasswordLabel").hide();
      $("#UsernameTxt").hide();
      $("#PasswordTxt").hide();
      $("#GoButton").hide();
  }

  function showRegisterInputs(event)
  {
      $("#UsernameLabel").show();
      $("#PasswordLabel").show();
      $("#NameLabel").show();
      $("#UsernameTxt").show();
      $("#PasswordTxt").show();
      $("#NameTxt").show();
      $("#GoButton").show();
      RegisterShowing = true;
      LoginShowing = false;
      //event.stopPropogation();
  }

  function removeRegisterInputs()
  {
      $("#UsernameLabel").hide();
      $("#PasswordLabel").hide();
      $("#NameLabel").hide();
      $("#EmailLabel").hide();
      $("#UsernameTxt").hide();
      $("#PasswordTxt").hide();
      $("#NameTxt").hide();
      $("#EmailTxt").hide();
      $("#GoButton").hide();
  }

function GoClicked()
{
	if (LoginShowing)
	{
	  Login(document.getElementById('UsernameTxt').value, document.getElementById('PasswordTxt').value);
	}
	else if (RegisterShowing)
	{
	  Register(document.getElementById('UsernameTxt').value, document.getElementById('PasswordTxt').value, document.getElementById('NameTxt').value);
	}
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
  return "";
}

function checkCookie()
{
  var usernameCook = getCookie("loginCookie");
  usernameCook = decodeURIComponent(usernameCook);
  var username = JSON && JSON.parse(usernameCook);
  if (username!="")
  {
    alert("Welcome again " + username.username);
    $("#LoginButton").hide();
    $("#RegisterButton").hide();
  }
}