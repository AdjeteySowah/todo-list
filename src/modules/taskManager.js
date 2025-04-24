
import { createTask } from "./task.js";
import { projects } from "./project.js";
import { taskEditClickEventTarget } from "./controller.js";
import { collectAllTasks, tasksForToday, tasksForTheWeek } from "./filterSort.js";
import { formatDate } from "./utility.js";
import { storeInLocalStorage } from "./storage.js";


export let inboxTasks = [];

export function addTaskToArray() {
   let activeTab = document.querySelector(".active-tab");

   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      let mainContent = document.querySelector(".main-content");
      let taskInput = mainContent.querySelector(".input");
      
      if (taskInput.value === "") {
         alert("Invalid task name! Please enter a valid name.");
      } else if (taskInput.value !== "") {
         for (let i = 0; i < inboxTasks.length; i++) {
            let taskTitle = inboxTasks[i].title;
            if (taskTitle === taskInput.value) {
               alert("Invalid task name! Task names must be different.");
               return;
            }
         }

         let newTask = createTask(taskInput.value, undefined, undefined, undefined, "Inbox");
         inboxTasks.push(newTask);
      }
   } else if (activeTab.firstElementChild.textContent.trim() !== "Today" || 
      activeTab.firstElementChild.textContent.trim() !== "This week") {
      let titleInput = document.querySelector("input[type='text']");
      let descTextarea = document.querySelector("textarea");
      let dateInput = document.querySelector("input[type='date']");
      let prioSelect = document.querySelector("select");
      let selectedOption = prioSelect.options[prioSelect.selectedIndex];

      for (let key in projects) {
         if (key === activeTab.firstElementChild.textContent.trim()) {
            for (let i = 0; i < projects[key].length; i++) {
               let taskTitle = projects[key][i].title;
               if (taskTitle === titleInput.value) {
                  alert("Invalid task name! Task names must be different.");
                  return;
               }
            }

            let newTask = createTask(titleInput.value, descTextarea.value, formatDate(dateInput.value), selectedOption.text, key);
            projects[key].push(newTask);
         }
      }
   }

   collectAllTasks();
   storeInLocalStorage();
}

   // completed? / not completed?
export function updateTaskStatus(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");

   if (event.target.closest(".main-content").firstElementChild.textContent === "Inbox") {
      inboxTasks[taskIndex].changeCompletedStatus();
   } else if (event.target.closest(".main-content").firstElementChild.textContent === "Today") {
      tasksForToday[taskIndex].changeCompletedStatus();
   } else if (event.target.closest(".main-content").firstElementChild.textContent === "This week") {
      tasksForTheWeek[taskIndex].changeCompletedStatus();
   } else {
      for (let key in projects) {
         if (key === event.target.closest(".main-content").firstElementChild.textContent) {
            projects[key][taskIndex].changeCompletedStatus();
         }
      }
   }

   storeInLocalStorage();
}

   // shows modal before editing can be done
export function updateTaskDetails() {
   let activeTab = document.querySelector(".active-tab");
   let taskIndex = taskEditClickEventTarget.closest(".main-content__task").getAttribute("data-index");

   let titleInput = document.querySelector("input[type='text']");
   let descTextarea = document.querySelector("textarea");
   let dateInput = document.querySelector("input[type='date']");
   let prioSelect = document.querySelector("select");
   let selectedOption = prioSelect.options[prioSelect.selectedIndex];

   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      let newTitle = titleInput.value;
      let isDuplicate = false;

      for (let i = 0; i < inboxTasks.length; i++) {
         if (i !== Number(taskIndex) && inboxTasks[i].title === newTitle) {
            isDuplicate = true;
            break;
         }
      }

      if (isDuplicate) {
         alert("Invalid task name! Task names must be different.");
         return;
      }

      inboxTasks[taskIndex].changeTitle(newTitle);
      inboxTasks[taskIndex].changeDescription(descTextarea.value);
      inboxTasks[taskIndex].changeDueDate(dateInput.value);
      inboxTasks[taskIndex].changePriority(selectedOption.text);
   } else if (activeTab.firstElementChild.textContent.trim() === "Today") {
      let newTitle = titleInput.value;
      let isDuplicate = false;

      for (let i = 0; i < tasksForToday.length; i++) {
         if (i !== Number(taskIndex) && tasksForToday[i].title === newTitle) {
            isDuplicate = true;
            break;
         }
      }

      if (isDuplicate) {
         alert("Invalid task name! Task names must be different.");
         return;
      }

      tasksForToday[taskIndex].changeTitle(newTitle);
      tasksForToday[taskIndex].changeDescription(descTextarea.value);
      tasksForToday[taskIndex].changeDueDate(dateInput.value);
      tasksForToday[taskIndex].changePriority(selectedOption.text);
   } else if (activeTab.firstElementChild.textContent.trim() === "This week") {
      let newTitle = titleInput.value;
      let isDuplicate = false;

      for (let i = 0; i < tasksForTheWeek.length; i++) {
         if (i !== Number(taskIndex) && tasksForTheWeek[i].title === newTitle) {
            isDuplicate = true;
            break;
         }
      }

      if (isDuplicate) {
         alert("Invalid task name! Task names must be different.");
         return;
      }

      tasksForTheWeek[taskIndex].changeTitle(newTitle);
      tasksForTheWeek[taskIndex].changeDescription(descTextarea.value);
      tasksForTheWeek[taskIndex].changeDueDate(dateInput.value);
      tasksForTheWeek[taskIndex].changePriority(selectedOption.text);
   } else {
      for (let key in projects) {
         if (key === activeTab.firstElementChild.textContent.trim()) {
            let newTitle = titleInput.value;
            let isDuplicate = false;
      
            for (let i = 0; i < projects[key].length; i++) {
               if (i !== Number(taskIndex) && projects[key][i].title === newTitle) {       // exclud the task being edited
                  isDuplicate = true;
                  break;
               }
            }
      
            if (isDuplicate) {
               alert("Invalid task name! Task names must be different.");
               return;
            }
      
            projects[key][taskIndex].changeTitle(newTitle);
            projects[key][taskIndex].changeDescription(descTextarea.value);
            projects[key][taskIndex].changeDueDate(dateInput.value);
            projects[key][taskIndex].changePriority(selectedOption.text);
         }
      }  
   }

   collectAllTasks();         // usually for getting task in inbox into today or this week
   storeInLocalStorage();
}

export function removeTaskFromArray(event) {
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");

   if (event.target.closest(".main-content").firstElementChild.textContent === "Inbox") {
      inboxTasks.splice(taskIndex, 1);
   } else if (event.target.closest(".main-content").firstElementChild.textContent === "Today") {
      let deletedTask = tasksForToday.splice(taskIndex, 1);

      if (deletedTask[0].project === "Inbox") {
         inboxTasks.splice(taskIndex, 1);
      } else {
         for (let key in projects) {
            if (key === deletedTask[0].project) {
               projects[key].splice(taskIndex, 1);
            }
         }
      }
   } else if (event.target.closest(".main-content").firstElementChild.textContent === "This week") {
      let deletedTask = tasksForTheWeek.splice(taskIndex, 1);

      if (deletedTask[0].project === "Inbox") {
         inboxTasks.splice(taskIndex, 1);
      } else {
         for (let key in projects) {
            if (key === deletedTask[0].project) {
               projects[key].splice(taskIndex, 1);
            }
         }
      }
   } else {
      for (let key in projects) {
         if (key === event.target.closest(".main-content").firstElementChild.textContent) {
            projects[key].splice(taskIndex, 1);
         }
      }
   }

   collectAllTasks();
   storeInLocalStorage();
}