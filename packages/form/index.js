import TdForm from "./src/form";

/* istanbul ignore next */
TdForm.install = function(Vue) {
  Vue.component(TdForm.name, TdForm);
};

export default TdForm;
