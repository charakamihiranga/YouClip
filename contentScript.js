(() => {
  let youtubeLeftControles, youtubePlayer;
  let currentVideo = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type == "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmarkBtn")[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");
  
      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.style.height = "26px";
      bookmarkBtn.style.width = "32px";
      bookmarkBtn.style.marginLeft = "54%";
      bookmarkBtn.style.marginTop = "12px";  
      bookmarkBtn.style.cursor = "pointer";   
      bookmarkBtn.className = "ytp-button bookmarkBtn";
      bookmarkBtn.title = "Click to bookmark current timestamp";
  
      const youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      const youtubePlayer = document.getElementsByClassName("video-stream")[0];
  
      youtubeLeftControls.appendChild(bookmarkBtn);

      


      //hover styles for the bookmark button

      const style = document.createElement('style');
      style.innerHTML = `
          .bookmarkBtn:hover {
              transform: scale(1.2);
          }
      `;
      document.head.appendChild(style);

  }
  


  }

  newVideoLoaded();
})();
