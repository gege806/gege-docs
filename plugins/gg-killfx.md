---
layout: default
title: 击杀特效 gg_killfx
---

# gg_killfx 击杀特效

击杀玩家或 NPC 时，在屏幕上方显示击杀条：击杀者名 — 死因图标与可选 GIF 横幅 — 受害者名。玩家名字渐变色与 **ge_playerhead** 头顶设置一致。

版本：`1.0.0`

## 功能

- 击杀玩家、NPC 时弹出击杀条；多条可同时向下叠加
- 枪械优先显示 ox_inventory 物品图；拳头、载具、火焰、坠落等显示内置图标
- 管理员可为每位在线玩家分配专属击杀横幅 GIF，或清除为无壁纸
- 未分配壁纸时仅显示名字与中间图标，背景透明

## 依赖

- `es_extended`
- `oxmysql`
- `ox_lib`
- 推荐：`ox_inventory`（枪械图标）、`ge_playerhead`（名字渐变）

## 安装

1. 将 `gg_killfx` 放入 `resources`；横幅 GIF 放在资源内 `web/backgrounds/`（默认 `fav_01.gif` … `fav_23.gif`）
2. 首次启动会自动创建数据表；也可手动执行 `sql/install.sql`
3. `server.cfg`：

```cfg
ensure oxmysql
ensure ox_lib
ensure es_extended
ensure ge_playerhead
ensure ox_inventory
ensure gg_killfx
```

4. 可选 ACE：`add_ace group.admin gg_killfx.admin allow`
5. 按需修改 `config.lua`

## 玩家说明

- 正常游玩即可；你作为**击杀者**时会看到自己的击杀条
- 横幅 GIF 由管理员分配，未分配则无 GIF 背景
- 名字颜色跟随头顶信息里设置的名字渐变

## 管理员

| 命令 | 说明 |
|------|------|
| `/killfxadmin` | 打开管理面板：左侧选玩家，右侧点壁纸分配，或选「无壁纸」清除 |
| `/killfxreload` | 将配置中的壁纸列表同步进数据库（新增 GIF 后执行；面板内也可点「重载壁纸」） |

面板内「注册新壁纸」：填写 ID、显示名称、文件名（须已放入 `web/backgrounds/`）。

调试（需开启 `Config.EnableTestCommands`）：

| 命令 | 说明 |
|------|------|
| `/killfxtest [类型]` | 模拟一条击杀条，如 `pistol`、`unarmed`、`fire`、`vehicle` |
| `/killfxtest3` | 连续三条，测试叠加与壁纸 |

权限：ESX 管理组 `admin` / `superadmin` / `god`，或 ACE `gg_killfx.admin`。

## 配置说明

| 项 | 作用 |
|------|------|
| ShowDurationMs | 单条击杀条显示时长（毫秒） |
| Position（top / right） | 第一条击杀条在屏幕上的位置（百分比，可微调对齐） |
| NpcVictimLabel | 击杀 NPC 时受害者显示的名称 |
| DefaultNameGradient / NpcNameGradient | 无头顶渐变数据时的名字颜色键 |
| MaxStack | 同时显示条数上限；0 表示不限制 |
| AdminGroups / AdminAce / AdminCommand | 管理面板权限与命令名 |
| ReloadBackgroundsCommand | 重载壁纸命令名 |
| DefaultBackgrounds | 默认壁纸清单（id、显示名、文件名）；新增 GIF 须在此登记后再重载 |
| AlwaysKillfeedStems | 哪些死因始终用内置 PNG，不走 ox 物品图 |
| EnableTestCommands | 是否启用 `/killfxtest` 等调试命令 |

## 更换 / 新增壁纸

1. 将 GIF 放入 `web/backgrounds/`（例如 `fav_24.gif`）
2. 在 `config.lua` 的 `DefaultBackgrounds` 增加对应 id、label、file
3. 执行 `/killfxreload` 或在管理面板点击「重载壁纸」
4. 在面板中为玩家选择新壁纸

其他脚本为玩家改壁纸见 [接口参考 · gg_killfx](api.html#gg_killfx击杀特效)。

## 更新日志

### 1.0.0

- 击杀条 UI、死因图标、可选 GIF 横幅
- NUI 管理面板分配壁纸（透明背景，不遮全屏）
- 击杀 NPC、与 ge_playerhead 名字渐变联动
- 默认壁纸 fav_01～fav_23
