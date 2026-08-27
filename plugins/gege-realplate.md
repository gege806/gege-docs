---
layout: default
title: "gege_realplate"
---

# gege_realplate

格格真实车牌系统：摇号抽奖、安装、调整、代办摇号。

版本：`1.0.3`

## 依赖

- `ox_lib`
- `okokBossMenu`（公款入账、车管老板菜单）
- `ox_inventory`（或 config 中配置的其它背包）
- MySQL（`mysql-async` / `oxmysql` 兼容写法）

> 不再依赖外部 `gege_dualworld` / `xiaoha_dualworld`，gate 已内置在 `inject/`。

## 安装

1. 资源名必须为 `gege_realplate`（地图：`gege_realplate_mlo`）
2. `sql/` 会在资源启动时**自动执行**（列已存在 / 另一框架表不存在会自动跳过）
3. 启动时会自动检查并补齐 `owned_vehicles` / `player_vehicles` 的 `realplate` / `agoplate` / `afterplate` 字段
4. `server.cfg` 示例：

```cfg
ensure ox_lib
ensure okokBossMenu
ensure gege_realplate
ensure gege_realplate_mlo
```

或：

```cfg
ensure [车牌]
```

5. 若车库要显示真实车牌：
   - 在框架核心 `client_scripts` 最上面加：`"@gege_realplate/client/export.lua"`
   - 并解开本资源 `fxmanifest.lua` 里 `client/export.lua` 的注释

## ox_inventory 物品

```lua
['realplate'] = {
    label = '车牌',
    weight = 1,
    stack = false,
    close = true,
    consume = 0,
    client = {
        export = 'gege_realplate.usePlate'
    },
},
```

物品 `metadata.plate` 可能带类型前缀（见下）；`description` / `label` 显示真实号牌（无前缀）。

## 车牌类型前缀（内部标记）

数据库 / 物品 `plate` 字段可能带 2 位前缀，**界面与通知会自动去掉**，车上显示的也是去前缀后的真实号：

| 前缀 | 含义     |
|------|----------|
| XN   | 新能源绿牌 |
| HK   | 港牌     |
| EU   | 欧牌     |
| MT   | 摩托车牌 |
| JC   | 警车牌   |
| XF   | 消防牌   |
| YL   | 医疗牌   |
| YJ   | 应急牌   |

例：`XN沪DXW31M` → 显示 / 上牌为 `沪DXW31M`。

## 摇号 / 代办

- 普通玩家：打开摇号 UI → 阅读规则 → 为自己摇号
- 车管职业（默认 `cheguan`）：规则页显示「代办通道」，可选择附近玩家代办摇号
- 扣费 / 公款：`Config.UseOkokBossMenu = true` 时走 `okokBossMenu` 入账
- NUI 背景为透明，不遮黑游戏画面

相关配置（`config.lua`）：

```lua
Config.LimitJob = "cheguan"
Config.SocietyName = "cheguan"   -- 不要写 society_ 前缀
Config.JobCoords = vector3(...)  -- 与 okokBossMenu cheguan.bossCoords 一致
Config.UseOkokBossMenu = true
Config.Money = 10000
Config.LotteryNum = 100
Config.ProxyLottery = {
    enabled = true,
    jobs = { "cheguan" },
    distance = 5.0,
    -- ...
}
```

## okokBossMenu 对接

请确认 `okokBossMenu`：

```lua
Config.JobLocations = {
    ['cheguan'] = {
        bossCoords = { vector3(-1101.99, -1269.14, 5.76) },  -- 老板菜单
        dutyCoords = { vector3(-1090.72, -1268.96, 5.76) },  -- 值班
    },
}
Config.ClothingSystem = "auto"  -- 自动识别 fivem-appearance / illenium-appearance
```

- 老板点：车管 boss 按 E 打开老板菜单
- 值班点：车管员工上下班
- `users` 表需有 `isOnDuty` 字段（旧版 ESX 值班）；没有时手动执行：

```sql
ALTER TABLE users ADD COLUMN isOnDuty TINYINT(1) NOT NULL DEFAULT 0;
```

## SQL 触发器（可选）

### ESX

```sql
DROP TRIGGER IF EXISTS update_plate_after_realplate_change;
DELIMITER //
CREATE TRIGGER `update_plate_after_realplate_change` BEFORE UPDATE ON `owned_vehicles` FOR EACH ROW
BEGIN
    IF (NEW.realplate IS NOT NULL AND OLD.realplate IS NULL) OR
       (NEW.realplate IS NULL AND OLD.realplate IS NOT NULL) OR
       (NEW.realplate <> OLD.realplate) THEN
        SET NEW.plate = NEW.realplate;
    END IF;
END//
DELIMITER ;
```

### QB

```sql
DROP TRIGGER IF EXISTS update_plate_after_realplate_change;
DELIMITER //
CREATE TRIGGER `update_plate_after_realplate_change` BEFORE UPDATE ON `player_vehicles` FOR EACH ROW
BEGIN
    IF (NEW.realplate IS NOT NULL AND OLD.realplate IS NULL) OR
       (NEW.realplate IS NULL AND OLD.realplate IS NOT NULL) OR
       (NEW.realplate <> OLD.realplate) THEN
        SET NEW.plate = NEW.realplate;
    END IF;
END//
DELIMITER ;
```
