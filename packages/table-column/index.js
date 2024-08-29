import TdTableColumn from "../table/src/table-column";

/* istanbul ignore next */
TdTableColumn.install = function(Vue) {
  Vue.component(TdTableColumn.name, TdTableColumn);
};

export default TdTableColumn;
