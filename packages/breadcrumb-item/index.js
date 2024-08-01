import TdBreadcrumbItem from "../breadcrumb/src/breadcrumb-item";

/* istanbul ignore next */
TdBreadcrumbItem.install = function(Vue) {
  Vue.component(TdBreadcrumbItem.name, TdBreadcrumbItem);
};

export default TdBreadcrumbItem;
