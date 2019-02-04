chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  var i;
  var string = JSON.stringify(details);
  var header = JSON.parse(string);
  //console.log(header);
  console.log("frameId: " + header.frameId);
  console.log("method: " + header.method);
  console.log("parentFrameId: " + header.parentFrameId);
  console.log("requestId: " + header.requestId);
  console.log("tabId: " + header.tabId);
  console.log("date: " + Date());
  console.log("type: " + header.type);
  console.log("url: " + header.url);

  var orChecker = 0;
  var refChecker = 0;

  for(i = 0; i < header.requestHeaders.length; i++)
  {
    // switch(header.requestHeaders[i].name)
    // {
    //     case "User-Agent":
    //           console.log("User-Agent: " + header.requestHeaders[i].value); 
    //           break;
    //     case "Accept":
    //           console.log("Accept: " + header.requestHeaders[i].value); 
    //           break;
    //     case "Origin":
    //           console.log("Origin: " + header.requestHeaders[i].value); 
    //           break;
    //     case "Referer":
    //           console.log("Referer: " + header.requestHeaders[i].value); 
    //           break;
    //     // default:
    //     //       console.log("Origin: ");
    //     //       console.log("Referer: ");
    //   }

            if(header.requestHeaders[i].name === "Origin"){
                  console.log("Origin: " + header.requestHeaders[i].value);
                  orChecker = 1;
            } 

            if(header.requestHeaders[i].name === "User-Agent"){
                  console.log("User-Agent: " + header.requestHeaders[i].value);
            }

            if(header.requestHeaders[i].name === "Accept" || header.requestHeaders[i].name === "accept"){
                  console.log("Accept: " + header.requestHeaders[i].value);
            }        

            if(header.requestHeaders[i].name === "Referer"){
                  console.log("Referer: " + header.requestHeaders[i].value);
                  refChecker = 1;
            } 

  }
    
  console.log(string);

        if(orChecker === 0 && refChecker === 1){
              console.log("Origin: /");
        }

        if(refChecker === 0 && orChecker === 1){
              console.log("Referer: /");
        }

        if(refChecker === 0 && orChecker === 0){
              console.log("Origin: /");
              console.log("Referer: /");
        }

  
  // blockingResponse = {};
  

  // blockingResponse.requestHeaders = headers;
  // return blockingResponse;
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']); 
