/**
 * Objekte mit Funktionen in JavaScript
 * - Objekte können auch Funktionen als Eigenschaften haben.
 * - Damit können Objekte Verhalten besitzen.
 * - Bspw.: Ein "person" Objekt mit einer "greet" Funktion.
 */ 

const person = {
  name: "Bruce Wayne",
  age: 30,
  city: "London",
  
  // Funktion als Eigenschaft (Methode)
  greet: function() {
    console.log("Hallo, mein Name ist " + this.name + "!");
  },
  
  // Funktion mit Parameter
  setAge: function(newAge) {
    this.age = newAge;
  }
};

// Aufruf der Methode "greet"
person.greet(); // "Hallo, mein Name ist Max Mustermann!"

// Ändern des Alters mit der Methode "setAge"
person.setAge(31);
console.log(person.age); // 31

// Zusammenfassung:
// - Objekte können Funktionen als Eigenschaften haben, die Methoden genannt werden.
// - Methoden können auf die Eigenschaften des Objekts über "this" zugreifen.
// - Methoden ermöglichen es Objekten, Verhalten zu besitzen.

// Da Funktionen als auch als Objekte betrachtet werden können, ist es auch möglich, Funktionen eigene Eigenschaften zu geben.
function sayHello() {
  console.log("Hello!");
}

// Eigenschaft zur Funktion hinzufügen
sayHello.language = "English";

// Zugriff auf die Eigenschaft der Funktion
console.log(sayHello.language); // "English"

// Aufruf der Funktion
sayHello(); // "Hello!"

// Funktionen verhalten sich ähnlich wie Eigenschaften von Objekten und können bspw. verschiedenen Objekten zugewiesen werden.
const anotherPerson = {
  name: "Clark Kent",
  greet: sayHello // Funktion wird als Methode zugewiesen
};

anotherPerson.greet(); // "Hello!"