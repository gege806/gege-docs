---
layout: default
title: "TXSync - 高级名称同步系统"
---

# TXSync - 高级名称同步系统

FiveM ESX/QB-Core 双框架支持的高级名称同步资源，将玩家角色名称实时同步至 TX Admin 显示面板。

## 功能特性

- **双框架支持**: 自动检测并支持 ESX 和 QB-Core 框架
- **实时同步**: 玩家登录、角色加载、角色切换时自动同步
- **自定义格式**: 灵活配置显示名称格式
- **职业显示**: 可选显示玩家当前职业
- **定期同步**: 自动定期同步确保数据准确
- **管理命令**: 提供手动同步命令

## 安装

1. 将 `txsync` 文件夹放入服务器的 `resources` 目录
2. 在 `server.cfg` 中添加:
   ```
   ensure oxmysql
   ensure es_extended  # 或 qb-core
   ensure txsync
   ```
3. 根据需要修改 `config.lua` 配置

## 依赖

- **oxmysql** - 数据库连接
- **es_extended** 或 **qb-core** - 游戏框架

## 配置说明

```lua
Config = {}

-- 框架选择: 'esx' 或 'qb' 或 'auto' (自动检测)
Config.Framework = 'auto'

-- 名称显示格式
-- 可用变量: {firstname}, {lastname}, {fullname}, {fivem_name}, {job}, {id}
Config.NameFormat = "[{id}] {fullname} | {fivem_name}"

-- 同步间隔 (毫秒)
Config.SyncInterval = 30000

-- 是否在玩家加入时同步
Config.SyncOnJoin = true

-- 是否在角色加载/切换时同步
Config.SyncOnCharacterLoad = true

-- 是否显示职业信息
Config.ShowJob = false

-- 职业显示格式
Config.JobFormat = " [{job}]"

-- 调试模式
Config.Debug = false

-- 日志输出
Config.EnableLogs = true
```

## 名称格式示例

| 格式 | 显示效果 |
|------|----------|
| `[{id}] {fullname} \| {fivem_name}` | [1] 张三 \| Player123 |
| `{fullname} ({fivem_name})` | 张三 (Player123) |
| `[ID:{id}] {firstname} {lastname}` | [ID:1] 张 三 |
| `{fivem_name} - {fullname}` | Player123 - 张三 |

## 管理命令

| 命令 | 权限 | 说明 |
|------|------|------|
| `/txsync` | command.txsync | 同步所有在线玩家名称 |
| `/txsyncplayer [ID]` | command.txsync | 同步指定玩家名称 |

### 权限配置

在 `server.cfg` 中添加:
```
add_ace group.admin command.txsync allow
```

## TX Admin 集成

会同步名字到管理后台（TX Admin 显示面板）。玩家登录、切角色、换职业时自动更新，控制台可输出同步日志。

## 何时同步

- 玩家登录 / 角色加载时
- 多角色切换时
- 职业变更时（若开启显示职业）

## 故障排除

1. **名称未同步**: 检查框架是否正确加载，启用 `Config.Debug = true` 查看日志
2. **显示为空**: 确保玩家已完成角色选择/创建
3. **TX Admin 未显示**: 确保 txAdmin (monitor) 资源正在运行

## 许可证

MIT License
