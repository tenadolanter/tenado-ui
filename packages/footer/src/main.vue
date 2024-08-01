<template>
  <footer class="td-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: "TdFooter",

  componentName: "TdFooter",

  props: {
    height: {
      type: String,
      default: "60px",
    },
  },
};
</script>
