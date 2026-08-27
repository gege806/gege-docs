---
layout: default
title: "gg-texasholdem"
---

# gg-texasholdem

德州扑克（Texas Hold'em）+ 斗地主  
**作者：格格**

## 介绍

本资源把 **德州扑克** 与 **斗地主** 做到同一个 FiveM 脚本里，共用赌场筹码（默认 `casino_chip` / ox_inventory），适合赌场/娱乐区玩法。

**德州扑克**
- 走近桌子入座，可按 **G** 邀请 AI 陪玩（不会自动补人）
- 使用 `Config.MoneyItem` 筹码下注；可配置小盲、公账抽水
- 内置荷官与 AI 外观（`stream/` 替换模型）

**斗地主**
- 走近斗地主桌按 **E** 入座，可召唤 AI
- 固定底注结算：地主赢 +200 / 输 -200（底注 100 时）；农民 ±100
- 叫地主 / 抢地主 / 不叫；出牌含 **提示**
- 左下角 **余额 / 底注 / 充值 / 退款**；筹码不足且现金或银行够时自动充值入座

**货币**
- 游戏内余额 = OX 背包筹码，不是现金
- 充值：现金 / 银行 → 筹码；退款：筹码 → 现金 / 银行

## 依赖

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_inventory
ensure holdem_props
ensure gg-texasholdem
```

| 依赖 | 用途 |
|------|------|
| `holdem_props` | 德州桌模型（`sf_prop_poker_01` 等） |
| `ox_lib` / `oxmysql` | 通用依赖 |
| `ox_inventory` | 赌场筹码物品（推荐；现金/银行仍走 ESX/QB 账户） |

斗地主桌椅默认用原版 `prop_table_05` / `prop_direct_chair_01`（可在 `Config.DDZ` 改）。

```
refresh
ensure holdem_props
ensure ox_inventory
ensure gg-texasholdem
```

**说明：** 无需执行 SQL。筹码与现金由 OX / 框架自行存库。

## 配置

主配置：`config.lua`（GTA 赌场坐标对照可看 `config.gta.lua`）。字段说明见配置文件内注释。

### 德州扑克

- `Config.Tables`：桌子坐标、小盲、荷官模型等
- `Config.AI`：按 **G** 邀请 AI
- `Config.Society`：奖池抽水进公账
- `Config.MoneyItem`：货币物品（默认 `casino_chip`）

### 斗地主（`Config.DDZ`）

| 字段 | 说明 |
|------|------|
| `enable` | `false` 关闭斗地主 |
| `CostPerRound` | 底注（默认 100） |
| `MinMoneyRequired` | 入座最低筹码 |
| `MoneyItem` | 余额物品名（建议与 `Config.MoneyItem` 一致） |
| `MoneyLabel` | 界面单位（默认「筹码」） |
| `RechargeAmount` | 充值 / 自动充值默认数量 |
| `EnableTax` / `TaxRate` | 是否抽水及比例 |
| `SocietyEnable` / `SocietyAccount` | 抽水进公账 |
| `Locations` | 桌子坐标与桌椅 / Z 偏移 |

#### 结算规则（底注 = CostPerRound）

- **地主赢**：两农民各扣 1 倍底注，地主 +2 倍底注  
- **地主输**：地主扣 2 倍底注，两农民各 +1 倍底注  

## OX 筹码物品与图标

在 `ox_inventory/data/items.lua` 加入：

```lua
['casino_chip'] = {
    label = '赌场筹码',
    weight = 0,
    stack = true,
    close = true,
    description = '赌场专用筹码，可用于德州扑克与斗地主',
},
```

## 说明

- NUI 经 `html/ui_bridge.html` 分发德州 / 斗地主界面
- 斗地主事件前缀 `gegeddz:`，与德州隔离
- 有 `ox_inventory` 时物品走 OX；`money` / `bank` 走框架账户
- 荷官 `u_m_y_rsranger_01`，AI 女模 `u_f_y_bikerchic`（`stream/` 替换，无 `peds.meta`）
