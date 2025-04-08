
import { listenForClicksInMain, taskEditClickEventTarget } from "./controller.js";
import { inboxTasks } from "./taskManager.js";
import { projects } from "./project.js";
import { tasksForToday, tasksForTheWeek } from "./filterSort.js";
import { reverseFormatDate } from "./utility.js";
import { retrievedProjectsObject } from "./storage.js";

import edit from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";
import listTask from "../assets/images/list-task.svg";
import plus from "../assets/images/plus.svg";

export function setActiveTab(selectedTab) {
   let sidebarTabs = document.querySelectorAll(".sidebar__item");
   sidebarTabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.classList.remove("bold");
      selectedTab.classList.add("active");
      selectedTab.classList.add("bold");
   });
}

   // SIDEBAR
export function renderProjectSection(selectedElement) {
   let sidebar = document.querySelector(".sidebar");
   let sidebarProjItems = sidebar.querySelectorAll(".sidebar__project-item");
   let projectInput = sidebar.querySelector(".input");

         // when cancel is clicked
   if (projectInput && selectedElement) {
      let projectSection = document.querySelector(".sidebar__project-section");
      let projectSectionLastChild = sidebar.querySelector(".input-action");

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

         // when delete project is clicked
   } else if (selectedElement !== undefined) {
      let projectsContainer = sidebar.querySelector(".sidebar__projects-container");
      let projectToBeRemoved = projectsContainer.querySelector(`.sidebar__project-item[data-value=" ${selectedElement}"]`);
      projectsContainer.removeChild(projectToBeRemoved);

      let inboxTabElement = sidebar.querySelector(".sidebar__main-section").firstElementChild;
      setActiveTab(inboxTabElement);
      renderTabContent();

         // when add is clicked or when the page is loaded
   } else if ((projectInput && projectInput.value !== "") || Object.keys(retrievedProjectsObject).length > 0) {
      let taskInputValue;
      let formattedTaskInputValue;
      
      if (projectInput) {
         taskInputValue = projectInput.value.trim();
         formattedTaskInputValue = ` ${taskInputValue.charAt(0).toUpperCase()}${taskInputValue.slice(1).toLowerCase()}`;
      }

            // when a valid project name is entered and added
      if (formattedTaskInputValue !== " Inbox" && formattedTaskInputValue !== " Today" && formattedTaskInputValue !== " This week" && formattedTaskInputValue !== undefined && formattedTaskInputValue !== " ") {
         for (let i = 0; i < sidebarProjItems.length; i++) {
            let projItem = sidebarProjItems[i];
            if (projItem.dataset.value === formattedTaskInputValue) {
               return;
            }
         }

         let projectSection = sidebar.querySelector(".sidebar__project-section");
         let projectSectionLastChild = sidebar.querySelector(".input-action");

         if (!selectedElement) {    // when add is clicked, there might be no argument when this fxn is called.
                                    // hence the parameter is set to undefined. "!selectedElement" makes the condition
                                    // truthy hence running the block of code even though the fxn was called with no arg 
            let projectsContainer = sidebar.querySelector(".sidebar__projects-container");
            let project = document.createElement("div");
            project.setAttribute("class", "sidebar__item sidebar__project-item");
            project.setAttribute("data-value", `${formattedTaskInputValue}`);
            let descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("class", "sidebar__item-description");
            let img1 = document.createElement("img");
            img1.setAttribute("class", "sidebar__item-img");
            img1.setAttribute("src", listTask);
            img1.setAttribute("alt", "task-list icon");
            let textNode1 = document.createTextNode(formattedTaskInputValue);
            descriptionDiv.appendChild(img1);
            descriptionDiv.appendChild(textNode1);
            project.appendChild(descriptionDiv);
            projectsContainer.appendChild(project);

            if (projectInput) {
               let selectedTab = project;
               setActiveTab(selectedTab);
               renderTabContent();
            }
         }
         
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

               // when the page is loaded and some projects are saved in the local storage
      } else if (sidebarProjItems.length < Object.keys(retrievedProjectsObject).length) {
         for (let key in projects) {
            let projectsContainer = sidebar.querySelector(".sidebar__projects-container");
   
            let project = document.createElement("div");
            project.setAttribute("class", "sidebar__item sidebar__project-item");
            project.setAttribute("data-value", ` ${key}`);
            let descriptionDiv = document.createElement("div");
            descriptionDiv.setAttribute("class", "sidebar__item-description");
            let img1 = document.createElement("img");
            img1.setAttribute("class", "sidebar__item-img");
            img1.setAttribute("src", listTask);
            img1.setAttribute("alt", "task-list icon");
            let textNode1 = document.createTextNode(` ${key}`);
            descriptionDiv.appendChild(img1);
            descriptionDiv.appendChild(textNode1);
            project.appendChild(descriptionDiv);
   
            projectsContainer.appendChild(project);
         }
      }    
   }
}

export function updateBadgeNumber() {
   let badgeForToday = document.querySelector(".sb--today");
   let badgeForWeek = document.querySelector(".sb--this-week");

   if (tasksForToday.length === 0) {
      badgeForToday.style.cssText = "opacity: 0;";
   } else {
      badgeForToday.style.cssText = "opacity: 1;";
      badgeForToday.textContent = tasksForToday.length;
   }

   if (tasksForTheWeek.length === 0) {
      badgeForWeek.style.cssText = "opacity: 0;";
   } else {
      badgeForWeek.style.cssText = "opacity: 1;";
      badgeForWeek.textContent = tasksForTheWeek.length;
   }
}


   // MAIN CONTENT
function createTasksElement(taskArray) {
   let div1 = document.createElement("div");
   div1.setAttribute("class", "main-content__tasks");

   taskArray.forEach((task, index) => {
      let div11 = document.createElement("div");
      div11.setAttribute("class", "main-content__task");
      if (task.completed) {
         div11.classList.add("fade", "strike-through");
      }
      div11.setAttribute("data-index", `${index}`);

      let div111 = document.createElement("div");
      div111.setAttribute("class", "main-content__checkbox-label");

      let checkbox1111 = document.createElement("input");
      checkbox1111.setAttribute("type", "checkbox");
      checkbox1111.setAttribute("name", "completed");
      checkbox1111.setAttribute("id", `completed-${index}`);
      checkbox1111.setAttribute("class", "main-content__checkbox");
      if (task.completed) {
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
      p1121.textContent = task.date;

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

   return div1;
}

export function renderTabContent(selectedElement) {
   let mainContent = document.querySelector(".main-content");

   let taskInput = mainContent.querySelector(".input");
   if (taskInput && taskInput.value === "" && selectedElement) {
      return;
   }

   let activeTab = document.querySelector(".active");
   mainContent.innerHTML = "";
      // title
   let h2 = document.createElement("h2");
   h2.setAttribute("class", "main-content__title");
   let trimmedTitle = activeTab.firstElementChild.textContent.trim();
   let formattedTitle = `${trimmedTitle.charAt(0).toUpperCase()}${trimmedTitle.slice(1).toLowerCase()}`;
   h2.textContent = formattedTitle;

      // tasks
   let tasksContainer;
   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      tasksContainer = createTasksElement(inboxTasks);
   } else if (activeTab.firstElementChild.textContent.trim() === "Today") {
      if (tasksForToday.length === 0) {
         let div1 = document.createElement("div");
         div1.setAttribute("class", "main-content__tasks");
         let par = document.createElement("p");
         par.setAttribute("class", "main-content__no-task-msg");
         par.textContent = "No Tasks for Today!";
         div1.appendChild(par);

         tasksContainer = div1;
      } else {
         tasksContainer = createTasksElement(tasksForToday);
      }
   } else if (activeTab.firstElementChild.textContent.trim() === "This week") {
      if (tasksForTheWeek.length === 0) {
         let div1 = document.createElement("div");
         div1.setAttribute("class", "main-content__tasks");
         let par = document.createElement("p");
         par.setAttribute("class", "main-content__no-task-msg");
         par.textContent = "No Tasks for the Week!";
         div1.appendChild(par);

         tasksContainer = div1;
      } else {
         tasksContainer = createTasksElement(tasksForTheWeek);
      }
   } else if (activeTab.classList.contains("sidebar__project-item")) {
      for (let key in projects) {
         if (key === activeTab.firstElementChild.textContent.trim()) {
            tasksContainer = createTasksElement(projects[key]);
         }
      }
   }

      // actions
   let div2 = document.createElement("div");

   if (activeTab.firstElementChild.textContent.trim() === "Inbox") {
      div2.setAttribute("class", "main-content__action--add-task show-input");
      div2.textContent = "Add Task";
   } else if (activeTab.classList.contains("sidebar__project-item")) {
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
   mainContent.appendChild(tasksContainer);
   mainContent.appendChild(div2);

   listenForClicksInMain();
}

export function fadeAndStrikeThroughTask(event) {
   let selectedElement = event.target.closest(".main-content__task");
   let taskIndex = event.target.closest(".main-content__task").getAttribute("data-index");
   if (selectedElement) {
      if (selectedElement.closest(".main-content").firstElementChild.textContent === "Inbox") {
         if (inboxTasks[taskIndex].completed === false) {
            selectedElement.classList.add("fade", "strike-through");
         } else {
            selectedElement.classList.remove("fade", "strike-through");
         }
      } else if (selectedElement.closest(".main-content").firstElementChild.textContent === "Today") {
         if (tasksForToday[taskIndex].completed === false) {
            selectedElement.classList.add("fade", "strike-through");
         } else {
            selectedElement.classList.remove("fade", "strike-through");
         }
      } else if (selectedElement.closest(".main-content").firstElementChild.textContent === "This week") {
         if (tasksForTheWeek[taskIndex].completed === false) {
            selectedElement.classList.add("fade", "strike-through");
         } else {
            selectedElement.classList.remove("fade", "strike-through");
         }
      } else {
         for (let key in projects) {
            if (key === selectedElement.closest(".main-content").firstElementChild.textContent) {
               if (projects[key][taskIndex].completed === false) {
                  selectedElement.classList.add("fade", "strike-through");
               } else {
                  selectedElement.classList.remove("fade", "strike-through");
               }
            }
         }
      }
   }
}


   // COMMON
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
   input.setAttribute("maxlength", "25");
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


   // MODAL
export function showModal() {
   let body = document.querySelector("body");
   let dialog = document.querySelector(".dialog");

   if (dialog.classList.contains("closing")) {
      dialog.classList.remove("closing");
   }
   dialog.showModal();
   body.classList.add("blurred");
      // overemphasizing that the dialog should not be blurred
   dialog.style.filter = "none";
}

export function closeModal() {
   let body = document.querySelector("body");
   let dialog = document.querySelector(".dialog");
   let form = document.querySelector(".dialog__form");

   if (!form.checkValidity()) {
      form.reportValidity();
   } else {
      dialog.close();
      body.classList.remove("blurred");
   }
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

export function fillForm() {
   let titleInput = document.querySelector("input[type='text']");
   let descTextarea = document.querySelector("textarea");
   let dateInput = document.querySelector("input[type='date']");
   let prioSelect = document.querySelector("select");

   let taskIndex = taskEditClickEventTarget.closest(".main-content__task").getAttribute("data-index");

   if (taskEditClickEventTarget.closest(".main-content").firstElementChild.textContent === "Inbox") {
      titleInput.value = inboxTasks[taskIndex].title;
      if (inboxTasks[taskIndex].description === undefined) {
         descTextarea.value = "";
      } else {
         descTextarea.value = inboxTasks[taskIndex].description;
      }
      dateInput.value = reverseFormatDate(inboxTasks[taskIndex].date);
      prioSelect.value = inboxTasks[taskIndex].priority.toLowerCase();
   }  else if (taskEditClickEventTarget.closest(".main-content").firstElementChild.textContent === "Today") {
      titleInput.value = tasksForToday[taskIndex].title;
      if (tasksForToday[taskIndex].description === undefined) {
         descTextarea.value = "";
      } else {
         descTextarea.value = tasksForToday[taskIndex].description;
      }
      dateInput.value = reverseFormatDate(tasksForToday[taskIndex].date);
      prioSelect.value = tasksForToday[taskIndex].priority.toLowerCase();
   }  else if (taskEditClickEventTarget.closest(".main-content").firstElementChild.textContent === "This week") {
      titleInput.value = tasksForTheWeek[taskIndex].title;
      if (tasksForTheWeek[taskIndex].description === undefined) {
         descTextarea.value = "";
      } else {
         descTextarea.value = tasksForTheWeek[taskIndex].description;
      }
      dateInput.value = reverseFormatDate(tasksForTheWeek[taskIndex].date);
      prioSelect.value = tasksForTheWeek[taskIndex].priority.toLowerCase();
   }  else {
      for (let key in projects) {
         if (key === taskEditClickEventTarget.closest(".main-content").firstElementChild.textContent) {
            titleInput.value = projects[key][taskIndex].title;
            descTextarea.value = projects[key][taskIndex].description;
            dateInput.value = reverseFormatDate(projects[key][taskIndex].date);
            prioSelect.value = projects[key][taskIndex].priority.toLowerCase();
         }
      }
   }
}