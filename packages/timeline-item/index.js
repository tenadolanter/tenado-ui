import TdTimelineItem from "../timeline/src/item";

/* istanbul ignore next */
TdTimelineItem.install = function(Vue) {
  Vue.component(TdTimelineItem.name, TdTimelineItem);
};

export default TdTimelineItem;
