/*
Diese Datei soll ausschliesslich Funktionen bereitstellen, die die Button selbst betreffen.
Darum geht es hier nur um das Registrieren von Event-Listenern auf den Buttons.
Weitere Aktionen werden über Events oder Funktionen in anderen Dateien gehandhabt.

Am Schluss wirst du also nach und nach anstelle des notYetImplemented() die
jeweiligen Funktionen einfügen, die die Aktionen durchführen.
*/

import { appObserver, ObserverEvents } from "../../services/observer.js";

document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        appObserver.emit(ObserverEvents.LIKE_BUTTON_CLICKED);
        break;
      case "follow_author":
        notYetImplemented();
        break;
      case "follow_topic":
        notYetImplemented();
        break;

      default:
        console.warn(`Unbekannter Button-Typ: ${button.dataset.button}`);
    }
  });
});

function notYetImplemented() {
  console.warn("Diese Funktion ist noch nicht implementiert.");
}