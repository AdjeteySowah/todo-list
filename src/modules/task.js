import { formatDate } from "./utility.js";

export function createTask(title, description = undefined, date = undefined, priority = undefined, project) {
   return {
      title,
      description,
      date,
      priority,
      project,
      completed: false,
      
      changeTitle(title) {
         this.title = title;
      },

      changeDescription(desc) {
         this.description = desc;
      },

      changeDueDate(date) {
         this.date = formatDate(date);
      },

      changePriority(prio) {
         this.priority = prio;
      },

      changeCompletedStatus() {
         if (this.completed === false) {
            this.completed = true;
         } else {
            this.completed = false;
         }
      },
   }
}