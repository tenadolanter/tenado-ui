import Vue from "vue";
import entry from "./App";
import VueRouter from "vue-router";
import Element from "main/index.js";
import hljs from "highlight.js";
import routes from "./route.config";
import demoBlock from "./components/demo-block";
import SideNav from "./components/side-nav";

import "theme/src/index.scss";
import "./demo-styles/index.scss";
import "./assets/styles/common.css";
import "./assets/styles/fonts/style.css";
import "@tenado/icons/lib/index.min.css";
import icon from "@tenado/icons/lib/config.json";

Vue.use(Element);
Vue.use(VueRouter);
Vue.component("demo-block", demoBlock);
Vue.component("side-nav", SideNav);

const globalEle = new Vue({
  data: { $isEle: false }, // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => globalEle.$data.$isEle,
      set: (data) => {
        globalEle.$data.$isEle = data;
      },
    },
  },
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes,
});

router.afterEach((route) => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code:not(.hljs)");
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = "Tdement";
});

new Vue({
  // eslint-disable-line
  ...entry,
  router,
}).$mount("#app");
