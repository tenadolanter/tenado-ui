import TdSubmenu from "../menu/src/submenu";

/* istanbul ignore next */
TdSubmenu.install = function(Vue) {
  Vue.component(TdSubmenu.name, TdSubmenu);
};

export default TdSubmenu;
