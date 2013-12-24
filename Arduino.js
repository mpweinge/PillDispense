function SendStringToArduino(message)
{
	$.ajax({
            type: "GET",
            url: "Arduino.php",
            data:{SendText:"True", message: message},
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