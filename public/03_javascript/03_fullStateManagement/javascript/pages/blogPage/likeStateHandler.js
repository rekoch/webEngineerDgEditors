import { appObserver, ObserverEvents } from "../../services/observer.js";
import {
  getLikeStatePerBlogPage,
  unlikeBlogPage,
  likeBlogPage,
  getLikesPerBlogPage,
} from "../../services/blogPageLikes.js";

const likePageText = "Dieser Artikel gefällt mir!";
const unlikePageText = "Dieser Artikel gefällt mir nicht mehr";

const filledHeart = document.createElement("span");
filledHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
 class="svg-icon"><path fill="#fff" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path></svg>`;
filledHeart.classList.add("mr-s");

const brokenHeart = document.createElement("span");
brokenHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
    class="svg-icon">
    <path fill="#000" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path>
    <polyline points="6,4 8,8 7,10 9,12" stroke="#fff" stroke-width="1" fill="none"/>
</svg>`;
brokenHeart.classList.add("mr-s");

const likeButton = document.querySelector("button[data-button='like_article']");

let blogPageId = 0;
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

function setLikeButtonState(userId) {
  if (blogPageId && userId) {
    getLikeStatePerBlogPage(blogPageId, userId)
      .then((response) => {
        updateButtonUI(response.liked);
      })
      .catch((error) => {
        console.error("Error loading like state:", error);
      });
  }
}

function setLikeCounter() {
  if (blogPageId) {
    getLikesPerBlogPage(blogPageId)
      .then((response) => {
        document.getElementById("data-like-counter").textContent =
          response.likeCount;
          document.getElementById("like-counter").classList.remove("invisible");
      })
      .catch((error) => {
        console.error("Error loading likes:", error);
      });
  }
}

function updateButtonUI(isLiked) {
  if (isLiked) {
    likeButton.classList.remove("primary");
    likeButton.innerHTML = unlikePageText;
    likeButton.prepend(brokenHeart.cloneNode(true));
  } else {
    likeButton.classList.add("primary");
    likeButton.innerHTML = likePageText;
    likeButton.prepend(filledHeart.cloneNode(true));
  }
}

function observeLikeEvents() {
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_LIKED, () => {
    updateButtonUI(true);
    setLikeCounter();
  });

  appObserver.subscribe(ObserverEvents.BLOG_PAGE_UNLIKED, () => {
    updateButtonUI(false);
    setLikeCounter();
  });
}

export async function toggleBlogPageLike() {
  const currentState = await getLikeStatePerBlogPage(blogPageId, currentUserId);

  try {
    if (currentState.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      appObserver.emit(ObserverEvents.BLOG_PAGE_UNLIKED, {
        blogPageId,
        userId: currentUserId,
      });
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      appObserver.emit(ObserverEvents.BLOG_PAGE_LIKED, {
        blogPageId,
        userId: currentUserId,
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
}

observeUserIdChange();
observeBlogPageIdChange();
observeLikeEvents();
