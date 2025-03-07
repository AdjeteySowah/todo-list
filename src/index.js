
import "./styles.css";

import { listenForClicksInSidebar, listenForClicksInMain } from "./modules/controller.js";
import { renderTabContent } from "./modules/ui.js";

function init() {
   listenForClicksInSidebar();
   renderTabContent();
   listenForClicksInMain();
}

init();


let projectContainer = document.querySelector(".sidebar__projects-container");

let observer = new MutationObserver(() => {
  projectContainer.scrollTop = projectContainer.scrollHeight;
});

observer.observe(projectContainer, { childList: true });
