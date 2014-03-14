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

function SendInventoryChangesToServer(rowNum)
{
  //Pull the name of all of the pills
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  var Names = new Array();
  var NumLeft = new Array();

  for (var i = 1; i < rowCount; i++)
  {
    var currRow = tableRows[i];
    var Cells = currRow.getElementsByTagName('td');
    
    Names[i-1] = Cells[1].innerHTML;
    NumLeft[i-1] = Cells[2].innerHTML;
  }

  $.ajax({
            type: "GET",
            url: "../PillInventoryBridge.php",
            data:{ NewInventory:"True", Names:JSON.stringify(Names), NumLeft:JSON.stringify(NumLeft) },
            success: function(msg)
            {
            },
             error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           }); 

  if (rowNum > 0)
    SetRowEditable(rowNum, false);
}

function DeleteRow(rowNum)
{
   var table = document.getElementById('inventoryTable');

   table.deleteRow(rowNum);
  
    SendInventoryChangesToServer(-1);
}

function SetRowEditableNoServer(rowNum, rowEditable)
{
  var table = document.getElementById('dispenseTable');
  var tableRows = table.getElementsByTagName('tr');
  var currRow = tableRows[rowNum];
  var Cells = currRow.getElementsByTagName('td');
  for (var i = 0; i < 2; i++)
  {
    Cells[i].setAttribute("contentEditable", rowEditable);
  }

  Cells[2].innerHTML = '<a href= ' + '"javascript:SetRowEditableNoServer(' + rowNum + ',false);"' + '> Edit </a>';
}

function DeleteRowNoServer(rowNum)
{
  var table = document.getElementById('dispenseTable');

   table.deleteRow(rowNum);
}

function AddDispenseRow()
{
  var table = document.getElementById('dispenseTable');
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  var row = table.insertRow(rowCount);
  var cell2 = row.insertCell(0);
  var cell3 = row.insertCell(1);
  var cell4 = row.insertCell(2);
  var cell5 = row.insertCell(3);
  cell2.innerHTML = "Insert Pill Name Here";
  cell3.innerHTML = "Number To Dispense";
  cell4.innerHTML = '<a href= ' + '"javascript:SetRowEditableNoServer(' + rowCount + ',true);"' + '> Edit </a>';
  cell5.innerHTML= "Delete";
  cell5.innerHTML = '<a href= ' + '"javascript:DeleteRowNoServer(' + rowCount + ');"' + '> Delete </a>';
}

function AddRow()
{
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  var row = table.insertRow(rowCount);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = rowCount;
  cell2.innerHTML = "Insert Pill Name Here";
  cell3.innerHTML = "Number Left";
  cell4.innerHTML = '<a href= ' + '"javascript:SetRowEditable(' + rowCount + ',true);"' + '> Edit </a>';
  cell5.innerHTML= "Delete";
  cell5.innerHTML = '<a href= ' + '"javascript:DeleteRow(' + rowCount + ');"' + '> Delete </a>';
}

function SetRowEditable(rowNum, rowEditable)
{
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');
  var currRow = tableRows[rowNum];
  var Cells = currRow.getElementsByTagName('td');
  for (var i = 1; i < 3; i++)
  {
    Cells[i].setAttribute("contentEditable", rowEditable);
  }

  if (rowEditable)
    Cells[3].innerHTML = '<a href= ' + '"javascript:SendInventoryChangesToServer('+rowNum+');"' + '> OK </a>';
  else
    Cells[3].innerHTML = '<a href= ' + '"javascript:SetRowEditable(' + rowNum + ',true);"' + '> Edit </a>';
}

function GetAllInventoryBridge()
{
  $.ajax({
            type: "GET",
            url: "../PillInventoryBridge.php",
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
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = pill.id;
                cell2.innerHTML = pill.name;
                cell3.innerHTML = pill.numLeft;
                cell4.innerHTML = '<a href= ' + '"javascript:SetRowEditable(' + (i+1) + ',true);"' + '> Edit </a>';
                cell5.innerHTML= "Delete";
                cell5.innerHTML = '<a href= ' + '"javascript:DeleteRow(' + (i+1) + ');"' + '> Delete </a>';
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