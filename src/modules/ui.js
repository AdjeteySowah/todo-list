
import plusIcon from "../assets/images/plus.svg";
import deleteIcon from "../assets/images/delete.svg";

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
            let img = document.createElement("img");
            img.setAttribute("src", plusIcon);
            img.setAttribute("alt", "plus icon");
            img.setAttribute("class", "main-content__add-task-img");
            let textNode = document.createTextNode(" Add Task");
         div.appendChild(img);
         div.appendChild(textNode);
      } else if (
         selectedTab.firstElementChild.textContent.trim() === "Today" || 
         selectedTab.firstElementChild.textContent.trim() === "This Week") {
            console.log(2);
      } else if (selectedTab.firstElementChild.classList.contains("sidebar__item-description")) {
         div.setAttribute("class", "main-content__action");
            let div1 = document.createElement("div");
            div1.setAttribute("class", "main-content__action--add-task");
               let img1 = document.createElement("img");
               img1.setAttribute("src", plusIcon);
               img1.setAttribute("alt", "plus icon");
               img1.setAttribute("class", "main-content__add-task-img");
               let textNode1 = document.createTextNode(" Add Task");
            div1.appendChild(img1);
            div1.appendChild(textNode1);

            let div2 = document.createElement("div");
            div2.setAttribute("class", "main-content__action--delete-project");
               let img2 = document.createElement("img");
               img2.setAttribute("src", deleteIcon);
               img2.setAttribute("alt", "plus icon");
               img2.setAttribute("class", "main-content__delete-project-img");
               let textNode2 = document.createTextNode(" Delete Project");
            div2.appendChild(img2);
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
   let lastChild = document.querySelector(".main-content__action--add-task");
   mainContent.removeChild(lastChild);
      let div = document.createElement("div");
         let input = document.createElement("input");
         input.setAttribute("type", "text");
         input.setAttribute("maxlength", "50");
         input.setAttribute("class", "proj-input");
         let div1 = document.createElement("div");
         div1.setAttribute("class", "main-content__action")
            let div11 = document.createElement("div");
            div11.textContent = "Add";
            let div12 = document.createElement("div");
            div12.textContent = "Cancel";
         div1.appendChild(div11);
         div1.appendChild(div12);
      div.appendChild(input);
      div.appendChild(div1);
   mainContent.appendChild(div);

}