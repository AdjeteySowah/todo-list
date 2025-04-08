
import { renderProjectSection } from "./ui";
import { collectAllTasks } from "./filterSort";
import { storeInLocalStorage } from "./storage";

export let projects = {};

export function createProject() {
   let sidebar = document.querySelector(".sidebar");
   let sidebarProjItems = sidebar.querySelectorAll(".sidebar__project-item");
   let projectInputValue = sidebar.querySelector(".input").value.trim();
   let formattedProjectInputValue = ` ${projectInputValue.charAt(0).toUpperCase()}${projectInputValue.slice(1).toLowerCase()}`;

   for (let i = 0; i < sidebarProjItems.length; i++) {
      let projItem = sidebarProjItems[i];
      if (projItem.dataset.value === formattedProjectInputValue) {
         alert("Invalid project name! A project with the same name already exists.");
         return;
      }
   }

   if (formattedProjectInputValue === " Inbox" || formattedProjectInputValue === " Today" || formattedProjectInputValue === " This week" || projectInputValue === "") {
      alert("Invalid project name! Please enter a valid name.");
      return;
   }

   projects[formattedProjectInputValue.trim()] = [];
   storeInLocalStorage();
}

export function deleteProject(selectedElement) {
   let projectName = selectedElement.closest(".main-content").firstElementChild.textContent;
   for (let key in projects) {
      if (key === selectedElement.closest(".main-content").firstElementChild.textContent) {
         projects[key] = [];
         delete projects[key];
         collectAllTasks();
      }
   }

   renderProjectSection(projectName);
   storeInLocalStorage();
}