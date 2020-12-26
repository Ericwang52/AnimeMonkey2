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
   // var url= "https://api.jikan.moe/v3/user/"+username+"/animelist/watching";
    var url = "https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/users/"+username+"/animelist?status=watching&fields=list_status,broadcast";
    var req = new XMLHttpRequest;
    req.open("GET", url, true);
    req.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjMjU0ZjRmNzQ4YzQ5Y2VmNGE5YmJlZjZiYjdiNGNlMDdmN2E4MzZhN2EwNzVlODUwZTc0ZDAxYzQ5YjIwOGNjODI2ZDllZGU4MTZlNmFiIn0.eyJhdWQiOiI4MGM4NzZmNjBjMDZhY2NiNmI4ZGYwNjYxNjA2YmYzOSIsImp0aSI6ImJjMjU0ZjRmNzQ4YzQ5Y2VmNGE5YmJlZjZiYjdiNGNlMDdmN2E4MzZhN2EwNzVlODUwZTc0ZDAxYzQ5YjIwOGNjODI2ZDllZGU4MTZlNmFiIiwiaWF0IjoxNjA4Njc1Mjk2LCJuYmYiOjE2MDg2NzUyOTYsImV4cCI6MTYxMTM1MzY5Niwic3ViIjoiNjY1MjA4MCIsInNjb3BlcyI6W119.dbsOSO_NzAUSUv1u4oJQ5LB7hYdOBdfl6QvZqGXoSsRrNGSm7-MR0Df56DpOnHJr7RpaxOZ_G7Bur5hPSSqbTJhterCDSnVa9_jT_LhEIp4BSohDA59hwlb3hZP5B7h-uLu_ocVAHGO0Gs9YRXjz5v93s8VT321bKOhm3dzQY1YSXS1uwSoAorAVCP3DZ57DmCWcZVl6im6lM6q2pfXUrtkUbzv85DsNF6wqxot6etGBCbf0k8Or5bIS0IWywHUJ7MskY2nX4mLHwqkfffSNYzLyjw27s5c1GDkbt8QRPbdFQ95DJ4yKytPy32dxj1VsWtJSik0U3jzW52dgjnlb7w")
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
{   console.log(animedata.node.broadcast==undefined);
    if(animedata.node.broadcast!==undefined){

        var animediv = document.createElement("div");
        var anime= document.createElement("a");
        var day= animedata.node.broadcast.day_of_the_week;
        var time= animedata.node.broadcast.start_time;
        var animetime= document.createElement("b");
        animetime.innerHTML=day+time;
        anime.innerHTML= animedata.node.title;
        animediv.appendChild(anime);
        animediv.appendChild(animetime);
        document.getElementById("Upcoming").appendChild(animediv)
    
       // var request= {"day":day, "time":time};
       var request= {"day":"saturday", "time":"01:19"};
        chrome.runtime.sendMessage(request);
    }
    else{

    }

}