## Icon-Picker 图标选择器

从下拉里面选择图标

### 基础用法

:::demo

```html
<template>
  <td-icon-picker
    style="width: 100%"
    v-model="value"
    :options="options"
    placeholder="请选择"
  ></td-icon-picker>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        options: this.$icon.map((item) => {
          return {
            value: item.fontClass,
            label: item.fontClass,
          };
        }),
      };
    },
  };
</script>
```

:::

### 禁用状态

选择器不可用状态

:::demo 为`td-icon-picker`设置`disabled`属性，则整个选择器不可用

```html
<template>
  <td-icon-picker
    v-model="value"
    :options="options"
    disabled
    placeholder="请选择"
  ></td-icon-picker>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        options: this.$icon.map((item) => {
          return {
            value: item.fontClass,
            label: item.fontClass,
          };
        }),
      };
    },
  };
</script>
```

:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`td-icon-picker`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

```html
<template>
  <td-icon-picker
    v-model="value"
    :options="options"
    clearable
    placeholder="请选择"
  ></td-icon-picker>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        options: this.$icon.map((item) => {
          return {
            value: item.fontClass,
            label: item.fontClass,
          };
        }),
      };
    },
  };
</script>
```

:::

### Attributes

| 参数               | 说明                         | 类型                    | 可选值            | 默认值 |
| ------------------ | ---------------------------- | ----------------------- | ----------------- | ------ |
| value / v-model    | 绑定值                       | string                  | —                 | —      |
| placeholder        | 是否多选                     | boolean                 | —                 | —      |
| size               | 输入框尺寸                   | string                  | medium/small/mini | —      |
| disabled           | 是否禁用                     | boolean                 | —                 | false  |
| clearable          | 是否可以清空选项             | boolean                 | —                 | false  |
| popperClass        | 下拉框的类名                 | string                  | —                 | —      |
| popperAppendToBody | 是否将弹出框插入至 body 元素 | boolean                 | —                 | false  |
| options            | 可以被选择的值               | Array&lt;OptionItem&gt; | —                 | []     |

### OptionItem

| 参数  | 说明                                      | 类型   | 可选值 | 默认值 |
| ----- | ----------------------------------------- | ------ | ------ | ------ |
| value | 选项的值                                  | string | —      | —      |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string | —      | —      |

### Select Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
