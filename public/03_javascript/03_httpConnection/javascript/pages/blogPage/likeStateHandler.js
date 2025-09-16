import {Observer, ObserverEvents} from "../../services/observer.js";
const observer = new Observer();


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


const likeCounter = document.getElementById("data-like-counter");




function observeUserIdChange() {
  observer.subscribe(ObserverEvents.USER_ID_CHANGED, (newUserId) => {
    getLikeStatePerBlogPage(blogPageId, newUserId).then((data) => {
      if (data.liked) {
        
      } else {
        
      }
    });
  });
}

observeUserIdChange();