import "./buttons.js";
import "./tables.js";
import {
  getLikesPerBlogPage
} from "../../services/blogPageLikes.js";
import "./likeStateHandler.js";

import { appObserver, ObserverEvents } from "../../services/observer.js";

let blogPageId = 0;

function initBlogPage() {
  observeBlogPageIdChange();
  observeLikeCountChanges();
}

let isCountLoaded = false;

function observeBlogPageIdChange() {
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_ID_CHANGED, (data) => {
    const newBlogPageId = data.blogPageId;
    
    // Nur laden wenn sich die blogPageId geändert hat
    if (blogPageId !== newBlogPageId) {
      blogPageId = newBlogPageId;
      isCountLoaded = false;
      
      // Lade initiale Like-Anzahl nur einmal beim Seitenwechsel
      getLikesPerBlogPage(blogPageId)
        .then((response) => {
          document.getElementById("data-like-counter").textContent = response.likeCount;
          isCountLoaded = true;
        })
        .catch((error) => {
          console.error("Error loading likes:", error);
        });
    }
  }, true);
}

function observeLikeCountChanges() {
  // Reagiere auf Like/Unlike Events und aktualisiere den Counter
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_LIKED, (data) => {
    // Nur aktualisieren wenn es die aktuelle Seite betrifft
    if (data.blogPageId === blogPageId && isCountLoaded) {
      const counterElement = document.getElementById("data-like-counter");
      const currentCount = parseInt(counterElement.textContent) || 0;
      counterElement.textContent = currentCount + 1;
    }
  });
  
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_UNLIKED, (data) => {
    // Nur aktualisieren wenn es die aktuelle Seite betrifft
    if (data.blogPageId === blogPageId && isCountLoaded) {
      const counterElement = document.getElementById("data-like-counter");
      const currentCount = parseInt(counterElement.textContent) || 0;
      counterElement.textContent = Math.max(0, currentCount - 1);
    }
  });
}

initBlogPage();