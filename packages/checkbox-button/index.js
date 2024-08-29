import TdCheckboxButton from "../checkbox/src/checkbox-button.vue";

/* istanbul ignore next */
TdCheckboxButton.install = function(Vue) {
  Vue.component(TdCheckboxButton.name, TdCheckboxButton);
};

export default TdCheckboxButton;
