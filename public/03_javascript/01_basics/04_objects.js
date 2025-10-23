/**
 * Ein Objekt, das eine Person beschreibt.
 * @type {{name: string, age: number, city: string}}
 */
const person = {
  name: "Max Mustermann",
  age: 30,
  city: "Berlin"
};

// Zugriff auf die Eigenschaften des Objekts
console.log(person.name); // "Max Mustermann"
console.log(person.age);  // 30
console.log(person.city); // "Berlin"

// Ändern einer Eigenschaft
person.age = 31;
console.log(person.age);  // 31

// Hinzufügen einer neuen Eigenschaft
person.country = "Deutschland";
console.log(person.country); // "Deutschland"

// Löschen einer Eigenschaft
delete person.city;
console.log(person.city); // undefined

// ähnlich wie bei einem Array, können Eigenschaften auch mit eckigen Klammern zugegriffen werden
console.log(person["name"]); // "Max Mustermann"

// Vergleich mit einem Array
const fruits = ["Apfel", "Banane", "Orange"];
console.log(fruits[0]); // "Apfel"

// Zusammenfassung:
// - Objekte sind Sammlungen von Schlüssel-Wert-Paaren.
// - Zugriff auf Eigenschaften erfolgt über Punktnotation oder eckige Klammern.
// - Eigenschaften können hinzugefügt, geändert und gelöscht werden.

/* in einer Objekt Variable wird die Referenz zum Objekt gespeichert.
 * Wenn du also eine Objekt Variable einer anderen zuweist, zeigen beide Variablen auf dasselbe Objekt.
 * Änderungen an dem Objekt über eine Variable sind auch über die andere Variable sichtbar.
 */
const anotherPerson = person;
anotherPerson.name = "Erika Mustermann";
console.log(person.name); // "Erika Mustermann"
console.log(anotherPerson.name); // "Erika Mustermann"