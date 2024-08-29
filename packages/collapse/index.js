import TdCollapse from "./src/collapse";

/* istanbul ignore next */
TdCollapse.install = function(Vue) {
  Vue.component(TdCollapse.name, TdCollapse);
};

export default TdCollapse;
