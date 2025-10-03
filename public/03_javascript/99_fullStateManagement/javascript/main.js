export let loggedInUserId = 1; // Simuliert einen eingeloggten User mit der ID 1
export const blogPageId = 37832; // Beispiel Blog-Seiten-ID

import { appObserver, ObserverEvents } from "./services/observer.js";
import "./pages/blogPage/blogPageMain.js";

function initApp() {
  // Initiale Werte setzen (werden als lastValues gespeichert)
  appObserver.emit(ObserverEvents.USER_ID_CHANGED, { userId: loggedInUserId });
  appObserver.emit(ObserverEvents.BLOG_PAGE_ID_CHANGED, { blogPageId: blogPageId });
}

initApp();