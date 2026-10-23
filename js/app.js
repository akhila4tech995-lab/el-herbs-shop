
/* =============================================
   EL HERBS AND SPICES SHOP
   WEEK 2 - DAY 1
   DOM MANIPULATION
============================================= */


/* =============================================
   1. PRODUCTS ARRAY
============================================= */

const shopProducts = [
    {
        id: 1,
        name: "Cardamom",
        price: 250,
        stock: 20,
        category: "Whole Spices",
        icon: "🌿"
    },
    {
        id: 2,
        name: "Turmeric",
        price: 60,
        stock: 35,
        category: "Ground Spices",
        icon: "🟡"
    },
    {
        id: 3,
        name: "Black Pepper",
        price: 120,
        stock: 15,
        category: "Whole Spices",
        icon: "⚫"
    },
    {
        id: 4,
        name: "Cinnamon",
        price: 80,
        stock: 8,
        category: "Whole Spices",
        icon: "🪵"
    },
    {
        id: 5,
        name: "Clove",
        price: 100,
        stock: 0,
        category: "Whole Spices",
        icon: "🌰"
    },
    {
        id: 6,
        name: "Ginger Powder",
        price: 70,
        stock: 25,
        category: "Ground Spices",
        icon: "🫚"
    },
    {
        id: 7,
        name: "Bay Leaf",
        price: 40,
        stock: 5,
        category: "Herbs",
        icon: "🍃"
    },
    {
        id: 8,
        name: "Nutmeg",
        price: 90,
        stock: 12,
        category: "Whole Spices",
        icon: "🌰"
    }
];


/* =============================================
   2. SELECT HTML ELEMENTS
============================================= */

// # selects an element by its ID.
const productGrid = document.querySelector("#productGrid");
const pageHeading = document.querySelector("#pageHeading");
const featuredImage = document.querySelector("#featuredImage");

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productCount = document.querySelector("#productCount");

const headingButton = document.querySelector("#headingButton");
const changeImageButton = document.querySelector("#changeImageButton");

const enquiryForm = document.querySelector("#enquiryForm");
const formMessage = document.querySelector("#formMessage");


/* =============================================
   3. TASK 1: CHANGE HEADING AND CSS CLASS
============================================= */

function practiseDOMManipulation() {
    // Change the heading text using textContent.
    pageHeading.textContent = "Explore Our Herbs and Spices";

    // Toggle the CSS class on the heading.
    pageHeading.classList.toggle("highlight-heading");
}

// Run the function when the button is clicked.
headingButton.addEventListener("click", practiseDOMManipulation);


/* =============================================
   4. CHANGE IMAGE USING setAttribute()
============================================= */

let showingCardamomImage = true;

changeImageButton.addEventListener("click", function () {
    if (showingCardamomImage) {
        featuredImage.setAttribute("src", "images/turmeric.jpg");
        featuredImage.setAttribute("alt", "Featured turmeric spice");
    } else {
        featuredImage.setAttribute("src", "images/cardamom.jpg");
        featuredImage.setAttribute("alt", "Featured cardamom spice");
    }

    showingCardamomImage = !showingCardamomImage;
});


/* =============================================
   5. TASK 2: renderProducts(list)
============================================= */

function renderProducts(list) {
    // Remove the old product cards.
    productGrid.replaceChildren();

    // Display how many products match.
    productCount.textContent = list.length + " product(s) found";

    // Display a message if no products match.
    if (list.length === 0) {
        const message = document.createElement("p");

        message.classList.add("no-products");
        message.textContent = "No matching products found.";

        productGrid.appendChild(message);
        return;
    }

    // Loop through each product in the array.
    for (const product of list) {
        // Create a product card.
        const card = document.createElement("article");
        card.classList.add("product-card");

        // Create the icon.
        const icon = document.createElement("div");
        icon.classList.add("product-icon");
        icon.textContent = product.icon;

        // Create the name.
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Create the category.
        const category = document.createElement("p");
        category.classList.add("product-category");
        category.textContent = "Category: " + product.category;

        // Create the price.
        const price = document.createElement("p");
        price.classList.add("product-price");
        price.textContent = "₹" + product.price + " / 100g";

        // Create the stock information.
        const stock = document.createElement("p");
        stock.classList.add("product-stock");

        // Add the appropriate class according to stock.
        if (product.stock === 0) {
            card.classList.add("out-of-stock");
            stock.textContent = "Out of Stock";
        } else if (product.stock < 10) {
            card.classList.add("low-stock");
            stock.textContent = "Low Stock: " + product.stock;
        } else {
            card.classList.add("in-stock");
            stock.textContent = "In Stock: " + product.stock;
        }

        // Add each element to the product card.
        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(stock);

        // Add the product card to the grid.
        productGrid.appendChild(card);
    }
}


/* =============================================
   6. TASK 3: SEARCH AND CATEGORY FILTER
============================================= */

function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    // filter() returns products that match both conditions.
    const filteredProducts = shopProducts.filter(function (product) {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

// Search when the user types.
searchInput.addEventListener("input", filterProducts);

// Filter when the category changes.
categoryFilter.addEventListener("change", filterProducts);


/* =============================================
   7. CORRECT SELECTOR EXAMPLES
============================================= */

/*
Incorrect:
document.querySelector("productGrid");

Correct:
document.querySelector("#productGrid");

Explanation:
# selects an ID.
. selects a class.
A plain tag name selects an HTML element.
*/

/*
Incorrect: using a class selector for an ID.
document.querySelector(".pageHeading");

Correct:
document.querySelector("#pageHeading");
*/

/*
Incorrect:
document.querySelectorAll(".product-card").style.color = "green";

querySelectorAll() returns a NodeList, not one element.
Loop through the elements to apply a style to each one.
*/

function practiseNodeListStyling() {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function (card) {
        card.style.color = "#285943";
    });
}


/* =============================================
   8. textContent vs innerHTML
============================================= */

/*
textContent treats the value as plain text.

Example:
element.textContent = "<strong>Hello</strong>";

The tags are displayed as text.

innerHTML interprets the string as HTML.

Example:
element.innerHTML = "<strong>Hello</strong>";

Hello appears in bold.

SECURITY:
Do not use innerHTML to display untrusted user input.
It can create a cross-site scripting (XSS) risk.
Use textContent when displaying ordinary user-provided text.
*/


/* =============================================
   9. ENQUIRY FORM
============================================= */

enquiryForm.addEventListener("submit", function (event) {
    // Stop the browser from reloading the page.
    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your form was checked, but no enquiry was sent to a server.";

    enquiryForm.reset();
});

/*
addEventListener() is preferred over an onclick HTML attribute
because it keeps JavaScript separate from HTML and allows
multiple event listeners to be registered for the same event.
*/


/* =============================================
   10. DISPLAY PRODUCTS WHEN PAGE LOADS
============================================= */

renderProducts(shopProducts);

console.log("Week 2 Day 1: DOM manipulation is ready.");
