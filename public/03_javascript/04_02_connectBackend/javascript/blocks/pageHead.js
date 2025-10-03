import { appObserver, ObserverEvents } from "../services/observer.js";

/* 
  Ermöglicht das Ändern der User ID im Header-Bereich.
  - Klick auf die User ID blendet ein Eingabefeld ein
  - Nach 2 Sekunden Inaktivität oder Enter-Taste wird die Änderung gespeichert
  - Ein Event wird ausgesendet, das andere Komponenten abonnieren können

  Damit können andere Komponenten auf User ID Änderungen reagieren und ihren Zustand anpassen.

  Observer siehe services/observer.js
*/


function handleUserIdChange() {
    const userIdReadonly = document.getElementById('userIdReadonly');
    const userIdSet = document.getElementById('userIdSet');
    const newUserIdInput = document.getElementById('new-user-id');

    userIdReadonly.addEventListener('click', function() {
        userIdReadonly.classList.add('invisible');
        userIdSet.classList.remove('invisible');
    });

    let saveTimeout;
    newUserIdInput.addEventListener('input', function(e) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
            const newUserId = newUserIdInput.value;
            userIdReadonly.classList.remove('invisible');
            userIdSet.classList.add('invisible');
            appObserver.emit(ObserverEvents.USER_ID_CHANGED, { userId: newUserId });
        }, 2000); // waits 2 seconds after user stops typing
    });

    newUserIdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            clearTimeout(saveTimeout);
            const newUserId = newUserIdInput.value;
            userIdReadonly.classList.remove('invisible');
            userIdSet.classList.add('invisible');
            appObserver.emit(ObserverEvents.USER_ID_CHANGED, { userId: newUserId });
        }
    });
}

function observeUserIdChange() {
  appObserver.subscribe(ObserverEvents.USER_ID_CHANGED, (data) => {
    const userIdElement = document.getElementById('data-user-id');
    if (userIdElement) {
      userIdElement.textContent = data.userId;
    }
  });
}

// Error-sichere Initialisierung
try {
  handleUserIdChange();
  observeUserIdChange();
} catch (error) {
  console.error('Error initializing pageHead:', error);
}