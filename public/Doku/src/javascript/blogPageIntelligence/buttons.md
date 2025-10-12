# 🛎️ Push the Button

## 🎯 Ziele

Unsere Buttons sehen zwar aus wie Buttons, aber sie machen noch nichts. Wir wollen folgende Funktionen erreichen:

1. **Artikel Like Button** - mit Unlike und Zähler
2. **Autor:in Folgen Button** - mit Unfollow  
3. **Thema Folgen Button** - mit Unfollow

> **Frontend-Focus**: In dieser Umsetzung konzentrieren wir uns auf Frontend-Logik. Daten werden nur im Frontend gespeichert - bei einem Page-Reload werden alle Status zurückgesetzt.

---

## Skript Setup

### Button-Script erstellen

1. **Neue Datei erstellen**: `buttons.js` im `javascript` Ordner
2. **Import in `main.js`** hinzufügen
3. **Test mit Console-Output** (siehe Kapitel "Table Auto Design")

### 🐛 Debugging-Optionen

Für lokales Debugging siehe:
- [Debug JavaScript mit Browser (Chrome)](../debugVsCode.md)
- [Debug JavaScript mit Visual Code](../debugVsCode.md)

---

## Event Listener verstehen

### Events Grundlagen

Ein **Event** ist eine Nachricht wenn eine Aktion stattfindet - wie "Button XY wurde gedrückt". Der Browser kennt Standard-Reaktionen auf Events (z.B. Checkbox an/aus).

Mehr dazu: [MDN Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

### Events finden

**Herausforderung**: Nicht jedes Element bietet die selben Events an:
- **Button** kann geklickt werden
- **Textfeld** kann beschrieben werden  
- **Maus** kann bewegt werden

**Aber wie finde ich heraus, welche Events verfügbar sind?**

#### MDN-Dokumentation durchsuchen

1. **Button-spezifische API**: [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)
2. **Instance Methods**: [HTMLButtonElement#instance_methods](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#instance_methods)
3. **Problem**: Der "click" Event ist hier nicht direkt zu finden! 

#### Vererbungskette verstehen

**Wichtiger Hinweis**: Button erbt Methoden vom Eltern-Element:
> **"inherits methods from its parent, HTMLElement"**

**Lösungsweg**: Durch die Vererbungskette navigieren:
- `HTMLButtonElement` → `HTMLElement` → `Element`
- **Ziel**: [Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element) - hier finden sich die meisten Events!

#### Praktische Tipps

| Methode | Beschreibung | Effektivität |
|---------|--------------|---------------|
| **Dokumentation** | MDN systematisch durchsuchen | Vollständig aber zeitaufwändig |
| **Trial & Error** | Events ausprobieren und testen | Schnell für bekannte Events |
| **IDE-Support** | Autocomplete und IntelliSense nutzen | Sehr praktisch während Entwicklung |

>  **Praxis-Tipp**: Die Devise **"trial and error"** ist oft effizienter als stundenlanges Dokumentation-Studium!

### Event Listener erstellen

**Schritt 1**: Alle Buttons finden und Event Listener registrieren

```javascript
document.querySelectorAll("button").forEach((button) => {
  // Für jeden Button einen Click-Listener erstellen
});
```

**Event Listener hinzufügen**: [MDN addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```javascript
button.addEventListener("click", () => {
  // Handle button click
});
```

### Erster Test

```javascript
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    // Handle button click
    alert(`Button "${button.textContent.trim()}" wurde geklickt!`);
  });
});
```

Teste im Browser - bei jedem Button-Klick sollte ein Alert erscheinen!

---

## HTML mit Data-Attributen erweitern

### Button-Unterscheidung

Wir haben 3 verschiedene Button-Typen. Für bessere JavaScript-Kontrolle erweitern wir das HTML:

**Data-Attribute hinzufügen:**
- `data-button-state`: "active" oder "inactive"
- `data-button`: Button-Name zur Identifikation

### HTML-Updates

#### Like Button
```html
<button
  data-button-state="inactive"
  data-button="like_article"
  class="primary mb-s font-small align-items-center text-center">
```

#### Autor:in folgen
```html
<button
  data-button-state="inactive"
  data-button="follow_author"
  class="primary">
```

#### Thema folgen
```html
<button
  data-button-state="inactive"
  data-button="follow_topic"
  class="primary">
```

### Spezifische Button-Auswahl

```javascript
document.querySelectorAll("button[data-button]").forEach((button) => {
  // Nur Buttons mit data-button Attribut
});
```

---

## Button States Management

### ⚡ Switch-Statement für Button-Typen

```javascript
document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        break;
      case "follow_author":
        break;
      case "follow_topic":
        break;
      default:
        console.warn(`Unbekannter Button-Typ: ${button.dataset.button}`);
    }
  });
});
```

### Toggle-Funktionalität

**Toggle-Funktion erstellen:**
```javascript
function toggleButtonState(button) {
  const currentState = button.dataset.buttonState;
  
  if (currentState == "active") {
    button.classList.add("primary");
    button.dataset.buttonState = "inactive";
  } else {
    button.classList.remove("primary");
    button.dataset.buttonState = "active";
  }
}
```

**Funktionsaufruf in Switch-Statement:**
```javascript
switch (button.dataset.button) {
  case "like_article":
    toggleButtonState(button);
    break;
  case "follow_author":
    toggleButtonState(button);
    break;
  case "follow_topic":
    toggleButtonState(button);
    break;
}
```

### CSS-Klassen automatisch togglen

Mit [classList.toggle](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) wird das noch einfacher:

```javascript
function toggleButtonState(button) {
  const currentState = button.dataset.buttonState;
  button.classList.toggle("primary");
  
  if (currentState == "active") {
    button.dataset.buttonState = "inactive";
  } else {
    button.dataset.buttonState = "active";
  }
}
```

---

## Button-Texte dynamisch ändern

### Text-Parameter hinzufügen

```javascript
function toggleButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  button.classList.toggle("primary");

  if (currentState == "active") {
    button.textContent = activationText;
    button.dataset.buttonState = "inactive";
  } else {
    button.textContent = inactivatingText;
    button.dataset.buttonState = "active";
  }
}
```

### Text-Konstanten definieren

```javascript
const likePageText = "Dieser Artikel gefällt mir!";
const unlikePageText = "Dieser Artikel gefällt mir nicht mehr";
const followAuthorText = "Autor:in folgen";
const unfollowAuthorText = "Autor:in nicht mehr folgen";
const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";
```

### Switch-Statement mit Texten

```javascript
switch (button.dataset.button) {
  case "like_article":
    toggleButtonState(button, likePageText, unlikePageText);
    break;
  case "follow_author":
    toggleButtonState(button, followAuthorText, unfollowAuthorText);
    break;
  case "follow_topic":
    toggleButtonState(button, followTopicText, unfollowTopicText);
    break;
}
```

---

## Like Button erweitern

### Like Counter implementieren

Der Like Button braucht zusätzliche Features:
- **Zähler** für Likes
- **Icon** mit Herz/gebrochenem Herz

### HTML für Counter markieren

**Zahl mit span und ID markieren:**
```html
<span id="data-like-counter">59</span> Personen gefällt dieser Artikel
```

> 💡 **Wichtig**: IDs dürfen nur einmal pro HTML existieren!

### Like-spezifische Toggle-Funktion

```javascript
function toggleLikeButtonState(button) {
  const currentState = button.dataset.buttonState;
  const likeCounter = document.querySelector("#data-like-counter");
  // Alternative: document.getElementById("data-like-counter");
  
  let currentCount = parseInt(likeCounter.textContent);
  
  if (currentState == "inactive") {
    currentCount++;
  } else {
    currentCount--;
  }
  
  likeCounter.textContent = currentCount;
}
```

### Integration mit bestehender Toggle-Logik

```javascript
function toggleLikeButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  const likeCounter = document.getElementById("data-like-counter");
  let currentCount = parseInt(likeCounter.textContent);

  toggleButtonState(button, activationText, inactivatingText);

  if (currentState == "inactive") {
    currentCount++;
  } else {
    currentCount--;
  }
  likeCounter.textContent = currentCount;
}
```

### Switch-Statement anpassen

```javascript
case "like_article":
  toggleLikeButtonState(button, likePageText, unlikePageText);
  break;
```

---

## Icon-Integration

### SVG-Icons vorbereiten

```javascript
const filledHeart = document.createElement("span");
const brokenHeart = document.createElement("span");

filledHeart.innerHTML = `<svg
  fill="none" viewBox="0 0 16 16" width="16" height="16"
  class="svg-icon">
  <path fill="#fff" fill-rule="evenodd" 
    d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" 
    clip-rule="evenodd"></path>
</svg>`;

brokenHeart.innerHTML = `<svg
  fill="none" viewBox="0 0 16 16" width="16" height="16"
  class="svg-icon">
  <path fill="#000" fill-rule="evenodd" 
    d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" 
    clip-rule="evenodd"></path>
  <polyline points="6,4 8,8 7,10 9,12" stroke="#fff" stroke-width="1" fill="none"/>
</svg>`;

// Abstand zwischen Icon und Text
filledHeart.classList.add("mr-s");
brokenHeart.classList.add("mr-s");
```

### Icons in Toggle-Funktion integrieren

```javascript
if (currentState == "inactive") {
  button.prepend(filledHeart);
  currentCount++;
} else {
  button.prepend(brokenHeart);
  currentCount--;
}
```

---

## 🎉 Ergebnis

**Alle Buttons sind jetzt voll funktionsfähig:**

✅ **Like Button**: Toggle mit Counter und Icon  
✅ **Follow Author**: Toggle mit Text-Änderung  
✅ **Follow Topic**: Toggle mit Text-Änderung  

### Nächste Schritte

Im nächsten Kapitel verbinden wir die Buttons mit einem **Backend** für persistente Datenspeicherung!