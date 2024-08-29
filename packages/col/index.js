import TdCol from "./src/col";

/* istanbul ignore next */
TdCol.install = function(Vue) {
  Vue.component(TdCol.name, TdCol);
};

export default TdCol;
