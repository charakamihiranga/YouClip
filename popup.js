import { getActiveTabURL } from "./utils.js";

const viewBookmarks = (currentBookmarks=[] ) => {
  const bookMarksElement = document.getElementById("bookmarks");
  bookMarksElement.innerHTML = "";

  if (currentBookmarks.length > 0){
    for(let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookMarksElement, bookmark);
    }
  } else {
    bookMarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

        viewBookmarks(currentBookmarks)
        
    });
  }else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = '<div class="title">This is not a youtube video page</div>';
  }
});
