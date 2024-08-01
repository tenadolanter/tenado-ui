import TdDropdown from "./src/dropdown";

/* istanbul ignore next */
TdDropdown.install = function(Vue) {
  Vue.component(TdDropdown.name, TdDropdown);
};

export default TdDropdown;
