---
layout: default
title: "击杀特效 gg_killfx"
---

# gg_killfx 击杀特效

击杀玩家或 NPC 时，在屏幕上方显示击杀条：击杀者名 — 死因图标与可选 GIF 横幅 — 受害者名。同时可播放连杀图标和击杀音效。玩家名字渐变色与 ge_playerhead 头顶设置一致。

当前版本：**1.0.4**

## 功能

- 击杀玩家、NPC 时弹出击杀条；多条可同时向下叠加
- 枪械优先显示 ox_inventory 物品图；拳头、载具、火焰、坠落等显示内置图标
- 管理员可为每位在线玩家分配横幅壁纸、连杀图标套系、击杀音效；图标和音效都可以选「无」
- 未分配壁纸时仅显示名字与中间图标，背景透明
- 玩家自己拖动横幅和图标在屏幕上的位置，保存后只对自己生效
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

正常游玩即可。服务器若设为全服可见，任意玩家完成击杀时，在线玩家都会看到该击杀条；条上展示的是击杀者的名字、武器图标，以及管理员分配给击杀者的壁纸（未分配则无 GIF 背景）。名字颜色与 ge_playerhead 里设置的名字渐变一致。连杀图标和音效用的是管理员给击杀者选的套系。

调整自己的显示位置：输入 `/killfx`。屏幕上出现两个红色虚线框，**横幅**是击杀条，**图标**是连杀图标。拖到想要的位置后，点底部 **保存**。这次保存只改位置，不会改壁纸、图标套系和音效。点 **关闭** 或按 Esc 退出，本次拖动不保存。

## 管理员

| 命令 | 说明 |
| --- | --- |
| `/killfx` | 所有玩家可用。拖动自己的横幅和图标位置并保存 |
| `/killfxadmin` | 打开管理面板：选玩家，点选横幅壁纸（立即生效），再选连杀图标和音效后点保存 |
| `/killfxreload` | 将 config 中的壁纸清单同步进数据库（新增 GIF 后执行） |

调试（需开启 `EnableTestCommands`）：`/killfxtest [类型]` 模拟一条击杀条；`/killfxtest3` 连续三条测叠加。

权限：ESX 管理组 admin / superadmin / god，或 ACE `gg_killfx.admin`。

## 配置说明

| 项 | 作用 |
| --- | --- |
| ShowDurationMs | 单条击杀条显示时长（毫秒） |
| Position（top / right） | 玩家还没保存过个人位置时，击杀条的默认位置（上、右，百分比）。保存过之后以该玩家自己的位置为准 |
| PlayerCommand | 玩家打开拖动调位置的命令，默认 killfx |
| KillIconSet / KillIconAudioSet | 新玩家默认连杀图标套系和击杀音效 |
| KillIconEnabled / KillAudioEnabled | 新玩家默认是否显示连杀图标、是否播放音效 |
| KillIconVolume | 默认击杀音效音量，0 到 1 |
| KillStreakTimeout | 连杀间隔（秒），超时后连杀从 1 重新计 |
| KillIconDisplayMs | 连杀图标停留时间（毫秒） |
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
3. 执行 `/killfxreload`
4. 在面板中为玩家选择壁纸  

其他脚本为玩家改壁纸见 [接口参考 · gg_killfx](api.html#gg_killfx击杀特效)。

## 数据

每位玩家一行，存在数据库表 `gg_killfx_players`，按角色 identifier 区分。资源第一次启动会自动建表。

- 横幅壁纸记在该玩家的壁纸字段
- 连杀图标、音效，以及横幅、图标的屏幕位置，记在同一条图标设置里

## 更新日志

### 1.0.4

- 玩家用 `/killfx` 在画面上拖红色虚线框，分别调整击杀横幅和连杀图标的位置
- 击杀图标位置（左、下）和横幅位置（上、右）都按玩家单独保存；没保存过的人，横幅仍用配置里的默认位置
- 管理面板去掉重载、注册和音量滑条；壁纸点选即保存

### 1.0.2

- 新增连杀击杀图标：击杀后在屏幕上播放图标，并按连杀次数切换
- 新增击杀音效，和图标分开选。图标套系、音效套系各自一条，都可以选「无」（不显示图标 / 不播声音）
- 管理员在面板里按玩家分配击杀图标和音效，点保存后写入该玩家
- 默认图标套系掠夺，默认音效 valorant；间隔超时后连杀从 1 重新计
- 击杀播报列表不再显示

### 1.0.1

- 新增 KillFxVisibleTo、KillFxVisibleRadius：全服 / 附近 / 仅击杀者可见
- 默认全服在线玩家均能看到击杀条

### 1.0.0

- 击杀条 UI、死因图标、可选 GIF 横幅
- NUI 管理面板分配壁纸
- 击杀 NPC、与 ge_playerhead 名字渐变联动
- 默认壁纸 fav_01～fav_23
