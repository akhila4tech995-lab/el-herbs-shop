
const API_URL = "http://localhost:3000/api/tasks";

// Get all tasks from the server
async function getTasks() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to load tasks");
    }

    return await response.json();
}

// Add a new task to the server
async function addTask(text) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    if (!response.ok) {
        throw new Error("Failed to add task");
    }

    return await response.json();
}

// Delete a task from the server
async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    if (response.status === 204) {
        return true;
    }

    return await response.json();
}
