
import { setActiveTab, renderProjectSection, renderTabContent, renderInput, fadeAndStrikeThroughTask, showModal, slideupModal, closeModal, fillForm } from "./ui.js";
import { addTaskToArray, removeTaskFromArray, updateTaskStatus, updateTaskDetails } from "./taskManager.js";
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

function scrollDown() {
   let sidebar = document.querySelector(".sidebar");
 
      // In handleAddTaskClick, input is rendered before scrollDown is called. Using setTimeout is just to overemphasize
   setTimeout(() => {
      sidebar.scrollTo({ top: sidebar.scrollHeight, behavior: "smooth" });
   }, 0);
}


      // MAIN CONTENT EVENTS
   // Add project(in sidebar) needs this same functionality
function handleAddTaskClick(event) {
   let form = document.querySelector(".dialog__form");

   let selectedElementInInbox = event.target.closest(".show-input");
   let selectedElement = event.target.closest(".main-content__action--add-task");
   if (selectedElementInInbox) {
      renderInput(selectedElementInInbox);
      scrollDown();
   } else if (selectedElement) {
      changeModalActions(event);
      form.reset();
      showModal();
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

export let taskEditClickEventTarget = null;

function handleTaskEditClick(event) {
   let selectedElement = event.target.classList.contains("main-content__task-edit");
   if (selectedElement) {
      taskEditClickEventTarget = event.target;
      fillForm();
      changeModalActions(event);
      showModal();
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


      // MODAL EVENTS
function handleModalCancelClick(event) {
   let selectedElement = event.target.classList.contains("dialog__form-action--cancel");
   if (selectedElement) {
      slideupModal();
   }
}

function handleModalAddClick(event) {
   let selectedElement = event.target.classList.contains("dialog__form-action--add");
   if (selectedElement) {
      addTaskToArray();
      closeModal();
      renderTabContent();
   }
}

function handleModalConfirmEditClick(event) {
   let selectedElement = event.target.classList.contains("dialog__form-action--confirm-edit");
   if (selectedElement) {
      updateTaskDetails();
      closeModal();
      renderTabContent();
   }
}

function changeModalActions(event) {
   let dialog = document.querySelector(".dialog");
   let formBtnsContainer = dialog.querySelector(".dialog__form-actions");

   if (formBtnsContainer.children[0].textContent === "Confirm Edit" && event.target.classList.contains("main-content__action--add-task")) {
      let confirmEditBtn = formBtnsContainer.children[0];
      let cancelBtn = formBtnsContainer.children[1];

      let addBtn = document.createElement("button");
      addBtn.setAttribute("class", "dialog__form-action--add");
      addBtn.setAttribute("type", "button");
      addBtn.setAttribute("value", "add");
      addBtn.textContent = "Add";

      formBtnsContainer.removeChild(confirmEditBtn);
      formBtnsContainer.insertBefore(addBtn, cancelBtn);
   } else if (formBtnsContainer.children[0].textContent === "Add" && event.target.classList.contains("main-content__task-edit")) {
      let addBtn = formBtnsContainer.children[0];
      let cancelBtn = formBtnsContainer.children[1];

      let confirmEditBtn = document.createElement("button");
      confirmEditBtn.setAttribute("class", "dialog__form-action--confirm-edit");
      confirmEditBtn.setAttribute("type", "button");
      confirmEditBtn.setAttribute("value", "confirm-edit");
      confirmEditBtn.textContent = "Confirm Edit";

      formBtnsContainer.removeChild(addBtn);
      formBtnsContainer.insertBefore(confirmEditBtn, cancelBtn);
   }
}

function handleClicksInModal(event) {
   handleModalAddClick(event);
   handleModalCancelClick(event);
   handleModalConfirmEditClick(event);
}

export function listenForClicksInModal() {
   let dialog = document.querySelector(".dialog");
   dialog.addEventListener("click", handleClicksInModal);
}
      