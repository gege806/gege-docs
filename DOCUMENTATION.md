# 文档维护约定

- 完整说明书只维护在线文档：https://gege806.github.io/gege-docs/
- 仓库：https://github.com/gege806/gege-docs（改完推送 `main`，GitHub Pages 自动发布）
- 各插件目录内 **README** 仅保留：插件名 + 在线文档链接
- 每次插件更新、修复须同步改对应 `plugins/<名>.md` 与更新日志
- 新插件：在 `index.md` 对应分类增加链接；有 export / 事件时写入 `plugins/api.md`
- **玩家说明书**（各插件页）：不写目录结构、不写 export / 事件；配置只说明怎么改，不当代码接口文档
- **接口参考**（`plugins/api.md`）：export、服务端/客户端事件、调用示例；改代码接口须同步改此页
- 站点风格：黑红主题（`assets/css/site.css`）；导航头像 `assets/img/gege.png`（源图桌面 `gege.png`）
