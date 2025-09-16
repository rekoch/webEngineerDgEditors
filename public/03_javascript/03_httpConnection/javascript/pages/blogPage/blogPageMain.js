import "./buttons.js";
import "./tables.js";
import {
  getLikesPerBlogPage,
  getLikeStatePerBlogPage,
} from "../../services/blogPageLikes.js";

import { Observer, ObserverEvents } from "../../services/observer.js";
const observer = new Observer();

function initBlogPage() {
  observeUserIdChange();
  observeBlogPageIdChange();
}

function observeUserIdChange() {
  observer.subscribe(ObserverEvents.USER_ID_CHANGED, (newUserId) => {
    getLikeStatePerBlogPage(blogPageId, newUserId).then((data) => {
       document.getElementById("data-like-counter").textContent = data.likeCount;
    });
  });
}

function observeBlogPageIdChange() {
  observer.subscribe(ObserverEvents.BLOG_PAGE_ID_CHANGED, (newBlogPageId) => {
    getLikesPerBlogPage(newBlogPageId)
      .then((data) => {
        document.getElementById("data-like-counter").textContent = data.likeCount;
      })
      .catch((error) => {
        console.error("Error loading likes:", error);
      });
  });
}

initBlogPage();
