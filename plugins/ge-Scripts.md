---
layout: default
title: "ge-Scripts - FiveM 通缉管理系统"
---

# ge-Scripts - FiveM 通缉管理系统

> 支持 **ESX** 和 **QBCore** 双框架自动检测的高级通缉系统

## 功能特性

- ✅ 通过 `police_tablet` 物品打开通缉面板（仅限物品触发）
- ✅ 按玩家 ID 快速搜索在线玩家
- ✅ 预设通缉原因 + 自定义输入
- ✅ 灵活的通缉时长（预设 / 永久 / 自定义分钟数）
- ✅ 便捷增减通缉时间
- ✅ 四级危险等级（低风险 / 中风险 / 高风险 / 极危险）
- ✅ 离线保留通缉状态，上线自动恢复并通知
- ✅ 快捷撤销通缉
- ✅ 大头照自动拍摄（Pedheadshot）
- ✅ 通缉 HUD 卡片全服广播（所有玩家可见，10秒自动隐藏）
- ✅ 警察全地图实时追踪通缉目标位置（坐标 Blip，每5秒刷新）
- ✅ 通缉到期自动撤销
- ✅ 手持平板动画
- ✅ 现代化深色 UI

## 依赖

- **oxmysql** - 数据库驱动
- **es_extended** (ESX) 或 **qb-core** (QBCore)

## 安装

1. 将 `ge-Scripts` 文件夹放入 `resources` 目录
2. 在 `server.cfg` 中添加：
   ```
   ensure oxmysql
   ensure ge-Scripts
   ```
3. 数据库表会在首次启动时自动创建，无需手动导入 SQL
4. 框架自动检测，无需手动配置（也可在 `config.lua` 中手动指定）

## 添加物品

### QBCore (qb-inventory)

在 `qb-core/shared/items.lua` 中添加：

```lua
police_tablet = { name = 'police_tablet', label = '通缉平板', weight = 500, type = 'item', image = 'police_tablet.png', unique = false, useable = true, shouldClose = true, description = '警察通缉管理系统终端' },
```

### ox_inventory

在 `ox_inventory/data/items.lua` 中添加：

```lua
['police_tablet'] = {
    label = '通缉平板',
    weight = 500,
    stack = false,
    close = true,
    consume = 0,
    server = {
        export = 'ge-Scripts.UseTablet',
    },
    description = '警察通缉管理系统终端',
},
```

> `consume = 0` 表示使用后不消耗物品。

### ESX (es_extended)

在数据库 `items` 表中插入：

```sql
INSERT INTO `items` (`name`, `label`, `weight`) VALUES ('police_tablet', '通缉平板', 500);
```

> 添加物品后需要重启背包资源或重启服务器。物品图片 `police_tablet.png` 需自行放入对应背包资源的图片目录。

## 使用方法

1. 确保玩家拥有 `police_tablet` 物品
2. 使用该物品即可打开通缉管理面板
3. 输入玩家 ID 搜索目标 → 选择原因 → 设置时长和危险等级 → 点击通缉
4. 通缉发布后：
   - **所有玩家**看到通缉 HUD 卡片（含大头照、原因、危险等级）
   - **警察**在地图上看到通缉目标的实时位置 Blip
   - **被通缉玩家**收到通知

## 配置说明

| 配置项 | 说明 |
|--------|------|
| `Config.Framework` | 框架选择：`'auto'`（自动检测）/ `'esx'` / `'qb'` |
| `Config.UseItem` | 打开面板的物品名称（默认 `police_tablet`） |
| `Config.AllowedJobs` | 允许使用的职业列表 |
| `Config.MinGrade` | 最低职务等级（0 = 所有等级） |
| `Config.TimePresets` | 时长预设选项（分钟） |
| `Config.TimeStep` | 快捷增减步长（分钟） |
| `Config.RiskLevels` | 危险等级配置（标签、值、颜色） |
| `Config.Reasons` | 预设通缉原因列表 |
| `Config.Notifications` | 通知文本配置 |
| `Config.Blip` | 地图标记设置（图标、颜色、大小、闪烁） |
| `Config.Mugshot` | 大头照设置（启用/禁用、相机偏移） |
| `Config.TabletAnim` | 手持平板动画设置 |
