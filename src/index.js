
import "./styles.css";

import { listenForClicksInSidebar, listenForClicksInMain, listenForClicksInModal } from "./modules/controller.js";
import { renderTabContent } from "./modules/ui.js";

function init() {
  listenForClicksInSidebar();
  renderTabContent();
  listenForClicksInMain();
  listenForClicksInModal();
}

init();
