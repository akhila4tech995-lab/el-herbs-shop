
/*
==================================================
EL HERBS AND SPICES SHOP
DAY 2 + DAY 3 + DAY 4 JAVASCRIPT PRACTICE
==================================================
*/

// ==================================================
// DAY 2 - TASK 1: VARIABLES
// ==================================================

console.log("WELCOME TO EL HERBS AND SPICES SHOP!");

var shopName = "EL Herbs and Spices Shop";
let itemPrice = 250;
let quantity = 2;
const gstRate = 0.05;

console.log("Shop Name:", shopName);
console.log("Item Price:", itemPrice);
console.log("Quantity:", quantity);
console.log("GST Rate:", gstRate);

// ==================================================
// DAY 2 - TASK 2: ARRAY OF PRODUCT OBJECTS
// ==================================================

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

// ==================================================
// DAY 2 - TASK 3: OPERATORS
// ==================================================

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

console.log("Outside block - var:", varMessage);

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

console.log("var before assignment:", hoistedVar);
var hoistedVar = 100;
console.log("var after assignment:", hoistedVar);

try {
    console.log(hoistedLet);
} catch (error) {
    console.log("let before declaration: ReferenceError");
}

let hoistedLet = 200;
console.log("let after declaration:", hoistedLet);

// ==================================================
// DAY 3 - TASK 3: CLOSURES
// ==================================================

console.log("----- DAY 3: CLOSURES -----");

function makeCartCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const addToCart = makeCartCounter();

console.log("Items in cart after first addition:", addToCart());
console.log("Items in cart after second addition:", addToCart());
console.log("Items in cart after third addition:", addToCart());

console.log("Day 3 JavaScript practice completed!");

// ==================================================
// DAY 4 - TASK 1: IF, ELSE IF, ELSE
// Check stock status of every product
// ==================================================

console.log("----- DAY 4: STOCK STATUS -----");

for (const product of products) {
    if (product.stock === 0) {
        console.log(product.name + ": Out of Stock");
    } else if (product.stock < 10) {
        console.log(product.name + ": Low Stock");
    } else {
        console.log(product.name + ": In Stock");
    }
}

// ==================================================
// DAY 4 - TASK 2: SWITCH
// Display a message for each product category
// ==================================================

console.log("----- DAY 4: PRODUCT CATEGORIES -----");

for (const product of products) {
    switch (product.category) {
        case "Whole Spices":
            console.log(product.name + " belongs to Whole Spices.");
            break;

        case "Ground Spices":
            console.log(product.name + " belongs to Ground Spices.");
            break;

        case "Herbs":
            console.log(product.name + " belongs to Herbs.");
            break;

        case "Masala Blends":
            console.log(product.name + " belongs to Masala Blends.");
            break;

        default:
            console.log(product.name + " has an unknown category.");
    }
}

// ==================================================
// DAY 4 - TASK 3: FOR LOOP
// Display all product names
// ==================================================

console.log("----- DAY 4: FOR LOOP -----");

for (let i = 0; i < products.length; i++) {
    console.log(products[i].name);
}

// ==================================================
// DAY 4 - TASK 4: WHILE LOOP
// Display all product names
// ==================================================

console.log("----- DAY 4: WHILE LOOP -----");

let i = 0;

while (i < products.length) {
    console.log(products[i].name);
    i++;
}

// ==================================================
// DAY 4 - TASK 5: DO...WHILE LOOP
// Display all product names
// ==================================================

console.log("----- DAY 4: DO...WHILE LOOP -----");

let j = 0;

do {
    console.log(products[j].name);
    j++;
} while (j < products.length);

// ==================================================
// DAY 4 - TASK 6: FOR...OF
// Read product objects from the array
// ==================================================

console.log("----- DAY 4: FOR...OF LOOP -----");

for (const product of products) {
    console.log("Product:", product.name);
    console.log("Price:", product.price);
}

// ==================================================
// DAY 4 - TASK 7: FOR...IN
// Read property names from one product object
// ==================================================

console.log("----- DAY 4: FOR...IN LOOP -----");

for (const key in products[0]) {
    console.log("Property:", key);
    console.log("Value:", products[0][key]);
}

// ==================================================
// DAY 4 - TASK 8: CONTINUE
// Skip products that are out of stock
// ==================================================

console.log("----- DAY 4: CONTINUE -----");

for (const product of products) {
    if (product.stock === 0) {
        continue;
    }

    console.log("Available product:", product.name);
}

// ==================================================
// DAY 4 - TASK 9: BREAK
// Stop at the first product priced above ₹500
// A separate demo item is used so our original
// eight products and prices remain unchanged.
// ==================================================

console.log("----- DAY 4: BREAK -----");

const breakDemoProducts = [
    ...products,
    {
        id: 9,
        name: "Premium Saffron (Demo)",
        price: 650,
        stock: 3,
        category: "Whole Spices"
    }
];

for (const product of breakDemoProducts) {
    if (product.price > 500) {
        console.log("First product above ₹500:", product.name);
        console.log("Price:", product.price);
        break;
    }

    console.log("Checked product:", product.name);
}

console.log("Day 4 JavaScript practice completed!");



