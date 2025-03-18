
import { projects } from "./project.js";
import { inboxTasks } from "./taskManager.js";
import { format } from "date-fns";

let allTasks = [];

export function collectAllTasks() {
   allTasks = [];
   allTasks.push(...inboxTasks);
   for (let key in projects) {
      allTasks.push(...projects[key]);
   }

   console.log(allTasks);
   getTasksWithDate();
   getTaskForToday();
}

let tasksWithDate;

function getTasksWithDate() {
   tasksWithDate = allTasks.filter(task => task.date !== undefined && task.date !== "");
}

export let tasksForToday = [];

function getTaskForToday() {
   tasksForToday = tasksWithDate.filter(task => task.date === format(new Date().toDateString(), "EEE, MMM d, yyyy"));
}


// Find out how tasks can be grouped under "this week" tab