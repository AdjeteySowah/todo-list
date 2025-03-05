
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

      addDescription(desc) {
         this.description = desc;
      },

      addDueDate(date) {
         this.date = date;
      },

      addPriority(prio) {
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