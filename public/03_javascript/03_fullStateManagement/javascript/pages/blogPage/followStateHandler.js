let currentUserId = 0;


function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    (data) => {
      currentUserId = data.userId;
      setLikeButtonState(currentUserId);
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    (data) => {
      blogPageId = data.blogPageId;
      setLikeButtonState(currentUserId);
      setLikeCounter();
    },
    true
  );
}