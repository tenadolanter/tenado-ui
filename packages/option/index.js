import TdOption from "../select/src/option";

/* istanbul ignore next */
TdOption.install = function(Vue) {
  Vue.component(TdOption.name, TdOption);
};

export default TdOption;
