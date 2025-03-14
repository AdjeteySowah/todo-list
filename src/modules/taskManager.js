
import { createTask } from "./task.js";
import { projects } from "./project.js";
import { taskEditClickEventTarget } from "./controller.js";

export let inboxTasks = [];

export function addTaskToArray() {
   let activeTab = document.querySelector(".active");

   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      let mainContent = document.querySelector(".main-content");
      let taskInput = mainContent.querySelector(".input");
      let newTask = createTask(taskInput.value);
      inboxTasks.push(newTask);
   } else if (
      activeTab.firstElementChild.textContent.trim() !== "Today" || 
      activeTab.firstElementChild.textContent.trim() !== "This Week"
      ) {
      let titleInput = document.querySelector("input[type='text']");
      let descTextarea = document.querySelector("textarea");
      let dateInput = document.querySelector("input[type='date']");
      let prioSelect = document.querySelector("select");
      let selectedOption = prioSelect.options[prioSelect.selectedIndex];
      let newTask = createTask(titleInput.value, descTextarea.value, dateInput.value, selectedOption.text);
      for (let key in projects) {
         if (key === activeTab.firstElementChild.textContent.trim()) {
            projects[key].push(newTask);
         }
      }
   }
}

   // completed? / not completed?
export function updateTaskStatus(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");

   if (event.target.closest(".main-content").firstElementChild.textContent === "Inbox") {
      inboxTasks[taskIndex].changeCompletedStatus();
   } else {
      for (let key in projects) {
         if (key === event.target.closest(".main-content").firstElementChild.textContent) {
            projects[key][taskIndex].changeCompletedStatus();
         }
      }
   }
}

   // shows modal before editing can be done
export function updateTaskDetails() {
   let activeTab = document.querySelector(".active");
   let taskIndex = taskEditClickEventTarget.closest(".main-content__task").getAttribute("data-index");

   let titleInput = document.querySelector("input[type='text']");
   let descTextarea = document.querySelector("textarea");
   let dateInput = document.querySelector("input[type='date']");
   let prioSelect = document.querySelector("select");
   let selectedOption = prioSelect.options[prioSelect.selectedIndex];

   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      inboxTasks[taskIndex].changeTitle(titleInput.value);
      inboxTasks[taskIndex].changeDescription(descTextarea.value);
      inboxTasks[taskIndex].changeDueDate(dateInput.value);
      inboxTasks[taskIndex].changePriority(selectedOption.text);
   } else {
      for (let key in projects) {
         if (key === activeTab.firstElementChild.textContent.trim()) {
            projects[key][taskIndex].changeTitle(titleInput.value);
            projects[key][taskIndex].changeDescription(descTextarea.value);
            projects[key][taskIndex].changeDueDate(dateInput.value);
            projects[key][taskIndex].changePriority(selectedOption.text);
         }
      }
   }
}

export function removeTaskFromArray(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");

   if (event.target.closest(".main-content").firstElementChild.textContent === "Inbox") {
      inboxTasks.splice(taskIndex, 1);
   } else {
      for (let key in projects) {
         if (key === event.target.closest(".main-content").firstElementChild.textContent) {
            projects[key].splice(taskIndex, 1);
         }
      }
   }
}