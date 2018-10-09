export const getRouterData = req => {
  const routerInfoJSONStr = `[
        {"path":"/login","name":"login","meta":{"title":"Login - 登录","hideInMenu":true},"component":"Login"},
        {"path":"/","name":"_home","redirect":"/home","meta":{"notCache":true,"hideInMenu":true},"component":"Main",
        "children":[{"path":"/home","name":"home","meta":{"notCache":true,"hideInMenu":true,"title":"首页"},"component":"Home"}]},
        {"path":"/401","name":"error_401","meta":{"hideInMenu":true},"component":"Error401"},
        {"path":"/500","name":"error_500","meta":{"hideInMenu":true},"component":"Error500"},
        {"path":"*","name":"error_404","meta":{"hideInMenu":true},"component":"Error404"},
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
    ]`

  let routerInfos = JSON.parse(routerInfoJSONStr)
  return routerInfos
}
