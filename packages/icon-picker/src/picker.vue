<template>
  <div class="td-icon-picker">
    <div class="td-icon-picker__inner">
      <div class="td-icon-picker--placeholder">{{ placeholder }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TdIconPicker",
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
  },
};
</script>
