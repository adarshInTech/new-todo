const API_URL = "http://localhost:4000/api/todos";

const fetchTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    displayTodos(todos.data);
  } catch (error) {
    console.error("Error fetching todos: ", error);
  }
};

// Display todos in the list
const displayTodos = (todos) => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clears existing todos

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    // Create the inner div
    const div = document.createElement("div");

    // Create and configure the checkbox
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.completed;
    input.addEventListener("change", () => toggleTodo(todo._id, input.checked));

    // Create the title span
    const span = document.createElement("span");
    span.textContent = todo.title;

    // Append checkbox and span to div
    div.appendChild(input);
    div.appendChild(span);

    // Create and configure the delete button
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click", () => deleteTodo(todo._id));

    // Append div and button to li
    li.appendChild(div);
    li.appendChild(button);

    // Append li to the list
    todoList.appendChild(li);
  });
};

// Add a new todo
document.getElementById("todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("todo-title").value.trim();

  if (!title) return;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });

    if (response.ok) {
      document.getElementById("todo-title").value = ""; // Clear input
      fetchTodos();
    } else {
      console.error("Failed to add todo:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
});

// Toggle todo completion
const toggleTodo = async (id, completed) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      fetchTodos();
    } else {
      console.error("Failed to update todo:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating todos:", error);
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTodos(); // Refresh list
    } else {
      console.error("Failed to delete todo:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting todos:", error);
  }
};

// Initial fetch
fetchTodos();
