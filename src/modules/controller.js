
import { setActiveTab, renderProjectSection, renderTabContent, renderInput, fadeAndStrikeThroughTask, viewAndEditTaskDetails } from "./ui.js";
import { addTaskToArray, removeTaskFromArray, updateTaskStatus } from "./taskManager.js";
import { createProject } from "./project.js";

      // SIDEBAR EVENTS
function handleTabClick(event) {
   let selectedTab = event.target.closest(".sidebar__item");
   if (selectedTab) {
      setActiveTab(selectedTab);
      renderTabContent();
   }
}

function handleSbAddClick(event) {
   let selectedElement = event.target.classList.contains("new-add");
   if (selectedElement) {
      createProject();
      renderProjectSection();
   }
}

function handleClicksInSidebar(event) {
   handleTabClick(event);
   handleAddTaskClick(event);
   handleSbAddClick(event);
}

export function listenForClicksInSidebar() {
   let sidebar = document.querySelector(".sidebar");
   sidebar.addEventListener("click", handleClicksInSidebar);
}

      // MAIN CONTENT EVENTS
   // Add project(in sidebar) needs this same functionality
function handleAddTaskClick(event) {
   let selectedElement = event.target.closest(".show-input");
   if (selectedElement) {
      renderInput(selectedElement);
      scrollDown();
   }
}

function handleAddClick(event) {
   let selectedElement = event.target.classList.contains("new-add");
   if (selectedElement) {
      addTaskToArray();
      renderTabContent();
   }
}

function handleRemoveTaskClick(event) {
   let selectedElement = event.target.classList.contains("main-content__task-delete");
   if (selectedElement) {
      removeTaskFromArray(event);
      renderTabContent();
   }
}

function handleTaskCompletionStatusClick(event) {
   let selectedElement = event.target.classList.contains("main-content__checkbox");
   if (selectedElement) {
      fadeAndStrikeThroughTask(event);
      updateTaskStatus(event);
   }
}

function handleTaskEditClick(event) {
   let selectedElement = event.target.classList.contains("main-content__task-edit");
   if (selectedElement) {
      viewAndEditTaskDetails(event);
   }
}

function handleClicksInMain(event) {
   handleAddTaskClick(event);
   handleAddClick(event);
   handleRemoveTaskClick(event);
   handleTaskCompletionStatusClick(event);
   handleTaskEditClick(event);
}

export function listenForClicksInMain() {
   let mainContent = document.querySelector(".main-content");
   mainContent.addEventListener("click", handleClicksInMain);
}


function scrollDown() {
   let sidebar = document.querySelector(".sidebar");
 
      // In handleAddTaskClick, input is rendered before scrollDown is called. Using setTimeout is just to overemphasize
   setTimeout(() => {
      sidebar.scrollTo({ top: sidebar.scrollHeight, behavior: "smooth" });
   }, 0);
    
}