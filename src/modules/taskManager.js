
import { createTask } from "./task.js";

export let tasks = [];

export function addTaskToArray() {
   let mainContent = document.querySelector(".main-content");
   let taskInput = mainContent.querySelector(".input");
   let newTask = createTask(taskInput.value);
   tasks.push(newTask);
}

export function removeTaskFromArray(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");
   tasks.splice(taskIndex, 1);
}

export function updateTaskStatus(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");
   tasks[taskIndex].changeCompletedStatus();
}