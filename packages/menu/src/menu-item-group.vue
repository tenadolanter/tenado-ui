<template>
  <li class="td-menu-item-group">
    <div
      class="td-menu-item-group__title"
      :style="{ paddingLeft: levelPadding + 'px' }"
    >
      <template v-if="!$slots.title">{{ title }}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  name: "TdMenuItemGroup",

  componentName: "TdMenuItemGroup",

  inject: ["rootMenu"],
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      paddingLeft: 20,
    };
  },
  computed: {
    levelPadding() {
      let padding = 20;
      let parent = this.$parent;
      if (this.rootMenu.collapse) return 20;
      while (parent && parent.$options.componentName !== "TdMenu") {
        if (parent.$options.componentName === "TdSubmenu") {
          padding += 20;
        }
        parent = parent.$parent;
      }
      return padding;
    },
  },
};
</script>
