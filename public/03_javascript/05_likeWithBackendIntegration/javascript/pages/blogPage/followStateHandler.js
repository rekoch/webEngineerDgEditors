/*
Diese Datei ist dafür zuständig, dass sämtliche Follow-Zustände (Autor folgen/nicht mehr folgen,
Thema folgen/nicht mehr folgen) korrekt gehandhabt werden.

Du wirst hier folgende Funktionen implementieren:
- Beobachten von Änderungen der Benutzer-ID und der Blog-Seiten-ID
- Initialisieren des Follow-Zustands für Autor und Themen, wenn sich die Blog-Seiten-ID ändert
- Umschalten des Follow-Zustands für Autor und Themen, wenn die entsprechenden Buttons geklickt werden
- Setzen des Button-Textes entsprechend dem aktuellen Follow-Zustand

Dazu wirst du die Observer-Funktionalität nutzen, um auf Änderungen der Benutzer-ID und der Blog-Seiten-ID zu reagieren.
Die Observer-Funktionen sind bereits implementiert und reagieren auf die Events USER_ID_CHANGED und BLOG_PAGE_ID_CHANGED.

Ausserdem wurden die Texte für die Buttons bereits definiert welche du verwenden kannst um den Button-Text entsprechend dem Follow-Zustand zu aktualisieren.
*/

const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";

import { appObserver, ObserverEvents } from "../../services/observer.js";

let currentUserId = 0;
let blogPageId = 0;

function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      console.log("Current User ID in followStateHandler:", currentUserId);
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
      console.log("Current Blog Page ID in followStateHandler:", blogPageId);
      // Hier kannst du weitere Aktionen hinzufügen, die bei einer Änderung der Blog-Seiten-ID ausgeführt werden sollen
    },
    true
  );
}


observeUserIdChange();
observeBlogPageIdChange();
