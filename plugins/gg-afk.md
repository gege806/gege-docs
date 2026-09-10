---
layout: default
title: "挂机奖励 gg_afk"
---

# 挂机奖励 gg_afk

进圈按键挂机，服务端计时到点自动发奖。支持 ESX / QB-Core / QBOX。自带挂机币写库与兑换商店。

## 功能

- 多个挂机区域，可自定义半径与奖励
- 奖励类型：`virtual` 挂机币（写库）/ 现金 / 黑钱 / 物品
- 挂机币余额面板显示；图标失败自动回退 `gege.jpeg`
- 挂机币兑换商店：物品 / 现金 / 黑钱 / 车辆（默认 `/dh`）
- 挂机期间可无敌、锁定饥饿与口渴
- 打开暂停菜单 / 地图时自动隐藏 UI
- 区域冷却、地图标记、侧边 UI
- 物品图标默认读取 ox_inventory

## 依赖

- **oxmysql**
- 框架三选一：`es_extended` / `qb-core` / `qbx_core`
- QBOX 发物品建议配合 **ox_inventory**
- 可选：`okokNotify`
- 兑换车辆：QB / Qbox 写 `player_vehicles`；ESX 写 `owned_vehicles`

## 安装

1. 把 `gg_afk` 放进 `resources`
2. `server.cfg` 写入 `ensure gg_afk`（框架与 oxmysql 先启动；有 ox_inventory 也先于本资源）
3. 编辑 `config.lua`
4. 挂机币表启动时自动创建；也可手动执行 `sql/gg_afk_coins.sql`

## 配置说明

| 项 | 说明 |
|----|------|
| 框架 | `'auto'` / `'esx'` / `'qb'` / `'qbox'`（也可用 `'qbx'`） |
| 通知 | `'auto'` / `'esx'` / `'qb'` / `'qbox'` / `'okok'` / `'chat'` |
| UI | 标题、Logo、主题色、位置、挂机币图标 |
| 虚拟货币 | 表名、显示名、字段名（`type='virtual'` 时写库） |
| 挂机区域 | 坐标、半径、奖励列表 |
| 奖励类型 | `virtual` · `money` · `black_money` · `item` |
| 挂机秒数 | 每条奖励的 `duration`（服务端计时，支持较长秒数） |
| 状态锁定 | 挂机时是否刷新饥饿/口渴、无敌 |
| 领奖冷却 | 同区再次领奖间隔，0 为不限制 |
| 管理命令 | `cleargjb` 清空全服挂机币（需 ACE / 管理员） |
| 兑换商店 | `Config.ExchangeShop`：命令、区域限制、兑换列表 |

### 挂机币奖励示例

```lua
{
    type     = 'virtual', -- 写库挂机币，不进背包
    label    = '挂机币 x1',
    amount   = 1,
    duration = 60, -- 满多少秒发一次
}
```

### 兑换商店示例

```lua
Config.ExchangeShop = {
    enabled = true,
    command = 'dh', -- /dh 打开兑换
    useZone = false, -- true 时仅在 coords 附近可打开
    vehicleDelivery = 'garage', -- garage=入库 | spawn=身边生成并入库
    vehicleGarage = 'pillboxgarage',
    items = {
        { type = 'item', label = '面包 x5', cost = 10, item = 'bread', amount = 5 },
        { type = 'money', label = '现金 $5000', cost = 50, amount = 5000 },
        { type = 'vehicle', label = '轿车', cost = 500, model = 'sultan' },
    },
}
```

### QBOX 示例

```lua
Config.Framework = 'qbox' -- 框架选 QBOX
Config.NotifySystem = 'qbox' -- 通知用 QBOX
```

黑钱在有 ox_inventory 时按物品 `black_money` 发放；物品奖励走 ox_inventory。

## 使用

1. 走进挂机圈，侧边出现 UI
2. 按配置按键（默认 **E**）开始 / 停止挂机
3. 进度到 0 自动发奖并重新计时；离开区域会中断
4. 输入 `/dh` 打开挂机币兑换（可在配置改命令）
5. 打开暂停菜单 / 地图时 UI 会隐藏，关掉后恢复

### 管理

- `/cleargjb`：清空全部玩家挂机币（需 `gg_afk.clearcoins` 或管理员权限）

### 导出（服务端）

- `exports['gg_afk']:GetAfkCoins(src)`
- `exports['gg_afk']:AddAfkCoins(src, amount)`
- `exports['gg_afk']:RemoveAfkCoins(src, amount)`
- `exports['gg_afk']:ClearAllAfkCoins()`

## 更新日志

### 1.3.0

- 新增挂机币写库（`gg_afk_coins`，按 license）
- 奖励类型新增 `virtual`；服务端权威计时
- 新增挂机币兑换商店（物品 / 钱 / 黑钱 / 车辆）
- 物品图标加载失败自动使用 `gege.jpeg`
- 暂停菜单 / 地图打开时隐藏挂机 UI
- 挂机面板样式与进度实时刷新优化
- 管理命令 `/cleargjb` 与相关导出

### 1.1.0

- 新增 QBOX 框架支持
- 物品发放对接 ox_inventory（QBOX / 已装 ox 的 QB）
- 配置注释改为行尾说明
- 配置文件加入不加密清单

### 1.0.0

- 首发：挂机区域、倒计时发奖、ESX / QB 双框架
