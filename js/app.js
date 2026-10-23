
"use strict";

// ==================================================
// PRODUCT DATA
// ==================================================

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

// ==================================================
// SHOP PAGE: DAY 1, DAY 2 AND DAY 4
// ==================================================

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

    // Build product cards dynamically using createElement().
    function renderProducts(products) {
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

            const cartButton = document.createElement("button");
            cartButton.type = "button";
            cartButton.textContent = "Add to Cart";
            cartButton.disabled = product.stock === 0;

            cartButton.addEventListener("click", function (event) {
                console.log("Cart event:", event);
                console.log("Event type:", event.type);
                console.log("Event target:", event.target);

                if (cartMessage) {
                    cartMessage.textContent =
                        product.name + " added to your demo cart!";
                }
            });

            card.append(name, price, category, stock, cartButton);
            productGrid.appendChild(card);

            card.addEventListener("mouseenter", function (event) {
                console.log("Mouse event:", event);
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

    // Day 4: Combine search and category filtering.
    function filterProducts() {
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
            console.log("Keyboard event:", event);
            console.log("Pressed key:", event.key);

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

    renderProducts(shopProducts);

    // Day 4: Product array methods.
    const productArrayResults =
        document.querySelector("#productArrayResults");

    if (productArrayResults) {
        const productNames = shopProducts.map(function (product) {
            return product.name;
        });

        const inStockProducts = shopProducts.filter(function (product) {
            return product.stock > 0;
        });

        const totalStockValue = shopProducts.reduce(function (total, product) {
            return total + product.price * product.stock;
        }, 0);

        const hasOutOfStockProduct = shopProducts.some(function (product) {
            return product.stock === 0;
        });

        const allPricesValid = shopProducts.every(function (product) {
            return product.price >= 0;
        });

        const results = [
            "Names (map): " + productNames.join(", "),
            "In stock (filter): " +
                inStockProducts.map(function (product) {
                    return product.name;
                }).join(", "),
            "Total stock value (reduce): ₹" + totalStockValue,
            "Any out of stock? (some): " + hasOutOfStockProduct,
            "All prices valid? (every): " + allPricesValid
        ];

        results.forEach(function (result) {
            const paragraph = document.createElement("p");
            paragraph.textContent = result;
            productArrayResults.appendChild(paragraph);
        });

        console.log("Product names:", productNames);
        console.log("In-stock products:", inStockProducts);
        console.log("Total stock value:", totalStockValue);
    }
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
    const studentNames = students.map(function (student) {
        return student.name;
    });

    const passedStudents = students.filter(function (student) {
        return student.mark >= 40;
    });

    const totalMarks = students.reduce(function (total, student) {
        return total + student.mark;
    }, 0);

    const averageMark = totalMarks / students.length;

    // Day 4: find() returns the student with the highest mark.
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

    const sampleStudent = students[0];
    const studentKeys = Object.keys(sampleStudent);
    const studentEntries = Object.entries(sampleStudent);

    const results = [
        "Names (map): " + studentNames.join(", "),
        "Passed (filter): " +
            passedStudents.map(function (student) {
                return student.name;
            }).join(", "),
        "Total marks (reduce): " + totalMarks,
        "Average mark: " + averageMark.toFixed(2),
        "Topper (find): " + topper.name + " — " + topper.mark,
        "Any failed? (some): " + anyFailed,
        "Everyone passed? (every): " + everyonePassed,
        "Object.keys: " + studentKeys.join(", "),
        "Object.entries: " +
            studentEntries.map(function (entry) {
                return entry[0] + ": " + entry[1];
            }).join(" | ")
    ];

    results.forEach(function (result) {
        const paragraph = document.createElement("p");
        paragraph.textContent = result;
        studentResults.appendChild(paragraph);
    });

    console.log("Students:", students);
    console.log("Names:", studentNames);
    console.log("Passed students:", passedStudents);
    console.log("Total:", totalMarks);
    console.log("Average:", averageMark);
    console.log("Topper:", topper);
    console.log("Object.keys:", studentKeys);
    console.log("Object.entries:", studentEntries);
}

// ==================================================
// DAY 5: FORM VALIDATION
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

    // Check each field and display its own error message.
    function validateField(input) {
        const errorElement = errorFields[input.id];

        if (!errorElement) return true;

        let errorText = "";

        // Day 5: Constraint Validation API.
        // validity.valueMissing means a required field is empty.
        if (input.validity.valueMissing) {
            errorText = "This field is required.";
        } else if (input.id === "customerName") {
            if (input.value.trim() === "") {
                errorText = "Please enter your name.";
            }
        } else if (input.id === "customerEmail") {
            if (input.validity.typeMismatch) {
                errorText = "Enter a valid email address.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                errorText = "Enter an email like name@example.com.";
            }
        } else if (input.id === "customerPassword") {
            if (input.value.length < 8) {
                errorText = "Password must contain at least 8 characters.";
            }
        } else if (input.id === "confirmPassword") {
            if (input.value !== passwordInput.value) {
                errorText = "Passwords do not match.";
            }
        } else if (input.id === "customerPhone") {
            if (!/^\d{10}$/.test(input.value.trim())) {
                errorText = "Enter exactly 10 digits.";
            }
        } else if (input.id === "customerMessage") {
            if (input.value.trim() === "") {
                errorText = "Please enter a message.";
            }
        }

        errorElement.textContent = errorText;

        input.classList.toggle("invalid", errorText !== "");
        input.classList.toggle("valid", errorText === "");

        return errorText === "";
    }

    // Day 5: setCustomValidity() adds a custom browser validation message.
    function checkPasswordMatch() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }

    const inputsToValidate = [
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        phoneInput,
        messageInput
    ];

    // Live feedback as the user types.
    inputsToValidate.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input === passwordInput || input === confirmPasswordInput) {
                checkPasswordMatch();

                // Recheck both password fields when either one changes.
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

    // addEventListener() keeps event logic separate from HTML.
    // preventDefault() stops the browser's default form submission.
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        checkPasswordMatch();

        let formIsValid = true;

        inputsToValidate.forEach(function (input) {
            if (!validateField(input)) {
                formIsValid = false;
            }
        });

        // Also check the browser's built-in validation state.
        if (!enquiryForm.checkValidity()) {
            formIsValid = false;
        }

        if (!formIsValid) {
            formMessage.textContent =
                "Please correct the errors before submitting.";
            return;
        }

        formMessage.textContent =
            "Validation successful! This demo does not send your data to a server.";

        console.log("Form validation successful.");
        enquiryForm.reset();

        inputsToValidate.forEach(function (input) {
            input.classList.remove("valid", "invalid");
        });

        Object.values(errorFields).forEach(function (errorElement) {
            errorElement.textContent = "";
        });

        confirmPasswordInput.setCustomValidity("");
    });

    // Clear validation styling and messages when resetting the form.
    enquiryForm.addEventListener("reset", function () {
        setTimeout(function () {
            inputsToValidate.forEach(function (input) {
                input.classList.remove("valid", "invalid");
            });

            Object.values(errorFields).forEach(function (errorElement) {
                errorElement.textContent = "";
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
    safeTextInput.addEventListener("input", function (event) {
        console.log("Text input event:", event);

        // Safe: displays the user's input as ordinary text.
        safeTextOutput.textContent = safeTextInput.value;
    });
}

// ==================================================
// DAY 3: ADMIN TASK LIST AND EVENT DELEGATION
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

    function addTask(taskText) {
        const cleanedText = taskText.trim();

        if (cleanedText === "") {
            taskFeedback.textContent = "Please enter a task first.";
            return;
        }

        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        const textElement = document.createElement("span");
        textElement.classList.add("task-text");
        textElement.textContent = cleanedText;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-task-button");
        deleteButton.textContent = "Delete";

        listItem.append(textElement, deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        taskFeedback.textContent = "Task added successfully.";
        updateTaskCounter();
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask(taskInput.value);
    });

    // One parent listener handles Delete buttons created later.
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
