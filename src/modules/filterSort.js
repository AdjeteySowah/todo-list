
import { projects } from "./project.js";
import { inboxTasks } from "./taskManager.js";
import { updateBadgeNumber } from "./ui.js";
import { format } from "date-fns";

let allTasks = [];

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

let tasksWithDate;

function getTasksWithDate() {
   tasksWithDate = allTasks.filter(task => task.date !== undefined && task.date !== "");
}

export let tasksForToday = [];

function getTasksForToday() {
   tasksForToday = tasksWithDate.filter(task => task.date === format(new Date().toDateString(), "EEE, MMM d, yyyy"));
   updateBadgeNumber();
}

export let tasksForTheWeek = [];

function getTasksForTheWeek() {
   let today = new Date();
   let firstDayOfWeek = new Date(today);
   firstDayOfWeek.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));

   let lastDayOfWeek = new Date(firstDayOfWeek);
   lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

   tasksForTheWeek = tasksWithDate.filter((task) => {
      let taskDate = new Date(Date.parse(task.date));
      return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
   });

   updateBadgeNumber();
}