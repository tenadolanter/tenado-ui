import TdMenuItemGroup from "../menu/src/menu-item-group";

/* istanbul ignore next */
TdMenuItemGroup.install = function(Vue) {
  Vue.component(TdMenuItemGroup.name, TdMenuItemGroup);
};

export default TdMenuItemGroup;
