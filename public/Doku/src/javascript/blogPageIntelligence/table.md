# 🤖 Table Auto Design

## Das Problem

Wenn du den letzten Stand aus dem [GitHub Repository](https://github.com/rekoch/webEngineerDgEditors/tree/main/public/02_html_css/09_blog_page_completed) nimmst, findest du eine Tabelle für die Benchmark-Übersicht.

Die Tabelle startet hier: [index.html#L202](https://github.com/rekoch/webEngineerDgEditors/blob/780c327390f81ab9a61810681ac9baeac2ba58d1/public/02_html_css/09_blog_page_completed/index.html#L202)

### Design-Herausforderung

Obwohl die Tabelle funktioniert, hat sie ein **fundamentales Problem**: Die Breite der Diagramm-Säulen ist fest im HTML hinterlegt.

```html
<p
  class="table-background-brown text-right mt-xxs mb-xxs pr-s py-xxs"
  style="width: 24%"
></p>
```

**CSS hat hier seine Grenzen** - Breiten und Höhen basierend auf "anderen" Elementen zu definieren, kann CSS nicht.

### 🎯 Ziele der dynamischen Tabelle

Wir möchten eine Tabelle, die folgendes kann:

1. **Automatische Berechnung**: 100% Breite = höchster Wert, alle anderen prozentual abgeleitet
2. **Dynamische Anpassung**: Ändern sich Werte, passt sich das Design automatisch an
3. **Wiederverwendbarkeit**: Tabelle kann kopiert und mit neuen Werten verwendet werden

---

## JavaScript Setup

### Grundlagen JavaScript einbinden

Informationen zum Einbinden findest du auf [SelfHTML](https://wiki.selfhtml.org/wiki/JavaScript_in_HTML_einbinden).

**Unser Ansatz:**

- Script am **Ende der Seite** laden (bessere Performance - First Contentful Paint)
- **Module-System** für strukturierte Code-Organisation

### Ordnerstruktur erstellen

Erstelle einen `javascript` Ordner mit folgenden Dateien:

```
javascript/
├── main.js
└── tables.js
```

### JavaScript verknüpfen

**1. In `main.js` das tables.js importieren:**

```javascript
import "./tables.js";
```

**2. Am Ende von `index.html` (vor `</body>`):**

```html
<script src="javascript/main.js" type="module"></script>
</body>
```

> 💡 **Wichtig**: `type="module"` ermöglicht das Importieren anderer Scripts

### ✅ Test der Einbindung

**In `tables.js` einfügen:**

```javascript
console.log("tables.js loaded");
```

**Testen:**

1. `index.html` über LiveServer öffnen
2. Chrome DevTools → **Console**
3. Seite neu laden

Du solltest den Text sehen! 🥳 Klick rechts auf das Script-Link - es führt direkt zur Datei.
![Console log](./images/ChromeWebTool.png)

---

## DOM-Manipulation

### Das Document Object Model (DOM)

Der Browser stellt JavaScript das **DOM** zur Verfügung - eine JavaScript-Repräsentation des gesamten HTML. Über diese Schnittstelle lassen sich Inhalte auslesen und manipulieren.

### Elemente finden mit `querySelectorAll`

```javascript
document.querySelectorAll("[selector]");
```

Findet alle Nodes mit dem angegebenen Selektor. Mehr dazu: [MDN querySelectorAll](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll)

---

## Data-Attribute for the Win

### Das Problem lösen

**Problem**: Suche nach `div` findet zu viele unnötige Elemente.  
**Lösung**: [Data-Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)

**Vorteile von Data-Attributen:**

- Werden von Screenreadern ignoriert
- Stören HTML-Struktur minimal
- Geben JavaScript mehr "Wissen"

### Tabelle markieren

**Tabellen-Container markieren:**
Dies ist ein neues `div` Element welches um die bestehende Tabelle erweitert werden muss. Achte darauf, dass du das `</div>` nach der Tabelle schliesst.

```html
<div data-table-name="benchmark">
  <h4 class="font-20 mb-s">XP-Pen Magic Notepad - CPU Benchmark</h4>
  <!-- ... restliches HTML ... -->
  <p class="font-13 font-color-light">Score (higher is better)</p>
</div>
```

**Jede Column markieren:**

```html
<p
  class="table-background-brown text-right mt-xxs mb-xxs pr-s py-xxs"
  data-table-column
>
  720
</p>
```

> 💡 **Alternative**: `data-table-type` statt `data-table-name` für verschiedene Tabellentypen

---

## JavaScript-Implementierung

### 1️⃣ Tabellen finden

```javascript
document.querySelectorAll("[data-table-name]").forEach((table) => {
  // Code für jede Tabelle
});
```

Foreach siehe [foreach Erklärung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### 2️⃣ Spalten finden und höchsten Wert ermitteln

Jetzt haben wir das Tabellen Element und können innerhalb wiederum all unsere Spalten finden. Wieso brauchen wir das? Damit die Breite der Spalten stimmt, müssen wir zuerst den höchsten Wert finden. Denn dieser bestimmt 100%. Davon abgeleitet können wir dann berechnen, wie viel % Breit die Spalte sein sollte.

Zuerst suchen wir uns alle columns. Danach gehen wir durch alle Spalten durch und merken uns den höchsten Wert. Dass kannst du mit einer lokalen Variable machen. Diese muss mit `let` definiert sein, wenn du den Werte anpassen willst. Ist der Wert Schreibgeschützt kannst du `const` nutzen. In unserem Fall brauchen wir `let` da wir den Wert neu schreiben, wenn er grösser als der vorherige ist.

```javascript
document.querySelectorAll("[data-table-name]").forEach((table) => {
  const columns = table.querySelectorAll("[data-table-column]");

  // neuer Code
  let columnWidest = 0;
  columns.forEach((col) => {
    const colWidth = Number(col.innerText);
    if (colWidth > columnWidest) {
      columnWidest = colWidth;
    }
  });
  // neuer Code
});
```

**Erklärung:**

- `col.innerText`: Nur Text, keine HTML-Tags oder Leerzeichen
- `Number()`: Konvertiert Text zu Zahl für Vergleiche
- Optional: `trim()` für Leerzeichen entfernen

### 3️⃣ Breiten berechnen und setzen

```javascript
document.querySelectorAll("[data-table-name]").forEach((table) => {
  const columns = table.querySelectorAll("[data-table-column]");

  let columnWidest = 0;
  columns.forEach((col) => {
    const colWidth = Number(col.innerText);
    if (colWidth > columnWidest) {
      columnWidest = colWidth;
    }
  });
  // neuer Code
  columns.forEach((col) => {
    const colWidth = col.innerText;
    const width = (100 / columnWidest) * colWidth;
    col.style.width = `${width}%`;
  });
  // neuer Code
});
```

### 4️⃣ HTML-Style entfernen

Da JavaScript die Breite berechnet, kannst du das `style="width: 24%"` im HTML entfernen:

```html
<p
  class="table-background-brown text-right mt-xxs mb-xxs pr-s py-xxs"
  data-table-column
></p>
```

Im Prinzip kannst du es als Rückfall drin lassen, sollte das JavaScript nicht geladen werden.

---

## Erweiterte Version (Kürzer aber komplexer)

### Kompakte Lösung

```javascript
const maxWidth = Math.max(
  ...Array.from(columns, (col) => Number(col.innerText))
);
columns.forEach((col) => {
  col.style.width = `${(100 * Number(col.innerText)) / maxWidth}%`;
});
```

### Erklärung der neuen Konzepte

#### `Math.max()`

[MDN Math.max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) - Gibt den höchsten Wert zurück.

#### `Array.from()`

[MDN Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) - Erstellt Array aus Columns und deren innerText-Werten: `[720, 789, 1023]`

#### Spread Operator `...`

[MDN Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) - "Spreaded" Array-Elemente als einzelne Parameter:

- `Math.max([1,2,3])` ❌ funktioniert nicht
- `Math.max(...[1,2,3])` ✅ funktioniert → `Math.max(1,2,3)`

#### Template Literals

```javascript
`${(100 * Number(col.innerText)) / maxWidth}%`;
```

Mit `${}` können Variablen und Berechnungen direkt im String verwendet werden.

---

## Fazit

| Ansatz          | Vorteile                         | Nachteile                |
| --------------- | -------------------------------- | ------------------------ |
| **Ausführlich** | Gut verständlich, lernfreundlich | Mehr Code                |
| **Kompakt**     | Weniger Code, eleganter          | Erfordert mehr JS-Wissen |

### Lernempfehlung

1. **Beginne** mit der ausführlichen Version
2. **Verstehe** jeden Schritt
3. **Erweitere** Wissen schrittweise zu kompakteren Lösungen

> 💡 **AI & Google**: Du wirst oft auf kompakte Varianten stoßen - je mehr du lernst, desto verständlicher werden sie!
