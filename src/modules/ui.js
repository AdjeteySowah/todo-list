
import { listenForAddTaskClick } from "./controller.js";

export function setActiveTab(selectedTab) {
   let sidebarTabs = document.querySelectorAll(".sidebar__item");
   sidebarTabs.forEach((tab) => {
      tab.classList.remove("active");
      selectedTab.classList.add("active");
   });
}

   // This will be the static/default content on page load
export function renderInboxContent() {
   let mainContentTitle = document.querySelector(".main-content__title");
   mainContentTitle.textContent = "Inbox";
}

export function renderTabContent(selectedTab) {
   let mainContent = document.querySelector(".main-content");
   mainContent.innerHTML = "";
         // title
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "main-content__title");
      h2.textContent = selectedTab.firstElementChild.textContent;

         // tasks

         // actions
         let div = document.createElement("div");
      if (selectedTab.firstElementChild.textContent.trim() === "Inbox") {
         div.setAttribute("class", "main-content__action--add-task");
            let textNode = document.createTextNode(" Add Task");
         div.appendChild(textNode);
      } else if (
         selectedTab.firstElementChild.textContent.trim() === "Today" || 
         selectedTab.firstElementChild.textContent.trim() === "This Week") {
            console.log(2);
      } else if (selectedTab.firstElementChild.classList.contains("sidebar__item-description")) {
         div.setAttribute("class", "main-content__action");
            let div1 = document.createElement("div");
            div1.setAttribute("class", "main-content__action--add-task");
               let textNode1 = document.createTextNode(" Add Task");
            div1.appendChild(textNode1);

            let div2 = document.createElement("div");
            div2.setAttribute("class", "main-content__action--delete-project");
               let textNode2 = document.createTextNode(" Delete Project");
            div2.appendChild(textNode2);
         div.appendChild(div1);
         div.appendChild(div2);
      }

   mainContent.appendChild(h2);
   mainContent.appendChild(div);

   listenForAddTaskClick();
}

export function renderInboxInput() {
   let mainContent = document.querySelector(".main-content");
   let mainContLastChild = document.querySelector(".main-content__action--add-task");
   mainContent.removeChild(mainContLastChild);
      let div = document.createElement("div");
      div.setAttribute("class", "main-content__input-action");
         let input = document.createElement("input");
         input.setAttribute("type", "text");
         input.setAttribute("maxlength", "50");
         input.setAttribute("class", "main-content__task-input");
         let div1 = document.createElement("div");
         div1.setAttribute("class", "main-content__new-action")
            let div11 = document.createElement("div");
            div11.setAttribute("class", "main-content__new-add");
            div11.textContent = "Add";
            let div12 = document.createElement("div");
            div12.setAttribute("class", "main-content__new-cancel");
            div12.textContent = "Cancel";
         div1.appendChild(div11);
         div1.appendChild(div12);
      div.appendChild(input);
      div.appendChild(div1);
   mainContent.appendChild(div);
}