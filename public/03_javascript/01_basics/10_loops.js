/**
 * Schleifen in JavaScript
 * - Schleifen ermöglichen es, einen Codeblock mehrmals auszuführen.
 * - Die häufigsten Schleifen sind die for-Schleife, die while-Schleife und die do-while-Schleife.
 */
// 1. for-Schleife
console.log("For-Schleife:");
for (let i = 0; i < 5; i++) {
  console.log("Iteration Nummer: " + i);
}

// 2. while-Schleife
console.log("While-Schleife:");
let j = 0;
while (j < 5) {
  console.log("Iteration Nummer: " + j);
  j++;
}

// 3. do-while-Schleife
console.log("Do-While-Schleife:");
let k = 0;
do {
  console.log("Iteration Nummer: " + k);
  k++;
} while (k < 5);

// 4. foreach-Schleife (für Arrays)
console.log("ForEach-Schleife:");
const array = ["Apfel", "Banane", "Kirsche"];
array.forEach(function(element, index) {
  console.log("Element an Index " + index + ": " + element);
});

// foreach -Schleife mit Arrow Function
console.log("ForEach-Schleife mit Arrow Function:");
array.forEach((element, index) => {
  console.log(`Element an Index ${index}: ${element}`);
});

// Zusammenfassung:
// - for-Schleifen sind nützlich, wenn die Anzahl der Iterationen bekannt ist.
// - while-Schleifen sind nützlich, wenn die Anzahl der Iterationen unbekannt ist und von einer Bedingung abhängt.
// - do-while-Schleifen garantieren mindestens eine Ausführung des Codeblocks, bevor