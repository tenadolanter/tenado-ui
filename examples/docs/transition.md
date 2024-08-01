## 内置过渡动画

Element 内应用在部分组件的过渡动画，你也可以直接使用。在使用之前请阅读 [transition 组件文档](https://v2.cn.vuejs.org/v2/api/#transition) 。

### fade 淡入淡出

:::demo 提供 `td-fade-in-linear` 和 `td-fade-in` 两种效果。

```html
<template>
  <div>
    <td-button @click="show = !show">Click Me</td-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="td-fade-in-linear">
        <div v-show="show" class="transition-box">.td-fade-in-linear</div>
      </transition>
      <transition name="td-fade-in">
        <div v-show="show" class="transition-box">.td-fade-in</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### zoom 缩放

:::demo 提供 `td-zoom-in-center`，`td-zoom-in-top` 和 `td-zoom-in-bottom` 三种效果。

```html
<template>
  <div>
    <td-button @click="show2 = !show2">Click Me</td-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="td-zoom-in-center">
        <div v-show="show2" class="transition-box">.td-zoom-in-center</div>
      </transition>

      <transition name="td-zoom-in-top">
        <div v-show="show2" class="transition-box">.td-zoom-in-top</div>
      </transition>

      <transition name="td-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.td-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show2: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### collapse 展开折叠

使用 `td-collapse-transition` 组件实现折叠展开效果。

:::demo

```html
<template>
  <div>
    <td-button @click="show3 = !show3">Click Me</td-button>

    <div style="margin-top: 20px; height: 200px;">
      <td-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </td-collapse-transition>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      show3: true,
    }),
  };
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::

### 按需引入

```js
// fade/zoom 等
import "@tenado/ui/lib/theme-chalk/base.css";
// collapse 展开折叠
import CollapseTransition from "@tenado/ui/lib/transitions/collapse-transition";
import Vue from "vue";

Vue.component(CollapseTransition.name, CollapseTransition);
```
