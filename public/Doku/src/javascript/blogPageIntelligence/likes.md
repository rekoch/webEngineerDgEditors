# ❤️‍🩹 Like-Funktion wiederherstellen

## 🎯 Überblick

Mit "Backend Connection" hast du dafür gesorgt, dass Like-Counter-Daten aus dem Backend stammen. Der Button selbst funktioniert aber noch nicht korrekt. Wir implementieren die Like-Verwaltung in zwei Schritten:

### Ziele:
1. **📝 Blog-Page liken** - mit korrekter UI und Backend-Verbindung
2. **💔 Blog-Page entliken** - mit korrekter UI und Backend-Verbindung  
3. **👤 User-ID-Wechsel** - korrekte Reaktion auf Benutzer-Änderungen

---

## 💝 Like & Dislike Implementation

### 🔄 Toggle-Logik verstehen

Like und Dislike sind sehr ähnlich - wir **togglen** zwischen den Zuständen:
1. **Aktuellen Zustand abfragen** (geliked oder nicht?)
2. **Zustand umkehren** (like → unlike, unlike → like)
3. **UI entsprechend aktualisieren**

### 🏗️ Architektur-Entscheidung

**File-Aufgabenverteilung:**
- `buttons.js` - **Nur** Button-Klick erkennen und Event versenden
- `likeStateHandler.js` - **Komplette** Like-Logik verwalten

**Event-basierte Kommunikation:**
- ✅ **Option 2**: Event versenden (flexibler, entkoppelter)
- ❌ Option 1: Direkte Funktionsaufrufe (enger gekoppelt)

---

## 📡 Like Event versenden

### 🔧 Button.js erweitern

**Observer und Events importieren:**
```javascript
import { appObserver, ObserverEvents } from "../../services/observer.js";
```

**Event bei Button-Klick versenden:**
```javascript
document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        appObserver.emit(ObserverEvents.LIKE_BUTTON_CLICKED);
        break;
      // ... andere Cases
    }
  });
});
```

### ✅ Test der Event-Übertragung

1. **Seite mit LiveServer starten**
2. **Like Button klicken**
3. **Console beobachten** - Zahlen-Output sollte sich erhöhen

> 🎉 **Erfolg**: LikeStateHandler empfängt und verarbeitet dein Event!

---

## 🎛️ Like Event verarbeiten

### 🔄 Toggle-State-Funktion erstellen

**Observer-Funktion erweitern:**
```javascript
function observeLikeEvents() {
  appObserver.subscribe(ObserverEvents.LIKE_BUTTON_CLICKED, async () => {
    toggleLikeState();
  });
}

async function toggleLikeState() {
  // Logik kommt hier rein
}
```

### 📊 Aktuellen Like-Status abfragen

**Import der benötigten Services:**
```javascript
import { getLikesPerBlogPage, getIsLikingBlogPage, likeBlogPage, unlikeBlogPage } from "../../services/blogPageLikes.js";
```

**Like-Status für User abfragen:**
```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(blogPageId, currentUserId);
  
  if (doesUserLikeBlogPageResponse.liked) {
    // User hat bereits geliked → Unlike
  } else {
    // User hat noch nicht geliked → Like
  }
}
```

### 🔄 Backend-Status ändern

```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(blogPageId, currentUserId);
  
  if (doesUserLikeBlogPageResponse.liked) {
    await unlikeBlogPage(blogPageId, currentUserId);
  } else {
    await likeBlogPage(blogPageId, currentUserId);
  }
}
```

---

## 🎨 UI-Updates implementieren

### 🖱️ Button-UI-Update-Funktion

```javascript
function updateLikeButtonUi(isLiked) {
  const likeButton = document.querySelector("button[data-button='like_article']");
  
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
```

### 🔄 Toggle-Funktion komplettieren

```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(blogPageId, currentUserId);
  
  if (doesUserLikeBlogPageResponse.liked) {
    await unlikeBlogPage(blogPageId, currentUserId);
    updateLikeButtonUi(false);
  } else {
    await likeBlogPage(blogPageId, currentUserId);
    updateLikeButtonUi(true);
  }
  
  setLikeCounter(); // Counter aktualisieren
}
```

### ✅ Funktionstest

**Backend und Frontend starten** und Like-Button testen!

---

## 🛡️ Error Handling implementieren

### 🔒 Try-Catch für Robustheit

```javascript
async function toggleLikeState() {
  try {
    const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
      blogPageId,
      currentUserId
    );
    
    if (!doesUserLikeBlogPageResponse) {
      return; // Keine Response erhalten
    }
    
    if (doesUserLikeBlogPageResponse.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(false);
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(true);
    }
    
    setLikeCounter();
  } catch (error) {
    console.error("Error toggling like state:", error);
  }
}
```

---

## 👤 User-ID-Wechsel handhaben

### 🔄 User-Change Observer erweitern

**Bestehende Observer-Funktion finden:**
```javascript
function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      console.log("Current User ID in likeStateHandler:", currentUserId);
      // Hier Like-Status für neuen User laden
    },
    true // Replay-Funktion für Initial-State
  );
}
```

### 🔍 Like-Status-Check-Funktion erstellen

**Wiederverwendbare Status-Check-Funktion:**
```javascript
async function checkUserLikeStatus() {
  try {
    const response = await getIsLikingBlogPage(blogPageId, currentUserId);
    
    if (response === undefined || response === null) {
      return { success: false, liked: false, error: "No response received" };
    }
    
    return { success: true, liked: response.liked, error: null };
  } catch (error) {
    return { success: false, liked: false, error: error.message };
  }
}
```

### 🔄 Toggle-Funktion refactoren

**Status-Check-Funktion verwenden:**
```javascript
async function toggleLikeState() {
  try {
    const likeStatus = await checkUserLikeStatus();
    
    if (!likeStatus.success) {
      console.error("Could not determine like status:", likeStatus.error);
      return;
    }
    
    if (likeStatus.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(false);
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(true);
    }
    
    setLikeCounter();
  } catch (error) {
    console.error("Error toggling like state:", error);
  }
}
```

### 🎯 Init-Like-State-Funktion

**DRY-Prinzip - Wiederverwendbare Init-Funktion:**
```javascript
async function initLikeState() {
  const likeStatus = await checkUserLikeStatus();
  
  if (likeStatus.success) {
    updateLikeButtonUi(likeStatus.liked);
    setLikeCounter();
  } else {
    console.error("Could not fetch like status:", likeStatus.error);
  }
}
```

### 🔄 Observer-Funktionen finalisieren

**User-ID-Change Observer:**
```javascript
function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      await initLikeState();
    },
    true
  );
}
```

**Blog-Page-ID-Change Observer:**
```javascript
function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      await initLikeState();
    },
    true
  );
}
```

---

## 🎉 Endergebnis

### ✅ Implementierte Features

1. **🔄 Like/Unlike Toggle** - Backend-synchronisiert
2. **🎨 UI-Updates** - Button-Text und Icon-Änderungen  
3. **📊 Counter-Updates** - Automatische Zähler-Aktualisierung
4. **👤 User-Switching** - Korrekte Like-Status-Anzeige pro User
5. **🛡️ Error Handling** - Robuste Fehlerbehandlung
6. **🔄 DRY Code** - Wiederverwendbare Funktionen

### 🧪 Vollständiger Test

**Test-Szenarios:**
1. ✅ Like/Unlike mit verschiedenen Users
2. ✅ User-ID-Wechsel oben rechts
3. ✅ Backend-Verbindung aktiv
4. ✅ Counter-Updates in Echtzeit

**Die Like-Funktionalität ist jetzt vollständig implementiert!** 🚀