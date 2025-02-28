
import "./styles.css";

import { initTabClickEvent, listenForAddTaskClick } from "./modules/controller.js";
import { renderInboxContent } from "./modules/ui.js";

function init() {
   initTabClickEvent();
   renderInboxContent();
   listenForAddTaskClick();
}

init();