
/*
==================================================
EL HERBS AND SPICES SHOP
DAY 2 + DAY 3: JAVASCRIPT PRACTICE
==================================================
*/

// --------------------------------------------------
// DAY 2 - TASK 1: VARIABLES
// --------------------------------------------------

console.log("WELCOME TO EL HERBS AND SPICES SHOP!");

var shopName = "EL Herbs and Spices Shop";
let itemPrice = 250;
let quantity = 2;
const gstRate = 0.05;

console.log("Shop Name:", shopName);
console.log("Item Price:", itemPrice);
console.log("Quantity:", quantity);
console.log("GST Rate:", gstRate);


// --------------------------------------------------
// DAY 2 - TASK 2: ARRAY OF PRODUCT OBJECTS
// --------------------------------------------------

const products = [
    { id: 1, name: "Cardamom", price: 250, stock: 20, category: "Whole Spices" },
    { id: 2, name: "Turmeric", price: 60, stock: 35, category: "Ground Spices" },
    { id: 3, name: "Black Pepper", price: 120, stock: 15, category: "Whole Spices" },
    { id: 4, name: "Cinnamon", price: 80, stock: 8, category: "Whole Spices" },
    { id: 5, name: "Clove", price: 100, stock: 0, category: "Whole Spices" },
    { id: 6, name: "Ginger Powder", price: 70, stock: 25, category: "Ground Spices" },
    { id: 7, name: "Bay Leaf", price: 40, stock: 5, category: "Herbs" },
    { id: 8, name: "Nutmeg", price: 90, stock: 12, category: "Whole Spices" }
];

console.log("First Product:", products[0]);
console.log("Last Product:", products[products.length - 1]);
console.log("Total Products:", products.length);


// --------------------------------------------------
// DAY 2 - TASK 3: OPERATORS
// --------------------------------------------------

let a = 10;
let b = 5;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);

console.log("10 == '10':", 10 == "10");
console.log("10 === '10':", 10 === "10");

let inStock = true;
let isLoggedIn = false;

console.log("AND:", inStock && isLoggedIn);
console.log("OR:", inStock || isLoggedIn);
console.log("NOT inStock:", !inStock);

let priceWithGST = itemPrice + (itemPrice * gstRate);

console.log("Price before GST:", itemPrice);
console.log("Price after 5% GST:", priceWithGST);

// + joins strings when one operand is a string.
// Therefore, "10" + 5 gives "105".
// The - operator converts "10" to a number, so "10" - 5 gives 5.

console.log('"10" + 5:', "10" + 5);
console.log('"10" - 5:', "10" - 5);


// ==================================================
// DAY 3 - TASK 1: SCOPE
// ==================================================

console.log("----- DAY 3: SCOPE -----");

if (true) {
    var varMessage = "I am var";
    let letMessage = "I am let";
    const constMessage = "I am const";

    console.log("Inside block - var:", varMessage);
    console.log("Inside block - let:", letMessage);
    console.log("Inside block - const:", constMessage);
}

// var is function-scoped, not block-scoped.
// Therefore, varMessage can be used outside this if block.
console.log("Outside block - var:", varMessage);

// let and const are block-scoped.
// They cannot be accessed outside the if block.

try {
    console.log(letMessage);
} catch (error) {
    console.log("Outside block - let: ReferenceError");
}

try {
    console.log(constMessage);
} catch (error) {
    console.log("Outside block - const: ReferenceError");
}


// ==================================================
// DAY 3 - TASK 2: HOISTING
// ==================================================

console.log("----- DAY 3: HOISTING -----");

// var declarations are hoisted and initialized with undefined.
console.log("var before assignment:", hoistedVar);
// Expected output: undefined

var hoistedVar = 100;

console.log("var after assignment:", hoistedVar);
// Expected output: 100


// let declarations are hoisted but remain in the
// Temporal Dead Zone until their declaration is reached.

try {
    console.log(hoistedLet);
} catch (error) {
    console.log("let before declaration: ReferenceError");
}

// Expected output: ReferenceError
// Accessing let before its declaration causes an error.

let hoistedLet = 200;

console.log("let after declaration:", hoistedLet);
// Expected output: 200


// ==================================================
// DAY 3 - TASK 3: CLOSURES
// ==================================================

console.log("----- DAY 3: CLOSURES -----");

function makeCartCounter() {
    // This variable is private to makeCartCounter().
    let count = 0;

    // The returned function remembers the count variable.
    return function () {
        count++;
        return count;
    };
}

// Create a counter for the shopping cart.
const addToCart = makeCartCounter();

console.log("Items in cart after first addition:", addToCart());
// Expected output: 1

console.log("Items in cart after second addition:", addToCart());
// Expected output: 2

console.log("Items in cart after third addition:", addToCart());
// Expected output: 3


// ==================================================
// END OF DAY 2 + DAY 3
// ==================================================

console.log("Day 3 JavaScript practice completed!");



