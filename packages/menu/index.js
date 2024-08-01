import TdMenu from "./src/menu";

/* istanbul ignore next */
TdMenu.install = function(Vue) {
  Vue.component(TdMenu.name, TdMenu);
};

export default TdMenu;
