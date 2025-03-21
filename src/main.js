const API_URL = "http://localhost:3000/tasks";

document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  document.getElementById("taskList").innerHTML = "";
  tasks.forEach((task) => {
    let li = createTaskElement(task);
    document.getElementById("taskList").appendChild(li);
  });
}

async function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") return;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: taskText }),
  });

  const newTask = await response.json();
  let li = createTaskElement(newTask);
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function createTaskElement(task) {
  let li = document.createElement("li");
  li.className = `flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition ${
    task.completed ? "line-through text-gray-500" : "hover:bg-gray-300"
  }`;
  li.textContent = task.text;

  li.addEventListener("click", () => toggleComplete(task._id, li));

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className =
    "ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition";
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTask(task._id, li);
  });

  li.appendChild(deleteBtn);
  return li;
}

async function toggleComplete(taskId, li) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
  });

  const updatedTask = await response.json();
  li.classList.toggle("line-through");
  li.classList.toggle("text-gray-500");
}

async function deleteTask(taskId, li) {
  await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
  li.remove();
}
