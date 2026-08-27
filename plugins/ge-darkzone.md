---
layout: default
title: "ge-darkzone — 暗区系统"
---

# ge-darkzone — 暗区系统

FiveM 暗区玩法插件：玩家在指定区域内死亡后，经过倒计时在区域内 **随机复活点** 重生，并 **自动扣费**（优先现金，不足部分从银行补扣）。

支持 **ESX Legacy**、**QBCore**、**QBX**，并兼容 **ox_inventory** 现金物品。

---

## 功能特性

- 可配置多个暗区（圆心坐标 + 半径 + 多个随机复活点）
- 地图 Blip 与 3D 地面红圈可视化
- 进入 / 离开暗区提示
- 死亡后倒计时自动复活（无需等待医护）
- 复活扣费：优先现金 → 不足则扣银行
- 余额不足时可选择仍允许复活（扣光现有余额）
- 自动触发 `hospital:client:Revive`，兼容常见医护脚本

---

## 依赖

| 资源 | 必需 | 说明 |
|------|------|------|
| es_extended / qb-core / qbx_core | 是（三选一） | 框架，自动检测 |
| ox_inventory | 否 | 若启用，现金从背包 `money` 物品扣除 |

`server.cfg` 示例：

```cfg
ensure es_extended   # 或 qb-core / qbx_core
ensure ox_inventory  # 可选
ensure ge-darkzone
```

---

## 安装

1. 将 `ge-darkzone` 放入服务器 `resources` 目录。
2. 编辑 `config.lua`，设置暗区坐标、复活点、扣费金额等。
3. 启动资源：`ensure ge-darkzone`

---

## 配置说明

```lua
Config.RespawnTime = 5              -- 死亡后复活倒计时（秒）
Config.RespawnCost = 5000           -- 每次复活扣费金额
Config.MoneyType = 'cash'           -- 主要扣费类型：'cash' 或 'bank'
Config.AllowRespawnWithoutMoney = true  -- 余额不足是否仍允许复活
```

### 地图显示

```lua
Config.BlipSprite = 310             -- 地图图标样式
Config.BlipColor = 1                -- 1 = 红色
Config.BlipScale = 0.8
Config.BlipName = '暗区'            -- 未使用，各区域用 name 字段
Config.CircleColor = {r=255, g=0, b=0, a=80}  -- 红圈 RGBA
```

### 暗区区域

```lua
Config.DarkZones = {
    {
        name = '暗区 - 机场',
        coords = vector3(-1102.0, -2894.0, 13.95),  -- 圆心
        radius = 200.0,                              -- 半径（米）
        spawnPoints = {                              -- 随机复活点（vector4: x,y,z,heading）
            vector4(-1037.0, -2858.0, 13.95, 150.0),
            vector4(-1102.0, -2920.0, 13.95, 240.0),
            -- 可继续添加...
        },
    },
    -- 可添加更多暗区...
}
```

---

## 扣费逻辑

1. 现金 ≥ 扣费金额 → 全部从现金扣除
2. 现金 + 银行 ≥ 扣费金额 → 先扣光现金，剩余从银行扣
3. 总余额不足：
   - `AllowRespawnWithoutMoney = true`：扣光所有余额，仍复活
   - `AllowRespawnWithoutMoney = false`：提示余额不足（仍会复活，仅扣现有余额）

> 使用 **ox_inventory** 时，现金指背包中的 `money` 物品数量。

---

## 玩家体验流程

1. 进入暗区 → 收到「你已进入 xxx」提示，地图可见红圈
2. 在暗区内死亡 → 屏幕显示复活倒计时
3. 倒计时结束 → 黑屏后在随机复活点重生，扣除费用
4. 离开暗区 → 收到「你已离开暗区」提示，恢复正常死亡机制（由其它脚本处理）

---

## 兼容性说明

| 框架 | 支持 |
|------|------|
| ESX Legacy | ✅ |
| QBCore | ✅ |
| QBX (qbx_core) | ✅ |

复活时会触发 `TriggerEvent('hospital:client:Revive')`，若使用 **qb-ambulancejob** 等医护资源，可重置其死亡状态。

---

## 常见问题

**进入暗区没有提示**  
确认玩家坐标在 `radius` 范围内，且资源已正常启动。

**死亡后没有自动复活**  
仅在暗区内生效；检查是否有其它死亡脚本冲突（如医护脚本强制接管）。

**扣费没有生效**  
确认框架已正确加载（控制台应输出 `[ge-darkzone] 检测到 xxx 框架`）；使用 ox_inventory 时确认背包有 `money` 物品定义。

**如何新增暗区**  
在 `Config.DarkZones` 中追加一项，设置 `coords`、`radius` 和至少一个 `spawnPoints`。

---

## 版本

- **v1.0.0** — 作者：GE-Scripts
