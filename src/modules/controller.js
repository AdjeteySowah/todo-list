
import { setActiveTab, renderTabContent } from "./ui.js";

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