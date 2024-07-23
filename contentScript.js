(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type == "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const fetchBookMarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmarkBtn")[0];
    currentBookmarks = await fetchBookMarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.style.height = "26px";
      bookmarkBtn.style.width = "32px";
      bookmarkBtn.style.marginLeft = "52%";
      bookmarkBtn.style.marginTop = "12px";
      bookmarkBtn.style.cursor = "pointer";
      bookmarkBtn.className = "ytp-button bookmarkBtn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkBtn);

      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

      //hover styles for the bookmark button
      const style = document.createElement("style");
      style.innerHTML = `
          .bookmarkBtn:hover {
              transform: scale(1.2);
          }
      `;
      document.head.appendChild(style);
    }
  };

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookMark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
    };

    currentVideoBookMarks = await fetchBookMarks();

    console.log(newBookMark);

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentBookmarks, newBookMark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};
