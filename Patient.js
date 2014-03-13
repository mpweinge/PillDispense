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
              if (msg == "")
              {
                //Created a patient successfully
              }
              else
              {
                alert(msg);
              }
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
              if (msg == "")
              {
                //Created a patient successfully
              }
              else
              {
                alert(msg);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
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
              
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
              console.log(msg);
            }
           });
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