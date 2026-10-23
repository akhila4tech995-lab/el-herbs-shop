
/* =============================================
   EL HERBS AND SPICES SHOP
   WEEK 2 - DAYS 1, 2 AND 3
   DOM, EVENTS AND EVENT DELEGATION
============================================= */


/* =============================================
   PRODUCT DATA
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
   DAYS 1 AND 2: SHOP PAGE
============================================= */

// This code runs only when productGrid exists.
// It prevents errors on the separate admin page.

const productGrid = document.querySelector("#productGrid");

if (productGrid) {

    /* Select shop page elements */

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


    /* DAY 1: Change heading and toggle CSS class */

    headingButton.addEventListener("click", function () {
        pageHeading.textContent = "Explore Our Herbs and Spices";

        pageHeading.classList.toggle("highlight-heading");
    });


    /* DAY 1: Change image using setAttribute() */

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


    /* Render products */

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

            /* DAY 2: Add to Cart button */

            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.classList.add("shop-button");
            addButton.textContent = "Add to Cart";

            if (product.stock === 0) {
                addButton.disabled = true;
                addButton.textContent = "Unavailable";
            }

            addButton.addEventListener("click", function (event) {
                console.log("Add to Cart event:", event);
                console.log("Event type:", event.type);
                console.log("Event target:", event.target);
                console.log("Event key:", event.key);

                cartMessage.textContent =
                    product.name +
                    " selected! This is a demo; no order was saved.";
            });

            /* DAY 2: Hover events */

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

            card.appendChild(icon);
            card.appendChild(name);
            card.appendChild(category);
            card.appendChild(price);
            card.appendChild(stock);
            card.appendChild(addButton);

            productGrid.appendChild(card);
        }
    }


    /* DAY 2: Search and category filter */

    function filterProducts() {
        const searchTerm =
            searchInput.value.trim().toLowerCase();

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

    searchInput.addEventListener("input", filterProducts);

    categoryFilter.addEventListener("change", filterProducts);


    /* DAY 2: Enter and Escape keyboard events */

    searchInput.addEventListener("keydown", function (event) {
        console.log("Keyboard event:", event);
        console.log("Event type:", event.type);
        console.log("Event target:", event.target);
        console.log("Event key:", event.key);

        if (event.key === "Enter") {
            filterProducts();

            cartMessage.textContent =
                "Search applied for: " + searchInput.value;
        }

        if (event.key === "Escape") {
            searchInput.value = "";

            filterProducts();

            cartMessage.textContent = "Search box cleared.";
        }
    });


    /* DAY 2: Form submission */

    enquiryForm.addEventListener("submit", function (event) {
        console.log("Form submit event:", event);
        console.log("Event type:", event.type);
        console.log("Event target:", event.target);
        console.log("Event key:", event.key);

        // Prevent the default form submission and page reload.
        event.preventDefault();

        formMessage.textContent =
            "Thank you! The form was checked, but no enquiry was sent to a server.";

        enquiryForm.reset();
    });


    // Display all products when the shop page opens.
    renderProducts(shopProducts);
}


/* =============================================
   DAY 3: ADMIN TASK LIST
============================================= */

// These elements exist only in admin.html.

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const taskFeedback = document.querySelector("#taskFeedback");


if (taskForm && taskInput && taskList && taskCount && taskFeedback) {

    /* Update the counter */

    function updateTaskCounter() {
        // Read the actual number of list items.
        // This avoids accidentally concatenating strings.
        const totalTasks = taskList.children.length;

        taskCount.textContent = totalTasks;
    }


    /* TASK 1: Add a new task */

    function addTask(taskText) {
        const cleanedText = taskText.trim();

        // Ignore empty or whitespace-only input.
        if (cleanedText === "") {
            taskFeedback.textContent = "Please enter a task first.";
            return;
        }

        // Create a new list item.
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        // Add task text safely using textContent.
        const taskLabel = document.createElement("span");
        taskLabel.classList.add("task-text");
        taskLabel.textContent = cleanedText;

        // Create the Delete button.
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-task-button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", "Delete task: " + cleanedText);

        // Put the text and button inside the list item.
        listItem.appendChild(taskLabel);
        listItem.appendChild(deleteButton);

        // Add the new item to the parent list.
        taskList.appendChild(listItem);

        // Clear the input and update the counter.
        taskInput.value = "";
        taskFeedback.textContent = "Task added successfully.";

        updateTaskCounter();

        taskInput.focus();
    }


    // Add tasks when the form is submitted.
    // This also allows the user to press Enter in the input.
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addTask(taskInput.value);
    });


    /* =========================================
       TASK 2: EVENT DELEGATION FOR DELETE
    ========================================= */

    /*
    We attach ONE click listener to the parent taskList.

    When a Delete button is clicked, the event bubbles up
    from the button to taskList. We identify the clicked
    Delete button and remove its parent list item.

    This works even for task items created later.
    */

    taskList.addEventListener("click", function (event) {
        console.log("Task list click event:", event);
        console.log("Event type:", event.type);
        console.log("Event target:", event.target);
        console.log("Event key:", event.key);

        // Check whether the click came from a Delete button.
        const deleteButton = event.target.closest(".delete-task-button");

        if (!deleteButton || !taskList.contains(deleteButton)) {
            return;
        }

        // Find and remove the corresponding task item.
        const taskItem = deleteButton.closest(".task-item");

        if (taskItem) {
            taskItem.remove();

            taskFeedback.textContent = "Task deleted successfully.";

            // Update the counter after deletion.
            updateTaskCounter();
        }
    });


    // Initialise the counter when the admin page opens.
    updateTaskCounter();

    console.log("Week 2 Day 3: Admin task list is ready.");
}


/* =============================================
   SELECTOR AND SECURITY NOTES
============================================= */

/*
ID selector:
document.querySelector("#taskList");

Class selector:
document.querySelector(".task-item");

querySelectorAll() returns a NodeList, not one element.
Loop through it to apply styles to all matching elements.

textContent displays plain text.
innerHTML interprets strings as HTML.

Use textContent for user-provided text to avoid inserting
untrusted HTML and introducing an XSS security risk.
*/
