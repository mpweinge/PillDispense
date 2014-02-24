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