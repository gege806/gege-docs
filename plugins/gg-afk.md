---
layout: default
title: "挂机奖励 gg_afk"
---

# 挂机奖励 gg_afk

进圈按键挂机，倒计时结束后自动发奖。支持 ESX / QB-Core / QBOX。

## 功能

- 多个挂机区域，可自定义半径与奖励
- 奖励类型：现金 / 黑钱 / 物品
- 挂机期间可锁定饥饿与口渴
- 区域冷却、地图标记、侧边 UI
- 物品图标默认读取 ox_inventory

## 依赖

- **oxmysql**
- 框架三选一：`es_extended` / `qb-core` / `qbx_core`
- QBOX 发物品建议配合 **ox_inventory**
- 可选：`okokNotify`

## 安装

1. 把 `gg_afk` 放进 `resources`
2. `server.cfg` 写入 `ensure gg_afk`（框架与 ox_inventory 先启动）
3. 编辑 `config.lua`

## 配置说明

| 项 | 说明 |
|----|------|
| 框架 | `'esx'` / `'qb'` / `'qbox'`（也可用 `'qbx'`） |
| 通知 | `'esx'` / `'qb'` / `'qbox'` / `'okok'` / `'chat'` |
| 挂机区域 | 坐标、半径、奖励列表 |
| 奖励类型 | `money` 现金 · `black_money` 黑钱 · `item` 物品 |
| 挂机秒数 | 每条奖励的倒计时时长 |
| 状态锁定 | 挂机时是否刷新饥饿/口渴 |
| 领奖冷却 | 同区再次领奖间隔，0 为不限制 |

### QBOX 示例

```lua
Config.Framework = 'qbox' -- 框架选 QBOX
Config.NotifySystem = 'qbox' -- 通知用 QBOX
```

黑钱在有 ox_inventory 时按物品 `black_money` 发放；物品奖励走 ox_inventory。

## 使用

1. 走进挂机圈
2. 按配置的按键（默认 E）开始
3. 倒计时结束自动发奖；再按一次可取消
4. 离开区域会中断挂机

## 更新日志

### 1.1.0

- 新增 QBOX 框架支持
- 物品发放对接 ox_inventory（QBOX / 已装 ox 的 QB）
- 配置注释改为行尾说明
- 配置文件加入不加密清单

### 1.0.0

- 首发：挂机区域、倒计时发奖、ESX / QB 双框架
