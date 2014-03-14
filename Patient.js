var LatestPatientDict;
var nameEdited = false;
var oldName;

function CreatePatient(name, address, city, province, postalcode, phonenumber, email, doctor, insurance)
{
  $.ajax({
            type: "GET",
            url: "../PatientBridge.php",
            data:{CreatePatient:"True", 
                  name: name, 
                  address: address,
                  city: city,
                  province: province,
                  postalcode: postalcode,
                  email: email,
                  phonenumber:phonenumber,
                  doctor: doctor,
                  insurance: insurance
                  },
            success: function(msg)
            {
              console.log(msg);
              //if (msg == "")
              //{
                //Created a patient successfully
                setTimeout( (function() {window.location = 'home.html'; })(), 1000);
              //}
              //else
              //{
              //  alert(msg);
              //}
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}

function UpdatePatient(name, address, city, province, postalcode, phonenumber, email, doctor, insurance)
{
  if (nameEdited)
  {
    DeletePatient(oldName);
    CreatePatient(document.getElementById('nametext').value, 
      document.getElementById('addresstext').value, 
      document.getElementById('citytext').value, 
      document.getElementById('provincetext').value, 
      document.getElementById('postalcodetext').value, 
      document.getElementById('numbertext').value, 
      document.getElementById('emailtext').value, 
      document.getElementById('doctortext').value, 
      document.getElementById('insurancetext').value);

    nameEdited = false;

    //setTimeout( (function() {window.location = 'home.html'; } )(), 2000);
  }
  else
  {
    $.ajax({
            type: "GET",
            url: "../PatientBridge.php",
            data:{UpdatePatient:"True", 
                  name: name, 
                  address: address,
                  city: city,
                  province: province,
                  postalcode: postalcode,
                  phonenumber:phonenumber,
                  email: email,
                  doctor: doctor,
                  insurance: insurance
                  },
            success: function(msg)
            {
              console.log(msg);
              //if (msg == "")
              //{
                //Created a patient successfully
                window.location = 'home.html';
              //}
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });

    //setTimeout( (function() {window.location = 'home.html'; } )(), 2000);
  }
}

function DeletePatient(name)
{
  $.ajax({
            type: "GET",
            url: "../PatientBridge.php",
            data:{DeletePatient:"True", 
                  name: name, 
                  },
            success: function(msg)
            {
              console.log(msg);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}

function SelectionChanged()
{
  var SelectDrop = document.getElementById('PatientAutocompleteSelect');
  PatientSelected(SelectDrop.options[SelectDrop.selectedIndex].value);
}

function PatientSelected(name)
{
  for (var i = 0; i < LatestPatientDict.length; i++)
  {
    if (LatestPatientDict[i]['name'] == name)
    {
      document.getElementById('nametext').value = LatestPatientDict[i]['name'];
      document.getElementById('addresstext').value = LatestPatientDict[i]['address'];
      document.getElementById('citytext').value = LatestPatientDict[i]['city'];
      document.getElementById('provincetext').value = LatestPatientDict[i]['province'];
      document.getElementById('postalcodetext').value = LatestPatientDict[i]['postalcode'];
      document.getElementById('numbertext').value = LatestPatientDict[i]['phonenumber'];
      document.getElementById('emailtext').value = LatestPatientDict[i]['email'];
      document.getElementById('doctortext').value = LatestPatientDict[i]['doctor'];
      document.getElementById('insurancetext').value = LatestPatientDict[i]['insurance'];
    }
  }
}

function EditingName()
{
  if (!nameEdited)
  {
    oldName = document.getElementById('nametext').value
    nameEdited = true;
  }
}

function PatientAutocomplete()
{
  var beginString = document.getElementById('nameQueryText').value;
  $.ajax({
            type: "GET",
            url: "../PatientBridge.php",
            data:{GetPatients:true,
                  beginString:beginString
                  },
            success: function(msg)
            {
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
                      PatientSelected(name);
                    }
                  })();
                 select.appendChild(opt);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}

function FetchPatientDrugList(name)
{

  document.getElementById('SelectButton').innerHTML = name + " " + '<span class="caret"></span>';
$.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{QueryByPatient:true,
                  PatientName:name
                  },
            success: function(msg)
            {
              //All of the data is coming in 
              var PatientPills = JSON.parse(msg);

              console.log(PatientPills);

              var table = document.getElementById('hidden-table-info');

              var tableRows = table.getElementsByTagName('tr');
              var rowCount = tableRows.length;

              for (var x=rowCount-1; x>0; x--) {
                 table.deleteRow(x);
              }

              for (var i = 0; i < PatientPills.length; i++)
              {
                var usageEvent = PatientPills[i];
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell2.innerHTML = PatientPills[i]['PillName'];
                cell3.innerHTML = PatientPills[i]['ChangeInCount'];
                cell4.innerHTML = PatientPills[i]['CurrDate'];
              }

            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}

function GetListOfPatients()
{
  $.ajax({
            type: "GET",
            url: "../PatientBridge.php",
            data:{GetPatients:true,
                  beginString:""
                  },
            success: function(msg)
            {
              var PatientDict = JSON.parse(msg);
              var NumPatients = PatientDict.length;
              var DropDown = document.getElementById("NameSelection");

              for (var i = 0; i < NumPatients; i++)
              {
                var newLi = document.createElement("li");
                var currName = PatientDict[i]['name'];
                var htmlString = '<a href="javascript:FetchPatientDrugList(' + "'" + currName + "'" + ')">' + currName + '</a>';
                newLi.innerHTML = htmlString;
                DropDown.appendChild(newLi);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
}