// --- To-Do List ---
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
    taskList.appendChild(li);
  });
}
renderTasks();

// --- Product Listing ---
const products = [
  { name: "Laptop", category: "electronics", price: 800, rating: 4.5 },
  { name: "Book - HTML", category: "books", price: 20, rating: 4.8 },
  { name: "Camera", category: "electronics", price: 250, rating: 4.3 },
];

function displayProducts(items) {
  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  items.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>`;
    container.appendChild(div);
  });
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  let filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

function sortProducts() {
  const option = document.getElementById("sortOption").value;
  let sorted = [...products];

  if (option === "price") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (option === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}

displayProducts(products);
