---
layout: default
title: "格格 · 领地战与排名系统（gg_territory_rank）"
---

# 格格 · 领地战与排名系统（gg_territory_rank）

FiveM 黑帮服领地争夺插件：战区红圈、A/B/C 据点占领、全息墙、击杀/持有积分、周榜、HUD 排名。

- 框架：**ESX / QBCore / QBX**（可自动识别）
- 帮派：**rcore 帮派** 或 **QBX/QB 自带帮派**

当前版本见 `fxmanifest.lua`（v2.6.4）。

---

## 依赖

| 资源 | 说明 |
|------|------|
| `ox_lib` | 菜单 / 通知 |
| `oxmysql` | 数据库 |
| `es_extended` **或** `qb-core` / `qbx_core` | 框架三选一 |
| `rcore_gangs` **或** QBX/QB 自带 gang | 帮派二选一（见下方） |

数据库表首次启动会自动创建（也可手动执行 `sql/schema.sql`）。

---

## 帮派来源

`Config.War.GangSource` 决定占领、计分、HUD 名单用哪套帮派。

### 重要（必读）

默认 `Config.War.GangSource = 'auto'`。**`auto` 只要检测到 `rcore_gangs` 在运行，就会走 rcore，不会用 QBX/QB gang。**

很多服同时装着 `rcore_gangs`（给别的脚本用）和 QBX 帮派。若领地战要跟 **QBX `PlayerData.gang`**，请自行把配置改成 `'qbx'`，**不能**用 `auto`：

```lua
Config.War.GangSource = 'qbx'
```

`rcore_gangs` 可以继续 `ensure`（不影响别的资源），领地战会忽略它。

| 值 | 行为 |
|------|------|
| `'auto'` | 有 `rcore_gangs` → 走 rcore；没有 rcore → 走 QBX/QB gang；都没有 → 走职业 `job` |
| `'qbx'` | **只用** QBX/QB `PlayerData.gang`（`ballas`、`lostmc` 等；`none` 不算帮派；**有 rcore 也忽略**） |
| `'rcore'` | 只用 `rcore_gangs` |
| `'job'` | 按框架职业当队伍（不强制帮派） |

`Config.War.RequireRcoreGang = true`：必须加入帮派才能占领/计分（具体帮派由 `GangSource` 决定）。  
QBX 里 `gang.name == 'none'` 视为未入帮，无法占点。

### rcore 服

```cfg
ensure oxmysql
ensure ox_lib
ensure es_extended
ensure rcore_gangs
ensure gg_territory_rank
```

```lua
Config.Framework = 'auto'
Config.War.GangSource = 'rcore' -- 或 'auto'
Config.War.RequireRcoreGang = true
```

### QBX / QB 服

**纯 QBX 服**（没装 rcore）：`GangSource` 可用 `'auto'` 或 `'qbx'`。

**同时装着 `rcore_gangs` 的 QBX 服**：必须用 `'qbx'`，不要用 `'auto'`（见上方「重要」）。

```lua
Config.Framework = 'qbx' -- 或 'auto'
Config.War.GangSource = 'qbx' -- 有 rcore 时务必写死 qbx，不能 auto
Config.War.RequireRcoreGang = true
```

```cfg
ensure oxmysql
ensure ox_lib
ensure qbx_core
ensure gg_territory_rank
# 可选：rcore_gangs 可继续 ensure，领地战不会用它
```

角色必须加入 QBX 帮派（`PlayerData.gang.name` 不能是 `none`）。HUD 名单来自 `qbx_core` / `qb-core` 的 Shared Gangs。

---

## 功能概览

- 定时开战 / 结算（每日时段 + 可选周末夜场）
- 战区圆（地图红圈）+ A/B/C 据点读条占领
- 全息占领墙（斜线 + 墙面警示字 / 占领进度 / 冷却）
- 开战中战区内死亡 → 倒计时后自动传送复活（按最近据点随机复活点）
- 死亡后 5 秒不能开始占领，进圈仍可打断敌方读条
- 击杀分、占领分、据点持有 tick 分
- 积分保留 / 每周定时清零
- 排名 HUD：显隐、透明度、**可拖拽位置**（本地 + 数据库存档）
- 帮派公告（消耗帮派分）
- 禁职（警察/医护等）进战区强制传送出去

---

## 安装与配置

可改文件（加密后仍开放）：

- `config.lua` — 主配置（含中文行尾注释）
- `shared/locale.lua` — 文案
- `sql/schema.sql` — 建表参考

常用配置：

| 配置 | 说明 |
|------|------|
| `Config.Mode` | `'war'` 自研领地战 / `'rcore'` 仅读 rcore 排名 HUD |
| `Config.Framework` | `'auto'` / `'esx'` / `'qb'` / `'qbx'` |
| `Config.War.GangSource` | `'auto'` / `'rcore'` / `'qbx'` / `'job'`（有 rcore 又要接 QBX gang → 写死 `'qbx'`） |
| `Config.War.RequireRcoreGang` | `true`=必须入帮才能占领/计分 |
| `Config.War.Zone` | 战区圆心 `center`、红圈半径 `radius` |
| `Config.War.Pillars` | A/B/C 据点坐标、`captureRadius`、`respawnPoints` |
| `Config.War.Respawn` | 复活开关、延迟、`mode`、无敌秒数 |
| `Config.War.Schedule` | 每日/周末开战窗口 |
| `Config.War.WarDurationMinutes` | 单场时长 |
| `Config.War.BannedJobs` / `TeleportPoint` | 禁职与踢出点 |
| `Config.War.CaptureWall` | 全息墙文字、距离、透明度等 |
| `Config.War.DeathCaptureLockSeconds` | 死亡后多少秒不能开始占领（默认 `5`；进圈仍可打断别人） |
| `Config.War.Rewards` | 结算奖励（默认黑钱） |
| `Config.War.WeeklyReset` | 每周清空帮派积分（`weekday` 0=周日 … 6=周六） |
| `Config.War.GangAnnounce` | 帮派公告花费与冷却 |
| `Config.ToggleCommand` | HUD 指令，默认 `/rank`（所有玩家可用） |
| `Config.AdminLicenses` | 管理功能 license 白名单（强制开战/结算/周刷新/清积分） |

### 每周清零

默认**每周一 0 点**清空所有帮派积分。若要改星期或时间：

```lua
Config.War.WeeklyReset = {
    enabled = true,
    weekday = 1,   -- 0=周日 … 6=周六
    hour = 0,
    announce = true,
    message = '本周帮派领地积分已刷新，新一轮开始！',
}
```

### 战区红圈

```lua
Config.War.Zone = {
    center = vector3(4900.0, -5170.0, 2.0),
    radius = 1200.0,   -- 红圈半径（米）
}
```

### 复活点

当前默认 `Respawn.mode = 'pillar'`：死亡后找最近据点，从其 `respawnPoints` 随机落地。

- 改位置：各据点下的 `Pillars[].respawnPoints`（`vector4(x, y, z, 朝向)`）
- 延迟：`Respawn.delay`（秒，默认 `60` = 1 分钟）
- 无敌：`Respawn.invincibleTime`（`0` = 无无敌）
- 其他模式：`bridge` 固定桥点 / `random` 用全局 `Respawn.points`

### 死亡占领限制

死亡 / 倒地 / 刚复活后，默认 **5 秒内不能按 E 开始占领**，但进圈仍会打断敌方读条。

```lua
Config.War.DeathCaptureLockSeconds = 5
```

### HUD 设置（`/rank`）

所有玩家可用，不需要 ACE。

1. 聊天输入 `/rank` 打开设置面板
2. 可切换显示 / 隐藏、调节透明度
3. **直接拖拽右侧排名面板**调整屏幕位置
4. 点「重置位置」恢复默认右上角
5. 位置会写入本地 KVP，并同步到表 `gg_territory_hud_settings`（`offset_x` / `offset_y`）

老库首次启动会自动 `ALTER` 增加偏移字段，也可对照 `sql/schema.sql`。

---

## 指令

| 指令 | 权限 | 说明 |
|------|------|------|
| `/rank` | 所有玩家 | HUD 设置（显隐 / 透明度 / 拖拽位置） |
| `/territory_top` | 所有玩家 | 查看本月排名与历史 |
| `/gang_announce 内容` | 帮派成员 | 发布全服帮派公告（耗分） |
| `/gg_territory_force start [分钟]` | 管理 license | 强制开战 |
| `/gg_territory_force stop` | 管理 license | 强制结算 |
| `/gg_territory_weekly_reset` | 管理 license | 强制周刷新（清空所有帮派积分） |
| `/gg_territory_clear_scores` / `/清除帮派积分` | 管理 license | 清空所有帮派积分 |

管理指令不再走 ACE。把管理员 Rockstar license 写入 `config.lua` 顶部的 `Config.AdminLicenses` 才能使用；服务器控制台始终可用。

```lua
Config.AdminLicenses = {
    'license:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
}
```

`/rank` 所有玩家可用，不调用 `add_ace`。

---

## 售后

售后群：**492683667**  
作者：格格

---

## 更新日志

### v2.6.4

- 每周定时清空所有帮派积分
- 死亡后默认 5 秒不能开始占领，进圈仍可打断敌方读条

### v2.6.3

- 管理功能改用白名单（强制开战/结算/周刷新/清积分）

### v2.6.2

- 兼容 QBX/QB 医疗倒地状态名

### v2.6.1

- 死亡 / 倒地 / 自杀期间禁止按 E 占领
- 修复战区死亡 / 自杀不自动传送复活：事件触发 + 轮询 + 框架复活兼容
- 去掉 add_ace 调用与无效 fxmanifest 声明

### v2.6.0

- 占领、计分、排名名单支持 QBX / QB 自带帮派
- 可选择帮派来源：自动识别、rcore 帮派、QBX 帮派、或按职业
- 有 rcore 但要用 QBX 帮派时，请把帮派来源改成 QBX
- QBX 服可不装 rcore

### v2.5.10

- 修复 HUD 设置重启插件后丢失
- 透明度、位置本地保存，并同步到数据库

### v2.5.9

- 修复开战中 A/B/C 点人数显示不准
- 排名同步战区、据点人数

### v2.5.8

- HUD 设置支持拖拽排名面板位置
- 设置面板增加重置位置
- 修复过一会提示 /rank 无权限

### v2.5.6

- 修复全息墙警示字只显示一半

### v2.5.5

- 战区红圈内死亡自动复活，兼容 ESX / QB 死亡判定
- 复活失败会短时间重试
- 修复全息墙警示字顶部被裁

### v2.5.4

- 修复缺失的开战状态文件
- 死亡倒计时后传送复活，并通知医院脚本救起
- 复活点直接读配置，不依赖网络坐标

### v2.5.3 / v2.5.2 / v2.5.1

- 修复战区死亡不复活、不传送
- 放宽死亡判定与复活重试

### v2.5.0

- A / B / C 各支持多个专属复活点
- 死亡后按最近据点随机复活
- 保留固定点和随机点模式

### v2.4.3

- HUD 设置面板改用帮派战公告同款黑底红边风格

### v2.4.1

- 全息墙性能优化，远处降低细节

### v2.4.0

- 全息占领墙：四面斜线 + 墙面文字环绕
- 墙面状态：占领中百分比 / 已被占领 / 冷却倒计时
