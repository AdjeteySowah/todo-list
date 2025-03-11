
import { listenForClicksInMain } from "./controller.js";
import { inboxTasks } from "./taskManager.js";

import edit from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";
import listTask from "../assets/images/list-task.svg";
import plus from "../assets/images/plus.svg";

export function setActiveTab(selectedTab) {
   let sidebarTabs = document.querySelectorAll(".sidebar__item");
   sidebarTabs.forEach((tab) => {
      tab.classList.remove("active");
      selectedTab.classList.add("active");
   });
}

   // display newly added projects in the sidebar
export function renderProjectSection() {
   let sidebar = document.querySelector(".sidebar");
   let taskInputValue = sidebar.querySelector(".input").value.trim();
   let formattedTaskInputValue = ` ${taskInputValue[0].toUpperCase()}${taskInputValue.slice(1)}`;

   let projectSection = document.querySelector(".sidebar__project-section");
   let projectSectionLastChild = sidebar.querySelector(".input-action");
      let projectsContainer = document.querySelector(".sidebar__projects-container");
         let project = document.createElement("div");
         project.setAttribute("class", "sidebar__item sidebar__project-item");
            let descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("class", "sidebar__item-description");
               let img1 = document.createElement("img");
               img1.setAttribute("class", "sidebar__item-img");
               img1.setAttribute("src", listTask);
               img1.setAttribute("alt", "task-list icon");
               let textNode1 = document.createTextNode(formattedTaskInputValue);
            descriptionDiv.appendChild(img1);
            descriptionDiv.appendChild(textNode1);
            let badge = document.createElement("p");
            badge.setAttribute("class", "sidebar__badge");
         project.appendChild(descriptionDiv);
         project.appendChild(badge);
      projectsContainer.appendChild(project);
      
      let addProjectTab = document.createElement("div");
      addProjectTab.setAttribute("class", "sidebar__add-project show-input");
         let img2 = document.createElement("img");
         img2.setAttribute("class", "sidebar__item-img");
         img2.setAttribute("src", plus);
         img2.setAttribute("alt", "plus icon");
         let textNode2 = document.createTextNode(" Add Project");
      addProjectTab.appendChild(img2);
      addProjectTab.appendChild(textNode2);

   projectSection.removeChild(projectSectionLastChild);
   projectSection.appendChild(addProjectTab);
}

export function renderTabContent() {
   let activeTab = document.querySelector(".active");
   let mainContent = document.querySelector(".main-content");
   mainContent.innerHTML = "";
         // title
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "main-content__title");
      let trimmedTitle = activeTab.firstElementChild.textContent.trim();
      let formattedTitle = `${trimmedTitle[0].toUpperCase()}${trimmedTitle.slice(1)}`;
      h2.textContent = formattedTitle;

         // tasks
         let div1 = document.createElement("div");
      if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
         inboxTasks.forEach((task, index) => {
            div1.setAttribute("class", "main-content__tasks");
               let div11 = document.createElement("div");
               div11.setAttribute("class", "main-content__task");
               if (inboxTasks[index].completed === true) {
                  div11.classList.add("fade", "strike-through");
               }
               div11.setAttribute("data-index", `${index}`);
                  let div111 = document.createElement("div");
                  div111.setAttribute("class", "main-content__checkbox-label")
                     let checkbox1111 = document.createElement("input");
                     checkbox1111.setAttribute("type", "checkbox");
                     checkbox1111.setAttribute("name", "completed");
                     checkbox1111.setAttribute("id", `completed-${index}`);
                     checkbox1111.setAttribute("class", "main-content__checkbox");
                     if (inboxTasks[index].completed === true) {
                        checkbox1111.setAttribute("checked", "");
                     }
                     let label1111 = document.createElement("label");
                     label1111.setAttribute("for", `completed-${index}`);
                     label1111.setAttribute("class", "main-content__label");
                     label1111.textContent = task.title;
                  div111.appendChild(checkbox1111);
                  div111.appendChild(label1111);
                  let div112 = document.createElement("div");
                  div112.setAttribute("class", "main-content__task-actions");
                     let p1121 = document.createElement("p");
                     p1121.setAttribute("class", "main-content__task-due-date");
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
         div2.setAttribute("class", "main-content__action--add-task show-input");
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

   listenForClicksInMain();
}

export function renderInput(selectedElement) {
   let mainContent = document.querySelector(".main-content");
   let mainContLastChild = document.querySelector(".main-content__action--add-task");
   let projectSection = document.querySelector(".sidebar__project-section");
   let projectSectionLastChild = document.querySelector(".sidebar__add-project");

   if (selectedElement.parentElement.firstElementChild.textContent.trim() === "Inbox") {
      mainContent.removeChild(mainContLastChild);
   } else {
      projectSection.removeChild(projectSectionLastChild);
   }
   
      let div = document.createElement("div");
      div.setAttribute("class", "input-action");
         let input = document.createElement("input");
         input.setAttribute("type", "text");
         input.setAttribute("maxlength", "50");
         input.setAttribute("class", "input");
         let div1 = document.createElement("div");
         div1.setAttribute("class", "new-action")
            let div11 = document.createElement("div");
            div11.setAttribute("class", "new-add");
            div11.textContent = "Add";
            let div12 = document.createElement("div");
            div12.setAttribute("class", "new-cancel");
            div12.textContent = "Cancel";
         div1.appendChild(div11);
         div1.appendChild(div12);
      div.appendChild(input);
      div.appendChild(div1);

   if (selectedElement.classList.contains("main-content__action--add-task")) {
      mainContent.appendChild(div);
   } else {
      projectSection.appendChild(div);
   }

   input.focus();
}

export function fadeAndStrikeThroughTask(event) {
   let selectedElement = event.target.closest(".main-content__task");
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");
   if (selectedElement) {
      if (inboxTasks[taskIndex].completed === false) {
         selectedElement.classList.add("fade", "strike-through");
      } else {
         selectedElement.classList.remove("fade", "strike-through");
      }
   }
}

export function showModal() {
   let dialog = document.querySelector(".dialog");
   let body = document.querySelector("body");

   if (dialog.classList.contains("closing")) {
      dialog.classList.remove("closing");
   }
   dialog.showModal();
   body.classList.add("blurred");
      // overemphasizing that the dialog should not be blurred
   dialog.style.filter = "none";
}

export function slideupModal() {
   let body = document.querySelector("body");
   let dialog = document.querySelector(".dialog");
   let form = document.querySelector(".dialog__form");

   dialog.classList.add("closing");
      // This ensures the animation completes before calling the close method on the dialog
   dialog.addEventListener("animationend", () => {
   if (dialog.classList.contains("closing")) {
      dialog.close();
      }
   }, {once: true});

   body.classList.remove("blurred");
   form.reset();
}