---
layout: default
title: "ge-Scripts - FiveM 通缉管理系统"
---

# ge-Scripts · 通缉管理系统

警察发布、管理在线通缉：搜玩家、设原因与时长、危险等级、大头照；名单可调时间、改等级、撤销。被通缉玩家上线会提醒；到期自动撤销；警察可在地图追踪在线目标。

支持 **ESX / QBCore**（`Config.Framework = 'auto'` 自动检测）。

## 功能

- 通缉平板物品或命令打开面板（见下方「谁能用」）
- 按**服务器 ID** 搜索在线玩家（列表未加载时会向服务端二次查询）
- 预设原因 + 自定义原因
- 时长预设、自定义分钟、永久通缉
- 名单内增减时间、四级危险等级、撤销
- 大头照（Pedheadshot）
- 全服通缉 HUD 卡片（约 10 秒）
- 警察端地图 blip 追踪（在线目标，定时刷新）
- 离线保留通缉，上线恢复并通知
- 手持平板动画

## 依赖

- **oxmysql**（首次启动自动建表 `wanted_players`，也可执行包内 `sql.sql`）
- **es_extended** 或 **qb-core**
- 推荐 **ox_lib**（无权限等提示）
- 用物品打开时：**ox_inventory**（或其它背包 + 对应物品注册方式）

## 安装

1. 资源文件夹名保持 **`ge-Scripts`**（勿改名，NUI 回调依赖此名）。
2. `server.cfg` 在框架与 oxmysql 之后：`ensure ge-Scripts`
3. 数据库表会自动创建，一般无需手导 SQL。
4. 若用 **ox_inventory**，在 `items.lua` 增加「通缉平板」物品，并在 `server.export` 指向本资源的 `UseTablet`（字段名与 `Config.UseItem` 一致，默认 `police_tablet`）。`consume = 0` 表示不消耗。
5. **ESX 原生背包**：在 `items` 表插入同名物品，并保留 `RegisterUsableItem` 注册（资源已内置）。
6. **QBCore qb-inventory**：在 shared items 注册可用品，资源已注册 `CreateUseableItem`。

添加或修改物品后重启背包与本资源。

## 谁能用

仅 **`Config.AllowedJobs`** 中的职业可打开面板并操作（默认 `police`）。**`Config.MinGrade`** 可限制最低职级（0 表示不限）。非授权职业即使持有平板也无法打开（服务端与客户端双重校验）。

打开方式（均在 `config.lua` 配置）：

| 方式 | 默认 |
|------|------|
| 物品 | `police_tablet` |
| 命令 | `/wanted` |
| 快捷键 | 留空未绑定 |

## 使用（警察）

1. 用平板或 `/wanted` 打开通缉系统。
2. 在「选择玩家」输入目标**服务器 ID**（F8 / 管理器里的 source，不是 citizenid）。
3. 点选匹配到的玩家，填写原因、时长、危险等级，可拍大头照，确认通缉。
4. 左侧名单可搜索、撤销、加减时间、调整危险等级。

## 配置说明

| 配置项 | 说明 |
|--------|------|
| `Config.Framework` | `auto` / `esx` / `qb` |
| `Config.Command` | 打开命令，留空则不注册 |
| `Config.Keybind` | 快捷键，留空不绑定 |
| `Config.UseItem` | 平板物品名，留空则不用物品 |
| `Config.AllowedJobs` | 允许使用的职业列表 |
| `Config.MinGrade` | 最低职级，0 为不限 |
| `Config.TimePresets` | 时长预设（分钟，-1 永久） |
| `Config.TimeStep` | 名单内加减时间步长（分钟） |
| `Config.RiskLevels` | 危险等级标签、值、颜色 |
| `Config.Reasons` | 预设原因 |
| `Config.Notifications` | 各类提示文案 |
| `Config.Blip` | 警察追踪 blip |
| `Config.Mugshot` | 大头照开关与相机偏移 |
| `Config.TabletAnim` | 持平板动画与道具 |

## 常见问题

**输入 ID 提示未找到**  
确认目标在线、ID 正确、本人职业在 `AllowedJobs` 内；改配置后 `ensure ge-Scripts`。

**civilian 能打开**  
检查 `AllowedJobs` 是否误加 civilian 职业；重启资源。

**平板用了没反应**  
确认 ox_inventory 物品的 server export 指向 `ge-Scripts` 的 `UseTablet`，物品名与 `Config.UseItem` 一致。

## 更新日志

### 1.0.1

- 修复输入服务器 ID 偶发「未找到玩家」（服务端按 ID 查询 + 在线列表回退）
- 仅 `AllowedJobs` 可打开面板（物品 / 命令 / export 均校验）
- 新增 `/wanted` 命令（`Config.Command`）
- 配置注释规范为行尾说明

### 1.0.0

- 首发：通缉发布、名单管理、HUD、警察 blip、双框架、自动建表
