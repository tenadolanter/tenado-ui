import TdIcon from "./src/icon.vue";

/* istanbul ignore next */
TdIcon.install = function(Vue) {
  Vue.component(TdIcon.name, TdIcon);
};

export default TdIcon;
