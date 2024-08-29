import TdDropdownItem from "../dropdown/src/dropdown-item";

/* istanbul ignore next */
TdDropdownItem.install = function(Vue) {
  Vue.component(TdDropdownItem.name, TdDropdownItem);
};

export default TdDropdownItem;
