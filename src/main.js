document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") return;

  let li = createTaskElement(taskText);
  document.getElementById("taskList").appendChild(li);
  saveTask(taskText);
  taskInput.value = "";
}

function createTaskElement(taskText, completed = false) {
  let li = document.createElement("li");
  li.className = `flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition ${
    completed ? "line-through text-gray-500" : "hover:bg-gray-300"
  }`;
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.classList.toggle("line-through");
    li.classList.toggle("text-gray-500");
    updateTaskStatus(taskText);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className =
    "ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition";
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
    removeTask(taskText);
  });

  li.appendChild(deleteBtn);
  return li;
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let li = createTaskElement(task.text, task.completed);
    document.getElementById("taskList").appendChild(li);
  });
}

function updateTaskStatus(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    if (task.text === taskText) task.completed = !task.completed;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
