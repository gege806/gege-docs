---
layout: default
title: "🍸 gg-bar-relax | 酒吧减压饮品"
---

# 🍸 gg-bar-relax | 酒吧减压饮品

FiveM 酒吧减压插件，对接 jg-stress-addon 压力系统。玩家使用饮品后立即清除全部压力，并获得 30 秒压力免疫。

## 功能

- 使用饮品**一次清空**所有压力
- **30 秒压力免疫**，期间不会产生任何压力
- NPC 酒保商店，支持 **ox_target** 准星交互 或 **E 键**交互
- **职业限制**，仅允许指定职业购买
- 喝酒动画 + 通知提示
- 支持 **ESX / QB-Core / QBX-Core** 自动检测

## 依赖

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)
- [jg-stress-addon](https://github.com/jgscripts/jg-stress-addon)
- [ox_target](https://github.com/overextended/ox_target)（可选，`Config.NPC.UseTarget = true` 时需要）

## 安装

1. 将 `gg-bar-relax` 放入 `resources` 目录
2. 在 `server.cfg` 中添加（确保在依赖之后）：
   ```
   ensure gg-bar-relax
   ```
3. 在 `ox_inventory/data/items.lua` 中添加物品（**`usable = true` 必填，否则使用无反应**）：
   ```lua
   ['gege'] = {
       label = '格格特调酒',
       weight = 200,
       stack = true,
       close = true,
       usable = true,
   },
   ```
4. 重启服务器

## 配置

编辑 `config.lua`：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `Config.ImmuneDuration` | 压力免疫时长（毫秒） | `30000` |
| `Config.NPC.model` | NPC 模型 | `s_f_y_bartender_01` |
| `Config.NPC.coords` | NPC 位置 | 酒吧默认坐标 |
| `Config.NPC.UseTarget` | 使用 ox_target（true）或 E 键（false） | `true` |
| `Config.AllowedJobs` | 允许购买的职业 | `police` |
| `Config.Items` | 饮品列表（名称、标签、价格） | 格格特调酒 $50 |

## 作者

格格
