function RegisterPill(id, name)
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{registerPill:"True", id: id, name: name},
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

function GetInventory(name)
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

function UpdateInventory(name, numLeft)
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{GetInventory:"True", name: name, numLeft: numLeft},
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