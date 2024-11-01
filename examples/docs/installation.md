## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i @tenado/ui -S
```

### CDN

目前可以通过 [unpkg.com/@tenado/ui](https://unpkg.com/@tenado/ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@tenado/ui/lib/theme/index.css"
/>
<!-- 引入组件库 -->
<script src="https://unpkg.com/@tenado/ui/lib/index.js"></script>
```

:::tip
我们建议使用 CDN 引入 Element 的用户在链接地址上锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::
