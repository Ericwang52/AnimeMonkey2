chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        var username= request.user;
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
                console.log(req.responseText);
                console.log("response sending");
                sendResponse({"test":"Is this even sending"});
            }
        };
    
        req.onerror = function()
        {
    
        };
    
        req.send();
        //return true;
    });

