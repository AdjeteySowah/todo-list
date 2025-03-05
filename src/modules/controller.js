
import { setActiveTab, renderTabContent, renderInboxInput, fadeAndStrikeThroughTask } from "./ui.js";
import { addTaskToArray, removeTaskFromArray, updateTaskStatus } from "./taskManager.js";

function handleTabClick(event) {
   let selectedTab = event.target.closest(".sidebar__item");
   if (selectedTab) {
      setActiveTab(selectedTab);
      renderTabContent();
   }
}

export function initTabClickEvent() {
   let sidebar = document.querySelector(".sidebar");
   sidebar.addEventListener("click", handleTabClick);
}

function handleInboxAddTaskClick(event) {
   let selectedElement = event.target.closest(".main-content__action--add-task");
   if (selectedElement && selectedElement.parentElement.firstElementChild.textContent.trim() === "Inbox") {
      renderInboxInput();
   }
}

function handleAddTaskClick(event) {
   let selectedElement = event.target.classList.contains("main-content__new-add");
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

function handleClicksInMain(event) {
   handleInboxAddTaskClick(event);
   handleAddTaskClick(event);
   handleRemoveTaskClick(event);
   handleTaskCompletionStatusClick(event);
}

export function listenForClicksInMain() {
   let mainContent = document.querySelector(".main-content");
   mainContent.addEventListener("click", handleClicksInMain);
}