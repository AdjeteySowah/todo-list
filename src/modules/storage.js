
import { inboxTasks } from "./taskManager";
import { tasksForToday, tasksForTheWeek } from "./filterSort";
import { projects } from "./project";
import { renderTabContent, updateBadgeNumber, renderProjectSection } from "./ui";
import { createTask } from "./task";

export function storeInLocalStorage() {
   localStorage.setItem("Inbox", JSON.stringify(inboxTasks));
   localStorage.setItem("Today", JSON.stringify(tasksForToday));
   localStorage.setItem("This week", JSON.stringify(tasksForTheWeek));
   localStorage.setItem("Projects", JSON.stringify(projects));
}

let retrievedInboxArray;
let retrievedTodayArray;
let retrievedThisWeekArray;
let retrievedProjectsObject;

export function retrieveFromLocalStorage() {
   retrievedInboxArray = JSON.parse(localStorage.getItem("Inbox")) || [];
   retrievedTodayArray = JSON.parse(localStorage.getItem("Today")) || [];
   retrievedThisWeekArray = JSON.parse(localStorage.getItem("This week")) || [];
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

   if (retrievedTodayArray.length > 0) {
      let retrievedTodayArrayWithMethods = retrievedTodayArray.map((task) => {
         return createTask(task.title, task.description, task.date, task.priority, task.project, task.completed);
      });
      tasksForToday.push(...retrievedTodayArrayWithMethods);
   }

   if (retrievedThisWeekArray.length > 0) {
      let retrievedThisWeekArrayWithMethods = retrievedThisWeekArray.map((task) => {
         return createTask(task.title, task.description, task.date, task.priority, task.project, task.completed);
      });
      tasksForTheWeek.push(...retrievedThisWeekArrayWithMethods);
   }

   if (Object.keys(retrievedProjectsObject).length > 0) {
      for (let key in retrievedProjectsObject) {
         retrievedProjectsObject[key].map((task) => {
            return createTask(task.title, task.description, task.date, task.priority, task.project, task.completed);
         });
      }

      Object.assign(projects, retrievedProjectsObject);
   }

   renderTabContent();
   updateBadgeNumber();
   renderProjectSection();
}