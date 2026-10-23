
"use strict";

// ==========================================
// 1. SHARED VARIABLES
// ==========================================

let shopProducts = [];
let cart = [];

const CART_STORAGE_KEY = "elHerbsShopCart";

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const loadingMessage = document.getElementById("loadingMessage");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchButton");
const clearSearchButton = document.getElementById("clearSearchButton");
const searchStatus = document.getElementById("searchStatus");


// ==========================================
// 2. LOAD CART FROM LOCAL STORAGE
// ==========================================

function loadSavedCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (savedCart === null) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      throw new Error("Saved cart data is not an array.");
    }

    return parsedCart;
  } catch (error) {
    console.error("Could not load saved cart:", error.name, error.message);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Could not save cart:", error.name, error.message);
  }
}

cart = loadSavedCart();


// ==========================================
// 3. LOAD PRODUCTS USING FETCH + ASYNC/AWAIT
// ==========================================

async function loadProducts() {
  if (loadingMessage) {
    loadingMessage.textContent = "Loading products...";
    loadingMessage.hidden = false;
  }

  if (productGrid) {
    productGrid.innerHTML = "<p>Loading products...</p>";
  }

  if (productCount) {
    productCount.textContent = "";
  }

  if (searchStatus) {
    searchStatus.textContent = "";
  }

  if (searchButton) {
    searchButton.disabled = true;
  }

  try {
    const response = await fetch("data/products.json");

    // fetch does not automatically throw for HTTP errors such as 404.
    if (!response.ok) {
      throw new Error(
        `Could not load products. HTTP status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The product JSON must contain an array.");
    }

    shopProducts = data;

    renderCategoryOptions();
    renderProducts(shopProducts);
    renderPriceTable();
    analyseProducts();
    displayStudentResults();
    renderCart();

    if (searchStatus) {
      searchStatus.textContent = `Loaded ${shopProducts.length} products successfully.`;
    }
  } catch (error) {
    console.error("Product loading failed:", error.name, error.message);

    if (productGrid) {
      productGrid.textContent =
        "Sorry, products could not be loaded. Check your connection, JSON file, and browser Console.";
    }

    if (productCount) {
      productCount.textContent = "Product list unavailable.";
    }

    if (searchStatus) {
      searchStatus.textContent = "Could not load products. Please try again.";
    }
  } finally {
    // finally runs whether the request succeeds or fails.
    if (loadingMessage) {
      loadingMessage.hidden = true;
    }

    if (searchButton) {
      searchButton.disabled = false;
    }

    console.log("Product loading process finished.");
  }
}


// ==========================================
// 4. DISPLAY CATEGORY OPTIONS
// ==========================================

function renderCategoryOptions() {
  if (!categoryFilter) return;

  const previousCategory = categoryFilter.value || "all";
  const categories = [
    ...new Set(shopProducts.map((product) => product.category))
  ];

  categoryFilter.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All categories";
  categoryFilter.appendChild(allOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  if (categories.includes(previousCategory)) {
    categoryFilter.value = previousCategory;
  } else {
    categoryFilter.value = "all";
  }
}


// ==========================================
// 5. RENDER PRODUCT CARDS
// ==========================================

function renderProducts(products) {
  if (!productGrid) return;

  productGrid.replaceChildren();

  if (products.length === 0) {
    productGrid.textContent = "No matches found.";
    if (productCount) {
      productCount.textContent = "Showing 0 products.";
    }
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;

    const price = document.createElement("p");
    price.textContent = `Price per 100g: ₹${product.price}`;

    const stock = document.createElement("p");
    stock.textContent = `Stock: ${product.stock}`;

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Add to Cart";

    addButton.addEventListener("click", () => {
      addToCart(product);
    });

    card.append(title, category, price, stock, addButton);
    productGrid.appendChild(card);
  });

  if (productCount) {
    productCount.textContent =
      `Showing ${products.length} of ${shopProducts.length} products.`;
  }
}


// ==========================================
// 6. SEARCH WITH LOADING, CATCH AND FINALLY
// ==========================================

async function searchProducts() {
  if (!searchButton || !searchStatus) return;

  searchButton.disabled = true;
  searchStatus.textContent = "Searching products...";

  if (productGrid) {
    productGrid.setAttribute("aria-busy", "true");
  }

  try {
    // Allow the browser to show the status message before searching.
    await Promise.resolve();

    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    const selectedCategory = categoryFilter
      ? categoryFilter.value
      : "all";

    const matchingProducts = shopProducts.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesName && matchesCategory;
    });

    renderProducts(matchingProducts);

    if (matchingProducts.length === 0) {
      searchStatus.textContent = "No matches found. Try another search.";
    } else {
      searchStatus.textContent =
        `Found ${matchingProducts.length} matching product(s).`;
    }
  } catch (error) {
    console.error("Search failed:", error.name, error.message);
    searchStatus.textContent =
      "Something went wrong during search. Check the Console.";
  } finally {
    // Always restore the button and busy state.
    searchButton.disabled = false;

    if (productGrid) {
      productGrid.removeAttribute("aria-busy");
    }

    console.log("Search process finished.");
  }
}

if (searchButton) {
  searchButton.addEventListener("click", searchProducts);
}

if (searchInput) {
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchProducts();
    }

    if (event.key === "Escape") {
      searchInput.value = "";
      searchProducts();
    }
  });
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", searchProducts);
}

if (clearSearchButton) {
  clearSearchButton.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "all";
    searchProducts();
  });
}


// ==========================================
// 7. CART OPERATIONS
// ==========================================

function addToCart(product) {
  const existingItem = cart.find((item) => item.name === product.name);

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
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  const cartMessage = document.getElementById("cartMessage");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartList || !cartMessage || !cartTotal) return;

  cartList.replaceChildren();

  if (cart.length === 0) {
    cartMessage.textContent = "Your cart is empty.";
  } else {
    cartMessage.textContent = `You have ${cart.length} product type(s) in your cart.`;
  }

  let total = 0;

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    listItem.textContent =
      `${item.name} — ₹${item.price} × ${item.quantity} = ₹${itemTotal}`;

    cartList.appendChild(listItem);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

const clearCartButton = document.getElementById("clearCartButton");

if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });
}


// ==========================================
// 8. PRICE TABLE
// ==========================================

function renderPriceTable() {
  const tableBody = document.getElementById("priceTableBody");
  if (!tableBody) return;

  tableBody.replaceChildren();

  shopProducts.forEach((product) => {
    const row = document.createElement("tr");

    [product.name, product.category, `₹${product.price}`, product.stock]
      .forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = String(value);
        row.appendChild(cell);
      });

    tableBody.appendChild(row);
  });
}


// ==========================================
// 9. ARRAY METHODS PRACTICE
// ==========================================

function analyseProducts() {
  const results = document.getElementById("productArrayResults");
  if (!results) return;

  if (shopProducts.length === 0) {
    results.textContent = "No products available for analysis.";
    return;
  }

  const productNames = shopProducts.map((product) => product.name);

  const lowStockProducts = shopProducts.filter(
    (product) => Number(product.stock) < 20
  );

  const totalPrice = shopProducts.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  const affordableProduct = shopProducts.find(
    (product) => Number(product.price) < 70
  );

  const anyOutOfStock = shopProducts.some(
    (product) => Number(product.stock) === 0
  );

  const allHaveNames = shopProducts.every(
    (product) => typeof product.name === "string" && product.name.length > 0
  );

  results.textContent = [
    `Product names: ${productNames.join(", ")}`,
    `Products with stock below 20: ${
      lowStockProducts.map((product) => product.name).join(", ") || "None"
    }`,
    `Sum of listed prices: ₹${totalPrice}`,
    `First product priced below ₹70: ${
      affordableProduct ? affordableProduct.name : "None"
    }`,
    `Any product out of stock: ${anyOutOfStock}`,
    `All products have names: ${allHaveNames}`,
    `Product object keys: ${
      Object.keys(shopProducts[0]).join(", ")
    }`,
    `First product entries: ${
      Object.entries(shopProducts[0])
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ")
    }`
  ].join("\n");
}


// ==========================================
// 10. STUDENT ARRAY PRACTICE
// ==========================================

function displayStudentResults() {
  const results = document.getElementById("studentResults");
  if (!results) return;

  const students = [
    { name: "Anu", mark: 85 },
    { name: "Ravi", mark: 62 },
    { name: "Meera", mark: 91 },
    { name: "Arun", mark: 48 }
  ];

  const passedStudents = students.filter((student) => student.mark >= 50);

  const studentNames = students.map((student) => student.name);

  const totalMarks = students.reduce(
    (sum, student) => sum + student.mark,
    0
  );

  results.textContent = [
    `Students: ${studentNames.join(", ")}`,
    `Passed: ${passedStudents.map((student) => student.name).join(", ")}`,
    `Total marks: ${totalMarks}`,
    `Average marks: ${(totalMarks / students.length).toFixed(2)}`
  ].join("\n");
}


// ==========================================
// 11. FORM VALIDATION
// ==========================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  const fieldRules = [
    {
      id: "customerName",
      errorId: "customerNameError",
      validate: (value) =>
        value.trim().length >= 2 ? "" : "Enter at least 2 characters."
    },
    {
      id: "customerEmail",
      errorId: "customerEmailError",
      validate: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Enter a valid email address."
    },
    {
      id: "customerPassword",
      errorId: "customerPasswordError",
      validate: (value) =>
        value.length >= 8 ? "" : "Password must have at least 8 characters."
    },
    {
      id: "confirmPassword",
      errorId: "confirmPasswordError",
      validate: (value) => {
        const password = document.getElementById("customerPassword").value;
        return value === password ? "" : "Passwords do not match.";
      }
    },
    {
      id: "customerPhone",
      errorId: "customerPhoneError",
      validate: (value) =>
        /^\d{10}$/.test(value.trim())
          ? ""
          : "Enter a 10-digit phone number."
    },
    {
      id: "customerMessage",
      errorId: "customerMessageError",
      validate: (value) =>
        value.trim().length > 0 ? "" : "Please enter a message."
    }
  ];

  function validateField(rule) {
    const field = document.getElementById(rule.id);
    const errorElement = document.getElementById(rule.errorId);

    if (!field || !errorElement) return true;

    const errorMessage = rule.validate(field.value);

    errorElement.textContent = errorMessage;
    field.classList.toggle("input-invalid", Boolean(errorMessage));
    field.classList.toggle("input-valid", !errorMessage);

    return !errorMessage;
  }

  fieldRules.forEach((rule) => {
    const field = document.getElementById(rule.id);

    if (field) {
      field.addEventListener("input", () => validateField(rule));
    }
  });

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = fieldRules
      .map((rule) => validateField(rule))
      .every(Boolean);

    const formMessage = document.getElementById("formMessage");

    if (allValid) {
      formMessage.textContent =
        "All fields are valid! This demo does not send your form to a server.";
    } else {
      formMessage.textContent = "Please correct the errors above.";
    }
  });
}


// ==========================================
// 12. SAFE TEXT DISPLAY
// ==========================================

const safeTextButton = document.getElementById("safeTextButton");

if (safeTextButton) {
  safeTextButton.addEventListener("click", () => {
    const input = document.getElementById("safeTextInput");
    const output = document.getElementById("safeTextOutput");

    if (input && output) {
      // textContent displays input as text instead of treating it as HTML.
      output.textContent = input.value;
    }
  });
}


// ==========================================
// 13. WELCOME MESSAGE AND IMAGE DEMO
// ==========================================

const headingButton = document.getElementById("headingButton");

if (headingButton) {
  headingButton.addEventListener("click", () => {
    const heading = document.getElementById("pageHeading");

    if (heading) {
      heading.textContent = "Fresh Herbs and Spices for Every Kitchen!";
    }
  });
}

const changeImageButton = document.getElementById("changeImageButton");

if (changeImageButton) {
  changeImageButton.addEventListener("click", () => {
    const image = document.getElementById("featuredImage");

    if (image) {
      image.alt = "Spices image demonstration";
      changeImageButton.textContent = "Image information updated";
    }
  });
}


// ==========================================
// 14. ADMIN TASK LIST
// ==========================================

const taskForm = document.getElementById("taskForm");

if (taskForm) {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");
  const taskFeedback = document.getElementById("taskFeedback");

  function updateTaskCount() {
    if (taskCount && taskList) {
      taskCount.textContent =
        `Total tasks: ${taskList.querySelectorAll("li").length}`;
    }
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (!taskText) {
      taskFeedback.textContent = "Please enter a task.";
      return;
    }

    const listItem = document.createElement("li");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskLabel.textContent = taskText;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "secondary-button";

    listItem.append(taskLabel, deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskFeedback.textContent = "Task added.";
    updateTaskCount();
  });

  if (taskList) {
    // Event delegation: one listener handles all Delete buttons.
    taskList.addEventListener("click", (event) => {
      if (event.target.matches("button")) {
        event.target.closest("li").remove();
        taskFeedback.textContent = "Task deleted.";
        updateTaskCount();
      }
    });
  }

  updateTaskCount();
}


// ==========================================
// 15. INTENTIONAL ERROR-HANDLING PRACTICE
// ==========================================

function practiseCaughtErrors() {
  try {
    const missingObject = null;
    console.log(missingObject.name);
  } catch (error) {
    console.error("Caught error:", error.name, "-", error.message);
  }

  try {
    console.log(dayTwoUnknownVariable);
  } catch (error) {
    console.error("Caught error:", error.name, "-", error.message);
  }
}

practiseCaughtErrors();


// ==========================================
// 16. START THE SHOP
// ==========================================

loadProducts();
