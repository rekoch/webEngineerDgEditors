# 🚓 Follow-Funktion wiederherstellen

## Aufgabe

Du hast gelernt, wie du das Backend für State-Management nutzt - mit Services wie Observer und blogPageLikes. Jetzt fehlt die **Follow-Funktionalität** für **Author** und **Topic**. Nutze dein erworbenes Wissen!

> 💪 **Challenge**: Wissen ist Macht, und mit Macht kommt... noch mehr Code! 😄

---

## Author Follow implementieren

### Vorbereitung: followStateHandler.js

Das File `followStateHandler.js` ist bereits vorbereitet:

```javascript
const followAuthorText = "Autor:in folgen";
const unfollowAuthorText = "Autor:in nicht mehr folgen";
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
      // Weitere Aktionen bei User-ID-Änderung
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
      // Weitere Aktionen bei Blog-Page-ID-Änderung
    },
    true
  );
}

observeUserIdChange();
observeBlogPageIdChange();
```

### Integration aktivieren

**Das File wird noch nicht geladen!** Import in `blogPageMain.js` hinzufügen:

```javascript
import "./followStateHandler.js";
```

---

## Implementation-Aufgaben

### 1️⃣ Button Event-System erweitern

**In `buttons.js`**: Follow-Button-Klicks via Observer weiterleiten

**Beispiel für Author-Follow:**
```javascript
case "follow_author":
  appObserver.emit(ObserverEvents.AUTHOR_FOLLOW_BUTTON_CLICKED, {
    button: button
  });
  break;
```

### 2️⃣ Follow State Handler implementieren

**Event empfangen und verarbeiten:**
```javascript
appObserver.subscribe(ObserverEvents.AUTHOR_FOLLOW_BUTTON_CLICKED, async (data) => {
  const button = data.button;
  // Toggle-Logik implementieren
});
```

### 3️⃣ UI korrekt aktualisieren

- **Text** zwischen follow/unfollow wechseln
- **CSS-Klasse** `primary` richtig setzen/entfernen
- **Backend-State** synchronisieren

### 4️⃣ User/BlogPage-ID-Changes handhaben

Bei Änderungen der User-ID oder Blog-Page-ID korrekten Follow-Status laden und UI aktualisieren.

---

## Hilfreiche Code-Snippets

### Author Email aus Button extrahieren

```javascript
const authorEmail = button.dataset.authorEmail;
```

### Event mit Button-Daten versenden

```javascript
appObserver.emit(ObserverEvents.AUTHOR_FOLLOW_BUTTON_CLICKED, {
  button: button
});
```

### Event mit Button-Daten empfangen

```javascript
appObserver.subscribe(ObserverEvents.AUTHOR_FOLLOW_BUTTON_CLICKED, async (data) => {
  const button = data.button;
  const authorEmail = button.dataset.authorEmail;
  // Toggle-Logik hier
});
```

### UI-Update-Pattern

```javascript
function updateAuthorFollowButtonUi(isFollowing, button) {
  if (isFollowing) {
    button.classList.remove("primary");
    button.textContent = unfollowAuthorText;
  } else {
    button.classList.add("primary");
    button.textContent = followAuthorText;
  }
}
```

---

## Topic Follow implementieren

### Ähnlich, aber mit Unterschieden

**Topic Follow** ist fast identisch zu Author Follow, mit diesen **wichtigen Unterschieden**:

#### 1️⃣ Neuer Event-Typ benötigt
```javascript
ObserverEvents.TOPIC_FOLLOW_BUTTON_CLICKED
```

#### 2️⃣ Multiple Button Support

Topics können **mehrfach pro Blog-Page** vorkommen. Alle Topic-Buttons berücksichtigen:

```javascript
const buttons = document.querySelectorAll("button[data-button='follow_topic']");

for (const btn of buttons) {
  // UI für jeden Button aktualisieren
}
```

#### 3️⃣ Topic-Name extrahieren

```javascript
const topicName = button.dataset.topicName;
```

---

## Implementation-Checkliste

### ✅ Author Follow
- [ ] **Observer Events** für Author-Follow erstellt
- [ ] **Button-Click-Events** in buttons.js implementiert
- [ ] **Toggle-Logik** in followStateHandler.js
- [ ] **Backend-Integration** (follow/unfollow API-Calls)
- [ ] **UI-Updates** (Text + CSS-Klassen)
- [ ] **User-ID-Change** Handling
- [ ] **Blog-Page-ID-Change** Handling

### ✅ Topic Follow
- [ ] **Observer Events** für Topic-Follow erstellt
- [ ] **Multiple Button Support** implementiert
- [ ] **Topic-Name-Extraktion** aus Button-Data
- [ ] **Alle Topic-Buttons** bei Status-Änderung aktualisieren
- [ ] **Backend-Integration** vervollständigt

---

## Testing-Szenarios

### Ausgiebige Tests durchführen

1. **User-ID wechseln** - Follow-Status sollte sich entsprechend ändern
2. **Button-Klicks** - Follow/Unfollow funktioniert
3. **Blog-Page-ID ändern** - Neue Follow-Status werden geladen
4. **Multiple Topic-Buttons** - Alle werden synchron aktualisiert
5. **Backend-Persistenz** - Status bleibt nach Page-Reload erhalten

---

## 🎉 That's it folks!

Wenn alle Tests erfolgreich sind: **Gratulation!** 🥂

### 🐛 Debugging-Hilfe

Falls etwas nicht funktioniert:
1. **Console-Logs** überprüfen
2. **Network-Tab** für API-Calls kontrollieren
3. **Event-Flow** durch Observer verfolgen

### Endlösung verfügbar

Bei völliger Verzweiflung kannst du die **komplette Lösung** auf GitHub einsehen:

[GitHub: Follow Buttons mit Backend Integration](https://github.com/rekoch/webEngineerDgEditors/tree/main/public/03_javascript/06_followButtonsWithBackendIntegration)

---

## 🏆 Lernziele erreicht

Nach erfolgreicher Implementation beherrschst du:

✅ **Event-driven Architecture** mit Observer Pattern  
✅ **Multi-Button State Management**  
✅ **Backend-Frontend-Synchronisation**  
✅ **Dynamic UI Updates**  
✅ **Error Handling & Robustness**  

**Du bist bereit für komplexere Frontend-Herausforderungen!** 🚀
