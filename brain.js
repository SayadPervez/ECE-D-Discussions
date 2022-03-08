window.onload = function(){ 
    func();
}



var weekdays = {
    0 : "Tuesday",
    1 : "Tuesday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"
}

var wdays = {
    0 : "Tuesday",
    1 : "Tuesday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"  
}

function dom(id_)
{
    return document.getElementById(id_);
}

function select_day()
{
    var temp = new Date();
    if(temp.getHours()>=15)
    {var today=(weekdays[(temp.getDay()+1)%7]).toLowerCase();console.log("ifififi")}
    else
    {var today=(weekdays[temp.getDay()]).toLowerCase();console.log("elseelseelse")}
    
    if(dom("Tuesday").checked)
        today = "Tuesday";
    else if(dom("Wednesday").checked)
        today = "Wednesday";
    else if(dom("Thursday").checked)
        today = "Thursday";
    else if(dom("Friday").checked)
        today = "Friday";
    else if(dom("Saturday").checked)
        today = "Saturday";

    console.log("Selected day is ",today);

    document.getElementById("nav-heading").innerText=`ECE D - ${today}`;
    readJson_forday(today.toLowerCase());
}

function func()
{
    var temp = new Date();
    if(temp.getHours()>=15)
      document.getElementById("nav-heading").innerText=`ECE D - ${wdays[(temp.getDay()+1)%7]}`;
    else
    document.getElementById("nav-heading").innerText=`ECE D - ${wdays[temp.getDay()]}`;
    readJson((weekdays[temp.getDay()]).toLowerCase());
}

//var dblink = "https://ece-d.glitch.me/db.json"
var dblink = "./db.json"

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

 function readJson_forday (day) {
    fetch(dblink)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return(response.json());
    })
    .then(json => {
        doStuffJson_forday(json,day);
    })
    .catch(function () {
        this.dataError = true;
    })
 }

function doStuffJson(jOb)
{
    var htmlString = ``;
    var temp = new Date();
    if(temp.getHours()>=15)
    {var today=(weekdays[(temp.getDay()+1)%7]).toLowerCase();console.log("ifififi")}
    else
    {var today=(weekdays[temp.getDay()]).toLowerCase();console.log("elseelseelse")}
    var periodList=jOb.days[today];
    //var periodList=jOb.days['saturday'];
    console.log(jOb);
    console.log(today);
    console.log(jOb.days[today]);
    for(var i=0; i<periodList.length;i++)
    {
      if(periodList[i][0]=="Break" || periodList[i][0]=="Lunch")
      {
        htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card card-yellow z-depth-4">
        <div class="card-content white-text">
            <span class="card-title black-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p class="white-text" style="font-size: large;font-weight:500;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
      }
      else if(periodList[i][0]=="Lab")
        {
                  htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card card-red z-depth-4">
        <div class="card-content white-text">
            <span class="card-title black-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p style="font-size: large;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
        }
      else
        {
                  htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card z-depth-4">
        <div class="card-content white-text">
            <span class="card-title yellow-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p style="font-size: large;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
        }
    }
    document.getElementById("fill-here").innerHTML=htmlString;
}

function doStuffJson_forday(jOb,today)
{
    var htmlString = ``;

    var periodList=jOb.days[today];
    //var periodList=jOb.days['saturday'];
    console.log(jOb);
    console.log(today);
    console.log(jOb.days[today]);
    for(var i=0; i<periodList.length;i++)
    {
      if(periodList[i][0]=="Break" || periodList[i][0]=="Lunch")
      {
        htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card card-yellow z-depth-4">
        <div class="card-content white-text">
            <span class="card-title black-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p class="white-text" style="font-size: large;font-weight:500;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
      }
      else if(periodList[i][0]=="Lab")
        {
                  htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card card-red z-depth-4">
        <div class="card-content white-text">
            <span class="card-title black-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p style="font-size: large;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
        }
      else
        {
                  htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card z-depth-4">
        <div class="card-content white-text">
            <span class="card-title yellow-text text-darken-4" style="font-weight: 500;">${periodList[i][0]}
                <p style="font-weight: 500;">${periodList[i][2]}</p>
            </span>
            <p style="font-size: large;">${periodList[i][1]}</p>
        </div>
        </div>
        </div>
        `
        }
    }
    document.getElementById("fill-here").innerHTML=htmlString;
}