---
layout: default
title: "格格-Checkin 每日签到系统"
---

# 格格-Checkin 每日签到系统

FiveM 每日签到插件，支持 ESX 和 QBCore 双框架。

## 功能

- 30天签到循环，每月自动重置
- 24小时冷却机制（非按日历日，精确到秒）
- 自定义奖励：现金 / 物品 / 载具
- 断签自动重置（可配置）
- `/cd` 命令或 F5 按键打开菜单
- 噜噜（水豚卡皮巴拉）主题 UI，柔和橘色玻璃质感面板
- 多张水豚 GIF 装饰（左侧吉祥物、右侧贴纸、按钮两侧应援团）
- 自动识别框架（ESX / QBCore）
- ox_inventory 物品图片自动获取
- KOOK Webhook 签到日志推送
- jg-advancedgarages 车库对接（载具奖励自动入库）
- 数据库表自动创建

## 依赖

- **oxmysql** — 数据库驱动
- **ox_inventory** — 物品图片（自动读取）
- **es_extended**（ESX）或 **qb-core**（QBCore）
- **jg-advancedgarages** — 载具奖励入库（可选）

## 安装

1. 将 `ge-checkin` 文件夹放入服务器 `resources` 目录
2. 在 `server.cfg` 中添加 `ensure ge-checkin`
3. 数据库表会在资源启动时自动创建，无需手动导入 SQL
4. 编辑 `config.lua` 配置奖励、Logo、KOOK Webhook 等

> **注意**：如果之前已有 `ge_checkin` 表且 `last_checkin` 列为 `DATE` 类型，资源启动时会自动转换为 `BIGINT`（时间戳格式），旧签到记录会被重置。

## 配置说明

编辑 `config.lua`：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `Config.Framework` | 框架选择：`'esx'` / `'qb'` / `'auto'` | `'auto'` |
| `Config.Command` | 签到命令 | `'cd'` |
| `Config.OpenKey` | 打开菜单按键（166 = F5） | `166` |
| `Config.ResetOnMiss` | 断签超48小时是否重置 | `true` |
| `Config.Logo` | Logo 图片 URL（支持图床） | — |
| `Config.Title` | UI 标题 | `'噜噜每日签到'` |
| `Config.Subtitle` | UI 副标题 | `'噜噜陪你天天签到，泡着温泉领橘子～'` |
| `Config.Garage` | 载具存入的车库名称 | `'Legion Square'` |
| `Config.Images.vehicle` | 载具图标 URL | Icons8 |
| `Config.Rewards` | 30天奖励表（全现金，1000→88888 递增） | 见文件 |

### KOOK Webhook 配置

```lua
Config.KookWebhook = {
    enabled = true,
    url = 'https://www.kookapp.cn/api/v3/message/create',
    token = '',       -- 你的 KOOK Bot Token
    channelId = '',   -- 目标频道 ID
}
```

签到成功后会自动发送卡片消息到指定频道，包含玩家名、签到天数、奖励内容和时间。

**获取 channelId**：KOOK 客户端 → 设置 → 高级设置 → 开启「开发者模式」 → 右键目标频道 → 复制 ID。

**注意**：`token` 和 `channelId` 任一为空都不会发送。

### 奖励类型

| type | 说明 | 必填字段 | 图标来源 |
|------|------|----------|----------|
| `cash` | 现金 | `amount` | ox_inventory `money.png` |
| `item` | 物品 | `name`, `amount` | ox_inventory 自动匹配 |
| `vehicle` | 载具 | `name` | 自定义 URL |

### 奖励配置示例

```lua
Config.Rewards = {
    [1]  = {type='cash', amount=1000,  label='1000游戏币'},
    [7]  = {type='cash', amount=12000, label='12000游戏币'},
    [30] = {type='cash', amount=88888, label='88888游戏币'},
    -- 也支持物品 / 载具：
    -- {type='item',    name='lockpick', amount=5, label='开锁器X5'},
    -- {type='vehicle', name='adder',    amount=1, label='跑车X1'},
}
```
