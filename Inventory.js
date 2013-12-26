function RegisterPill(name, numLeft)
{
  $.ajax({
            type: "GET",
            url: "PillInventoryBridge.php",
            data:{RegisterPill:"True", name: name, numLeft: numLeft},
            success: function(msg)
            {
              alert(msg);
              var table = document.getElementById('inventoryTable');
              var tableRows = table.getElementsByTagName('tr');
              var rowCount = tableRows.length;

              for (var x=rowCount-1; x>0; x--) {
                 table.deleteRow(x);
              }

              var inventoryTotal = JSON.parse(msg);
              for (var i = 0; i < inventoryTotal.length; i++)
              {
                var pill = inventoryTotal[i];
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = pill.id;
                cell2.innerHTML = pill.name;
                cell3.innerHTML = pill.numLeft;
              }
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

              var table = document.getElementById('inventoryTable');
              var tableRows = table.getElementsByTagName('tr');
              var rowCount = tableRows.length;

               for (var x=rowCount-1; x>0; x--) {
                 table.deleteRow(x);
              }

              var inventoryTotal = JSON.parse(msg);
              for (var i = 0; i < inventoryTotal.length; i++)
              {
                var pill = inventoryTotal[i];
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = pill.id;
                cell2.innerHTML = pill.name;
                cell3.innerHTML = pill.numLeft;
              }
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
              var table = document.getElementById('inventoryTable');
              var tableRows = table.getElementsByTagName('tr');
              var rowCount = tableRows.length;

               for (var x=rowCount - 1; x> 0; x--) {
                 table.deleteRow(x);
              }

              var inventoryTotal = JSON.parse(msg);
              for (var i = 0; i < inventoryTotal.length; i++)
              {
                var pill = inventoryTotal[i];
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = pill.id;
                cell2.innerHTML = pill.name;
                cell3.innerHTML = pill.numLeft;
              }
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
              var table = document.getElementById('inventoryTable');
              var tableRows = table.getElementsByTagName('tr');
              var rowCount = tableRows.length;

               for (var x=rowCount-1; x>0; x--) {
                 table.deleteRow(x);
              }

              var inventoryTotal = JSON.parse(msg);
              for (var i = 0; i < inventoryTotal.length; i++)
              {
                var pill = inventoryTotal[i];
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = pill.id;
                cell2.innerHTML = pill.name;
                cell3.innerHTML = pill.numLeft;
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           });
}