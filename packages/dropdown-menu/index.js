import TdDropdownMenu from "../dropdown/src/dropdown-menu";

/* istanbul ignore next */
TdDropdownMenu.install = function(Vue) {
  Vue.component(TdDropdownMenu.name, TdDropdownMenu);
};

export default TdDropdownMenu;
