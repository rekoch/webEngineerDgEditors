// Variablen-Deklarationen in JavaScript
// Verwendung von var, let und const

// 1. var: funktions- oder global-gültige Variable
var firstname = "John";
console.log(firstname);

// var erlaubt Neu-Deklaration und hat Funktions-Gültigkeit
firstname = "Doe";
console.log(firstname);

// 2. let: block-gültige Variable
let age = 30;
console.log(age);

age = 31;
console.log(age);

// 3. const: block-gültige Variable, die nicht neu zugewiesen werden kann
const isStudent = false;
console.log(isStudent);

// Das Auskommentieren der folgenden Zeile würde einen Fehler werfen, da const nicht neu zugewiesen werden kann
//isStudent = true; // Das würde einen Fehler werfen


// Gültigkeitsbereich-Beispiel
function testScope() {
  if (true) {
    var functionScoped = "Ich bin funktions-gültig (var)";
    let blockScoped = "Ich bin block-gültig (let)";
    const alsoBlockScoped = "Ich bin ebenfalls block-gültig (const)";
    console.log(blockScoped); // Hier zugänglich
    console.log(alsoBlockScoped); // Hier zugänglich
  }
  console.log(functionScoped); // Hier zugänglich
  // Das Auskommentieren der folgenden Zeilen würde Fehler werfen, da blockScoped und alsoBlockScoped hier nicht zugänglich sind
  // console.log(blockScoped); // Fehler
  // console.log(alsoBlockScoped); // Fehler
}

testScope();

// Zusammenfassung:
// - Verwende var für funktions-gültige Variablen (weniger gebräuchlich im modernen JS).
// - Verwende let für block-gültige Variablen, die sich ändern können.
// - Verwende const für block-gültige Variablen, die nicht neu zugewiesen werden sollen.