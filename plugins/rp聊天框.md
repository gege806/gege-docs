---
layout: default
title: "格格 RP 聊天框"
---

# 格格 RP 聊天框

作者：格格RP · 版本：`gege_rpchat` 1.0.0

**沉浸式 RP 聊天套装**：定制聊天 UI + 全套 RP 指令 + 无线电/911 + 个人/商业宣传 + 角色描述，附带掏枪/用物品自动 `/me`。支持 ESX / QB-Core / QBX，中文开箱即用。

---

## 修复记录

- 聊天框「仅活跃时显示」无效：关闭输入后窗口仍常显，已改为关闭后恢复隐藏计时。

## 1. 包含资源

| 资源 | 作用 |
|------|------|
| `chat` | 聊天框 UI（改版默认 chat） |
| `gege_rpchat` | RP 指令、无线电、911、描述、广告等核心 |
| `gege_AutomaticDetection` | 掏枪/用物品自动触发 `/me` 等动作提示 |

**启动顺序（server.cfg）：**

```cfg
ensure ox_lib
ensure oxmysql
ensure chat
ensure gege_rpchat
ensure gege_AutomaticDetection
```

---

## 2. 依赖

- **ox_lib**（必装）
- **oxmysql**（必装）
- **框架**（三选一，可自动检测）：ESX / QB-Core / QBX-Core
- 库存：`gege_AutomaticDetection` 推荐配合 **ox_inventory**

---

## 3. 安装步骤

1. 把整个 `[rp聊天框]` 放到 `resources`（或把三个子文件夹直接放进 resources）。
2. 按上面顺序 `ensure`。
3. 数据库：
   - `gege_rpchat/config.lua` 里 `Config.AutoLoadDatabase = true` 时会按框架自动执行 SQL。
   - 也可手动导入：
     - ESX → `database_esx.sql`
     - QB/QBX → `database_qbcore.sql`
4. 改配置：
   - 主配置：`gege_rpchat/config.lua`
   - 聊天 UI：`chat/config.lua`
   - 自动检测：`gege_AutomaticDetection/config/*.lua`

---

## 4. 常用配置（gege_rpchat/config.lua）

| 项 | 说明 |
|----|------|
| `Config.Core` | `'auto'` / `'ESX'` / `'QBCore'` / `'QBXCore'` |
| `Config.ServerName` | 服务器显示名（欢迎语等） |
| `Config.ChatDistance` | 附近说话默认距离 |
| `Config.EmergencyServer` | `true` 启用 911 等应急指令 |
| `Config.RestrictChannel` | 无线电频道名 → 频率 |
| `Config.PoliceRadioJobs` | 可用部门电台的职业 |
| `Config.DispatchSystem` | 对接 ps-dispatch / cd_dispatch 等 |
| `Config.ChatUI.AlwaysVisible` | 聊天框是否常显 |
| `Config.Dialect` | 方言系统 |
| `Config.Advertisement` | `/ad` `/bad` 广告费用与冷却 |
| `Config.Description` | 个人/载具描述 |

---

## 5. 玩家指令一览

### 基础 RP

| 指令 | 作用 |
|------|------|
| `/me [动作]` | 角色动作（附近可见 + 头顶） |
| `/do [环境/结果]` | 环境描述 |
| `/low [内容]` | 低语 |
| `/s [内容]` | 喊话 |
| `/b [内容]` | 本地 OOC（附近） |
| `/ooc [内容]` | OOC |
| `/cw [内容]` | 车内说话 |
| `/m [内容]` | 扩音器 |
| `/meing [动作]` | 持续动作（开） |
| `/meingoff` | 关闭持续动作 |
| `/doing [描述]` | 持续环境描述（开） |
| `/doingoff` | 关闭 |

### 指向 / 私聊

| 指令 | 作用 |
|------|------|
| `/to [id] [内容]` | 对某人说话 |
| `/lowto [id] [内容]` | 低语对某人 |
| `/sto [id] [内容]` | 喊话对某人 |
| `/w [id] [内容]` | 私聊 |
| `/pm [id] [内容]` | 私信 |

### 描述

| 指令 | 作用 |
|------|------|
| `/setdec [描述]` | 设置个人描述（空则清空） |
| `/dec [id]` | 查看他人描述 |
| `/setvehdec [描述]` | 设置当前载具描述 |
| `/vehdec` | 查看载具描述 |
| `/nearvehdec` | 附近载具描述 |

### 无线电 / 应急（`EmergencyServer = true`）

| 指令 | 作用 |
|------|------|
| `/setfrequency [槽位] [频率]` | 设置电台频率 |
| `/r1`～`/rN` | 对应频道发言 |
| `/dep [消息]` | 部门呼叫 |
| `/dis [消息]` | 调度频道 |
| `/setdep [部门]` | 设置目标部门 |
| `/getdep` | 查看目标部门 |
| `/panic` | 紧急按钮 |
| `/911 [内容]` | 报警（警+医） |
| `/911police [内容]` | 仅警察 |
| `/911ems [内容]` | 仅 EMS |
| `/remove911` / `/list911` | 管理 911 标记 |
| `/hq` `/f` `/duty` | 勤务相关 |
| `/callsign` `/pmenu` `/units` `/tac` | 应急单位相关 |

### 广告 / 其他

| 指令 | 作用 |
|------|------|
| `/ad [内容]` | 个人广告（默认 $100 / 冷却 60 秒） |
| `/bad [内容]` | 商业广告（默认 $500 / 冷却 300 秒） |
| `/stats` | 角色状态 |
| `/setsays` | 自定义说话风格相关 |
| `/a [内容]` | 管理员聊天（需管理员） |
| `/gmb` `/gmooc` | 管理员广播类（需权限） |
| `/checkmask` | 面具状态相关 |

费用与冷却改 `Config.Advertisement`。提示文案见 `locales/zh-cn.lua`。

---

## 6. gege_AutomaticDetection（自动 /me）

自动在掏枪、换弹、用物品等时发送 RP 动作文本。

常用配置：`gege_AutomaticDetection/config/settings.lua`

- `InventoryType = 'auto'`（推荐 ox_inventory）
- `TriggerType = 'me'`（聊天+头顶）或 `'ame'`（仅头顶）
- `WeaponDetection.Mode`：`ox_inventory` / `native` / `both` 等
- 物品表：`config/items.lua`
- 武器名：`config/weapons.lua`

依赖：`chat` + `gege_rpchat`。

---

## 7. 框架与权限说明

- 框架用 `Config.Core = 'auto'` 即可，启动控制台会打印识别结果。
- 管理员指令（`/a`、`/gmb` 等）走框架管理员权限，不是单独 ACE 列表。
- 部门电台职业改 `Config.PoliceRadioJobs` / `Config.DispatchRadioJobs`。

---

## 8. 排查

| 现象 | 处理 |
|------|------|
| 指令无反应 | 确认 `chat` 在 `gege_rpchat` 之前启动；看控制台有无框架识别失败 |
| 数据库报错 | 手动导入对应 SQL；检查 oxmysql |
| 911 无标记 | `Config.EmergencyServer = true`；检查 `DispatchSystem` |
| 自动 /me 不触发 | 检查 `gege_AutomaticDetection` 是否启动、库存类型是否匹配 |
| 调试 | `Config.Debug = true` |

---
