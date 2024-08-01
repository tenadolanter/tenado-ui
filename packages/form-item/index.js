import TdFormItem from "../form/src/form-item";

/* istanbul ignore next */
TdFormItem.install = function(Vue) {
  Vue.component(TdFormItem.name, TdFormItem);
};

export default TdFormItem;
