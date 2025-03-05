
import "./styles.css";

import { initTabClickEvent, listenForClicksInMain } from "./modules/controller.js";
import { renderTabContent } from "./modules/ui.js";

function init() {
   initTabClickEvent();
   renderTabContent();
   listenForClicksInMain();
}

init();