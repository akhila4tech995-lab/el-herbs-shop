
"use strict";

// SHOP PRODUCT DATA
const shopProducts = [
    { name: "Cardamom", price: 250, stock: 10, category: "Spice" },
    { name: "Turmeric", price: 60, stock: 15, category: "Powder" },
    { name: "Black Pepper", price: 120, stock: 8, category: "Spice" },
    { name: "Cinnamon", price: 80, stock: 0, category: "Spice" },
    { name: "Clove", price: 100, stock: 12, category: "Spice" },
    { name: "Ginger Powder", price: 70, stock: 6, category: "Powder" },
    { name: "Bay Leaf", price: 40, stock: 0, category: "Leaf" },
    { name: "Nutmeg", price: 90, stock: 5, category: "Spice" }
];

// --------------------------------------------------
// SHOP PAGE FEATURES
// This block runs only when productGrid exists.
// --------------------------------------------------

const productGrid = document.querySelector("#productGrid");

if (productGrid) {
    const pageHeading = document.querySelector("#pageHeading");
    const headingButton = document.querySelector("#headingButton");
    const featuredImage = document.querySelector("#featuredImage");
    const changeImageButton = document.querySelector("#changeImageButton");
    const searchInput = document.querySelector("#searchInput");
    const categoryFilter = document.querySelector("#categoryFilter");
    const productCount = document.querySelector("#productCount");
    const cartMessage = document.querySelector("#cartMessage");

    // Day 1: Change heading text with textContent.
    if (headingButton && pageHeading) {
        headingButton.addEventListener("click", function () {
            pageHeading.textContent = "Welcome to EL Herbs and Spices!";
        });
    }

    // Day 1: Change an image attribute with setAttribute.
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

    // Render product cards from an array.
    function renderProducts(list) {
        productGrid.textContent = "";

        list.forEach(function (product) {
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
            stock.textContent =
                product.stock > 0
                    ? "In stock: " + product.stock
                    : "Out of stock";

            const cartButton = document.createElement("button");
            cartButton.type = "button";
            cartButton.textContent = "Add to Cart";
            cartButton.disabled = product.stock === 0;

            // Event handler for each product's Add to Cart button.
            cartButton.addEventListener("click", function (event) {
                console.log("Cart click event:", event);
                console.log("Event type:", event.type);
                console.log("Event target:", event.target);

                if (cartMessage) {
                    cartMessage.textContent =
                        product.name + " added to your demo cart!";
                }
            });

            card.append(name, price, category, stock, cartButton);
            productGrid.appendChild(card);
        });

        if (productCount) {
            productCount.textContent =
                "Showing " + list.length + " of " +
                shopProducts.length + " products";
        }

        // Day 2: Hover over a card to add/remove the zoom class.
        const productCards = productGrid.querySelectorAll(".product-card");

        productCards.forEach(function (card) {
            card.addEventListener("mouseenter", function (event) {
                console.log("Mouse enter event:", event);
                card.classList.add("zoom");
            });

            card.addEventListener("mouseleave", function (event) {
                console.log("Mouse leave event:", event);
                card.classList.remove("zoom");
            });
        });
    }

    // Day 4: Use filter() to combine search and category selection.
    function filterProducts() {
        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedCategory = categoryFilter
            ? categoryFilter.value
            : "all";

        const filteredProducts = shopProducts.filter(function (product) {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        renderProducts(filteredProducts);
    }

    if (searchInput) {
        // Live filtering as the user types.
        searchInput.addEventListener("input", filterProducts);

        // Day 2: Enter filters; Escape clears the search field.
        searchInput.addEventListener("keydown", function (event) {
            console.log("Keyboard event:", event);
            console.log("Key pressed:", event.key);

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

    // Day 2: Enquiry form demo.
    const enquiryForm = document.querySelector("#enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Enquiry submit event:", event);

            const customerName = document.querySelector("#customerName");
            const customerEmail = document.querySelector("#customerEmail");
            const customerMessage = document.querySelector("#customerMessage");
            const formMessage = document.querySelector("#formMessage");

            const nameError = document.querySelector("#nameError");
            const emailError = document.querySelector("#emailError");
            const messageError = document.querySelector("#messageError");

            // Reset previous messages.
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (messageError) messageError.textContent = "";
            if (formMessage) formMessage.textContent = "";

            let isValid = true;

            if (!customerName.value.trim()) {
                if (nameError) nameError.textContent = "Please enter your name.";
                isValid = false;
            }

            if (!customerEmail.value.trim()) {
                if (emailError) emailError.textContent = "Please enter your email.";
                isValid = false;
            } else if (!customerEmail.validity.valid) {
                if (emailError) emailError.textContent = "Please enter a valid email.";
                isValid = false;
            }

            if (!customerMessage.value.trim()) {
                if (messageError) messageError.textContent = "Please enter a message.";
                isValid = false;
            }

            if (isValid && formMessage) {
                formMessage.textContent =
                    "Thank you, " + customerName.value.trim() +
                    "! Your demo enquiry is ready.";
                enquiryForm.reset();
            }
        });
    }

    // Day 4: Product array-method practice.
    function showProductArrayAnalysis() {
        const output = document.querySelector("#productArrayResults");

        if (!output) return;

        // map(): get an array containing product names.
        const productNames = shopProducts.map(function (product) {
            return product.name;
        });

        // filter(): keep only products that have stock.
        const inStockProducts = shopProducts.filter(function (product) {
            return product.stock > 0;
        });

        // reduce(): calculate the total stock value.
        // Stock value = price per 100g multiplied by stock quantity.
        const totalStockValue = shopProducts.reduce(function (total, product) {
            return total + product.price * product.stock;
        }, 0);

        // some(): check whether at least one product is out of stock.
        const hasOutOfStockProduct = shopProducts.some(function (product) {
            return product.stock === 0;
        });

        // every(): check whether every product has a non-negative price.
        const allPricesValid = shopProducts.every(function (product) {
            return product.price >= 0;
        });

        output.textContent = "";

        const results = [
            "Product names (map): " + productNames.join(", "),
            "In-stock products (filter): " +
                inStockProducts.map(function (product) {
                    return product.name;
                }).join(", "),
            "Total stock value (reduce): ₹" + totalStockValue,
            "Any product out of stock? (some): " + hasOutOfStockProduct,
            "Are all prices non-negative? (every): " + allPricesValid
        ];

        results.forEach(function (result) {
            const paragraph = document.createElement("p");
            paragraph.textContent = result;
            output.appendChild(paragraph);
        });

        console.log("Product names:", productNames);
        console.log("In-stock products:", inStockProducts);
        console.log("Total stock value:", totalStockValue);
        console.log("Any out of stock:", hasOutOfStockProduct);
        console.log("All prices valid:", allPricesValid);
    }

    // Initial render and array analysis.
    renderProducts(shopProducts);
    showProductArrayAnalysis();
}

// --------------------------------------------------
// DAY 4: STUDENT SCORE ARRAY METHODS
// --------------------------------------------------

const students = [
    { name: "Anu", roll: 1, mark: 85 },
    { name: "Binu", roll: 2, mark: 42 },
    { name: "Chitra", roll: 3, mark: 92 },
    { name: "Deepa", roll: 4, mark: 68 },
    { name: "Ebin", roll: 5, mark: 35 }
];

function showStudentAnalysis() {
    const output = document.querySelector("#studentResults");

    // Admin page doesn't contain this section, so safely stop.
    if (!output) return;

    // map(): collect student names.
    const studentNames = students.map(function (student) {
        return student.name;
    });

    // filter(): students who passed (mark 40 or above).
    const passedStudents = students.filter(function (student) {
        return student.mark >= 40;
    });

    // reduce(): calculate total marks.
    const totalMarks = students.reduce(function (total, student) {
        return total + student.mark;
    }, 0);

    const averageMark = totalMarks / students.length;

    // find(): find the student with the highest mark.
    const topper = students.reduce(function (best, student) {
        return student.mark > best.mark ? student : best;
    }, students[0]);

    // some(): check whether anyone failed.
    const anyFailed = students.some(function (student) {
        return student.mark < 40;
    });

    // every(): check whether everyone passed.
    const everyonePassed = students.every(function (student) {
        return student.mark >= 40;
    });

    // Object.keys() and Object.entries() on one student record.
    const sampleStudent = students[0];
    const studentKeys = Object.keys(sampleStudent);
    const studentEntries = Object.entries(sampleStudent);

    const results = [
        "Student names (map): " + studentNames.join(", "),
        "Students who passed (filter): " +
            passedStudents.map(function (student) {
                return student.name;
            }).join(", "),
        "Total marks (reduce): " + totalMarks,
        "Average mark: " + averageMark.toFixed(2),
        "Topper (find-style reduce): " + topper.name +
            " with " + topper.mark + " marks",
        "Has anyone failed? (some): " + anyFailed,
        "Did everyone pass? (every): " + everyonePassed,
        "First student's keys (Object.keys): " + studentKeys.join(", "),
        "First student's entries (Object.entries): " +
            studentEntries.map(function (entry) {
                return entry[0] + ": " + entry[1];
            }).join(" | ")
    ];

    output.textContent = "";

    results.forEach(function (result) {
        const paragraph = document.createElement("p");
        paragraph.textContent = result;
        output.appendChild(paragraph);
    });

    console.log("Student names:", studentNames);
    console.log("Passed students:", passedStudents);
    console.log("Total marks:", totalMarks);
    console.log("Average mark:", averageMark);
    console.log("Topper:", topper);
    console.log("Any failed:", anyFailed);
    console.log("Everyone passed:", everyonePassed);
    console.log("Object.keys:", studentKeys);
    console.log("Object.entries:", studentEntries);
}

showStudentAnalysis();

// --------------------------------------------------
// DAY 3: ADMIN TASK LIST
// Runs only on admin.html.
// --------------------------------------------------

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const taskFeedback = document.querySelector("#taskFeedback");

if (taskForm && taskInput && taskList && taskCount && taskFeedback) {
    function updateTaskCounter() {
        const totalTasks = taskList.children.length;
        taskCount.textContent = totalTasks;
    }

    function addTask(taskText) {
        const cleanedText = taskText.trim();

        if (cleanedText === "") {
            taskFeedback.textContent = "Please enter a task first.";
            return;
        }

        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        const taskTextElement = document.createElement("span");
        taskTextElement.classList.add("task-text");

        // textContent safely displays text without interpreting HTML.
        taskTextElement.textContent = cleanedText;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-task-button");
        deleteButton.textContent = "Delete";

        listItem.append(taskTextElement, deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        taskFeedback.textContent = "Task added successfully.";
        updateTaskCounter();
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask(taskInput.value);
    });

    // Event delegation: one click listener handles all Delete buttons,
    // including buttons created after this listener was registered.
    taskList.addEventListener("click", function (event) {
        const deleteButton = event.target.closest(".delete-task-button");

        if (!deleteButton || !taskList.contains(deleteButton)) {
            return;
        }

        const listItem = deleteButton.closest(".task-item");

        if (listItem) {
            listItem.remove();
            taskFeedback.textContent = "Task deleted.";
            updateTaskCounter();
        }
    });

    updateTaskCounter();
}
