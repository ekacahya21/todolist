document.addEventListener("DOMContentLoaded", loadTasks);

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
  li.textContent = taskText;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateTaskStatus(taskText);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", function () {
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
