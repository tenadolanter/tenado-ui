<template>
  <i :class="'td-icon-' + name"></i>
</template>

<script>
export default {
  name: "ElIcon",

  props: {
    name: String,
  },
};
</script>
