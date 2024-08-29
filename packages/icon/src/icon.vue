<template>
  <i :class="'td-icon-' + name"></i>
</template>

<script>
export default {
  name: "TdIcon",

  props: {
    name: String,
  },
};
</script>
