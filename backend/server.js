
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "..")));

// Load existing products
const products = require("../data/products.json");

// Check server status
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "EL Herbs and Spices Shop API is running"
    });
});

// Get all products
app.get("/api/products", (req, res) => {
    res.status(200).json(products);
});

// Add a product with validation
app.post("/api/products", (req, res) => {
    const { name, price, category } = req.body;

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name is required."
        });
    }

    if (
        price === undefined ||
        price === null ||
        price === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Price must be a valid non-negative number."
        });
    }

    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product category is required."
        });
    }

    const newProduct = {
        id: Date.now(),
        name: name.trim(),
        price: Number(price),
        category: category.trim()
    };

    // Temporary in-memory storage
    products.push(newProduct);

    return res.status(201).json({
        success: true,
        message: "Product added successfully.",
        product: newProduct
    });
});

// Handle unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body."
        });
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: "An internal server error occurred."
    });
});

app.listen(PORT, () => {
    console.log(`Shop website: http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Products API: http://localhost:${PORT}/api/products`);
});

