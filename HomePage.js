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

  var table = document.getElementById('inventoryTable');
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = "ID";
  cell2.innerHTML = "NAME";
  cell3.innerHTML = "NUMLEFT";
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

function RegisterPillClicked()
{
  RegisterPill(document.getElementById('PillNameTxt').value, document.getElementById('NumLeftTxt').value);
}

function GetPillInventory()
{
  GetInventoryBridge(document.getElementById('PillNameTxt').value);
}

function GetAllInventory()
{
  GetAllInventoryBridge();
}

function UpdatePillInventory()
{
  UpdateInventory(document.getElementById('PillNameTxt').value, document.getElementById('NumLeftTxt').value);
}

function DispensePillsClicked()
{
  //Need to get pharmID here
  var pharmID = 1;
  DispensePills(document.getElementById('ArduinoPillNameTxt').value, 
                document.getElementById('ArduinoNumDispenseTxt').value,
                pharmID
                );
}

function StockInventoryClicked()
{
  var pharmID = 1;
  DispensePills(document.getElementById('ArduinoPillNameTxt').value, 
                document.getElementById('ArduinoNumDispenseTxt').value,
                pharmID
                );
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