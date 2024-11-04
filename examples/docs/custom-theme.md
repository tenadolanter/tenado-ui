## 自定义主题

自定义主题示例，调整主题变量会自动调整颜色。

:::demo

```html
<td-row>
  <td-button>默认按钮</td-button>
  <td-button type="primary">主要按钮</td-button>
  <td-button type="success">成功按钮</td-button>
  <td-button type="info">信息按钮</td-button>
  <td-button type="warning">警告按钮</td-button>
  <td-button type="danger">危险按钮</td-button>
</td-row>
```

:::

### 使用主题变量

:::demo

```html
<div class="block">
  <div>主要颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-primary']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>成功颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-success']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>警告颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-warning']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>危险颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-danger']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>信息颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-info']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>主要文本颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-text-primary']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>常规文本颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-text-regular']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>次要文本颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-text-secondary']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>占位符颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-color-text-placeholder']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>基础边框颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-border-color-base']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>浅色边框颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-border-color-light']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>更浅的边框颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-border-color-lighter']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>极浅的边框颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-border-color-extra-light']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>
<div class="block">
  <div>基础背景颜色</div>
  <td-color-picker
    v-model="baseStyle['--td-background-color-base']"
    @change="handlerStyleChange"
  ></td-color-picker>
</div>

<script>
  export default {
    mounted() {
      const theme = localStorage.getItem("theme");
      this.baseStyle = theme ? JSON.parse(theme) : this.baseStyle;
      this.$theme(this.baseStyle);
    },
    data() {
      return {
        baseStyle: {
          "--td-color-primary": "#409eff",
          "--td-color-success": "#67c23a",
          "--td-color-warning": "#e6a23c",
          "--td-color-danger": "#f56c6c",
          "--td-color-info": "#909399",
          "--td-color-text-primary": "#303133",
          "--td-color-text-regular": "#606266",
          "--td-color-text-secondary": "#909399",
          "--td-color-text-placeholder": "#c0c4cc",
          "--td-border-color-base": "#dcdfe6",
          "--td-border-color-light": "#e4e7ed",
          "--td-border-color-lighter": "#ebeef5",
          "--td-border-color-extra-light": "#f2f6fc",
          "--td-background-color-base": "#f5f7fa",
        },
      };
    },
    methods: {
      handlerStyleChange() {
        localStorage.setItem("theme", JSON.stringify(this.baseStyle));
        this.$theme(this.baseStyle);
      },
    },
  };
</script>
```

:::
