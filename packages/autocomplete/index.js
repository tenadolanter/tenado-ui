import TdAutocomplete from "./src/autocomplete";

/* istanbul ignore next */
TdAutocomplete.install = function(Vue) {
  Vue.component(TdAutocomplete.name, TdAutocomplete);
};

export default TdAutocomplete;
