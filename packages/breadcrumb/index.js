import TdBreadcrumb from "./src/breadcrumb";

/* istanbul ignore next */
TdBreadcrumb.install = function(Vue) {
  Vue.component(TdBreadcrumb.name, TdBreadcrumb);
};

export default TdBreadcrumb;
