
/*
==================================================
EL HERBS AND SPICES SHOP
DAY 2 + DAY 3 + DAY 4 + DAY 5
JAVASCRIPT PRACTICE
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

console.log("Cart after first addition:", addToCart());
console.log("Cart after second addition:", addToCart());
console.log("Cart after third addition:", addToCart());

console.log("Day 3 JavaScript practice completed!");

// ==================================================
// DAY 4 - TASK 1: IF, ELSE IF, ELSE
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
// ==================================================

console.log("----- DAY 4: FOR LOOP -----");

for (let i = 0; i < products.length; i++) {
    console.log(products[i].name);
}

// ==================================================
// DAY 4 - TASK 4: WHILE LOOP
// ==================================================

console.log("----- DAY 4: WHILE LOOP -----");

let i = 0;

while (i < products.length) {
    console.log(products[i].name);
    i++;
}

// ==================================================
// DAY 4 - TASK 5: DO...WHILE LOOP
// ==================================================

console.log("----- DAY 4: DO...WHILE LOOP -----");

let j = 0;

do {
    console.log(products[j].name);
    j++;
} while (j < products.length);

// ==================================================
// DAY 4 - TASK 6: FOR...OF
// ==================================================

console.log("----- DAY 4: FOR...OF LOOP -----");

for (const product of products) {
    console.log("Product:", product.name);
    console.log("Price:", product.price);
}

// ==================================================
// DAY 4 - TASK 7: FOR...IN
// ==================================================

console.log("----- DAY 4: FOR...IN LOOP -----");

for (const key in products[0]) {
    console.log("Property:", key);
    console.log("Value:", products[0][key]);
}

// ==================================================
// DAY 4 - TASK 8: CONTINUE
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

// ==================================================
// DAY 5 - TASK 1: FUNCTION DECLARATION
// ==================================================

console.log("----- DAY 5: FUNCTIONS -----");

function displayWelcomeMessage() {
    console.log("Welcome to EL Herbs and Spices Shop!");
}

displayWelcomeMessage();

// ==================================================
// DAY 5 - TASK 2: FUNCTION WITH PARAMETERS
// ==================================================

function displayProduct(productName) {
    console.log("Product selected:", productName);
}

displayProduct("Cardamom");
displayProduct("Turmeric");
displayProduct("Black Pepper");

// ==================================================
// DAY 5 - TASK 3: FUNCTION WITH RETURN
// Calculate price including GST
// ==================================================

function calculatePriceWithGST(price) {
    let totalPrice = price + (price * gstRate);
    return totalPrice;
}

let cardamomPrice = calculatePriceWithGST(250);
let turmericPrice = calculatePriceWithGST(60);

console.log("Cardamom price with GST:", cardamomPrice);
console.log("Turmeric price with GST:", turmericPrice);

// ==================================================
// DAY 5 - TASK 4: FUNCTION WITH TWO PARAMETERS
// Calculate total cost for quantity purchased
// ==================================================

function calculateTotalCost(price, quantity) {
    return price * quantity;
}

console.log(
    "Cost of 2 Cardamom packs:",
    calculateTotalCost(250, 2)
);

console.log(
    "Cost of 3 Turmeric packs:",
    calculateTotalCost(60, 3)
);

// ==================================================
// DAY 5 - TASK 5: FUNCTION EXPRESSION
// ==================================================

const calculateDiscount = function (price, discountPercent) {
    let discountAmount = price * (discountPercent / 100);
    return price - discountAmount;
};

console.log(
    "Cardamom price after 10% discount:",
    calculateDiscount(250, 10)
);

// ==================================================
// DAY 5 - TASK 6: ARROW FUNCTION
// ==================================================

const getProductName = (product) => {
    return product.name;
};

console.log("First product name:", getProductName(products[0]));

// Short arrow function
const doublePrice = price => price * 2;

console.log("Double Cardamom price:", doublePrice(250));

// ==================================================
// DAY 5 - TASK 7: REUSABLE PRODUCT SEARCH FUNCTION
// ==================================================

function findProduct(productName) {
    const foundProduct = products.find(
        product =>
            product.name.toLowerCase() === productName.toLowerCase()
    );

    if (foundProduct) {
        console.log("Product found:", foundProduct.name);
        console.log("Price:", foundProduct.price);
        console.log("Stock:", foundProduct.stock);
        console.log("Category:", foundProduct.category);
        return foundProduct;
    } else {
        console.log("Product not found:", productName);
        return null;
    }
}

findProduct("Cardamom");
findProduct("Turmeric");
findProduct("Saffron");

// ==================================================
// DAY 5 - TASK 8: FUNCTION TO DISPLAY ALL PRODUCTS
// ==================================================

function displayAllProducts() {
    console.log("----- ALL SHOP PRODUCTS -----");

    for (const product of products) {
        console.log(
            product.name +
            " - ₹" + product.price +
            " - Stock: " + product.stock
        );
    }
}

displayAllProducts();

// ==================================================
// DAY 5 - TASK 9: FUNCTION TO CHECK STOCK
// ==================================================

function checkProductStock(productName) {
    const product = findProductByName(productName);

    if (product === null) {
        return;
    }

    if (product.stock === 0) {
        console.log(product.name + " is out of stock.");
    } else {
        console.log(product.name + " is available.");
    }
}

function findProductByName(productName) {
    for (const product of products) {
        if (product.name.toLowerCase() === productName.toLowerCase()) {
            return product;
        }
    }

    return null;
}

checkProductStock("Clove");
checkProductStock("Cardamom");

// ==================================================
// DAY 5 - COMPLETED
// ==================================================

console.log("Day 5 JavaScript practice completed!");
