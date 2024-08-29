import TdDialog from "./src/component";

/* istanbul ignore next */
TdDialog.install = function(Vue) {
  Vue.component(TdDialog.name, TdDialog);
};

export default TdDialog;
