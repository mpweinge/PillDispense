function GetPillsByPatient(patientname)
{
	$.ajax({
            type: "GET",
            url: "UsageBridge.php",
            data:{QueryByPatient:"True", PatientName:patientname},
            success: function(msg)
            {
              console.log(msg);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           });
}
