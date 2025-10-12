# 🎯 CSS Variablen

## Warum CSS Variablen?

Beim Like-Bereich haben wir sehr viele "statische" Werte für Abstände benutzt und teilweise auch x-fach wiederholt. Dies lässt sich mit Variablen deutlich besser gestalten. Es erlaubt, falls nötig, auch das einfachere Umsetzen von Responsive Design.

---

## Variablen einführen

### Setup-Prozess

Als erstes wollen wir all die margin-Angaben durch Variablen ersetzen. Dafür führen wir ein separates CSS-File ein und importieren es wie üblich im `main.css`.

```css
@import url("variables.css");
```

### Design System Ansatz

Wir haben in den utilities Angaben für margins von `xs` bis `xxl` eingesetzt. Diese wollen wir in den Variablen definieren. 

**In einem top Design System** gäbe es einige Pixel-Angaben, die sich für alles wiederholen:
- **Set von Variablen** für Margins
- **Konsistente Spacing-Skala** 
- **Wiederverwendbare Werte**

> 💡 **Pragmatischer Ansatz**: Wir definieren die Variablen explizit für die Margins. Später können wir diese möglicherweise mit anderen zusammenführen.

### CSS Variablen Grundlagen

**Referenz**: [W3Schools CSS Variables](https://www.w3schools.com/css/css3_variables.asp)

Variablen in CSS sind relativ umfassend und daher auch komplex. Wir konzentrieren uns hier auf die Basics.

---

##  Margin-Variablen definieren

### Variable Definition

Definiere mit der Angabe `:root {}` die Angaben für unsere verschiedenen Margins:

```css
/* margin variables */
:root {
  --margin-xs: 12px;
  --margin-s: 16px;
  --margin-m: 24px;
  --margin-l: 32px;
  --margin-xl: 40px;
  --margin-xxl: 64px;
}
```

### Utilities aktualisieren

Danach gehe zum `utilities.css` und ersetze die fixen Zahlen durch unsere Variablen:

#### **Margin-Top Utilities:**

```css
.mt-0 {
    margin-top: 0;
}
.mt-s {
    margin-top: var(--margin-s);
}
.mt-m {
  margin-top: var(--margin-m);
}
.mt-l {
  margin-top: var(--margin-l);
}
.mt-xl {
  margin-top: var(--margin-xl);
}
.mt-xxl {
  margin-top: var(--margin-xxl);
}
```

#### **Margin-Bottom Utilities:**

```css
.mb-0 {
  margin-bottom: 0;
}
.mb-s {
  margin-bottom: var(--margin-s);
}
.mb-m {
  margin-bottom: var(--margin-m);
}
.mb-l {
  margin-bottom: var(--margin-l);
}
.mb-xl {
  margin-bottom: var(--margin-xl);
}
.mb-xxl {
  margin-bottom: var(--margin-xxl);
}
```

#### **Margin-Right Utilities:**

```css
.mr-0 {
  margin-right: 0;
}
.mr-xs {
  margin-right: var(--margin-xs);
}
.mr-s {
  margin-right: var(--margin-s);
}
.mr-m {
  margin-right: var(--margin-m);
}
.mr-l {
  margin-right: var(--margin-l);
}
.mr-xl {
  margin-right: var(--margin-xl);
}
.mr-xxl {
  margin-right: var(--margin-xxl);
}
```

#### **Margin Vertical (Top + Bottom) Utilities:**

```css
.my-0 {
  margin-top: 0;
  margin-bottom: 0;
}
.my-s {
  margin-top: var(--margin-s);
  margin-bottom: var(--margin-s);
}
.my-m {
  margin-top: var(--margin-m);
  margin-bottom: var(--margin-m);
}
.my-l {
  margin-top: var(--margin-l);
  margin-bottom: var(--margin-l);
}
.my-xl {
  margin-top: var(--margin-xl);
  margin-bottom: var(--margin-xl);
}
.my-xxl {
  margin-top: var(--margin-xxl);
  margin-bottom: var(--margin-xxl);
}
```

---

## ✅ Funktionalität prüfen

**Like-Bereich testen**: Prüfe kurz deinen "Like"-Bereich, ob die ganzen Abstände noch passen oder ob doch etwas kaputt ging.

---

## Weitere Optimierungen

Im Prinzip könntest du jetzt das restliche CSS nach weiteren Möglichkeiten für Variablen absuchen:

### Erweiterungsmöglichkeiten

| Bereich | Variablen-Optionen |
|---------|-------------------|
| **Buttons** | Border-radius, Padding, Colors |
| **Typography** | Font-sizes, Line-heights, Font-weights |
| **Colors** | Brand-colors, Background-colors |
| **Layout** | Container-widths, Grid-gaps |

### Nächste Schritte

Wir lassen weitere Variablen vorerst sein und kümmern uns dafür um ein **responsives Layout**.

**Variable-System etabliert - bereit für responsive Design!** 🎉
