/**
 * Funktionen in JavaScript
 * - Funktionen sind wiederverwendbare Code-Blöcke, die eine bestimmte Aufgabe ausführen.
 * - Funktionen können Parameter entgegennehmen und Werte zurückgeben.
 */

// Funktionsdeklaration
function greet(name) {
  return "Hallo, " + name + "!";
}

// Funktionsaufruf
const message = greet("Max");
console.log(message); // "Hallo, Max!"

// Funktion mit mehreren Parametern
function add(a, b) {
  return a + b;
}

const sum = add(5, 3);
console.log(sum); // 8

// Anonyme Funktion (Function Expression)
const multiply = function(x, y) {
  return x * y;
};

const product = multiply(4, 2);
console.log(product); // 8

// Pfeilfunktion (Arrow Function)
const divide = (m, n) => {
  return m / n;
};

const quotient = divide(10, 2);
console.log(quotient); // 5

// Zusammenfassung:
// - Funktionen werden mit dem Schlüsselwort "function" deklariert oder als Pfeilfunktionen geschrieben.
// - Funktionen können Parameter haben und Werte zurückgeben.
// - Funktionen helfen, den Code modular und wiederverwendbar zu machen.