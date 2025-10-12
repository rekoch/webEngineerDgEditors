# 🏷️ Rubrik

## Rubrik-Styling optimieren

Die Rubrik "Produkttest" ist noch nicht ganz korrekt. Die Farbe stimmt nicht. Ausserdem können wir dafür sorgen, dass sicher immer alles mit Grossbuchstaben dargestellt wird.

### Korrekte Farbe finden

Die korrekte Farbe kannst du entweder dem [Galaxus Design System](https://www.galaxus.ch/designsystem/foundations/colors-design) entnehmen oder ab der Vorlage suchen/kopieren.

> 💡 **Hinweis**: Wir setzen hier und in allen folgenden Styles immer nur das **Galaxus Light Theme** um. Ansonsten müssten wir sehr viel mehr CSS produzieren.

### CSS-Klasse definieren

Definiere eine Klasse, auf welcher du die Werte vergibst und füge sie überall hinzu, wo du eine Rubrik hast im HTML.

#### **CSS-Implementierung:**

```css
.content-category {
  color: rgb(147, 83, 185);
  text-transform: uppercase;
}
```

#### **HTML-Anwendung:**

```html
<p class="content-category">Produkttest</p>
```

### Eigenschaften erklärt

| Eigenschaft | Wert | Beschreibung |
|-------------|------|--------------|
| **color** | `rgb(147, 83, 185)` | Galaxus-Purple für Kategorien |
| **text-transform** | `uppercase` | Automatische Grossschreibung |

### ✅ Resultat

- **Korrekte Purple-Farbe** wie im Design System
- **Automatische Grossbuchstaben** für Konsistenz
- **Wiederverwendbare Klasse** für alle Rubriken

**Rubrik-Styling ist professionell umgesetzt!** 🎉
