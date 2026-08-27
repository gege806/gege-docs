---
layout: default
title: "格格猫咖（gege_cofeeuwu）使用说明"
---

# 格格猫咖（gege_cofeeuwu）使用说明

版本：1.2.0  
资源名：`gege_cofeeuwu`

---

## 依赖

请先确保服务器已启动：

- `es_extended`（ESX）
- `oxmysql`
- `ox_lib`
- `ox_target`
- `ox_inventory`（若 `Config.Inventory.system = "ox"`）

可选账单：

- `okokBilling` 或 `esx_billing`（见 `Config.Invoice.system`）

---

## 安装步骤

1. 将资源文件夹命名为 **`gege_cofeeuwu`**，放到 `resources` 目录。
2. 在 `server.cfg` 中按顺序启动：

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_target
ensure ox_inventory
ensure es_extended
ensure gege_cofeeuwu
```

3. **数据库**  
   - 推荐：启动资源后会自动执行 `sql/uwucoffee.sql`（控制台会提示「已自动加载」）。  
   - 手动：把 `sql/uwucoffee.sql` 导入你的数据库。  
   - 内容包括：职业 `uwucoffee`、公账、冰箱 / 订单 / 烤箱 / 小卖部 / 餐具表。

4. **物品**  
   - 把 `install_first/ox_inventory_items.lua` 里的物品合并进 `ox_inventory/data/items.lua`。  
   - 物品名必须与 `shared/menu.lua`、`shared/config.lua` 中一致。

5. **职业**  
   - 默认职业名：`uwucoffee`（`Config.JobCheck.CoffeJob`）。  
   - 改职业名时，SQL / Config / 物品权限要一起改。

6. 重启资源或整服后进游戏测试。

---

## 配置文件

### `shared/config.lua`（核心）

| 配置项 | 说明 |
|--------|------|
| `Locale` | 语言，对应 `locales/cn.lua` |
| `JobCheck.CoffeJob` | 猫咖职业名 |
| `Invoice` | 账单：`okokBilling` / `esx_billing` / `custom` |
| `Inventory` | 背包：`ox` / `esx` / `qs` |
| `Interaction` | 交互（当前 `ox_target`） |
| `OrderSystem` | 顾客 / 员工点餐坐标与命令 |
| `Blip` | 地图总店标记 |
| `WorkTablet` | 工作平板命令 / 物品 / 职级权限 |
| `Fridge` | 冰箱坐标与容量 |
| `Shop` | 小卖部顾客点、管理点、黑名单 |
| `Storage` | 仓库 Depot、出餐台 Shelf（ox stash） |
| `Cats` | 店内猫咪位置与撸猫动画 |

### `shared/menu.lua`（设备与配方）

| 配置项 | 说明 |
|--------|------|
| `IceMaker` | 制冰机坐标、模型、可制物品、`makeTime`（秒） |
| `CutleryRack` | 餐具架坐标与脏餐具采购 |
| `CleaningItems` | 清洗台坐标与清洗配方 / 奖励 |
| `Produce` | **灶台**坐标 `Location`、`radius`、炒菜配方 |
| `Workbench` | 料理台坐标与甜点半成品配方 |
| `coffeemaker` | 咖啡机坐标与咖啡配方 |
| `mixology` | 饮品台坐标与奶茶 / 冰沙配方 |
| `Ovens` / `Items` | 烤箱坐标与烤制配方 |
| `Menu` | 顾客点餐分类与售价 |

改坐标后请 `ensure gege_cofeeuwu`，交互点会按 Config 刷新（不再写死在客户端）。

---

## 功能一览

### 员工

- 制冰机、咖啡机、饮品台、料理台、灶台、烤箱制作
- 餐具架取脏餐具 → 清洗台清洗拿奖励
- 冰箱存取、仓库 / 出餐台
- 工作平板：订单、开单、员工、公账（按职级）
- 命令：`/uwutablet`（可在 Config 改）、`/orders`（员工订单）

### 顾客

- 点餐点下单、小卖部购买、出餐台取餐
- 店内撸猫（可减压，见 `Config.Cats.stress`）

### 管理

- 小卖部上架 / 改价
- 平板内员工招聘、职级、公账存取
- 账单对接 `Config.Invoice.system`

---

## 常见问题

1. **制作失败 / 没物品**  
   检查 ox_inventory 是否已加物品，名称是否与 `menu.lua` 一致，材料是否够。

2. **交互点没反应**  
   确认已 `ensure ox_target`；改过坐标后需重启本资源；职业是否为 `uwucoffee`。

3. **SQL 没建表**  
   看控制台是否有「已自动加载 sql/uwucoffee.sql」；失败则手动导入该文件。

4. **账单发不出去**  
   核对 `Config.Invoice.system`，以及 okokBilling / esx_billing 是否正常。

5. **society already registered**  
   重复 ensure 时的提示，整局只注册一次，可忽略。

---

## 更新记录

- 1.0.0 初始版本  
- 1.1.0 多账单系统  
- 1.2.0 多种背包库存对接；启动时自动导入数据库；配置补全中文注释；灶台等坐标可在配置文件统一修改  

## 技术支持

售后群：492683667  
反馈时请附：报错全文、Framework / 背包版本、复现步骤。
