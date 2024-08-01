import TdCheckbox from "./src/checkbox";

/* istanbul ignore next */
TdCheckbox.install = function(Vue) {
  Vue.component(TdCheckbox.name, TdCheckbox);
};

export default TdCheckbox;
