
import { setActiveTab, renderTabContent, renderInboxInput } from "./ui.js";

function handleTabClick(event) {
   let selectedTab = event.target.closest(".sidebar__item");
   if (selectedTab) {
      setActiveTab(selectedTab);
      renderTabContent(selectedTab);
   }
}

export function initTabClickEvent() {
   let sidebar = document.querySelector(".sidebar");
   sidebar.addEventListener("click", handleTabClick);
}

function handleInboxAddTaskClick(event) {
   let selectedAction = event.target.closest(".main-content__action--add-task");
   if (selectedAction && selectedAction.parentElement.firstElementChild.textContent.trim() === "Inbox") {
      renderInboxInput();
   }
}

export function listenForAddTaskClick() {
   let mainContent = document.querySelector(".main-content");
   mainContent.addEventListener("click", handleInboxAddTaskClick);
}