export let loggedInUserId = 1; // Simuliert einen eingeloggten User mit der ID 1
export const blogPageId = 37832; // Beispiel Blog-Seiten-ID

import { Observer, ObserverEvents } from "./services/observer.js";

// Globaler Observer für die App
export const appObserver = new Observer();

function initApp() {
  // Observable Properties mit Event-Typen definieren
  appObserver.defineObservableProperty("userId", loggedInUserId, ObserverEvents.USER_ID_CHANGED);
  appObserver.defineObservableProperty("blogPageId", blogPageId, ObserverEvents.BLOG_PAGE_ID_CHANGED);
}

initApp();