/*
Diese Datei ist dafür zuständig, dass sämtliche Like-Zustände (Page liked / disliked) korrekt gehandhabt werden.

Du wirst hier folgende Funktionen implementieren:
- Beobachten von Änderungen der Benutzer-ID und der Blog-Seiten-ID
- Initialisieren des Like-Zustands für die Seite, wenn sich die Blog-Seiten-ID ändert
- Umschalten des Like-Zustands für die Seite, wenn der entsprechende Button geklickt wird
- Setzen des Button-Textes entsprechend dem aktuellen Like-Zustand

Dazu wirst du die Observer-Funktionalität nutzen, um auf Änderungen der Benutzer-ID und der Blog-Seiten-ID zu reagieren.
Die Observer-Funktionen sind bereits implementiert und reagieren auf die Events USER_ID_CHANGED und BLOG_PAGE_ID_CHANGED.

Ausserdem wurden die Texte für die Buttons bereits definiert welche du verwenden kannst um den Button-Text entsprechend dem Like-Zustand zu aktualisieren.

Im Observer findest du zudem zwei weitere Events, die du verwenden kannst um den Like-Counter auf der Seite aktuell zu halten:
- BLOG_PAGE_LIKED
- BLOG_PAGE_UNLIKED
*/

import { appObserver, ObserverEvents } from "../../services/observer.js";

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
    async (data) => {
      currentUserId = data.userId;
      console.log("Current User ID in likeStateHandler:", currentUserId);
      // Hier kannst du weitere Aktionen hinzufügen, die bei einer Änderung der Benutzer-ID ausgeführt werden sollen
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      console.log("Current Blog Page ID in likeStateHandler:", blogPageId);
      // Hier kannst du weitere Aktionen hinzufügen, die bei einer Änderung der Blog-Seiten-ID ausgeführt werden sollen
    },
    true
  );
}


observeUserIdChange();
observeBlogPageIdChange();
observeLikeEvents();
