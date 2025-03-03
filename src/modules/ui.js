
import { listenForAddTaskClick } from "./controller.js";
import { tasks } from "./taskManager.js";

import edit from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";

export function setActiveTab(selectedTab) {
   let sidebarTabs = document.querySelectorAll(".sidebar__item");
   sidebarTabs.forEach((tab) => {
      tab.classList.remove("active");
      selectedTab.classList.add("active");
   });
}

export function renderTabContent() {
   let activeTab = document.querySelector(".active");
   let mainContent = document.querySelector(".main-content");
   mainContent.innerHTML = "";
         // title
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "main-content__title");
      h2.textContent = activeTab.firstElementChild.textContent;

         // tasks
         let div1 = document.createElement("div");
      if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
         tasks.forEach((task, index) => {
            div1.setAttribute("class", "main-content__tasks");
               let div11 = document.createElement("div");
               div11.setAttribute("class", "main-content__task");
               div11.setAttribute("data-index", `${index}`);
                  let div111 = document.createElement("div");
                  div111.setAttribute("class", "main-content__checkbox-label")
                     let checkbox1111 = document.createElement("input");
                     checkbox1111.setAttribute("type", "checkbox");
                     checkbox1111.setAttribute("name", "completed");
                     checkbox1111.setAttribute("id", `completed-${index}`);
                     checkbox1111.setAttribute("class", "main-content__checkbox");
                     let label1111 = document.createElement("label");
                     label1111.setAttribute("for", `completed-${index}`);
                     label1111.setAttribute("class", "main-content__label");
                     label1111.textContent = task.title;
                  div111.appendChild(checkbox1111);
                  div111.appendChild(label1111);
                  let div112 = document.createElement("div");
                  div112.setAttribute("class", "main-content__task-actions");
                     let p1121 = document.createElement("p");
                     p1121.setAttribute("class", "main-content__set-date");
                     p1121.textContent = "set date";
                     let img1121 = document.createElement("img");
                     img1121.setAttribute("src", edit);
                     img1121.setAttribute("alt", "edit icon");
                     img1121.setAttribute("class", "main-content__task-edit");
                     let img1122 = document.createElement("img");
                     img1122.setAttribute("src", deleteIcon);
                     img1122.setAttribute("alt", "delete icon");
                     img1122.setAttribute("class", "main-content__task-delete");
                  div112.appendChild(p1121);
                  div112.appendChild(img1121);
                  div112.appendChild(img1122);
               div11.appendChild(div111);
               div11.appendChild(div112);
            div1.appendChild(div11);
         });
      }

         // actions
         let div2 = document.createElement("div");
      if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
         div2.setAttribute("class", "main-content__action--add-task");
         div2.textContent = "Add Task";
      } else if (activeTab.firstElementChild.classList.contains("sidebar__item-description")) {
         div2.setAttribute("class", "main-content__action");
            let div21 = document.createElement("div");
            div21.setAttribute("class", "main-content__action--add-task");
            div21.textContent = "Add Task";
            
            let div22 = document.createElement("div");
            div22.setAttribute("class", "main-content__action--delete-project");
            div22.textContent = "Delete Project";      
         div2.appendChild(div21);
         div2.appendChild(div22);
      }

   mainContent.appendChild(h2);
   mainContent.appendChild(div1);
   mainContent.appendChild(div2);

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

   input.focus();
}