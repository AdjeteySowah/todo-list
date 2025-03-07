
let projects = {
   "Gym": [],
   "Coding": [],
};

export function createProject() {
   let sidebar = document.querySelector(".sidebar");
   let taskInputValue = sidebar.querySelector(".input").value.trim();
   let formattedTaskInputValue = `${taskInputValue[0].toUpperCase()}${taskInputValue.slice(1)}`
   projects[formattedTaskInputValue] = [];
   console.log(projects);
}