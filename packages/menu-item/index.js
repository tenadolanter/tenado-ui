import TdMenuItem from "../menu/src/menu-item";

/* istanbul ignore next */
TdMenuItem.install = function(Vue) {
  Vue.component(TdMenuItem.name, TdMenuItem);
};

export default TdMenuItem;
