## 前言
首先感谢 ```iview-admin``` 作者，项目是基于 iview 官方群 里一位可爱的小伙伴 分享的动态路由 ```iview-admin2.0``` 改的。因 官方版 用 ```Vuex``` 管理状态，刷新 页面，状态数据都会初始化。所以改动了代码，使用 ```localStorage``` 来存储一些用户数据。 做了登录和登出的实现，仅供参考。

## api 路由格式 JSON
模拟数据在 ```/src/mock/router.js```
大致格式如何：
```
[
	{
        "path": "/components",
        "name": "components",
        "meta": {
          "icon": "logo-buffer",
          "title": "组件"
        },
        "component": "Main",
        "children": [
          {
            "path": "markdown_page",
            "name": "markdown_page",
            "meta": {
              "icon": "logo-markdown",
              "title": "Markdown编辑器"
            },
            "component": "Markdown"
          },
          {
            "path": "editor_page",
            "name": "editor_page",
            "meta": {
              "icon": "ios-create",
              "title": "富文本编辑器"
            },
            "component": "Editor"
          }
        ]
    }
]
```

## 基于版本：v2.0-beta.4
官方版 => [在线访问](https://github.com/iview/iview-admin)
更多用法，请参照官方文档。

## install
```
// install dependencies
npm install
```

## Run
```
npm run dev
```

Development
```
npm run dev
```

Production(Build)
```
npm run build

```
