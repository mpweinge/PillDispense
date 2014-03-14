var MondayUsage = -1;
var TuesdayUsage = -1;
var WednesdayUsage = -1;
var ThursdayUsage = -1;
var FridayUsage = -1;

var Usage9 = -1;
var Usage10 = -1;
var Usage11 = -1;
var Usage12 = -1;
var Usage13 = -1;
var Usage14 = -1;
var Usage15 = -1;
var Usage16 = -1;
var Usage17 = -1;
var Usage18 = -1;

function GetDataByDay(day)
{
	$.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{ QueryByDay:"True", DayQuery: day},
            success: function(msg)
            {
            	if (day == 2) // Monday
            		MondayUsage = msg;
            	else if (day == 3)
            		TuesdayUsage = msg;
            	else if (day == 4)
            		WednesdayUsage = msg;
            	else if (day == 5)
            		ThursdayUsage = msg;
            	else 
            		FridayUsage = msg;

            	if ((MondayUsage != -1) &&
            		(TuesdayUsage != -1) &&
	            	(WednesdayUsage != -1) &&
	            	(ThursdayUsage != -1) &&
	            	(FridayUsage != -1) )
            	{
            		DrawDayGraphs();
            	}
            },
             error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           }); 
}

function GetDataByHour(hour)
{
	$.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{ QueryByHour:"True", HourLow: hour, HourHigh: hour+1},
            success: function(msg)
            {
            	if (hour == 9) // Monday
            		Usage9 = msg;
            	else if (hour == 10) // Monday
            		Usage10 = msg;
            	else if (hour == 11) // Monday
            		Usage11 = msg;
            	else if (hour == 12) // Monday
            		Usage12 = msg;
            	else if (hour == 13) // Monday
            		Usage13 = msg;
            	else if (hour == 14) // Monday
            		Usage14 = msg;
            	else if (hour == 15) // Monday
            		Usage15 = msg;
            	else if (hour == 16) // Monday
            		Usage16 = msg;
            	else if (hour == 17) // Monday
            		Usage17 = msg;
            	else
            		Usage18 = msg;

            	if ((Usage9 != -1) &&
            		(Usage10 != -1) &&
	            	(Usage11 != -1) &&
	            	(Usage12 != -1) &&
	            	(Usage13 != -1) &&
	            	(Usage14 != -1) &&
	            	(Usage15 != -1) &&
	            	(Usage16 != -1) &&
	            	(Usage17 != -1) &&
	            	(Usage18 != -1) )
            	{
            		DrawHourGraphs();
            	}
            },
             error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }
           }); 
}

function DrawDayGraphs()
{
	( function () {
          var overCircle = false;
          var tt = document.createElement('div'),
      leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', ''));
      topOffset = -32;
      tt.className = 'ex-tooltip';
      document.body.appendChild(tt);

      var data = {
        "xScale": "time",
        "yScale": "linear",
        "main": [
          {
            "className": ".pizza",
            "data": [
              {
                "x": "2012-11-05",
                "y": MondayUsage
              },
              {
                "x": "2012-11-06",
                "y": TuesdayUsage
              },
              {
                "x": "2012-11-07",
                "y": WednesdayUsage
              },
              {
                "x": "2012-11-08",
                "y": ThursdayUsage
              },
              {
                "x": "2012-11-09",
                "y": FridayUsage
              }
            ]
          }
        ]
      };
    var opts = {
      "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
      "tickFormatX": function (x) { return d3.time.format('%A')(x); },
      "mouseover": function (d, i) {
        overCircle = true;
        $('html,body').css('cursor','pointer');

      },
      "mouseout": function (x) {
        overCircle = false;
        $('html,body').css('cursor','default');
      }
    };
    var myChart = new xChart('line-dotted', data, '#chart', opts);
	}() );
}

function DrawHourGraphs()
{
	( function () {
     data = {
        "xScale": "time",
        "yScale": "linear",
        "main": [
          {
            "className": ".pizza",
            "data": [
              {
                "x": "2012-11-05 09",
                "y": Usage9
              },
              {
                "x": "2012-11-05 10",
                "y": Usage10
              },
              {
                "x": "2012-11-05 11",
                "y": Usage11
              },
              {
                "x": "2012-11-05 12",
                "y": Usage12
              },
              {
                "x": "2012-11-05 13",
                "y": Usage13
              },
              {
                "x": "2012-11-05 14",
                "y": Usage14
              },
              {
                "x": "2012-11-05 15",
                "y": Usage15
              },
              {
                "x": "2012-11-05 16",
                "y": Usage16
              },
              {
                "x": "2012-11-05 17",
                "y": Usage17
              },
              {
                "x": "2012-11-05 18",
                "y": Usage18
              },
            ]
          }
        ]
      };
    opts = {
      "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d %H').parse(x); },
      "tickFormatX": function (x) { return d3.time.format('%H')(x); },
      "mouseover": function (d, i) {
        var pos = $(this).offset();
        $(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
          .css({top: topOffset + pos.top, left: pos.left + leftOffset})
          .show();
      },
      "mouseout": function (x) {
        $(tt).hide();
      }
    };
    var myChart = new xChart('line-dotted', data, '#chart2', opts);

    $("#DailyChart").width(500);

  }());
}