---
layout: default
title: "gege_emergency_bench"
---

# gege_emergency_bench

紧急车辆维修台插件，配置结构参考 [jim-mechanic Emergency Repair Bench](https://jixelpatterns.gitbook.io/docs/paid-assets/jim-mechanic/emergency-repair-bench)。

支持：职业权限、仅紧急车(Class 18)、维修、涂装、Extras、贴膜、常用外观/性能改装。

---

## 依赖

| 资源 | 说明 |
|------|------|
| `ox_lib` | 菜单 / 进度条 / 通知 / zone |
| `ox_target` | **必须**；只用 eye target，没有按 E |

框架：`ESX` / `QBCore` / `QBox` 自动检测。

---

## 安装

1. 把 `gege_emergency_bench` 放进 `resources`
2. `server.cfg`：

```cfg
ensure ox_lib
ensure ox_target
ensure gege_emergency_bench
```

3. 改 `config.lua` 里的 `Jobs`、`Locations`
4. `ensure gege_emergency_bench`

---

## 配置要点（与官方一致）

| 项 | 说明 |
|----|------|
| `requireDutyCheck` | 有技工值班时是否隐藏维修 |
| `Jobs` | `["police"] = 0` 表示职级 ≥ 0 可用 |
| `LockEmergency` | `true` = 仅 Class 18 紧急车 |
| `Locations` | `prop = true` 生成维修台模型 |
| `CosmeticTable` / `PreformaceTable` | 菜单项开关 |

官方默认点位已写入：

- MRPD 地下停车场 `451.05, -973.19, 25.7`
- Pillbox 车库 `342.51, -570.98, 28.8`

---

## 使用

1. 对应职业上班
2. 开紧急车辆靠近维修台
3. 用 **ox_target**（眼睛）瞄准区域打开菜单
4. 维修 / 外观改装 / 性能升级

---

## 说明

- 这是独立轻量插件，**不是** jim-mechanic 完整替代（不含付费零件经济、完整机修店流程）
- `CustomPlate` / `Harness` / `RoofLiverys` 默认关闭（需其它资源配合）
- 若你已购买 jim-mechanic，应直接用官方 `repairbench_conf.lua`，不必叠两套
