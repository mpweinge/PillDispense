var currPill = "";

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

function DeleteRow(myID)
{
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');

  var rowNum;

  for (var i = 1; i < tableRows.length; i++)
  {
    if (myID == (tableRows[i].getElementsByTagName('td'))[0].innerHTML )
      rowNum = i;
  }

   table.deleteRow(rowNum);
  
  SendInventoryChangesToServer(-1);
}

function SetRowEditableNoServer(myID, rowEditable)
{
  var table = document.getElementById('dispenseTable');
  var tableRows = table.getElementsByTagName('tr');
  
  var rowNum = tableRows.length;

  for (var i = 1; i < rowNum; i++)
  {
    if ((tableRows[i].getElementsByTagName('td'))[0].id == myID)
      rowNum = i;
  }

  var currRow = tableRows[rowNum];

  var Cells = currRow.getElementsByTagName('td');
  for (var i = 1; i < 2; i++)
  {
    Cells[i].setAttribute("contentEditable", rowEditable);
  }

  if (rowEditable)
    Cells[2].innerHTML = '<a href= ' + '"javascript:SetRowEditableNoServer(' + myID + ', false);"' + '> OK </a>';
  else
    Cells[2].innerHTML = '<a href= ' + '"javascript:SetRowEditableNoServer(' + myID + ',true);"' + '> Edit </a>';
}

function DeleteRowNoServer(myID)
{
  var table = document.getElementById('dispenseTable');
  var tableRows = table.getElementsByTagName('tr');
  var numRows = tableRows.length;

  var rowNum;

  for (var i = 1; i < numRows; i++)
  {
    if ((tableRows[i].getElementsByTagName('td'))[0].id == myID)
      rowNum = i;
  }

  table.deleteRow(rowNum);
}

function AddDispenseRow()
{
  var name = currPill;
  if ( name == "")
    return;

  var tableObj = document.getElementById('dispenseTable');
  var tableRows = tableObj.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  var row = tableObj.insertRow(rowCount);
  var cell2 = row.insertCell(0);
  var cell3 = row.insertCell(1);
  var cell4 = row.insertCell(2);
  var cell5 = row.insertCell(3);
  cell2.innerHTML = name;
  
  //Set the ID of this cell equal to 1 + the id of the cell above it
  var numCells = tableRows[rowCount-1].getElementsByTagName('td').length;
  if (  numCells > 0 )
    cell2.id = +((tableRows[rowCount-1]).getElementsByTagName('td'))[0].id + 1;
  else
    cell2.id = 0;

  cell2.onkeyup = (function() {
    PillAutocomplete(rowCount);
  });
  cell3.innerHTML = "Number To Dispense";
  cell4.innerHTML = '<a href= ' + '"javascript:SetRowEditableNoServer(' + cell2.id + ',true);"' + '> Edit </a>';
  cell5.innerHTML= "Delete";
  cell5.innerHTML = '<a href= ' + '"javascript:DeleteRowNoServer(' + cell2.id + ');"' + '> Delete </a>';
}

function AddRow()
{
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  var idAbove = (((tableRows[rowCount-1]).getElementsByTagName('td'))[0]).innerHTML;

  var myID = +idAbove + 1;

  var row = table.insertRow(rowCount);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  
//
  cell1.innerHTML = myID;
  cell2.innerHTML = "Insert Pill Name Here";
  cell3.innerHTML = "Number Left";
  cell4.innerHTML = '<a href= ' + '"javascript:SetRowEditable(' + myID + ',true);"' + '> Edit </a>';
  cell5.innerHTML= "Delete";
  cell5.innerHTML = '<a href= ' + '"javascript:DeleteRow(' + myID + ');"' + '> Delete </a>';
}

function SetRowEditable(myID, rowEditable)
{
  var table = document.getElementById('inventoryTable');
  var tableRows = table.getElementsByTagName('tr');
  var rowNum;

  for (var i = 1; i < tableRows.length; i++)
  {
    if (myID == (tableRows[i].getElementsByTagName('td'))[0].innerHTML )
      rowNum = i;
  }

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
  //alert(name + numLeft);
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

function PillAutocomplete(beginString)
{
  $.ajax({
            type: "GET",
            url: "../PillInventoryBridge.php",
            data:{PillAutocomplete:true,
                  beginString:beginString
                  },
            success: function(msg)
            {
              console.log(msg);

              LatestPatientDict = JSON.parse(msg);
              var select = document.getElementById('PatientAutocompleteSelect');

              var selectSize = select.length;

              for (var i = 0; i < selectSize; i++)
              {
                select.remove(0);
              }

              for (var i = 0; i < LatestPatientDict.length; i++)
              {
                 var opt = document.createElement('option');
                 opt.value = LatestPatientDict[i]['name'];
                 opt.innerHTML = LatestPatientDict[i]['name'];
                 //Lawl closures
                 opt.onclick = (function() {
                    var name = LatestPatientDict[i]['name'];
                    return function() {
                      PillSelected(name);
                    }
                  })();
                 select.appendChild(opt);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
    });
}

function PillSelected(name)
{
  currPill = name;
}

function DispenseClicked()
{
  //Get amount to be dispensed
  var tableObj = document.getElementById('dispenseTable');
  var tableRows = tableObj.getElementsByTagName('tr');
  var numRows = tableRows.length;

  var selectHTML = document.getElementById('SelectButton').innerHTML;

  if (selectHTML.indexOf("Select A Patient") != -1)
  {
    alert("Please select a patient.");
    return;
  }

  for (var i = 1; i < numRows; i++)
  {
    var currCells = tableRows[i].getElementsByTagName('td');

    if (!(jQuery.isNumeric(currCells[1].innerHTML)))
    {
      alert("Numeric pillcount only please.");
      return;
    }
      

    selectHTML = selectHTML.substring(0,selectHTML.indexOf("<") - 1);
    ChangeInventory(currCells[0].innerHTML, currCells[1].innerHTML);
    AddUsage(1, currCells[0].innerHTML, currCells[1].innerHTML, selectHTML, ((i+1) == numRows));
  }
}

function LoadDispense(number)
{
  //Issue dispense command to Arduino
  SendStringToArduino(number);
}

function AddUsage(pharmacistID, pillName, changeInCount, PatientName, lastPill)
{
  $.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{NewUsage:true,
                  pharmacistID:pharmacistID,
                  pillname:pillName,
                  changeInCount:changeInCount,
                  patient:PatientName
                  },
            success: function(msg)
            {
              if (lastPill)
                setTimeout( LoadDispense(changeInCount) , 1000);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
    });
}

function DrawDonut()
{
  Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: 'Jam', value: 25 },
          {label: 'Frosted', value: 40 },
          {label: 'Custard', value: 25 },
          {label: 'Sugar', value: 10 }
        ],
          colors: ['#41cac0', '#49e2d7', '#34a39b'],
        formatter: function (y) { return y + "%" }
      });
}

function QueryUsageByPill(pillName)
{
  $.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{QueryByPill:true,
              pillname:pillName
                  },
            success: function(msg)
            {
                DrawDonut(pillName, msg);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
    });
}

function ChangeInventory(pillName, changeInCount)
{
  $.ajax({
            type: "GET",
            url: "../PillInventoryBridge.php",
            data:{ChangeInInventory:true,
              pillname:pillName,
              changeincount:changeInCount
                  },
            success: function(msg)
            {
            
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
    });
}