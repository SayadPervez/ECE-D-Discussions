window.onload = function(){ 
    func();
}

weekdays = {
    0 : "Monday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Monday"
}

timeList=['9:00 AM','10:15 AM',"11:30 AM","1:30 PM","2:45 PM"]

function func()
{
    var temp = new Date();
    document.getElementById("nav-heading").innerText=`ECE D - ${weekdays[temp.getDay()]}`;
    readJson((weekdays[temp.getDay()]).toLowerCase());
}

var dblink = "https://rec-ece-d-discussions.glitch.me/db.json"

function readJson (day) {
    fetch(dblink)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return(response.json());
    })
    .then(json => {
        doStuffJson(json);
    })
    .catch(function () {
        this.dataError = true;
    })
 }


function doStuffJson(jOb)
{
    var htmlString = ``;
    var temp = new Date();
    var today=(weekdays[temp.getDay()]).toLowerCase()
    var periodList=jOb.days[today]
    console.log(jOb);
    console.log(today);
    console.log(jOb.days[today]);
    for(i=0; i<periodList.length;i++)
    {
        htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card z-depth-4" onclick="window.location.assign('${jOb.links[periodList[i][0]]}')">
        <div class="card-content white-text">
            <span class="card-title yellow-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p class="right-align" style="font-weight: 500;float:right">${timeList[i]}</p>
            </span>
            <p style="font-size: large;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
    }
    document.getElementById("fill-here").innerHTML=htmlString;
}