import TdButtonGroup from "../button/src/button-group";

/* istanbul ignore next */
TdButtonGroup.install = function(Vue) {
  Vue.component(TdButtonGroup.name, TdButtonGroup);
};

export default TdButtonGroup;
