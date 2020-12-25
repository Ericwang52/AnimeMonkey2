document.addEventListener('DOMContentLoaded', function(){
   document.getElementById("userform").addEventListener("submit", fetchData());
   //fetchData();
});

function fetchData(){

    console.log("awkgfaw");
    var username= document.getElementById("userform").elements[0].value;
    console.log(username);
    // console.log("huerdur");
    // chrome.runtime.sendMessage({user:username}, function(response){
    //     console.log("hurdur");
    //     x= response.test;
    //     console.log(x);
    // });
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
            console.log(req.responseText);
            console.log("response pog");
        }
    };

    req.onerror = function()
    {

    };

    req.send();
}