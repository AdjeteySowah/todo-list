
import { renderProjectSection } from "./ui";
import { collectAllTasks } from "./filterSort";

export let projects = {
   "Gym": [],
   "Coding": [],
};

export function createProject() {
   let sidebar = document.querySelector(".sidebar");
   let projectInputValue = sidebar.querySelector(".input").value.trim();
   if (projectInputValue === "") {
      alert("Invalid project name! Please enter a different name.");
      return;
   }
   let formattedProjectInputValue = `${projectInputValue.charAt(0).toUpperCase()}${projectInputValue.slice(1).toLowerCase()}`;
   if (formattedProjectInputValue === "Inbox" || formattedProjectInputValue === "Today" || formattedProjectInputValue === "This week") {
      alert("Invalid project name! Please enter a different name.");
      return;
   }
   projects[formattedProjectInputValue] = [];
}

export function deleteProject(selectedElement) {
   let projectName = selectedElement.closest(".main-content").firstElementChild.textContent;
   for (let key in projects) {
      if (key === selectedElement.closest(".main-content").firstElementChild.textContent) {
         projects[key] = [];
         collectAllTasks();
         delete projects[key];
      }
   }
   renderProjectSection(projectName);
}