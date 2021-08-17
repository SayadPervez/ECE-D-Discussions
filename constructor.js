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

function func()
{
    var temp = new Date('August 19, 1975 23:15:30');
    document.getElementById("nav-heading").innerText=`ECE D - ${weekdays[temp.getDay()]}`;
}