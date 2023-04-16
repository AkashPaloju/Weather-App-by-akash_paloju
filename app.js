var cityname=document.getElementById("cityname");
var subtn=document.getElementById("submit");
var city=document.getElementById("city");
var spant=document.getElementById("icon");
var sky=document.getElementById("sky");
var temp=document.getElementById("temp");
var wind=document.getElementById("wind");

function submit() {
    var inptxt=cityname.value;
    inptxt=inptxt.charAt(0).toUpperCase()+inptxt.slice(1);
    fetchdata(inptxt);
}
function fetchdata(inptxt) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inptxt+"&appid=9cf011922874f15b29e7b9001ab282ea")
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);
        if (data["message"]==="city not found") {
            alert("This city does not exist!")
        }
            displayData(data);
    }
    )
    .catch((error) => console.error(error));  
}

function displayData(data) {
    city.innerHTML=data.name;
    spant.innerHTML=data.weather[0].icon;
    if(temp.innerHTML==="Temperature:") {
        let tempK=data.main.temp;
        let tempC=tempK-273.15;
        temp.innerHTML+=tempC.toFixed(2)+" C ";
    } //if is used bcoz if user presses again "enter", temp and speed appears multiple times 
    if(wind.innerHTML==="Wind speed:") {
        wind.innerHTML+=data.wind.speed + " km/h ";
    }
}
function anonymous (e) {
    if(e.keyCode===13) { // 13-> enter key
        submit();
    }
}
subtn.addEventListener("click",submit);
cityname.addEventListener("keydown",anonymous);