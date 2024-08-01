import TdTabs from "./src/tabs";

/* istanbul ignore next */
TdTabs.install = function(Vue) {
  Vue.component(TdTabs.name, TdTabs);
};

export default TdTabs;
