var usageArray = new Array();

var indexToNameMap = new Array();
var nameToIndexMap = new Array();

var numPills = 0;

function DrawDonut()
{
  var total = 0;
  for (var i = 0; i < usageArray.length; i++)
    total += +usageArray[i];

  var dataObj = new Array();
  for (var i = 0; i < usageArray.length ; i++)
  {
    var currObj = new Array();
    
    currObj["label"] = nameToIndexMap[i];
    currObj["value"] = Math.round(+usageArray[i] / +total * 1000)/10;
    dataObj.push(currObj);
  } 
  
  Morris.Donut({
        element: 'hero-donut',
        data: /*[
          {label: 'Advil', value: +AdvilUsage/+total*100 },
          {label: 'Tylenol White', value: +TylenolUsage/+total*100 },
          {label: 'Morphene', value: +MorphUsage/+total*100 },
          {label: 'Bees', value: +BeesUsage/+total*100 },
          {label: 'Adderall', value: +AdderallUsage/+total*100 }
        ]*/dataObj,
          colors: ['#41cac0', '#49e2d7', '#34a39b'],
        formatter: function (y) { return y + "%" }
      });
}

var Script = function () {

    //morris chart

    $(function () {
      // data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type
      /*var tax_data = [
           {"period": "2011 Q3", "licensed": 3407, "sorned": 660},
           {"period": "2011 Q2", "licensed": 3351, "sorned": 629},
           {"period": "2011 Q1", "licensed": 3269, "sorned": 618},
           {"period": "2010 Q4", "licensed": 3246, "sorned": 661},
           {"period": "2009 Q4", "licensed": 3171, "sorned": 676},
           {"period": "2008 Q4", "licensed": 3155, "sorned": 681},
           {"period": "2007 Q4", "licensed": 3226, "sorned": 620},
           {"period": "2006 Q4", "licensed": 3245, "sorned": null},
           {"period": "2005 Q4", "licensed": 3289, "sorned": null}
      ];
      Morris.Line({
        element: 'hero-graph',
        data: tax_data,
        xkey: 'period',
        ykeys: ['licensed', 'sorned'],
        labels: ['Licensed', 'Off the road'],
        lineColors:['#8075c4','#6883a3']
      });*/
  
      //Get all of the pills
      //Get all of the counts of each

       $.ajax({
            type: "GET",
            url: "../UsageBridge.php",
            data:{GetUniquePills:"True"},
            success: function(msg)
            {
              var inventoryTotal = JSON.parse(msg);

              numPills = inventoryTotal.length;
              //Get number of pills
              for (var i = 0; i < numPills; i++)
                usageArray.push(-1);

              for (var i = 0; i < numPills; i++)
              {
                var pill = inventoryTotal[i];

                indexToNameMap[pill.PillName] = i;
                nameToIndexMap[i] = pill.PillName;

                $.ajax({
                    type: "GET",
                    url: "../UsageBridge.php",
                    data:{QueryByPill:true,
                          pillname:pill.PillName
                          },
                    success: function(msg)
                    {
                      msg = JSON.parse(msg);
                        var usageIndex = indexToNameMap[msg['name']];

                        console.log(usageIndex);

                        usageArray[usageIndex] = msg['count'];

                        var noNegOne = true;
                        for (var i = 0; i < numPills; i++)
                        {
                          if (usageArray[i] == -1)
                            noNegOne = false;
                        }

                        if (noNegOne)
                          DrawDonut();
                    
                    },
                    error: function(jqXHR, textStatus, errorThrown) 
                    {
                      alert("failed" + jqXHR + textStatus + errorThrown);
                    }
                });
              }
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
              alert("failed" + jqXHR + textStatus + errorThrown);
            }

            });
      //} 


      /*Morris.Area({
        element: 'hero-area',
        data: [
          {period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
          {period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
          {period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
          {period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
          {period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
          {period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
          {period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
          {period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
          {period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
          {period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
        ],

          xkey: 'period',
          ykeys: ['iphone', 'ipad', 'itouch'],
          labels: ['iPhone', 'iPad', 'iPod Touch'],
          hideHover: 'auto',
          lineWidth: 1,
          pointSize: 5,
          lineColors: ['#4a8bc2', '#ff6c60', '#a9d86e'],
          fillOpacity: 0.5,
          smooth: true
      });

      Morris.Bar({
        element: 'hero-bar',
        data: [
          {device: 'iPhone', geekbench: 136},
          {device: 'iPhone 3G', geekbench: 137},
          {device: 'iPhone 3GS', geekbench: 275},
          {device: 'iPhone 4', geekbench: 380},
          {device: 'iPhone 4S', geekbench: 655},
          {device: 'iPhone 5', geekbench: 1571}
        ],
        xkey: 'device',
        ykeys: ['geekbench'],
        labels: ['Geekbench'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        barColors: ['#6883a3']
      });

      new Morris.Line({
        element: 'examplefirst',
        xkey: 'year',
        ykeys: ['value'],
        labels: ['Value'],
        data: [
          {year: '2008', value: 20},
          {year: '2009', value: 10},
          {year: '2010', value: 5},
          {year: '2011', value: 5},
          {year: '2012', value: 20}
        ]
      });

      $('.code-example').each(function (index, el) {
        eval($(el).text());
      });*/
    });

}();




