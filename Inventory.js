function RegisterPill(name, numLeft)
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{RegisterPill:"True", name: name, numLeft: numLeft},
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

function GetInventoryBridge(name)
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{GetInventory:"True", name: name},
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

function GetAllInventoryBridge()
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{GetAllInventory:"True"},
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

function UpdateInventory(name, numLeft)
{
  alert(name + numLeft);
   $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{UpdateInventory:"True", name: name, numLeft: numLeft},
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