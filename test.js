totalCookieJSON = "";
totalWeblogJSON = "";
chrome.runtime.onStartup.addListener(function(tab) {
	console.log("hello");
	var timerID = setInterval(function() {
		chrome.cookies.getAll({},function (cookie){
			console.log("Before" + cookie.length);
			allCookieInfo = "";
	        for(var i=0;i<cookie.length;i++){
	            //console.log(JSON.stringify(cookie[i]));
	            allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
	        }
			localStorage.allCookieInfo = allCookieInfo;
			totalCookieJSON = totalCookieJSON + allCookieInfo;
			//console.log(totalcookiejson);
			
			

			for(var i=0; i<cookie.length;i++) {
      			//console.log(cookie[i]);

      			chrome.cookies.remove({url: "https://" + cookie[i].domain  + cookie[i].path, name: cookie[i].name});
				}
				
		}); 
		console.log("Done!");

	}, 60 * 1000);


	chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
		var string = JSON.stringify(details);
		var header = JSON.parse(string);
		totalWeblogJSON = totalWeblogJSON + string;
		console.log(string);
	}, {urls: ["<all_urls>"]}, ['requestHeaders', 'blocking']);
});	





chrome.browserAction.onClicked.addListener(function(){
	chrome.cookies.getAll({},function (cookie){
		
		var dataStr = "data:text/plain," + encodeURIComponent(JSON.stringify(totalCookieJSON));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "cookietotal.json");
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
		allcookieInfo = ""

		var dataStr2 = "data:text/plain," + encodeURIComponent(JSON.stringify(totalWeblogJSON));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr2);
		downloadAnchorNode.setAttribute("download", "weblogtotal.json");
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	});


	/*var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cookietotal.json");
    downloadAnchorNode.click();
	downloadAnchorNode.remove();/*
	
	/*
	totalweblogjson = [];
	totalcookiejson = [];*/
});
