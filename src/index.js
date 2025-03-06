
import "./styles.css";

import { listenForClicksInSidebar, listenForClicksInMain } from "./modules/controller.js";
import { renderTabContent } from "./modules/ui.js";

function init() {
   listenForClicksInSidebar();
   renderTabContent();
   listenForClicksInMain();
}

init();