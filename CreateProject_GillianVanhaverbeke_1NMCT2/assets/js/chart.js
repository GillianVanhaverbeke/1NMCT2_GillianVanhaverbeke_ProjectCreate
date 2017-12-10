function ShowLargeGraph()
{
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light2", "dark1", "dark2"
        backgroundColor: 'transparent' ,
        data: [
            {
                // Change type to "column", "line", "bar", "area", "spline", "pie",etc.
                type: "line",
                dataPoints: [
                    { label: "2013",  y: 10  },
                    { label: "2014", y: 15  },
                    { label: "2015", y: 25  },
                    { label: "2016",  y: 30  },
                    { label: "2017",  y: 28  }
                ]
            }
        ]
    });
    chart.render();
}

document.addEventListener('DOMContentLoaded', function ()
{
    ShowLargeGraph();
});