<template>
  <aside class="td-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: "TdAside",

  componentName: "TdAside",

  props: {
    width: {
      type: String,
      default: "300px",
    },
  },
};
</script>
