import TdOptionGroup from "../select/src/option-group";

/* istanbul ignore next */
TdOptionGroup.install = function(Vue) {
  Vue.component(TdOptionGroup.name, TdOptionGroup);
};

export default TdOptionGroup;
