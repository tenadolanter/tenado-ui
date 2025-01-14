## Password 密码输入框

密码输入框。

### 基础用法

:::demo

```html
<td-password v-model="input" placeholder="请输入内容"></td-password>

<script>
  export default {
    data() {
      return {
        input: "",
      };
    },
  };
</script>
```

:::

### 显示隐藏密码

:::demo

```html
<td-password
  v-model="input"
  placeholder="请输入内容"
  show-password
></td-password>

<script>
  export default {
    data() {
      return {
        input: "",
      };
    },
  };
</script>
```

:::

### 指定类型

:::demo

```html
<td-password
  v-model="input"
  type="password"
  placeholder="请输入内容"
  show-password
></td-password>

<script>
  export default {
    data() {
      return {
        input: "",
      };
    },
  };
</script>
```

:::

### Password Attributes

| 参数            | 说明                 | 类型            | 可选值 | 默认值 |
| --------------- | -------------------- | --------------- | ------ | ------ |
| value / v-model | 绑定值               | string / number | —      | —      |
| type            | 指定输入框的类型     | string          | —      | —      |
| show-password   | 是否显示切换密码图标 | boolean         | —      | false  |
