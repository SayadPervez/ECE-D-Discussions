window.onload = function(){ 
    func();
}



var weekdays = {
    0 : "Monday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"
}

var wdays = {
    0 : "Monday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"  
}

var timeList=['8 - 8:50 AM','8:50 - 9:40 AM','9:40 - 10 AM',"10 - 10:50 AM","10:50 - 11:40 AM","11:40 - 12:30 PM","12:30 - 1:20 PM","1:20 - 2:10 PM","2:10 - 2:25 PM","2:25 - 3:15 PM","3:15 - 4 PM"]

function func()
{
    var temp = new Date();
    document.getElementById("nav-heading").innerText=`ECE D - ${wdays[temp.getDay()]}`;
    readJson((weekdays[temp.getDay()]).toLowerCase());
}

var dblink = "https://ece-d.glitch.me/db.json"

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

 function red(x)
 {
     console.log("x:",x);
     if(x=="Elective 2" || x=="Elective 1")
     {
        if(localStorage.getItem(x)==null)
        {
            window.location.replace("/settings.html")
        }
        return(localStorage.getItem(x));
     }
     else{
         return(x);
     }
 }

function doStuffJson(jOb)
{
    var htmlString = ``;
    var temp = new Date();
    var today=(weekdays[temp.getDay()]).toLowerCase()
    if(temp.getHours()>16)
      {
        ;
      }
    else{
      console.log("me")
    }
    var periodList=jOb.days[today]
    //var periodList=jOb.days['monday']//
    console.log(jOb);
    console.log(today);
    console.log(jOb.days[today]);
    for(var i=0; i<periodList.length;i++)
    {
      if(periodList[i][0]=="Break" || periodList[i][0]=="Lunch")
      {
        htmlString+=`
        <div class="col s10 m10 l8 offset-s1 offset-m1 offset-l2">
        <div class="card card-red z-depth-4">
        <div class="card-content white-text">
            <span class="card-title black-text" style="font-weight: 500;">${periodList[i][0]}
            </span>
            <p class="black-text" style="font-size: large;">${periodList[i][1]}</p>
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
                <p style="font-weight: 500;">${timeList[i]}</p>
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
