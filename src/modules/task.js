import { formatDate } from "./utility.js";

export function createTask(title, description, date, priority) {
   return {
      title,
      description,
      date,
      priority,
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