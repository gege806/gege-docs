---
layout: default
title: "qb-tickets — FiveM QB-Core 格格工单系统"
---

# qb-tickets — FiveM QB-Core 格格工单系统

即插即用的工单系统，原生 HTML/CSS/JS，支持 Kook 机器人通知。

## 📝 更新日志

### v1.2.0 (2025-03-02)

- **举报类型选择** — 提交工单时必须选择类型（BUG反馈/外挂举报/玩家举报/滥权举报/建议反馈/其他）
- **管理员可见 License** — 工单详情中管理员可查看并复制举报人的 license 信息
- **全深色 UI** — 统一深色主题，背景透明可看到游戏画面，无遮罩
- **管理员 License 白名单** — 不再使用权限组，改在配置里填入 license 精确控制
- **一键清除已结案工单** — 管理员界面新增清除按钮，清除所有已关闭工单
- **拖拽滚动** — 工单列表和聊天消息区域支持鼠标拖拽滚动
- **结案自动刷新** — 工单关闭后自动从服务器拉取最新列表
- **UI 开关修复** — 修复关闭后无法再次打开的问题
- **Kook 卡片去 Logo** — 卡片消息不再包含图标，纯文字
- **启动 Banner** — 资源启动时控制台显示格格品牌标识
- **配置说明改为中文**

### v1.1.0

- **Kook 集成内置化** — 不再需要单独的机器人目录，Kook 通知直接由本资源发送
- **数据库独立** — 数据库逻辑单独拆出
- **首次启动自动初始化** — 自动建表、建索引、插入欢迎工单
- **超时自动关闭** — 超时小时数后台自动关单
- **查找玩家工单修复** — 按角色 ID 匹配
- **ESC 关闭优化** — 界面关闭后降低空转
- **Toast 通知** — 右上角通知卡片 + 双重音效
- **GPU 加速** — 界面绘制更流畅

### v1.0.0

- 初始版本

## ✅ 功能

- `/gd` 打开工单界面，ESC 关闭
- 提交工单时选择举报类型（6种分类）
- 管理员可查看并复制举报人 License
- 全深色 UI，背景透明，不遮挡游戏画面
- 管理员通过 license 白名单控制，可查看/管理所有工单
- 管理员一键清除已结案工单
- 工单列表 & 聊天区域支持拖拽滚动
- 右上角通知卡片 + Web Audio & GTA 原生双重音效
- 实时聊天、双方可关闭、超时自动关闭、结案自动刷新
- 数据库自动建表/建索引/加载历史/ID 同步
- Kook 卡片消息推送 + 日志记录（纯文字，无 Logo）

## 📦 安装

1. 复制 `qb-tickets` 到 `resources/[local]/`
2. `server.cfg` 添加 `ensure qb-tickets`
3. 编辑 `config.lua` 配置管理员 license、Kook Token、指令名
4. 启动即可 — **无需导入 SQL**，首次自动建表和初始化数据

## ⚙️ 配置 `config.lua`

```lua
-- 管理员列表（填入 license）
Config.Admins = {
    'license:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
}

-- 打开工单界面的指令
Config.Command = 'gd'   -- 游戏内输入 /gd 打开工单

Config.Settings = {
    SaveToDB = true,        -- 保存到数据库
    AutoLoadDB = true,      -- 启动时加载历史工单
    AutoCloseHours = 24,    -- 超时自动关闭 (0=禁用)
}

Config.Database = {
    AutoCreateTables = true,   -- 自动建表
    AutoCreateIndex = true,    -- 自动建索引
    InsertDefaultData = true,  -- 首次插入欢迎数据
    LoadClosedTickets = true,  -- 加载已关闭工单
    SyncCounter = true,        -- 同步ID计数器
}

Config.Kook = {
    Enabled = true,
    BotToken = 'YOUR_TOKEN',
    ChannelId = 'NOTIFY_CHANNEL',
    LogChannelId = 'LOG_CHANNEL',
    KookApiBase = 'https://www.kookapp.cn/api/v3',
}
```

## 🎮 使用

| 命令 | 说明 |
|------|------|
| `/gd` | 打开/关闭工单 |
| `ESC` | 关闭界面 |
| `/tickets` | 控制台查看开放工单 |

**玩家**：`/gd` → 填写标题 → 选择举报类型 → 提交 → 在列表中聊天  
**管理员**：收到右上角通知 → `/gd` 查看所有工单 → 查看举报人 License → 回复/关闭/一键清除

## ⚙️ 依赖

- **qb-core**（必需）
- **oxmysql**（可选，`SaveToDB = false` 则不需要）

## 🔧 FAQ

- **不用数据库？** `SaveToDB = false`，移除 fxmanifest 中 oxmysql 行
- **不用 Kook？** `Config.Kook.Enabled = false`
- **改指令？** `Config.Command = '你的指令'`
- **ID 重复？** 不会，启动时从 DB 同步计数器
- **添加管理员？** 在 `Config.Admins` 里加入对应 license
