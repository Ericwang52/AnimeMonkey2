document.addEventListener('DOMContentLoaded', function(){
   document.getElementById("userform").addEventListener("submit", fetchData, false);
   //fetchData();
});

function fetchData(event){
    event.preventDefault();
    event.target.value="";
    var username= document.getElementById("username").value;
    document.getElementById("username").value="";
    console.log(username);
    var url= "https://api.jikan.moe/v3/user/"+username+"/animelist/watching";
    var req = new XMLHttpRequest;
    req.open("GET", url, true);

    req.onload = () =>
    {
        if (req.status != 200 && req.readyState != 1)
        {
            console.log("error");
        }
        else
        {
            data = JSON.parse(req.responseText);
            data.anime.forEach(display);
        }
    };

    req.onerror = function()
    {

    };

    req.send();
}
function display(animedata)
{   

    var animediv = document.createElement("div");
    var anime= document.createElement("a");
    anime.innerHTML= animedata.title;
    animediv.appendChild(anime);
    document.getElementById("Upcoming").appendChild(animediv)
}