---
layout: default
title: "PlayerShop — 玩家商店系统"
---

# PlayerShop — 玩家商店系统

基于 **ox_inventory** 的玩家商店插件，支持 **ESX / QBCore / Qbox**。两类商店可并存：

| 类型 | 说明 | 货款去向 |
|------|------|----------|
| **职业商店** | 指定职业在固定卖家点开店 | ESX：`society_<职业>`；QB/Qbox：management 公账 |
| **个人商店** | 任意玩家认领固定个人摊位 | 店主个人银行 / 现金（可配置） |

---

## 依赖

| 资源 | 说明 |
|------|------|
| 框架三选一 | `es_extended` **或** `qb-core` **或** `qbx_core` |
| [ox_inventory](https://github.com/overextended/ox_inventory) | 物品栏与 stash |
| [ox_lib](https://github.com/overextended/ox_lib) | 菜单与输入框 |
| [oxmysql](https://github.com/overextended/oxmysql) | 数据库 |
| esx_addonaccount | **仅 ESX** 职业公账 |
| qb-management / qbx_management | **QB/Qbox** 职业公账（推荐） |

### ESX

```cfg
ensure oxmysql
ensure ox_lib
ensure es_extended
ensure esx_addonaccount
ensure ox_inventory
ensure PlayerShop
```

### QBCore

```cfg
ensure oxmysql
ensure ox_lib
ensure qb-core
ensure qb-management
ensure ox_inventory
ensure PlayerShop
```

### Qbox

```cfg
ensure oxmysql
ensure ox_lib
ensure qbx_core
ensure qbx_management
ensure ox_inventory
ensure PlayerShop
```

---

## 安装

1. 将 `PlayerShop` 放入 `resources`。
2. 编辑 `config.lua`（框架、职业店 / 个人摊坐标、白名单等）。
3. `ensure PlayerShop`

首次启动会自动建表（也可手动导入 `install.sql`）：

- `player_shop_prices` — 售价
- `player_shop_stash_items` — stash 备份
- `player_shop_stall_meta` — 店主信息
- ESX 下还会补齐缺失的 `society_<job>` 公账

---

## 配置说明

```lua
Config.Framework = 'auto' -- 'auto' | 'esx' | 'qb' | 'qbox'
Config.MaxItems = 2000
Config.CurrencyLabel = '元'
Config.PersonalPayoutAccount = 'bank'
-- ESX: 'bank' / 'money'
-- QB/Qbox: 'bank' / 'cash'（写 'money' 会映射为 cash）
```

### 职业商店

`Config.SellerLocations` / `Config.BuyerLocations` 索引一一对应，stash id 为 `playerStall_<i>`。

```lua
Config.SellerLocations = {
    {
        label = '武器店',
        coords = vector3(23.93, -1106.06, 29.80),
        radius = 2.0,
        jobs = { 'wqd' },
        allowedItems = {}, -- 空 = 不限制
    },
}
```

### 个人商店（与职业店并存）

`Config.PersonalSellerLocations` / `Config.PersonalBuyerLocations` 索引一一对应，stash id 为 `personalStall_<i>`。

- **绿色**标记：个人卖家点（全员可交互）
- **黄色**标记：职业卖家点（仅配置职业）
- **蓝色**标记：买家点（职业 / 个人）

---

## 使用方式

### 职业店主

1. 拥有配置中的职业。
2. 黄点按 **E** 开店，放入 stash，定价。
3. 货款进入职业公账。

### 个人摊主

1. 绿点按 **E** 认领空摊（已被他人认领则无法占用）。
2. 上架、定价流程与职业店相同。
3. 货款进入店主 `Config.PersonalPayoutAccount`（默认银行）。
   - ESX 离线：写 `users.accounts`
   - QB/Qbox 离线：写 `players.money`
4. 在摊位范围内按 **H** 可**放弃摊位**（须先清空库存）。

### 顾客

蓝点按 **E** 打开购买界面；或用 `/shop` 查看当前有货商店（含个人店，标题带 `[个人]`）。

### 指令

| 指令 | 说明 |
|------|------|
| `/shop` | 列出有在售商品的商店 |
| `/checkjob` | 调试框架 / 职业 / 商家身份 |
| `/shopuitest` | 调试 NUI |
| `/shopuistatus` | 调试 NUI 状态 |

---

## 数据持久化

| 数据 | 位置 |
|------|------|
| 售价 | MySQL `player_shop_prices` |
| 店主元数据 | MySQL `player_shop_stall_meta`（含 `shop_type`） |
| stash 备份 | MySQL `player_shop_stash_items` |

---

## 常见问题

**职业店提示无权**  
检查 `SellerLocations.jobs` 是否包含当前框架的职业名（`/checkjob` 可看）。

**个人摊提示已被认领**  
需原店主清空库存后按 H 放弃，或在数据库删除 / 清空 `player_shop_stall_meta` 中对应 `personalStall_*` 的 `owner_id`。

**个人店钱没到账**  
确认 `Config.PersonalPayoutAccount` 与框架账户名一致；确认框架检测正确（控制台会打印 `[PlayerShop] 框架: ...`）。

**QB/Qbox 职业公账没到**  
安装并启动 `qb-management` 或 `qbx_management`（也兼容部分 `qb-banking` / `Renewed-Banking`）。

**物品无法上架**  
检查该摊 `allowedItems` 白名单。

---

## 版本

- **v1.2** — 支持 ESX / QBCore / Qbox 多框架
- **v1.1** — 个人商店与职业商店并存；作者：格格
- **v1.0** — 职业商店初版
