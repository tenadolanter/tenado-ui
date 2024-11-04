## Icon-Picker 图标选择器

从下拉里面选择图标

### 基础用法

:::demo

```html
<template>
  <td-icon-picker v-model="value" placeholder="请选择"></td-icon-picker>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
      };
    },
  };
</script>
```

:::
