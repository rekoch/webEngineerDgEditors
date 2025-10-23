/**
 * Primitive Types in JavaScript
 * - string
 * - number
 * - boolean
 * - null
 * - undefined
 * - symbol
 */

// Beispiele für primitive Datentypen
const firstname = "Max";        // string, entspricht Text
const age = 30;            // number, entspricht einer Zahl
const isStudent = true;    // boolean, entspricht einem Wahrheitswert der true oder false sein kann
const address = null;      // null, entspricht "kein Wert". mittels if (address === null) oder if (address) kann geprüft werden ob der Wert null ist. mit if (!address) ob nichts/kein Wert vorhanden ist
let phone;                 // undefined, entspricht "kein Wert".
const uniqueID = Symbol();  // symbol, entspricht einem einzigartigen Wert. wird eher selten verwendet

// Zugriff auf die Werte
console.log(firstname);        // "Max"
console.log(age);         // 30
console.log(isStudent);   // true
console.log(address);     // null
console.log(phone);       // undefined
console.log(uniqueID);    // Symbol()

// Zusammenfassung:
// - Primitive Datentypen sind unveränderlich (immutable).
// - Sie werden durch ihren Wert und nicht durch ihre Referenz verglichen.

/* Unterschiede zu Objekten:
 * - Objekte sind Sammlungen von Schlüssel-Wert-Paaren.
 * - Objekte sind veränderlich (mutable).
 * - Zugriff auf Objekte erfolgt über Punktnotation oder eckige Klammern.
 */