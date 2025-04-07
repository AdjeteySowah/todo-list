
import { projects } from "./project.js";
import { inboxTasks } from "./taskManager.js";
import { updateBadgeNumber } from "./ui.js";

let allTasks = [];
let tasksWithDate = [];
export let tasksForToday = [];
export let tasksForTheWeek = [];


export function collectAllTasks() {
   allTasks = [];
   allTasks.push(...inboxTasks);
   for (let key in projects) {
      allTasks.push(...projects[key]);
   }

   getTasksWithDate();
   getTasksForToday();
   getTasksForTheWeek();
}

function getTasksWithDate() {
   tasksWithDate = allTasks.filter(task => task.date !== undefined && task.date !== "");
}

export function getTasksForToday() {
   let today = new Date();
   today.setHours(0, 0, 0, 0);
 
   tasksForToday = tasksWithDate.filter((task) => {
      let taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
   });

   updateBadgeNumber();
}


export function getTasksForTheWeek() {
   let today = new Date();

   let firstDayOfWeek = new Date(today);
   firstDayOfWeek.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
   );
   firstDayOfWeek.setHours(0, 0, 0, 0); // set to start of day

   let lastDayOfWeek = new Date(firstDayOfWeek);
   lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
   lastDayOfWeek.setHours(23, 59, 59, 999); // set to end of day

   tasksForTheWeek = tasksWithDate.filter((task) => {
      let taskDate = new Date(task.date);
      return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
   });

   updateBadgeNumber();
}
