const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementById("add-element"); // add button
const incompleteTaskHolder = document.getElementById("incompleted-task"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-task"); //completed-tasks

for (const element of incompleteTaskHolder.children) {
  bindTaskEvents(element, taskCompleted);
}

for (const element of completedTasksHolder.children) {
  bindTaskEvents(element, taskIncomplete);
}

// New task list item
function createNewTaskElement(taskString) {
  const listItem = document.createElement("li"); // list
  const checkBox = document.createElement("input"); // checkbx
  const label = document.createElement("label"); // label
  const editInput = document.createElement("input"); // input (text)
  const editButton = document.createElement("button"); // edit button
  const deleteButton = document.createElement("button"); // delete button
  const deleteButtonImg = document.createElement("img"); // delete button image

  label.innerText = taskString;
  label.className = "task";

  // Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  // editButton.value = "Edit";
  editButton.innerText = "Edit"; // innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTask() {
  // console.log("Add Task...");
  // console.log("AJAX Request");
  if (taskInput.value) {
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
}

function editTask() {
  // console.log("Edit Task...");
  // console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit-mode");
  // If class of the parent is .editmode
  if (containsClass) {
    label.innerText = editInput.value; // switch to .editmode
    editBtn.innerText = "Edit"; // label becomes the inputs value.
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode"); // toggle .editmode on the parent.
}

function deleteTask() {
  // console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem); // Remove the parent list item from the ul.
}

function taskCompleted() {
  // console.log("Complete Task...");
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem); //Append the task list item to the #completed-tasks
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  // console.log("Incomplete Task...");
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem); // When the checkbox is unchecked
  bindTaskEvents(listItem, taskCompleted); // Append the task list item to the #incompleteTasks.
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  // console.log("bind list item events");
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask; // Bind editTask to edit button.
  deleteButton.onclick = deleteTask; // Bind deleteTask to delete button.
  checkBox.onchange = checkBoxEventHandler; // Bind taskCompleted to checkBoxEventHandler.
}

addButton.addEventListener("click", addTask);
// window.addEventListener("click", (event) => {
//   console.log(event);
// });
