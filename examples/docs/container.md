## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<td-container>`：外层容器。当子元素中包含 `<td-header>` 或 `<td-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<td-header>`：顶栏容器。

`<td-aside>`：侧边栏容器。

`<td-main>`：主要区域容器。

`<td-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<td-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<td-container>`。
:::

### 常见页面布局

:::demo

```html
<td-container>
  <td-header>Header</td-header>
  <td-main>Main</td-main>
</td-container>

<td-container>
  <td-header>Header</td-header>
  <td-main>Main</td-main>
  <td-footer>Footer</td-footer>
</td-container>

<td-container>
  <td-aside width="200px">Aside</td-aside>
  <td-main>Main</td-main>
</td-container>

<td-container>
  <td-header>Header</td-header>
  <td-container>
    <td-aside width="200px">Aside</td-aside>
    <td-main>Main</td-main>
  </td-container>
</td-container>

<td-container>
  <td-header>Header</td-header>
  <td-container>
    <td-aside width="200px">Aside</td-aside>
    <td-container>
      <td-main>Main</td-main>
      <td-footer>Footer</td-footer>
    </td-container>
  </td-container>
</td-container>

<td-container>
  <td-aside width="200px">Aside</td-aside>
  <td-container>
    <td-header>Header</td-header>
    <td-main>Main</td-main>
  </td-container>
</td-container>

<td-container>
  <td-aside width="200px">Aside</td-aside>
  <td-container>
    <td-header>Header</td-header>
    <td-main>Main</td-main>
    <td-footer>Footer</td-footer>
  </td-container>
</td-container>

<style>
  .td-header,
  .td-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .td-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .td-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .td-container {
    margin-bottom: 40px;
  }

  .td-container:nth-child(5) .td-aside,
  .td-container:nth-child(6) .td-aside {
    line-height: 260px;
  }

  .td-container:nth-child(7) .td-aside {
    line-height: 320px;
  }
</style>
```

:::

### 实例

:::demo

```html
<td-container style="height: 500px; border: 1px solid #eee">
  <td-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <td-menu :default-openeds="['1', '3']">
      <td-submenu index="1">
        <template slot="title"
          ><i class="td-icon-message"></i>导航一</template
        >
        <td-menu-item-group>
          <template slot="title"
            >分组一</template
          >
          <td-menu-item index="1-1">选项1</td-menu-item>
          <td-menu-item index="1-2">选项2</td-menu-item>
        </td-menu-item-group>
        <td-menu-item-group title="分组2">
          <td-menu-item index="1-3">选项3</td-menu-item>
        </td-menu-item-group>
        <td-submenu index="1-4">
          <template slot="title"
            >选项4</template
          >
          <td-menu-item index="1-4-1">选项4-1</td-menu-item>
        </td-submenu>
      </td-submenu>
      <td-submenu index="2">
        <template slot="title"
          ><i class="td-icon-menu"></i>导航二</template
        >
        <td-menu-item-group>
          <template slot="title"
            >分组一</template
          >
          <td-menu-item index="2-1">选项1</td-menu-item>
          <td-menu-item index="2-2">选项2</td-menu-item>
        </td-menu-item-group>
        <td-menu-item-group title="分组2">
          <td-menu-item index="2-3">选项3</td-menu-item>
        </td-menu-item-group>
        <td-submenu index="2-4">
          <template slot="title"
            >选项4</template
          >
          <td-menu-item index="2-4-1">选项4-1</td-menu-item>
        </td-submenu>
      </td-submenu>
      <td-submenu index="3">
        <template slot="title"
          ><i class="td-icon-setting"></i>导航三</template
        >
        <td-menu-item-group>
          <template slot="title"
            >分组一</template
          >
          <td-menu-item index="3-1">选项1</td-menu-item>
          <td-menu-item index="3-2">选项2</td-menu-item>
        </td-menu-item-group>
        <td-menu-item-group title="分组2">
          <td-menu-item index="3-3">选项3</td-menu-item>
        </td-menu-item-group>
        <td-submenu index="3-4">
          <template slot="title"
            >选项4</template
          >
          <td-menu-item index="3-4-1">选项4-1</td-menu-item>
        </td-submenu>
      </td-submenu>
    </td-menu>
  </td-aside>

  <td-container>
    <td-header style="text-align: right; font-size: 12px">
      <td-dropdown>
        <i class="td-icon-setting" style="margin-right: 15px"></i>
        <td-dropdown-menu slot="dropdown">
          <td-dropdown-item>查看</td-dropdown-item>
          <td-dropdown-item>新增</td-dropdown-item>
          <td-dropdown-item>删除</td-dropdown-item>
        </td-dropdown-menu>
      </td-dropdown>
      <span>王小虎</span>
    </td-header>

    <td-main>
      <td-table :data="tableData">
        <td-table-column prop="date" label="日期" width="140">
        </td-table-column>
        <td-table-column prop="name" label="姓名" width="120">
        </td-table-column>
        <td-table-column prop="address" label="地址"> </td-table-column>
      </td-table>
    </td-main>
  </td-container>
</td-container>

<style>
  .td-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .td-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      };
      return {
        tableData: Array(20).fill(item),
      };
    },
  };
</script>
```

:::

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                 |
| --------- | ---------------- | ------ | --------------------- | ---------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `td-header` 或 `td-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |
