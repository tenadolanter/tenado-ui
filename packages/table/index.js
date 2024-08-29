import TdTable from "./src/table";

/* istanbul ignore next */
TdTable.install = function(Vue) {
  Vue.component(TdTable.name, TdTable);
};

export default TdTable;
