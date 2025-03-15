
import { renderProjectSection } from "./ui";

export let projects = {
   "Gym": [],
   "Coding": [],
};

export function createProject() {
   let sidebar = document.querySelector(".sidebar");
   let taskInputValue = sidebar.querySelector(".input").value.trim();
   let formattedTaskInputValue = `${taskInputValue[0].toUpperCase()}${taskInputValue.slice(1)}`;
   projects[formattedTaskInputValue] = [];
   // console.log(projects);
}

export function deleteProject(selectedElement) {
   let projectName = selectedElement.closest(".main-content").firstElementChild.textContent;
   for (let key in projects) {
      if (key === selectedElement.closest(".main-content").firstElementChild.textContent) {
         delete projects[key];
      }
   }
   renderProjectSection(projectName);
   // console.log(projects);
}