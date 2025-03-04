
import "./styles.css";

import { initTabClickEvent, listenForAddTaskClick } from "./modules/controller.js";
import { renderTabContent } from "./modules/ui.js";

function init() {
   initTabClickEvent();
   renderTabContent();
   listenForAddTaskClick();
}

init();