// Variable declarations in JavaScript
// Using var, let, and const

// 1. var: function-scoped or globally-scoped variable
var firstname = "John";
console.log(firstname);

// var allows re-declaration and has function scope
firstname = "Doe";
console.log(firstname);

// 2. let: block-scoped variable
let age = 30;
console.log(age);

age = 31;
console.log(age);

// 3. const: block-scoped variable that cannot be reassigned
const isStudent = false;
console.log(isStudent);

// Uncommenting the following line will throw an error because const cannot be reassigned
//isStudent = true; // This will throw an error


// scope example
function testScope() {
  if (true) {
    var functionScoped = "I am function scoped (var)";
    let blockScoped = "I am block scoped (let)";
    const alsoBlockScoped = "I am also block scoped (const)";
    console.log(blockScoped); // Accessible here
    console.log(alsoBlockScoped); // Accessible here
  }
  console.log(functionScoped); // Accessible here
  // Uncommenting the following lines will throw errors because blockScoped and alsoBlockScoped are not accessible here
  // console.log(blockScoped); // Error
  // console.log(alsoBlockScoped); // Error
}

testScope();

// Summary:
// - Use var for function-scoped variables (less common in modern JS).
// - Use let for block-scoped variables that may change.
// - Use const for block-scoped variables that should not be reassigned.