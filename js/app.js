
console.log("Welcome to EL Herbs and Spices Shop!");

// 1. Variables
var shopName = "EL Herbs and Spices Shop";
let itemPrice = 250;
let quantity = 2;
const gstRate = 0.05;

console.log("Shop Name:", shopName);
console.log("Item Price:", itemPrice);
console.log("Quantity:", quantity);
console.log("GST Rate:", gstRate);

// 2. Array of eight product objects
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

// 3. Arithmetic operators
let a = 10;
let b = 5;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);

// 4. Comparison operators
console.log("10 == '10':", 10 == "10");
console.log("10 === '10':", 10 === "10");

// 5. Logical operators
let inStock = true;
let isLoggedIn = false;

console.log("AND:", inStock && isLoggedIn);
console.log("OR:", inStock || isLoggedIn);
console.log("NOT inStock:", !inStock);

// 6. Calculate price after adding 5% GST
let priceWithGST = itemPrice + (itemPrice * gstRate);

console.log("Price before GST:", itemPrice);
console.log("Price after 5% GST:", priceWithGST);

// JavaScript converts numbers to strings with + when a string is involved.
// Therefore, "10" + 5 gives "105" (string concatenation).
// But "10" - 5 gives 5 because - converts "10" to a number.
console.log('"10" + 5:', "10" + 5);
console.log('"10" - 5:', "10" - 5);

