
"use strict";

// ==================================================
// WEEK 3 DAY 1: PRODUCTS FROM JSON
// ==================================================

let shopProducts = [];
let cart = [];

const CART_STORAGE_KEY = "elHerbsShopCart";

// Read the saved cart safely when the page loads.
function loadSavedCart() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart === null) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        if (!Array.isArray(parsedCart)) {
            console.warn("Saved cart is not an array. Starting with an empty cart.");
            return [];
        }

        return parsedCart;
    } catch (error) {
        console.error("Could not read saved cart:", error.message);
        return [];
    }
}

// Save cart as JSON text.
function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("Could not save cart:", error.message);
    }
}

cart = loadSavedCart();

// ==================================================
// DOM ELEMENTS
// ==================================================

const productGrid = document.querySelector("#productGrid");
const pageHeading = document.querySelector("#pageHeading");
const headingButton = document.querySelector("#headingButton");
const featuredImage = document.querySelector("#featuredImage");
const changeImageButton = document.querySelector("#changeImageButton");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const productCount = document.querySelector("#productCount");
const cartMessage = document.querySelector("#cartMessage");

// ==================================================
// LOAD PRODUCTS USING FETCH
// ==================================================

async function loadProducts() {
    if (!productGrid) {
        return;
    }

    productGrid.textContent = "Loading products...";

    try {
        const response = await fetch("data/products.json");

        // fetch() does not automatically reject for HTTP 404 errors.
        if (!response.ok) {
            throw new Error(
                "Failed to load products. HTTP status: " + response.status
            );
        }

        shopProducts = await response.json();

        if (!Array.isArray(shopProducts)) {
            throw new Error("The products JSON must contain an array.");
        }

        renderProducts(shopProducts);
        showProductArrayAnalysis();
    } catch (error) {
        console.error("Product loading error:", error);
        productGrid.textContent =
            "Unable to load products. Please check the JSON file and server.";
    }
}

// ==================================================
// DAY 1: DOM MANIPULATION
// ==================================================

if (headingButton && pageHeading) {
    headingButton.addEventListener("click", function () {
        pageHeading.textContent = "Welcome to EL Herbs and Spices!";
    });
}

if (changeImageButton && featuredImage) {
    let showTurmeric = false;

    changeImageButton.addEventListener("click", function () {
        showTurmeric = !showTurmeric;

        if (showTurmeric) {
            featuredImage.setAttribute("src", "images/turmeric.jpg");
            featuredImage.setAttribute("alt", "Turmeric powder");
        } else {
            featuredImage.setAttribute("src", "images/cardamom.jpg");
            featuredImage.setAttribute("alt", "Cardamom");
        }
    });
}

// ==================================================
// RENDER PRODUCT CARDS
// ==================================================

function renderProducts(products) {
    if (!productGrid) {
        return;
    }

    productGrid.textContent = "";

    products.forEach(function (product) {
        const card = document.createElement("article");
        card.classList.add("product-card");

        if (product.stock === 0) {
            card.classList.add("out-of-stock");
        }

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = "₹" + product.price + " per 100g";

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const stock = document.createElement("p");
        stock.classList.add("stock-status");
        stock.textContent = product.stock > 0
            ? "In stock: " + product.stock
            : "Out of stock";

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Cart";
        addButton.disabled = product.stock <= 0;

        addButton.addEventListener("click", function (event) {
            console.log("Cart event:", event);

            // Store product name and quantity in the cart.
            const existingItem = cart.find(function (item) {
                return item.name === product.name;
            });

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            saveCart();

            if (cartMessage) {
                cartMessage.textContent =
                    product.name + " added to your cart. Cart saved!";
            }

            console.log("Current cart:", cart);
        });

        card.append(name, price, category, stock, addButton);
        productGrid.appendChild(card);

        card.addEventListener("mouseenter", function () {
            card.classList.add("zoom");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("zoom");
        });
    });

    if (productCount) {
        productCount.textContent =
            "Showing " + products.length + " of " +
            shopProducts.length + " products";
    }
}

// ==================================================
// DAY 1: SEARCH AND CATEGORY FILTER
// ==================================================

function filterProducts() {
    if (!productGrid) {
        return;
    }

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const filteredProducts = shopProducts.filter(function (product) {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            filterProducts();
        }

        if (event.key === "Escape") {
            searchInput.value = "";
            filterProducts();
        }
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

// ==================================================
// DAY 4: PRODUCT ARRAY METHODS
// ==================================================

function showProductArrayAnalysis() {
    const output = document.querySelector("#productArrayResults");

    if (!output) {
        return;
    }

    const names = shopProducts.map(function (product) {
        return product.name;
    });

    const inStock = shopProducts.filter(function (product) {
        return product.stock > 0;
    });

    const totalStockValue = shopProducts.reduce(function (total, product) {
        return total + product.price * product.stock;
    }, 0);

    const hasOutOfStock = shopProducts.some(function (product) {
        return product.stock === 0;
    });

    const allPricesValid = shopProducts.every(function (product) {
        return product.price >= 0;
    });

    const results = [
        "Names (map): " + names.join(", "),
        "In-stock products (filter): " +
            inStock.map(function (product) {
                return product.name;
            }).join(", "),
        "Total stock value (reduce): ₹" + totalStockValue,
        "Any out of stock? (some): " + hasOutOfStock,
        "All prices valid? (every): " + allPricesValid
    ];

    output.textContent = "";

    results.forEach(function (text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        output.appendChild(paragraph);
    });
}

// ==================================================
// DAY 4: STUDENT ARRAY METHODS
// ==================================================

const students = [
    { name: "Anu", roll: 1, mark: 85 },
    { name: "Binu", roll: 2, mark: 42 },
    { name: "Chitra", roll: 3, mark: 92 },
    { name: "Deepa", roll: 4, mark: 68 },
    { name: "Ebin", roll: 5, mark: 35 }
];

const studentResults = document.querySelector("#studentResults");

if (studentResults) {
    const names = students.map(function (student) {
        return student.name;
    });

    const passed = students.filter(function (student) {
        return student.mark >= 40;
    });

    const total = students.reduce(function (sum, student) {
        return sum + student.mark;
    }, 0);

    const highestMark = students.reduce(function (highest, student) {
        return student.mark > highest ? student.mark : highest;
    }, 0);

    const topper = students.find(function (student) {
        return student.mark === highestMark;
    });

    const anyFailed = students.some(function (student) {
        return student.mark < 40;
    });

    const everyonePassed = students.every(function (student) {
        return student.mark >= 40;
    });

    const keys = Object.keys(students[0]);
    const entries = Object.entries(students[0]);

    const results = [
        "Names: " + names.join(", "),
        "Passed: " + passed.map(function (student) {
            return student.name;
        }).join(", "),
        "Total marks: " + total,
        "Average: " + (total / students.length).toFixed(2),
        "Topper: " + topper.name + " (" + topper.mark + ")",
        "Any failed? " + anyFailed,
        "Everyone passed? " + everyonePassed,
        "Object.keys: " + keys.join(", "),
        "Object.entries: " + entries.map(function (entry) {
            return entry[0] + ": " + entry[1];
        }).join(" | ")
    ];

    results.forEach(function (text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        studentResults.appendChild(paragraph);
    });
}

// ==================================================
// DAY 2 AND DAY 5: CUSTOMER ENQUIRY VALIDATION
// ==================================================

const enquiryForm = document.querySelector("#enquiryForm");

if (enquiryForm) {
    const nameInput = document.querySelector("#customerName");
    const emailInput = document.querySelector("#customerEmail");
    const passwordInput = document.querySelector("#customerPassword");
    const confirmPasswordInput = document.querySelector("#confirmPassword");
    const phoneInput = document.querySelector("#customerPhone");
    const messageInput = document.querySelector("#customerMessage");
    const formMessage = document.querySelector("#formMessage");

    const errorFields = {
        customerName: document.querySelector("#nameError"),
        customerEmail: document.querySelector("#emailError"),
        customerPassword: document.querySelector("#passwordError"),
        confirmPassword: document.querySelector("#confirmPasswordError"),
        customerPhone: document.querySelector("#phoneError"),
        customerMessage: document.querySelector("#messageError")
    };

    function checkPasswordMatch() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }

    function validateField(input) {
        const errorElement = errorFields[input.id];

        if (!errorElement) {
            return true;
        }

        let message = "";

        if (input.validity.valueMissing) {
            message = "This field is required.";
        } else if (input.id === "customerName" && !input.value.trim()) {
            message = "Please enter your name.";
        } else if (input.id === "customerEmail") {
            if (input.validity.typeMismatch ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                message = "Enter a valid email address.";
            }
        } else if (input.id === "customerPassword" &&
                   input.value.length < 8) {
            message = "Password must contain at least 8 characters.";
        } else if (input.id === "confirmPassword" &&
                   input.value !== passwordInput.value) {
            message = "Passwords do not match.";
        } else if (input.id === "customerPhone" &&
                   !/^\d{10}$/.test(input.value.trim())) {
            message = "Enter exactly 10 digits.";
        } else if (input.id === "customerMessage" &&
                   !input.value.trim()) {
            message = "Please enter a message.";
        }

        errorElement.textContent = message;
        input.classList.toggle("invalid", message !== "");
        input.classList.toggle("valid", message === "");

        return message === "";
    }

    const formInputs = [
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        phoneInput,
        messageInput
    ];

    formInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input === passwordInput ||
                input === confirmPasswordInput) {
                checkPasswordMatch();

                if (confirmPasswordInput.value !== "") {
                    validateField(confirmPasswordInput);
                }
            }

            validateField(input);

            if (formMessage) {
                formMessage.textContent = "";
            }
        });
    });

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        checkPasswordMatch();

        let valid = true;

        formInputs.forEach(function (input) {
            if (!validateField(input)) {
                valid = false;
            }
        });

        if (!enquiryForm.checkValidity()) {
            valid = false;
        }

        if (!valid) {
            formMessage.textContent =
                "Please correct the errors before submitting.";
            return;
        }

        formMessage.textContent =
            "Validation successful! This demo does not send data to a server.";

        enquiryForm.reset();
    });

    enquiryForm.addEventListener("reset", function () {
        setTimeout(function () {
            formInputs.forEach(function (input) {
                input.classList.remove("valid", "invalid");
            });

            Object.values(errorFields).forEach(function (element) {
                element.textContent = "";
            });

            if (formMessage) {
                formMessage.textContent = "";
            }

            confirmPasswordInput.setCustomValidity("");
        }, 0);
    });
}

// ==================================================
// DAY 5: SAFE TEXT RENDERING
// ==================================================

const safeTextInput = document.querySelector("#safeTextInput");
const safeTextOutput = document.querySelector("#safeTextOutput");

if (safeTextInput && safeTextOutput) {
    safeTextInput.addEventListener("input", function () {
        // textContent displays user input as text, not executable HTML.
        safeTextOutput.textContent = safeTextInput.value;
    });
}

// ==================================================
// DAY 3: ADMIN TASK LIST
// ==================================================

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const taskFeedback = document.querySelector("#taskFeedback");

if (taskForm && taskInput && taskList && taskCount && taskFeedback) {
    function updateTaskCounter() {
        taskCount.textContent = taskList.children.length;
    }

    function addTask(text) {
        const cleanedText = text.trim();

        if (cleanedText === "") {
            taskFeedback.textContent = "Please enter a task first.";
            return;
        }

        const item = document.createElement("li");
        item.classList.add("task-item");

        const label = document.createElement("span");
        label.classList.add("task-text");
        label.textContent = cleanedText;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-task-button");
        deleteButton.textContent = "Delete";

        item.append(label, deleteButton);
        taskList.appendChild(item);

        taskInput.value = "";
        taskFeedback.textContent = "Task added successfully.";
        updateTaskCounter();
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask(taskInput.value);
    });

    taskList.addEventListener("click", function (event) {
        const button = event.target.closest(".delete-task-button");

        if (!button || !taskList.contains(button)) {
            return;
        }

        const item = button.closest(".task-item");

        if (item) {
            item.remove();
            taskFeedback.textContent = "Task deleted.";
            updateTaskCounter();
        }
    });

    updateTaskCounter();
}

// Load products only after event handlers have been registered.
loadProducts();
