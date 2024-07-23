(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      currentBookmarks = currentBookmarks.filter((b) => b.time != value);
      chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentBookmarks) });
      response(currentBookmarks);
    }
  });

  const fetchBookMarks = () => {
    return new Promise((resolve, reject) => {
      if (!currentVideo) {
        resolve([]);
        return;
      }
      chrome.storage.sync.get([currentVideo], (obj) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmarkBtn")[0];
    try {
      currentBookmarks = await fetchBookMarks();
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      return;
    }

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

      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      if (youtubeLeftControls && youtubePlayer) {
        youtubeLeftControls.appendChild(bookmarkBtn);

        bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

        // Add hover styles for the bookmark button
        const style = document.createElement("style");
        style.innerHTML = `
          .bookmarkBtn:hover {
              transform: scale(1.2);
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  const addNewBookmarkEventHandler = async () => {
    if (!youtubePlayer) return;
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
    };

    try {
      currentBookmarks = await fetchBookMarks();
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      return;
    }

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  const getTime = (t) => {
    const date = new Date(0);
    date.setSeconds(t);
    return date.toISOString().substr(11, 8);
  };

  newVideoLoaded();
})();
