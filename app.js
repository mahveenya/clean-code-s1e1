// DOM Elements
var taskInput = document.getElementById("new-task"); // Add a new task input
var addButton = document.querySelector(".task-input__add-button"); // Add button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // Incomplete tasks ul
var completedTasksHolder = document.getElementById("completed-tasks"); // Completed tasks ul

// Create a new task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "todo-list__item";

  // Create elements
  var checkBox = document.createElement("input"); // Checkbox
  checkBox.type = "checkbox";
  checkBox.className = "todo-list__checkbox";

  var label = document.createElement("label"); // Task label
  label.innerText = taskString;
  label.className = "todo-list__label";

  var editInput = document.createElement("input"); // Text input for edit
  editInput.type = "text";
  editInput.className = "todo-list__edit-field";

  var editButton = document.createElement("button"); // Edit button
  editButton.innerText = "Edit";
  editButton.className = "todo-list__edit-button";

  var deleteButton = document.createElement("button"); // Delete button
  deleteButton.className = "todo-list__delete-button";

  var deleteButtonImg = document.createElement("img"); // Delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "todo-list__delete-icon";

  // Append elements to list item
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add a new task
var addTask = function () {
  console.log("Add Task...");
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

// Edit an existing task
var editTask = function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".todo-list__edit-field");
  var label = listItem.querySelector(".todo-list__label");
  var editButton = listItem.querySelector(".todo-list__edit-button");

  var isEditMode = listItem.classList.contains("todo-list__item--edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("todo-list__item--edit-mode");
};

// Delete a task
var deleteTask = function () {
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

// Mark a task as completed
var taskCompleted = function () {
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function () {
  console.log("Incomplete Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Bind task events to list items (edit, delete, checkbox)
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Binding events...");

  var checkBox = taskListItem.querySelector(".todo-list__checkbox");
  var editButton = taskListItem.querySelector(".todo-list__edit-button");
  var deleteButton = taskListItem.querySelector(".todo-list__delete-button");

  // Bind editTask to edit button
  editButton.onclick = editTask;

  // Bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  // Bind taskCompleted or taskIncomplete to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

// Add button click handler
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

// Loop over incomplete tasks list and bind events
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Loop over completed tasks list and bind events
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
