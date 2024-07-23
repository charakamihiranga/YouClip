// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab URL contains "youtube.com"
  if (tab.url.includes("youtube.com/watch")) {
    console.log("YouTube tab detected:", tab.url);

    const queryPrameters = tab.url.split("?")[1];
    const urlParmeters = new URLSearchParams(queryPrameters);
    
    console.log(urlParmeters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId : urlParmeters.get("v")
    });


    
  }
});