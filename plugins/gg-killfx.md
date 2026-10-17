---
layout: default
title: "击杀特效 gg_killfx"
---

# gg_killfx 击杀特效

击杀玩家或 NPC 时，在屏幕上方显示击杀条：击杀者名 — 死因图标与可选 GIF 横幅 — 受害者名。玩家名字渐变色与 ge_playerhead 头顶设置一致。

当前版本：**1.0.1**

## 功能

- 击杀玩家、NPC 时弹出击杀条；多条可同时向下叠加
- 枪械优先显示 ox_inventory 物品图；拳头、载具、火焰、坠落等显示内置图标
- 管理员可为每位在线玩家分配专属击杀横幅 GIF，或清除为无壁纸
- 未分配壁纸时仅显示名字与中间图标，背景透明
- 可配置击杀条对全服、击杀者附近或仅击杀者可见（默认全服）

## 依赖

- es_extended
- oxmysql
- ox_lib
- 推荐：ox_inventory（枪械图标）、ge_playerhead（名字渐变）

## 安装

1. 将 `gg_killfx` 放入 `resources`；横幅 GIF 放在资源内 `web/backgrounds/`（默认 fav_01.gif … fav_23.gif）
2. 首次启动会自动创建数据表；也可手动执行 `sql/install.sql`
3. 在 `server.cfg` 中确保 oxmysql、ox_lib、es_extended 已启动，再 `ensure gg_killfx`（建议同时 ensure ge_playerhead、ox_inventory）
4. 可选 ACE：`add_ace group.admin gg_killfx.admin allow`
5. 按需修改 `config.lua` 后 `restart gg_killfx`

## 玩家说明

正常游玩即可。服务器若设为全服可见，任意玩家完成击杀时，在线玩家都会看到该击杀条；条上展示的是击杀者的名字、武器图标，以及管理员分配给击杀者的壁纸（未分配则无 GIF 背景）。名字颜色与 ge_playerhead 里设置的名字渐变一致。

## 管理员

| 命令 | 说明 |
| --- | --- |
| `/killfxadmin` | 打开管理面板：选玩家、分配或清除壁纸；可注册新壁纸、重载壁纸列表 |
| `/killfxreload` | 将 config 中的壁纸清单同步进数据库（新增 GIF 后执行） |

调试（需开启 `EnableTestCommands`）：`/killfxtest [类型]` 模拟一条击杀条；`/killfxtest3` 连续三条测叠加。

权限：ESX 管理组 admin / superadmin / god，或 ACE `gg_killfx.admin`。

## 配置说明

| 项 | 作用 |
| --- | --- |
| ShowDurationMs | 单条击杀条显示时长（毫秒） |
| Position（top / right） | 第一条击杀条在屏幕上的位置（百分比） |
| NpcVictimLabel | 击杀 NPC 时受害者显示的名称 |
| DefaultNameGradient / NpcNameGradient | 无头顶渐变数据时的名字颜色键 |
| MaxStack | 同时显示条数上限；0 表示不限制 |
| KillFxVisibleTo | 谁能看到击杀条：all 全服在线（默认）、nearby 击杀者附近、killer 仅击杀者 |
| KillFxVisibleRadius | 当 KillFxVisibleTo 为 nearby 时的半径（米），默认 120 |
| AdminGroups / AdminAce / AdminCommand | 管理面板权限与命令名 |
| ReloadBackgroundsCommand | 重载壁纸命令名 |
| DefaultBackgrounds | 默认壁纸清单；新增 GIF 须登记后再 `/killfxreload` |
| AlwaysKillfeedStems | 哪些死因始终用内置 PNG，不走 ox 物品图 |
| EnableTestCommands | 是否启用 killfxtest 等调试命令 |

可见范围：要全服可见保持 KillFxVisibleTo 为 all；只要击杀者本人看到改为 killer；只要击杀者周围看到改为 nearby，并按需调大或调小 KillFxVisibleRadius。

## 更换 / 新增壁纸

1. 将 GIF 放入 `web/backgrounds/`
2. 在 `config.lua` 的 DefaultBackgrounds 增加 id、中文名、文件名
3. 执行 `/killfxreload` 或在管理面板重载
4. 在面板中为玩家选择壁纸  

其他脚本为玩家改壁纸见 [接口参考 · gg_killfx](api.html#gg_killfx击杀特效)。

## 更新日志

### 1.0.1

- 新增 KillFxVisibleTo、KillFxVisibleRadius：全服 / 附近 / 仅击杀者可见
- 默认全服在线玩家均能看到击杀条

### 1.0.0

- 击杀条 UI、死因图标、可选 GIF 横幅
- NUI 管理面板分配壁纸
- 击杀 NPC、与 ge_playerhead 名字渐变联动
- 默认壁纸 fav_01～fav_23
