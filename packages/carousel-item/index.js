import TdCarouselItem from "../carousel/src/item";

/* istanbul ignore next */
TdCarouselItem.install = function(Vue) {
  Vue.component(TdCarouselItem.name, TdCarouselItem);
};

export default TdCarouselItem;
