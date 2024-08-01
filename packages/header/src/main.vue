<template>
  <header class="td-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "TdHeader",

  componentName: "TdHeader",

  props: {
    height: {
      type: String,
      default: "60px",
    },
  },
};
</script>
