## TreeSelect 树形下拉框控件

### 基础用法

基础的树形结构展示。

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: "11",
        props: {
          value: "value",
          label: "name",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1" },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### 多选

基础的树形结构展示。

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  :multiple="true"
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: [],
        props: {
          value: "value",
          label: "name",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1" },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### check-strictly 为 true 的单选

正常情况下不能选择父节点，设置 check-strictly 为 true 后可以。

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  check-strictly
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: [],
        props: {
          value: "value",
          label: "name",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1" },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### check-strictly 为 true 的多选

正常情况下不能选择父节点，设置 check-strictly 为 true 后可以。

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  :multiple="true"
  check-strictly
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: [],
        props: {
          value: "value",
          label: "name",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1" },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### 禁用状态

禁用状态。

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: "11",
        props: {
          value: "value",
          label: "name",
          disabled: "disabled",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1", disabled: true },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
            disabled: true,
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### 可搜索

可以利用搜索功能快速查找选项

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :data="treeData"
  :props="props"
  :multiple="true"
  filterable
  check-strictly
  clearable
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: [],
        props: {
          value: "value",
          label: "name",
        },
        treeData: [
          {
            value: "1",
            name: "region",
            children: [
              { value: "11", name: "region1" },
              { value: "12", name: "region2" },
            ],
          },
          {
            value: "2",
            name: "text",
          },
          {
            value: "3",
            name: "name",
          },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
    },
  };
</script>
```

:::

### 懒加载

可以利用搜索功能快速查找选项

:::demo

```html
<td-tree-select
  v-model="value"
  @input="handleInput"
  :props="props"
  :multiple="true"
  filterable
  check-strictly
  clearable
  lazy
  :value-labels="valueLabels"
  :load="loadNode"
  @label-change="handleLabelChange"
></td-tree-select>

<script>
  export default {
    data() {
      return {
        value: [1, 2],
        props: {
          value: "value",
          label: "name",
          isLeaf: "leaf",
        },
        valueLabels: [
          { value: 1, label: "region" },
          { value: 2, label: "leaf" },
        ],
      };
    },
    methods: {
      handleInput(val) {
        console.log("handleInput", val);
      },
      handleLabelChange(val) {
        console.log("handleLabelChange", val);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: "region", value: 1 }]);
        }
        if (node.level > 1) return resolve([]);
        setTimeout(() => {
          const data = [
            {
              value: 2,
              name: "leaf",
              leaf: true,
            },
            {
              value: 3,
              name: "zone",
            },
          ];

          resolve(data);
        }, 500);
      },
    },
  };
</script>
```

:::

### TreeSelect Attributes

| 参数               | 说明                                                                   | 类型                                                   | 可选值            | 默认值 |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------ | ----------------- | ------ |
| value / v-model    | 绑定值                                                                 | boolean / string / number，multiple 为 true 时值为数组 | —                 | —      |
| data               | 展示数据                                                               | array                                                  | -                 | -      |
| props              | 配置选项，具体看下表                                                   | object                                                 | -                 | -      |
| size               | 输入框尺寸                                                             | string                                                 | medium/small/mini | -      |
| placeholder        | 占位符                                                                 | string                                                 | -                 | 请选择 |
| multiple           | 是否多选                                                               | boolean                                                | —                 | false  |
| disabled           | 是否禁用                                                               | boolean                                                | —                 | false  |
| clearable          | 是否可以清空选项                                                       | boolean                                                | —                 | false  |
| filterable         | 是否可搜索                                                             | boolean                                                | —                 | false  |
| popperClass        | 下拉框的类名                                                           | string                                                 | —                 | -      |
| collapseTags       | 多选时是否将选中值按文字的形式展示                                     | boolean                                                | —                 | false  |
| popperAppendToBody | 是否将弹出框插入至 body 元素                                           | boolean                                                | —                 | false  |
| check-strictly     | 是否严格的遵循父子不互相关联的做法，为 true 时可以选带 children 的节点 | boolean                                                | —                 | false  |
| value-labels       | 懒加载时候的 label 映射，示例[{ value: 1, label: '测试' }]             | array                                                  | —                 | []     |

### props

| 参数     | 说明                                                     | 类型                          | 可选值 | 默认值 |
| -------- | -------------------------------------------------------- | ----------------------------- | ------ | ------ |
| value    | 指定节点值为节点对象的某个属性值                         | string, number                | —      | —      |
| label    | 指定节点标签为节点对象的某个属性值                       | string, function(data, node)  | —      | —      |
| children | 指定子树为节点对象的某个属性值                           | string                        | —      | —      |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | boolean, function(data, node) | —      | —      |
| isLeaf   | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —      | —      |

### TreeSelect Events

| 事件名称     | 说明                                 | 回调参数           |
| ------------ | ------------------------------------ | ------------------ |
| change       | 选中值发生变化时触发                 | 目前的选中值       |
| label-change | 暴露选中值对应的 label，仅 lazy 生效 | 目前的选中值和标签 |

### TreeSelect Slots

|   name  | 说明                    |
| ------- | ----------------------- |
| prefix  | TreeSelect 组件头部内容 |

### Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |
