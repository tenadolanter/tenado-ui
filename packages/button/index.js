import TdButton from "./src/button";

/* istanbul ignore next */
TdButton.install = function(Vue) {
  Vue.component(TdButton.name, TdButton);
};

export default TdButton;
