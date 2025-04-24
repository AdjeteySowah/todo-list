
import SlideInMenu from "slide-in-menu";
import "./styles.css";

import { listenForClicksInSidebar, listenForClicksInMain, listenForClicksInModal, listenForPageLoad } from "./modules/controller.js";

function init() {
  listenForPageLoad();
  listenForClicksInSidebar();
  listenForClicksInMain();
  listenForClicksInModal();
}

init();

export const slideMenu = new SlideInMenu(".sidebar");