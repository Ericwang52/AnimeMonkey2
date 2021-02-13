document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.sync.get("username",function (result){
        console.log(result.username);
        if(result.username==undefined){
            document.getElementById("userform").addEventListener("submit", setCookie, false);
        }else{
            document.getElementById("userform").remove();
            var x = result.username;
            fetchData(x); 
        }
    });
    // if(document.cookie==""){
    //     document.getElementById("userform").addEventListener("submit", setCookie, false);
    // }else{
    //     document.getElementById("userform").remove();
    //     var x = getCookie("username");
    //     fetchData(x);
        
    // }
    //console.log(document.cookie=="");


   //fetchData();
});

function fetchData(username){
 //   event.preventDefault();
  //  event.target.value="";
 //   var username= document.getElementById("username").value;
  //  document.getElementById("username").value="";
   // console.log(username);
   // console.log(document.cookie);
   // var url= "https://api.jikan.moe/v3/user/"+username+"/animelist/watching";
    var url = "https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/users/"+username+"/animelist?status=watching&fields=list_status,broadcast,status";
    var req = new XMLHttpRequest;
    req.open("GET", url, true);
    req.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZmNDYzYmU4NDdlN2FlYzZmMTk2NWQxODI1YmVlMzVhY2U5OTIyNjQ3YWNmYmUwZmIyZTE2NDc3YzVmYzdhMjE5OTVkMGI3NTU5YzBlNWU2In0.eyJhdWQiOiI4MGM4NzZmNjBjMDZhY2NiNmI4ZGYwNjYxNjA2YmYzOSIsImp0aSI6IjZmNDYzYmU4NDdlN2FlYzZmMTk2NWQxODI1YmVlMzVhY2U5OTIyNjQ3YWNmYmUwZmIyZTE2NDc3YzVmYzdhMjE5OTVkMGI3NTU5YzBlNWU2IiwiaWF0IjoxNjEzMjQxMTU0LCJuYmYiOjE2MTMyNDExNTQsImV4cCI6MTYxNTY2MDM1NCwic3ViIjoiNjY1MjA4MCIsInNjb3BlcyI6W119.cSAyCrhZp0BH8LJ0gQFPpf-0MS-ssaTJBHAuVwS7XrSduh43VzEZtpJ3p5zxUTqMV9nDIa0aTYg_plk73Pbh5mkFNaTzv8si1bSB-IjQsYFDyRN6LWd8JtQW8Ytja68x7rlgv7USVGgUVxayP0yovWJQWNBH1k7C5VmFFtUD5_qNR7LRWTyZcu2XzdNYfq1oJo5QHN-Z6911r4TeMdOUHvH1UY8vW-sf0KXvRZxdGwh2iVTOk4NWp-i_ff5iE_bcQKAbIAndFXhQ_B8_Ye0WvaQ8XEqSdgOCoHydZ62faV2LIZWot4QRr_9VGDdn61usUixlAmEcnTkpv5ZtuItgEw")
    req.onload = () =>
    {
        if (req.status != 200 && req.readyState != 1)
        {
            console.log("error");
        }
        else
        {
            dataa = JSON.parse(req.responseText);
            console.log(req.responseText);
            dataa.data.forEach(display);
        }
    };

    req.onerror = function()
    {

    };

    req.send();
}
function display(animedata)
{  // console.log(animedata.node.broadcast==undefined);
    if(animedata.node.broadcast!==undefined && animedata.node.status==="currently_airing"){

        var animediv = document.createElement("div");
        animediv.classList.add("anime");
        var anime= document.createElement("a");
        anime.href= "https://4anime.to/anime/"+ animedata.node.title.replaceAll(" ", "-");
        anime.target="_blank";
        var day= animedata.node.broadcast.day_of_the_week;
        var time= animedata.node.broadcast.start_time;
        var animetime= document.createElement("b");
        var picture=document.createElement("img");
        picture.src=animedata.node.main_picture.medium;
        animetime.innerHTML=timezone(day, time);
        var title = document.createElement("p");
        title.innerHTML= animedata.node.title;
        //anime.innerHTML= animedata.node.title;
        anime.appendChild(title);
        anime.appendChild(picture);
        animediv.appendChild(anime);
        animediv.appendChild(animetime);
       // animediv.appendChild(picture);
        document.getElementById("Upcoming").appendChild(animediv)
    
       // var request= {"day":day, "time":time};
       var request= {"day":day, "time":time, "title":animedata.node.title};
        chrome.runtime.sendMessage(request);
    }
    else{

    }

}
function timezone(date, time){
    var day=0;
    switch (date) {
        case "sunday":
          day = 0;
          break;
        case "monday":
          day = 1;
          break;
        case "tuesday":
           day = 2;
          break;
        case "wednesday":
          day = 3;
          break;
        case "thursday":
          day = 4;
          break;
        case "friday":
          day = 5;
          break;
        case "saturday":
          day = 6;
      }
      var hour=time.substring(0, 2)-14;
      var min=time.substring(3);
      var sec=0;
      var millisec=0;
      var d= new Date();
      d.setDate(d.getDate() +(day+7-d.getDay())%7);
      d.setHours(hour, min, sec, millisec);
      switch(d.getDay()){
        case 0:
            day = "Sunday";
            break;
          case 1:
            day = "Monday";
            break;
          case 2:
             day = "Tuesday";
            break;
          case 3:
            day = "Wednesday";
            break;
          case 4:
            day = "Thursday";
            break;
          case 5:
            day = "Friday";
            break;
          case 6:
            day = "Saturday";
      }
      var minutes= "";
      if (Math.floor(d.getMinutes()/10)==0){
        minutes="0" + d.getMinutes();
      }
      else{
          minutes=d.getMinutes();
      }
      return day+" "+ d.getHours() + ":"+ minutes;

}
function setCookie(event) {
    event.preventDefault();
    event.target.value="";
    var username= document.getElementById("username").value;
    document.getElementById("userform").remove(); // this should remove the thing
    chrome.storage.sync.set({"username": username}, function() {
        console.log('Value is set to ' + username);
      });
    //console.log(username);
    var d = new Date();
    var cname="username";
    var cvalue= username;

    var d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    document.cookie = cname + "=" + cvalue + ";";
   // console.log(document.cookie);
    fetchData(username);

  }
  
//   function getCookie(cname, callback) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         var x= c.substring(name.length, c.length);
//         console.log(callback(x));
//       }
//     }
//     console.log("rip");

//   }
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }