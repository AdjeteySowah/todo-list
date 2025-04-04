
import "./styles.css";

import { listenForClicksInSidebar, listenForClicksInMain, listenForClicksInModal, listenForPageLoad } from "./modules/controller.js";

function init() {
  listenForPageLoad();
  listenForClicksInSidebar();
  listenForClicksInMain();
  listenForClicksInModal();
}

init();
