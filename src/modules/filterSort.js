
import { projects } from "./project.js";
import { inboxTasks } from "./taskManager.js";

let allTasks = [];

export function collectAllTasks() {
   allTasks = [];
   allTasks.push(...inboxTasks);
   for (let key in projects) {
      allTasks.push(...projects[key]);
   }
}