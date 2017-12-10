function testFunction() {
    console.log("test");
}

function ShowPictureData() {
	//console.log("test");
    var xhttp = new XMLHttpRequest();
    var url = "https://api.nasa.gov/planetary/apod?api_key=mFSo39uMFEC64nfFvvrIhB2KTU0WidIl5Gk7zK18";
    
    //console.log("y");
    xhttp.onreadystatechange = function() {
        //console.log("x");
        if (this.readyState == 4 && this.status == 200) {
            //console.log("z");
            var PictureInfo = JSON.parse(xhttp.responseText);
			
			
            //console.log("a");
            //console.log(PictureInfo.url);
            
			showPicture(PictureInfo);
        }
		else
		{
			showError();
		}
    };
	
    xhttp.open("GET", url, true);
    xhttp.send();
}
function showPicture(pictureInfoArray) {
	var Picture = document.getElementById('PictureOfTheDay');
	var Title = document.getElementById('PictureOfTheDayTitle');
	var Author = document.getElementById('PictureOfTheDayAuthor');
	var Description = document.getElementById('PictureOfTheDayDescription');
	
	Picture.innerHTML = "<img src=" + pictureInfoArray.url + "></img>";
	//Title.innerHTML = "" + pictureInfoArray.title + "";
	
	//console.log(pictureInfoArray.copyright);
	
	if(pictureInfoArray.copyright == "undefined")
	{
		Author.innerHTML = "Satelite picture";
	}
	else
	{
		Author.innerHTML = " " + pictureInfoArray.copyright + "";
	}
	
	Description.innerHTML = "" + pictureInfoArray.explanation + "";
}

function ShowLargeGraphInfo(GraphArray) {
	var lengte = Object.keys(GraphArray["near_earth_objects"]).length;
	var GraphInfoArray = [];
	
	CanvasJS.addColorSet("linecolor",
                [//colorSet Array

                "#0b3d91"               
                ]);
	
	//console.log(GraphArray);
	var Keys = Object.keys(GraphArray["near_earth_objects"]);
	
	for(key in Keys){
		//console.log(Keys);
		//console.log(GraphArray["near_earth_objects"][Keys[key]]);
		GraphInfoArray.push({label: Keys[key],  y:GraphArray["near_earth_objects"][Keys[key]].length});
	}
	
	GraphInfoArray.sort();
	//console.log(GraphInfoArray);
	
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		colorSet: "linecolor",
		theme: "light2", // "light2", "dark1", "dark2"
		backgroundColor: 'transparent',
		data: [
		{
			// Change type to "column", "line", "bar", "area", "spline", "pie",etc.
			type: "line",
			dataPoints: GraphInfoArray
		}]
	});
	chart.render();
}
function GetGraphInfo() {	
	//console.log("test");
    var xhttp = new XMLHttpRequest();
	
	var dateNow = new Date();
	var endDays = dateNow.getDate();
	var month = dateNow.getMonth();
	month = month + 1;
	
	var year = dateNow.getYear();
	
	year = 1900 + year;
	
	var startyear = 0;
	var startMonth = 0;
	
	if(endDays <= 7)
	{
		if(month == 1)
		{
			startMonth = 12;
			
			startyear = year - 1;
		}
		else
		{
			startMonth = month - 1;
			
			startyear = year;
		}
		
		startDays = 30 - (7-endDays);
	}
	else
	{
		startDays = endDays - 7;
		startMonth = month;
		startyear = year;
	}
	
	//console.log(dateNow.getDate());
	
	
	
    var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startyear+"-"+startMonth+"-"+startDays+"&end_date="+year+"-"+month+"-"+endDays+"&detailed=true&api_key=mFSo39uMFEC64nfFvvrIhB2KTU0WidIl5Gk7zK18";
    
    //console.log("y");
    xhttp.onreadystatechange = function() {
        //console.log("x");
        if (this.readyState == 4 && this.status == 200) {
            //console.log("z");
            var GraphInfo = JSON.parse(xhttp.responseText);
            //console.log(Object.keys(GraphInfo["near_earth_objects"]).length);
			//Object.keys(GraphInfo["near_earth_objects"]).length;
			ShowLargeGraphInfo(GraphInfo);
        }
    };
	
    xhttp.open("GET", url, true);
    xhttp.send();
}


function GetWeekAstroidsArray(Week, PieChart) {
    var xhttp = new XMLHttpRequest();
	
	var dateNow = new Date();
	var endDays = dateNow.getDate();
	var month = dateNow.getMonth();
	month = month + 1;
	
	var year = dateNow.getYear();
	
	year = 1900 + year;
	
	endDays = endDays - (Week * 7) - (Week * 1);
	
	var startyear = 0;
	var startMonth = 0;
	
	if(endDays <= 0)
	{
		endDays = 30 + endDays;
		//console.log("DAYZZZZZ");
		//console.log(endDays)
		
		if(month == 1)
		{
			month = 12;
			
			year = year - 1;
		}
		else
		{
			month = month - 1;
			
			year = year;
		}
	}

	if(endDays <= 7)
	{
		if(month == 1)
		{
			startMonth = 12;
			
			startyear = year - 1;
		}
		else
		{
			startMonth = month - 1;
			
			startyear = year;
		}
		
		startDays = 30 - (7-endDays);
	}
	else
	{
		startDays = endDays - 7;
		startMonth = month;
		startyear = year;
	}
	
    var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startyear+"-"+startMonth+"-"+startDays+"&end_date="+year+"-"+month+"-"+endDays+"&detailed=true&api_key=mFSo39uMFEC64nfFvvrIhB2KTU0WidIl5Gk7zK18";
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var GraphInfo = JSON.parse(xhttp.responseText);
			var teller = 0;
			//console.log("ARRAY");
			//console.log(GraphInfo);
			
			
			//console.log(GraphArray["near_earth_objects"]);
			var Keys = Object.keys(GraphInfo["near_earth_objects"]);
			//console.log("TESTEN");
			
			for(key in Keys){
				//console.log(Keys);
				//console.log(GraphArray["near_earth_objects"][Keys[key]]);
				teller += GraphInfo["near_earth_objects"][Keys[key]].length;
			}
			//console.log(teller);
			
			
			//console.log(PieChart);
			var length = PieChart.options.data[0].dataPoints.length;
			//PieChart.options.title.text = "week " + Week;
			if(Week == 0)
			{
				PieChart.options.data[0].dataPoints.push({label: "This week",  y: teller});
			}
			else
			{
				PieChart.options.data[0].dataPoints.push({label: "Week " + Week,  y: teller});
			}
			
			PieChart.render();
        }
    };
	
    xhttp.open("GET", url, true);
    xhttp.send();
}
function GetFullAstroidsDataArray() {
	var ArrayData = 0;
	var teller = 0;
	
	CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#2F4F4F",
                "#38B575",
                "#2F4F4F",
                "#38B575"                
                ]);
	
	var Piechart = new CanvasJS.Chart("chartPieContainer", {
        animationEnabled: true,
		colorSet: "greenShades",
		theme: "light2", // "light2", "dark1", "dark2"
		backgroundColor: 'transparent',
		data: [{
			// Change type to "column", "line", "bar", "area", "spline", "pie",etc.
			type: "doughnut",
			dataPoints: []
		}]
	});
	Piechart.render();
	
	
	ArrayData = GetWeekAstroidsArray(0, Piechart);
	ArrayData = GetWeekAstroidsArray(1, Piechart);
	ArrayData = GetWeekAstroidsArray(2, Piechart);
	ArrayData = GetWeekAstroidsArray(3, Piechart);
}


function GetWeekHazardousAsteroidsArray(Week, PieChart) {
    var xhttp = new XMLHttpRequest();
	
	var dateNow = new Date();
	var endDays = dateNow.getDate();
	var month = dateNow.getMonth();
	month = month + 1;
	
	var year = dateNow.getYear();
	
	year = 1900 + year;
	
	endDays = endDays - (Week * 7) - (Week * 1);
	
	var startyear = 0;
	var startMonth = 0;
	
	if(endDays <= 0)
	{
		endDays = 30 + endDays;
		//console.log("DAYZZZZZ");
		//console.log(endDays)
		
		if(month == 1)
		{
			month = 12;
			
			year = year - 1;
		}
		else
		{
			month = month - 1;
			
			year = year;
		}
	}

	if(endDays <= 7)
	{
		if(month == 1)
		{
			startMonth = 12;
			
			startyear = year - 1;
		}
		else
		{
			startMonth = month - 1;
			
			startyear = year;
		}
		
		startDays = 30 - (7-endDays);
	}
	else
	{
		startDays = endDays - 7;
		startMonth = month;
		startyear = year;
	}
	
    var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startyear+"-"+startMonth+"-"+startDays+"&end_date="+year+"-"+month+"-"+endDays+"&detailed=true&api_key=mFSo39uMFEC64nfFvvrIhB2KTU0WidIl5Gk7zK18";
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var GraphInfo = JSON.parse(xhttp.responseText);
			var teller = 0;
			//console.log("ARRAY");
			//console.log(GraphInfo);
			
			
			//console.log(GraphArray["near_earth_objects"]);
			var Keys = Object.keys(GraphInfo["near_earth_objects"]);
			//console.log(GraphInfo["near_earth_objects"]);
			
			for(key in Keys){
				//teller += GraphInfo["near_earth_objects"][Keys[key]].length;
				//console.log(GraphInfo["near_earth_objects"][Keys[key]]);
				var Dates = Object.keys(GraphInfo["near_earth_objects"][Keys[key]]);
				
				for(date in Dates){
					//console.log(GraphInfo["near_earth_objects"][Keys[key]][Dates[date]]["is_potentially_hazardous_asteroid"]);
					
					if(GraphInfo["near_earth_objects"][Keys[key]][Dates[date]]["is_potentially_hazardous_asteroid"] == true)
					{
						teller += 1;
					}
				}
			}
			//console.log(teller);
			
			
			//console.log(PieChart);
			var length = PieChart.options.data[0].dataPoints.length;
			//PieChart.options.title.text = "week " + Week;
			if(Week == 0)
			{
				PieChart.options.data[0].dataPoints.push({label: "This week",  y: teller});
			}
			else
			{
				PieChart.options.data[0].dataPoints.push({label: "Week " + Week,  y: teller});
			}
			
			PieChart.render();
        }
    };
	
    xhttp.open("GET", url, true);
    xhttp.send();
}
function GetFullHazardousAsteroidsDataArray() {
	var ArrayData = 0;
	var teller = 0;
	
	CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#2F4F4F",
                "#38B575",
                "#2F4F4F",
                "#38B575"                
                ]);
	
	var Piechart = new CanvasJS.Chart("chartPieHazerdousContainer", {
        animationEnabled: true,
		colorSet: "greenShades",
		theme: "light2", // "light2", "dark1", "dark2"
		backgroundColor: 'transparent',
		data: [{
			// Change type to "column", "line", "bar", "area", "spline", "pie",etc.
			type: "doughnut",
			dataPoints: []
		}]
	});
	Piechart.render();
	
	
	ArrayData = GetWeekHazardousAsteroidsArray(0, Piechart);
	ArrayData = GetWeekHazardousAsteroidsArray(1, Piechart);
	ArrayData = GetWeekHazardousAsteroidsArray(2, Piechart);
	ArrayData = GetWeekHazardousAsteroidsArray(3, Piechart);
}



function showError() {
	var Picture = document.getElementById('PictureOfTheDay');
	Picture.innerHTML = '<img src="./assets/images/apod1.jpg"></img>';
			
	var PictureInfo = document.getElementById('PictureOfTheDayAuthor');
	//console.log(PictureInfo);
	PictureInfo.innerHTML = "PICTURE NOT FOUND";
}


document.addEventListener('DOMContentLoaded', function ()
{
    //testFunction();
    ShowPictureData();
	GetGraphInfo();
	GetFullAstroidsDataArray();
	GetFullHazardousAsteroidsDataArray();
});


$(document).ready(function () {
	$('#fullpage').fullpage({
		anchors: ['firstPage', 'secondPage'],
		slidesNavPosition: 'top',
		
		afterLoad: function(anchorLink, index){
			var loadedSection = $(this);
			//alert("Section 2 ended loading");
			//using anchorLink
			if(index == 2){
				$('#section0').hide();
				$.fn.fullpage.silentMoveTo('firstPage', 1);
			}
		}
	});
});