---
layout: default
title: "ge_weaponback"
---

# ge_weaponback

## 背部 / 腰部武器显示（ESX / QB / QBOX）

根据 **ox_inventory 快捷栏** 中的武器，在角色背部与腰部挂载模型，支持位置编辑、配件同步、其他玩家可见。

当前版本：**v1.1.0**

---

## 功能概览

- 框架：ESX / QB / QBOX（Config.Framework = auto 自动识别）
- 四个挂载位：背部左 / 背部右 / 腰部左 / 腰部右
- 读取快捷栏（默认槽位 1–5）武器并显示背饰
- 可视化编辑面板：调整位置与旋转，保存到数据库
- 支持武器配件显示（瞄具、握把、消音等）
- 手持某把武器时，仅隐藏对应挂载位；其它背枪继续显示
- 上车、翻墙 / 攀爬时可隐藏背枪
- 可选同步其他玩家背枪
- 关闭背枪手电光源，避免胸前发光

---

## 依赖

| 资源 | 说明 |
|---|---|
| ox_lib | 通知 / 工具库 |
| ox_inventory | 背包与快捷栏 |
| oxmysql | 数据库 |
| 框架三选一 | es_extended / qb-core / qbx_core |

---

## 安装

1. 将 ge_weaponback 放入 
esources 目录。
2. 确认依赖已启动。
3. server.cfg 示例：

`cfg
ensure oxmysql
ensure ox_lib
ensure es_extended   # 或 qb-core / qbx_core
ensure ox_inventory
ensure ge_weaponback
`

4. 数据库表启动时自动创建；也可手动执行 sql/ge_weaponback.sql。
5. 若从旧版 qb-weaponback 升级：资源启动时会自动把旧表 qb_weaponback_attachments 数据迁移到 ge_weaponback_attachments。
6. 按需改 config.lua 后：

`
ensure ge_weaponback
`

成功启动时控制台会打印：[ge_weaponback] 框架: ESX（或 QB / QBOX）。

---

## 框架配置

`lua
Config.Framework = 'auto'   -- auto / ESX / QB / QBOX
`

uto 识别顺序：

| 优先级 | 模式 | 检测资源 |
|---|---|---|
| 1 | ESX | es_extended |
| 2 | QB | qb-core |
| 3 | QBOX | qbx_core |

存档主键字段名为 citizenid：

- QB / QBOX：写入 citizenid
- ESX：写入 identifier

---

## 使用方法

1. 将武器放入快捷栏（Config.HotbarSlots）。
2. 输入 /weaponback 打开编辑面板。
3. 为挂载位选择武器，调整坐标 / 旋转后保存。
4. 快捷栏仍有该武器时，对应位置显示背饰。
5. 任务栏拿出一把：只隐藏这一把背饰；另一把仍显示。

---

## 命令

| 命令 | 说明 |
|---|---|
| /weaponback | 打开背枪设置面板 |
| /wbdebug | 调试开关 |
| /wbcomponents | 配件调试信息 |

Config.EditorAdminOnly = true 时，仅管理员可保存：

- ACE：command 或 ge_weaponback.admin
- ESX：dmin / superadmin / god
- QB / QBOX：dmin / god 权限

---

## 主要配置

### 基础

| 配置项 | 默认 | 说明 |
|---|---|---|
| Config.Framework | uto | 框架：uto / ESX / QB / QBOX |
| Config.Inventory | ox_inventory | 背包类型 |
| Config.HotbarSlots | {1,2,3,4,5} | 快捷栏槽位 |
| Config.HideWhenHolding | 	rue | 仅隐藏当前手持对应背枪 |
| Config.HideInVehicle | 	rue | 载具内隐藏全部 |
| Config.HideDuringClimb | 	rue | 攀爬时隐藏 |
| Config.RequireSavedPosition | 	rue | 需先保存位置才显示 |
| Config.EditorCommand | weaponback | 编辑命令 |
| Config.EditorAdminOnly | alse | 仅管理员可保存 |

### 显示与配件

| 配置项 | 默认 | 说明 |
|---|---|---|
| Config.UseWeaponObject | 	rue | 武器实体（可显示配件） |
| Config.ShowWeaponComponents | 	rue | 显示配件 |
| Config.DisableBackWeaponLight | 	rue | 关闭背枪手电光源 |

### 同步与性能

| 配置项 | 默认 | 说明 |
|---|---|---|
| Config.EnableRemoteSync | 	rue | 渲染其他玩家背枪；卡顿可改 alse |
| Config.RemotePlacementInterval | 1000 | 他人背枪巡检（ms） |
| Config.StartupDelay | 2000 | 进服延迟加载（ms） |

---

## 数据表

ge_weaponback_attachments

| 字段 | 说明 |
|---|---|
| citizenid | 玩家唯一 ID（QB=citizenid，ESX=identifier） |
| ttachments | JSON 挂载配置 |
| updated_at | 更新时间 |

旧表名 qb_weaponback_attachments 会在首次启动时自动迁移。

---

## 常见问题

**框架未检测到**

- 确认 es_extended / qb-core / qbx_core 已启动
- 或手动设置 Config.Framework = 'ESX' / 'QB' / 'QBOX'

**快捷栏有枪但不显示**

- 武器需在 Config.HotbarSlots 内
- 用 /weaponback 选择并保存位置

**人多卡顿**

- Config.EnableRemoteSync = false

---

## 版本

### v1.1.0

- 资源更名为 ge_weaponback
- 新增 ESX / QB / QBOX 多框架支持
- 手持时仅隐藏对应背枪模型
- 自动迁移旧表 qb_weaponback_attachments

### v1.0.0

- 初版（原 qb-weaponback）

---

## 备注

- server.cfg 请改为 ensure ge_weaponback，并移除旧的 ensure qb-weaponback
- 推荐使用 ox_inventory
- 自定义武器请在 Config.Weapons 补充 model
