import TdInput from "./src/input";

/* istanbul ignore next */
TdInput.install = function(Vue) {
  Vue.component(TdInput.name, TdInput);
};

export default TdInput;
