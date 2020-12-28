// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse){
//         var username= request.user;
//         console.log(username);
//         var url= "https://api.jikan.moe/v3/user/"+username+"/animelist/watching";
//         var req = new XMLHttpRequest;
//         req.open("GET", url, true);
    
//         req.onload = () =>
//         {
//             if (req.status != 200 && req.readyState != 1)
//             {
//                 console.log("error");
//             }
//             else
//             {
//                 data = JSON.parse(req.responseText);
//                 console.log(req.responseText);
//                 console.log("response sending");
//                 sendResponse({"test":"Is this even sending"});
//             }
//         };
    
//         req.onerror = function()
//         {
    
//         };
    
//         req.send();
//         //return true;
//     });

chrome.runtime.onMessage.addListener(
    function (req, send, sendResp){
        console.log(req);
        var day=0;
        switch (req.day) {
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
        var hour=req.time.substring(0, 2)-14;
        console.log(hour);
        var min=req.time.substring(3);
        var sec=10;
        var millisec=0;

        var d= new Date();
        d.setDate(d.getDate() +(day+7-d.getDay())%7);
        d.setHours(hour, min, sec, millisec);
        if(d.valueOf()<Date.now()){
            d.setDate(d.getDate()+7);
            console.log("nextweeking");
        }
        console.log(d.getDay());

        console.log(d.getDate());
        console.log(d.getHours());
        console.log(d.getMinutes());
        console.log(d.getSeconds());
        var x= d.valueOf();
        console.log(x);
        console.log(Date.now())
        console.log(req.title);

        chrome.alarms.create(req.title, {when: d.getTime()});
        chrome.alarms.getAll(function(list) { console.log(list); });
    }
)

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('Triggered');
    console.log(alarm.name);
    alert("anime");
    var opt= {type: 'basic', 
    iconUrl: './images/icon128.png', title: alarm.name, 
    message: 'animeeee', contextMessage: 'awfawf'}

    chrome.notifications.create('notify1', opt);
});