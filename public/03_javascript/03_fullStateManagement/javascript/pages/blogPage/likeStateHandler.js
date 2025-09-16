import { appObserver, ObserverEvents } from "../../services/observer.js";
import {
  getLikeStatePerBlogPage,
  unlikeBlogPage,
  likeBlogPage,
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
let isInitialized = false;

function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    (data) => {
      currentUserId = data.userId;
      checkInitialization();
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    (data) => {
      blogPageId = data.blogPageId;
      isInitialized = false; // Reset bei neuer Seite
      checkInitialization();
    },
    true
  );
}

function checkInitialization() {
  // Nur einmal initialisieren wenn beide Werte gesetzt sind
  if (!isInitialized && blogPageId && currentUserId) {
    isInitialized = true;
    setLikeButtonState(currentUserId);
  }
}

function setLikeButtonState(currentUserId) {
  getLikeStatePerBlogPage(blogPageId, currentUserId).then((data) => {
    updateButtonUI(data.liked);
  });
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

export async function toggleBlogPageLike() {
  // Prüfe aktuellen Status nur einmal
  const currentState = await getLikeStatePerBlogPage(blogPageId, currentUserId);
  
  try {
    if (currentState.liked) {
      // Optimistisches UI-Update SOFORT
      updateButtonUI(false);
      appObserver.emit(ObserverEvents.BLOG_PAGE_UNLIKED, { 
        blogPageId, 
        userId: currentUserId 
      });
      
      // API-Call danach
      await unlikeBlogPage(blogPageId, currentUserId);
    } else {
      // Optimistisches UI-Update SOFORT
      updateButtonUI(true);
      appObserver.emit(ObserverEvents.BLOG_PAGE_LIKED, { 
        blogPageId, 
        userId: currentUserId 
      });
      
      // API-Call danach
      await likeBlogPage(blogPageId, currentUserId);
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    // Bei Fehler: Button-State wiederherstellen durch Rollback
    updateButtonUI(currentState.liked); // Zurück zum ursprünglichen State
    // Rollback des Counters
    if (currentState.liked) {
      appObserver.emit(ObserverEvents.BLOG_PAGE_LIKED, { 
        blogPageId, 
        userId: currentUserId 
      });
    } else {
      appObserver.emit(ObserverEvents.BLOG_PAGE_UNLIKED, { 
        blogPageId, 
        userId: currentUserId 
      });
    }
  }
}

function observeLikeEvents() {
  // Reagiere auf Like/Unlike Events und aktualisiere nur den Button-State
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_LIKED, () => {
    updateButtonUI(true); // Verwende zentrale UI-Update Funktion
  });
  
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_UNLIKED, () => {
    updateButtonUI(false); // Verwende zentrale UI-Update Funktion
  });
}

observeUserIdChange();
observeBlogPageIdChange();
observeLikeEvents();
