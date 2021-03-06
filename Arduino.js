function SendStringToArduino(number)
{
	$.ajax({
            type: "GET",
            url: "../Arduino.php",
            data:
            {
              SendText:true, 
              number: number
            },
            success: function(msg)
            {
              //alert(msg);
              window.location = "home.html";
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           });
}

function DispensePills(name, number, PharmID)
{
  $.ajax({
            type: "GET",
            url: "../Arduino.php",
            data:{SendText:"True", name: name, number:number},
            success: function(msg)
            {
              alert(msg);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           });

  $.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{Dispense:"True", PharmID:PharmID, name:name, number:number},
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

function StockInventory(name, number, pharmID)
{
  $.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{Stock:"True", PharmID:PharmID, name:name, number:number},
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