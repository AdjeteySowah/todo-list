
import { createTask } from "./task.js";
import { projects } from "./project.js";

export let inboxTasks = [];

   // create conditions for adding, removing, and maybe update tasks in inbox or in projects
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
   inboxTasks[taskIndex].changeCompletedStatus();
}

   // shows modal before editing can be done
export function updateTaskDetails(selectedElement) {
   let activeTab = document.querySelector(".active");
   let taskIndex = selectedElement;       //.getAttribute("data-index");
   console.log(taskIndex);

   // let titleInput = document.querySelector("input[type='text']");
   // let descTextarea = document.querySelector("textarea");
   // let dateInput = document.querySelector("input[type='date']");
   // let prioSelect = document.querySelector("select");
   // let selectedOption = prioSelect.options[prioSelect.selectedIndex];

   // if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
   //    inboxTasks[taskIndex].changeTitle(titleInput.value);
   //    inboxTasks[taskIndex].changeDescription(descTextarea.value);
   //    inboxTasks[taskIndex].changeDueDate(dateInput.value);
   //    inboxTasks[taskIndex].changePriority(selectedOption.text);
   // }

   // retrieve task details from related array, fill the form with the data, and allow users to save new edits
}

export function removeTaskFromArray(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");
   inboxTasks.splice(taskIndex, 1);
}