import TdTag from "./src/tag";

/* istanbul ignore next */
TdTag.install = function(Vue) {
  Vue.component(TdTag.name, TdTag);
};

export default TdTag;
