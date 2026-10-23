
/*
==================================================
EL HERBS AND SPICES SHOP
WEEK 1: DAY 2 TO DAY 6
==================================================
*/

// ==================================================
// DAY 2: VARIABLES
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
// DAY 2: PRODUCT ARRAY
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
// DAY 2: OPERATORS
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

let priceWithGST = itemPrice + itemPrice * gstRate;

console.log("Price before GST:", itemPrice);
console.log("Price after 5% GST:", priceWithGST);
console.log('"10" + 5:', "10" + 5);
console.log('"10" - 5:', "10" - 5);

// ==================================================
// DAY 3: SCOPE
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
// DAY 3: HOISTING
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
// DAY 3: CLOSURES
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

// ==================================================
// DAY 4: CONDITIONS
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
// DAY 4: SWITCH
// ==================================================

console.log("----- DAY 4: CATEGORIES -----");

for (const product of products) {
    switch (product.category) {
        case "Whole Spices":
            console.log(product.name + ": Whole Spices");
            break;
        case "Ground Spices":
            console.log(product.name + ": Ground Spices");
            break;
        case "Herbs":
            console.log(product.name + ": Herbs");
            break;
        case "Masala Blends":
            console.log(product.name + ": Masala Blends");
            break;
        default:
            console.log(product.name + ": Unknown category");
    }
}

// ==================================================
// DAY 4: FOR LOOP
// ==================================================

console.log("----- DAY 4: FOR LOOP -----");

for (let i = 0; i < products.length; i++) {
    console.log(products[i].name);
}

// ==================================================
// DAY 4: WHILE LOOP
// ==================================================

console.log("----- DAY 4: WHILE LOOP -----");

let i = 0;

while (i < products.length) {
    console.log(products[i].name);
    i++;
}

// ==================================================
// DAY 4: DO...WHILE LOOP
// ==================================================

console.log("----- DAY 4: DO...WHILE LOOP -----");

let j = 0;

do {
    console.log(products[j].name);
    j++;
} while (j < products.length);

// ==================================================
// DAY 4: FOR...OF
// ==================================================

console.log("----- DAY 4: FOR...OF -----");

for (const product of products) {
    console.log("Product:", product.name, "Price:", product.price);
}

// ==================================================
// DAY 4: FOR...IN
// ==================================================

console.log("----- DAY 4: FOR...IN -----");

for (const key in products[0]) {
    console.log("Property:", key, "Value:", products[0][key]);
}

// ==================================================
// DAY 4: CONTINUE
// ==================================================

console.log("----- DAY 4: CONTINUE -----");

for (const product of products) {
    if (product.stock === 0) {
        continue;
    }

    console.log("Available product:", product.name);
}

// ==================================================
// DAY 4: BREAK
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
        break;
    }

    console.log("Checked product:", product.name);
}

// ==================================================
// DAY 5: FUNCTION DECLARATION
// ==================================================

console.log("----- DAY 5: FUNCTIONS -----");

function displayWelcomeMessage() {
    console.log("Welcome to EL Herbs and Spices Shop!");
}

displayWelcomeMessage();

// ==================================================
// DAY 5: FUNCTION WITH PARAMETERS
// ==================================================

function displayProduct(productName) {
    console.log("Product selected:", productName);
}

displayProduct("Cardamom");
displayProduct("Turmeric");
displayProduct("Black Pepper");

// ==================================================
// DAY 5: RETURN AND GST
// ==================================================

function calculatePriceWithGST(price) {
    return price + price * gstRate;
}

console.log("Cardamom with GST:", calculatePriceWithGST(250));
console.log("Turmeric with GST:", calculatePriceWithGST(60));

// ==================================================
// DAY 5: TOTAL COST
// ==================================================

function calculateTotalCost(price, quantity) {
    return price * quantity;
}

console.log("Two Cardamom packs:", calculateTotalCost(250, 2));
console.log("Three Turmeric packs:", calculateTotalCost(60, 3));

// ==================================================
// DAY 5: FUNCTION EXPRESSION
// ==================================================

const calculateDiscount = function (price, discountPercent) {
    const discountAmount = price * discountPercent / 100;
    return price - discountAmount;
};

console.log("Cardamom after 10% discount:", calculateDiscount(250, 10));

// ==================================================
// DAY 5: ARROW FUNCTION
// ==================================================

const getProductName = product => product.name;
const doublePrice = price => price * 2;

console.log("First product:", getProductName(products[0]));
console.log("Double Cardamom price:", doublePrice(250));

// ==================================================
// DAY 5: SEARCH FOR A PRODUCT
// ==================================================

function findProductByName(productName) {
    for (const product of products) {
        if (product.name.toLowerCase() === productName.toLowerCase()) {
            return product;
        }
    }

    return null;
}

function findProduct(productName) {
    const product = findProductByName(productName);

    if (product === null) {
        console.log("Product not found:", productName);
        return null;
    }

    console.log("Product found:", product.name);
    console.log("Price:", product.price);
    console.log("Stock:", product.stock);
    console.log("Category:", product.category);

    return product;
}

findProduct("Cardamom");
findProduct("Turmeric");
findProduct("Saffron");

// ==================================================
// DAY 5: DISPLAY ALL PRODUCTS
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
// DAY 5: CHECK STOCK
// ==================================================

function checkProductStock(productName) {
    const product = findProductByName(productName);

    if (product === null) {
        console.log("Cannot check stock. Product not found:", productName);
        return;
    }

    if (product.stock === 0) {
        console.log(product.name + " is out of stock.");
    } else {
        console.log(product.name + " is available.");
    }
}

checkProductStock("Clove");
checkProductStock("Cardamom");

// ==================================================
// DAY 6: INTEGRATION TESTS
// Check whether the main functions work correctly
// ==================================================

console.log("----- DAY 6: INTEGRATION TESTS -----");

let passedTests = 0;
let failedTests = 0;

function runTest(testName, actual, expected) {
    if (actual === expected) {
        console.log("PASS:", testName);
        passedTests++;
    } else {
        console.error(
            "FAIL:", testName,
            "| Expected:", expected,
            "| Received:", actual
        );
        failedTests++;
    }
}

// Test 1: Correct number of products
runTest("There are 8 products", products.length, 8);

// Test 2: First product name
runTest("First product is Cardamom", products[0].name, "Cardamom");

// Test 3: Find an existing product
runTest(
    "Find Cardamom",
    findProductByName("Cardamom")?.price,
    250
);

// Test 4: Search is not case-sensitive
runTest(
    "Search ignores uppercase and lowercase",
    findProductByName("tUrMeRiC")?.price,
    60
);

// Test 5: Missing product returns null
runTest(
    "Missing product returns null",
    findProductByName("Saffron"),
    null
);

// Test 6: GST calculation
runTest(
    "Cardamom price with 5% GST",
    calculatePriceWithGST(250),
    262.5
);

// Test 7: Total cost calculation
runTest(
    "Two Cardamom packs cost ₹500",
    calculateTotalCost(250, 2),
    500
);

// Test 8: Discount calculation
runTest(
    "10% discount on ₹250 gives ₹225",
    calculateDiscount(250, 10),
    225
);

// Test 9: Clove stock is zero
runTest(
    "Clove is out of stock",
    findProductByName("Clove")?.stock,
    0
);

// Test 10: Turmeric stock is available
runTest(
    "Turmeric has stock",
    findProductByName("Turmeric").stock > 0,
    true
);

// Display test summary
console.log("----- TEST SUMMARY -----");
console.log("Tests passed:", passedTests);
console.log("Tests failed:", failedTests);

if (failedTests === 0) {
    console.log("All tests passed!");
} else {
    console.error("Some tests failed. Check the error messages above.");
}

console.log("Week 1 JavaScript practice completed!");
