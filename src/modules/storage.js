
import { inboxTasks } from "./taskManager";
import { collectAllTasks, tasksForToday, tasksForTheWeek } from "./filterSort";
import { projects } from "./project";
import { renderTabContent, renderProjectSection } from "./ui";
import { createTask } from "./task";

export function storeInLocalStorage() {
   localStorage.setItem("Inbox", JSON.stringify(inboxTasks));
   localStorage.setItem("Today", JSON.stringify(tasksForToday));
   localStorage.setItem("This week", JSON.stringify(tasksForTheWeek));
   localStorage.setItem("Projects", JSON.stringify(projects));
}

let retrievedInboxArray;
export let retrievedProjectsObject;

export function retrieveFromLocalStorage() {
   retrievedInboxArray = JSON.parse(localStorage.getItem("Inbox")) || [];
   retrievedProjectsObject = JSON.parse(localStorage.getItem("Projects")) || {};

   addMethodsToRetrievedTasksObjects();
}

function addMethodsToRetrievedTasksObjects() {
   if (retrievedInboxArray.length > 0) {
      let retrievedInboxArrayWithMethods = retrievedInboxArray.map((task) => {
         return createTask(task.title, task.description, task.date, task.priority, task.project, task.completed);
      });
      inboxTasks.push(...retrievedInboxArrayWithMethods);
   }

   if (Object.keys(retrievedProjectsObject).length > 0) {
      let retrievedProjectsObjectWithMethods = {};
   
      for (let key in retrievedProjectsObject) {
         retrievedProjectsObjectWithMethods[key] = retrievedProjectsObject[key].map((task) => {
            return createTask(task.title, task.description, task.date, task.priority, task.project, task.completed);
         });
      }
   
      Object.assign(projects, retrievedProjectsObjectWithMethods);
   }
   

   renderTabContent();        // displays content of inbox
   collectAllTasks();         // gets task for today and week. Hence no need to retrieve them from local storage
   renderProjectSection();    // displays projects retrieved from storage in sidebar
}