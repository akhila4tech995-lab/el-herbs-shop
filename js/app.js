
/* =============================================
   EL HERBS AND SPICES SHOP
   WEEK 2 - DAY 2
   EVENT HANDLING
============================================= */


/* =============================================
   1. PRODUCT DATA
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

const productGrid = document.querySelector("#productGrid");
const pageHeading = document.querySelector("#pageHeading");
const featuredImage = document.querySelector("#featuredImage");

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productCount = document.querySelector("#productCount");

const headingButton = document.querySelector("#headingButton");
const changeImageButton = document.querySelector("#changeImageButton");

const cartMessage = document.querySelector("#cartMessage");

const enquiryForm = document.querySelector("#enquiryForm");
const formMessage = document.querySelector("#formMessage");


/* =============================================
   3. DAY 1: DOM MANIPULATION
============================================= */

function practiseDOMManipulation() {
    pageHeading.textContent = "Explore Our Herbs and Spices";

    // Toggle adds the class if absent and removes it if present.
    pageHeading.classList.toggle("highlight-heading");
}

headingButton.addEventListener("click", practiseDOMManipulation);


/* Change the featured image using setAttribute(). */

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
   4. RENDER PRODUCT CARDS
============================================= */

function renderProducts(list) {
    productGrid.replaceChildren();

    productCount.textContent = list.length + " product(s) found";

    if (list.length === 0) {
        const message = document.createElement("p");

        message.classList.add("no-products");
        message.textContent = "No matching products found.";

        productGrid.appendChild(message);
        return;
    }

    for (const product of list) {
        const card = document.createElement("article");
        card.classList.add("product-card");

        const icon = document.createElement("div");
        icon.classList.add("product-icon");
        icon.textContent = product.icon;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.classList.add("product-category");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.classList.add("product-price");
        price.textContent = "₹" + product.price + " / 100g";

        const stock = document.createElement("p");
        stock.classList.add("product-stock");

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

        // Create the Add to Cart button.
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.classList.add("shop-button");
        addButton.textContent = "Add to Cart";

        // Do not allow an out-of-stock product to be added.
        if (product.stock === 0) {
            addButton.disabled = true;
            addButton.textContent = "Unavailable";
        }

        /*
        DAY 2 - TASK 1: CLICK EVENT

        The event object describes the event.
        Three useful properties:
        event.type   -> event name, such as "click"
        event.target -> element that triggered the event
        event.key    -> pressed key, mainly for keyboard events
        */

        addButton.addEventListener("click", function (event) {
            console.log("Add to Cart event:", event);
            console.log("Event type:", event.type);
            console.log("Event target:", event.target);
            console.log("Event key:", event.key);

            cartMessage.textContent =
                product.name + " selected! This is a demo; no order was saved.";
        });

        /*
        DAY 2 - TASK 1: MOUSE HOVER EVENTS

        mouseover runs when the pointer enters the card.
        mouseout runs when the pointer leaves the card.
        The zoom class applies the CSS transform effect.
        */

        card.addEventListener("mouseover", function (event) {
            console.log("Mouse over event:", event);
            console.log("Event type:", event.type);
            console.log("Event target:", event.target);
            console.log("Event key:", event.key);

            card.classList.add("zoom");
        });

        card.addEventListener("mouseout", function (event) {
            console.log("Mouse out event:", event);
            console.log("Event type:", event.type);
            console.log("Event target:", event.target);
            console.log("Event key:", event.key);

            card.classList.remove("zoom");
        });

        // Add all product elements to the card.
        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(stock);
        card.appendChild(addButton);

        productGrid.appendChild(card);
    }
}


/* =============================================
   5. SEARCH AND CATEGORY FILTER
============================================= */

function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

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

// Filter while the user types.
searchInput.addEventListener("input", filterProducts);


/* =============================================
   6. DAY 2: KEYBOARD EVENTS
============================================= */

/*
keydown detects a key being pressed.

event.type   -> "keydown"
event.target -> the search input
event.key    -> the actual key, such as "Enter" or "Escape"
*/

searchInput.addEventListener("keydown", function (event) {
    console.log("Keyboard event:", event);
    console.log("Event type:", event.type);
    console.log("Event target:", event.target);
    console.log("Event key:", event.key);

    if (event.key === "Enter") {
        // Apply the search when Enter is pressed.
        filterProducts();

        cartMessage.textContent =
            "Search applied for: " + searchInput.value;
    }

    if (event.key === "Escape") {
        // Clear the search when Escape is pressed.
        searchInput.value = "";

        // Refresh results using the selected category.
        filterProducts();

        cartMessage.textContent = "Search box cleared.";
    }
});

// Also update results when the category changes.
categoryFilter.addEventListener("change", filterProducts);


/* =============================================
   7. DAY 2: FORM SUBMISSION
============================================= */

/*
addEventListener() lets us attach event handlers in JavaScript
instead of mixing JavaScript into HTML with onclick attributes.
It also allows more than one listener for an event.

event.preventDefault() stops the browser's default form
submission, which would normally reload or navigate the page.
*/

enquiryForm.addEventListener("submit", function (event) {
    console.log("Form submit event:", event);
    console.log("Event type:", event.type);
    console.log("Event target:", event.target);
    console.log("Event key:", event.key);

    // Stop the default form submission.
    event.preventDefault();

    formMessage.textContent =
        "Thank you! The form was checked, but no enquiry was sent to a server.";

    enquiryForm.reset();
});


/* =============================================
   8. SELECTOR AND TEXT SAFETY NOTES
============================================= */

/*
Correct ID selector:
document.querySelector("#productGrid");

Correct class selector:
document.querySelector(".product-card");

Incorrect:
document.querySelectorAll(".product-card").style.color = "green";

querySelectorAll() returns a NodeList. Loop through it:

document.querySelectorAll(".product-card").forEach(function (card) {
    card.style.color = "green";
});

textContent displays a value as plain text.
innerHTML parses a string as HTML.

For example:
element.textContent = "<strong>Hello</strong>";
displays the tags as text.

element.innerHTML = "<strong>Hello</strong>";
renders Hello in bold.

Do not use innerHTML with untrusted user input because
it can introduce cross-site scripting (XSS) vulnerabilities.
*/


/* =============================================
   9. INITIALISE THE PAGE
============================================= */

renderProducts(shopProducts);

console.log("Week 2 Day 2: Event handling is ready.");
