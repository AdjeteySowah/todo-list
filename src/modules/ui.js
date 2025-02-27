
export function setActiveTab(selectedTab) {
   let sidebarTabs = document.querySelectorAll(".sidebar__item");
   sidebarTabs.forEach((tab) => {
      tab.classList.remove("active");
      selectedTab.classList.add("active");
   });
}

export function renderInboxContent() {
   let mainContentTitle = document.querySelector(".main-content__title");
   mainContentTitle.textContent = "Inbox";
}

export function renderTabContent(selectedTab) {
   let mainContent = document.querySelector(".main-content");
   mainContent.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "main-content__title");
      h2.textContent = selectedTab.firstElementChild.textContent;
   mainContent.appendChild(h2);
}