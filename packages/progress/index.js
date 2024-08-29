import TdProgress from "./src/progress";

/* istanbul ignore next */
TdProgress.install = function(Vue) {
  Vue.component(TdProgress.name, TdProgress);
};

export default TdProgress;
