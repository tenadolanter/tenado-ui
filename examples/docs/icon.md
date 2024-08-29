## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `td-icon-iconName` 来使用即可。例如：

:::demo

```html
<i class="td-icon-edit"></i>
<i class="td-icon-share"></i>
<i class="td-icon-delete"></i>
<td-button type="primary" icon="td-icon-search">搜索</td-button>
```

:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'td-icon-' + name"></i>
      <span class="icon-name">{{'td-icon-' + name}}</span>
    </span>
  </li>
</ul>
