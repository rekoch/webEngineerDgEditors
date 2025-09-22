// Importiere die notwendigen Module und Funktionen
import "./buttons.js";
import "./tables.js";
import "./likeStateHandler.js";

/*
In dieser Datei wirst du alle notwendigen Initialisierungen für die Blog-Seite durchführen.
Dazu gehören das Beobachten von Änderungen der Blog-Seiten-ID und das Aktualisieren
des Like-Counters basierend auf Like/Unlike-Events.

Die Observer-Funktionalität ist bereits implementiert und reagiert auf die Events BLOG_PAGE_ID_CHANGED,
BLOG_PAGE_LIKED und BLOG_PAGE_UNLIKED.

Du wirst folgende Funktionen implementieren:
- Beobachten von Änderungen der Blog-Seiten-ID
- Initialisieren des Like-Counters, wenn sich die Blog-Seiten-ID ändert
- Aktualisieren des Like-Counters, wenn Like/Unlike-Events empfangen werden

Damit du die korrekten Daten laden kannst, steht dir die Funktion getLikesPerBlogPage(blogPageId) zur Verfügung,
die die Anzahl der Likes für die gegebene Blog-Seiten-ID zurückgibt.
*/

let blogPageId = 0;
function initBlogPage() {
  observeBlogPageIdChange();
  observeLikeCountChanges();
}

function observeBlogPageIdChange() {
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_ID_CHANGED, async (data) => {
    const newBlogPageId = data.blogPageId;
      blogPageId = newBlogPageId;
      console.log("Current Blog Page ID in blogPageMain:", blogPageId);
      // hier kannst du weitere Aktionen hinzufügen, die bei einer Änderung der Blog-Seiten-ID ausgeführt werden sollen
      // mit dem "true" als letzten Parameter wird das Event sofort mit dem letzten Wert ausgelöst
    }, true);
}

function observeLikeCountChanges() {
  // Reagiere auf Like/Unlike Events und aktualisiere den Counter
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_LIKED, (data) => {
    // hier kannst du den Counter aktualisieren, wenn die aktuelle Seite betroffen ist
    console.log("BLOG_PAGE_LIKED event received in blogPageMain:", data);
  });
  
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_UNLIKED, (data) => {
    // hier kannst du den Counter aktualisieren, wenn die aktuelle Seite betroffen ist
    console.log("BLOG_PAGE_UNLIKED event received in blogPageMain:", data);
  });
}

initBlogPage();