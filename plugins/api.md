---
layout: default
title: 接口参考
---

# 接口参考

本页给技术人员对接脚本用。说明书看 [首页](../index.html)。  
资源名以文件夹名为准（`ensure` 那个名字）。

调用示例：`exports['资源名']:接口名(...)`

---

## gg_territory_rank（领地战）

**客户端**

| 接口 | 作用 |
|------|------|
| `Show()` | 显示排名 HUD |
| `Hide()` | 隐藏排名 HUD |
| `Toggle()` | 切换 HUD |
| `SetOpacity(0-100)` | 设置不透明度 |

**服务端**

| 接口 | 作用 |
|------|------|
| `IsWarActive()` | 是否开战，返回 boolean |
| `GetRanking()` | 返回排名、总数、倒计时 |

**服务端事件**

- `gg_territory_rank:settlement` — 结算完成 `(ranking, pillarCount)`

---

## gg_sakura（樱花物语）

**服务端**

| 接口 | 作用 |
|------|------|
| `GetCharm(identifier)` | 读魅力 |
| `AddCharm(identifier, name, amount)` | 加魅力 |
| `GetPopularityRanking()` | 人气总榜 |
| `GetPopularityMonthlyRanking()` | 人气月榜 |
| `RefreshStage(name)` | 刷新阶段，如 `popularity_monthly` |

**客户端**

| 接口 | 作用 |
|------|------|
| `StartGiftToPlayer(serverId)` | 向玩家送花 |

---

## gege_rpchat（RP 聊天框）

**服务端常用**

| 接口 | 作用 |
|------|------|
| `GetPlayerDisplayName(src)` | 显示名 |
| `GetPlayerDescription(src)` | 人物描述 |
| `Send911Alert(...)` | 911 警报 |
| `SendDispatchAlert(...)` | 调度警报 |
| `GetPlayerDialect(src)` / `SetPlayerDialect(src, dialect)` | 方言 |
| `GetPlayerMaskStatus(src)` / `SetPlayerMaskStatus(src, status)` | 面具状态 |

**客户端常用**

| 接口 | 作用 |
|------|------|
| `GetPlayerDialect()` / `SetDialect(dialect)` | 方言 |
| `GetLocalPlayerMaskStatus()` | 本地面具 |
| `IsPlayerInVehicle()` / `GetCurrentVehiclePlate()` | 载具 |

---

## gege_CAIPIAO（彩票 / 斗地主 / 麻将）

**服务端**

| 接口 | 作用 |
|------|------|
| `GetTableData(...)` | 桌子数据 |
| `InitGameServer(...)` | 初始化对局 |
| `GetMJTableData(...)` | 麻将桌子数据 |
| `ge_ssq` 等 | 彩票玩法相关 |

---

## gg-texasholdem（德州扑克）

**服务端**

| 接口 | 作用 |
|------|------|
| `GetTableData(...)` | 桌子数据 |
| `InitGameServer(...)` | 初始化对局 |

---

## gege-loan（贷款）

**服务端**

| 接口 | 作用 |
|------|------|
| `GetCreditScore(...)` / `AddCreditScore(...)` | 信用分 |
| `GetPlayerLoans(...)` / `GetActiveLoans(...)` | 贷款 |
| `GetOwnedVehicles(...)` / `GetVehicleAssetValue(...)` | 名下车辆与估值 |
| `OpenLoanTablet(src)` | 打开平板 |

**客户端**

| 接口 | 作用 |
|------|------|
| `OpenLoanTablet()` / `CloseLoanTablet()` | 打开/关闭平板 |

---

## PlayerShop（玩家商店）

**服务端**

| 接口 | 作用 |
|------|------|
| `onShopBuy(...)` | 购买回调 |

---

## gege_musicbox（音乐盒）

**客户端**

| 接口 | 作用 |
|------|------|
| `useMusicbox(...)` | 使用音乐盒物品 |
| `OpenMusicBoxUi()` | 打开界面 |
| `OpenVehicleMusic()` | 车载音乐 |
| `GetBoxes()` | 已放置音箱 |
| `IsCarrying()` | 是否在扛 |
| `ToggleDjMegaphone()` | DJ 扩音 |
| `RebindMusicBoxTargets()` | 重绑交互 |

---

## gege_realplate（真实车牌）

**服务端常用**

| 接口 | 作用 |
|------|------|
| `GeneratePlate(...)` / `GeneratePlateByType(...)` | 生成号牌 |
| `IsPlateAvailable(...)` | 号牌是否可用 |
| `AutoInstallPlate(...)` / `AutoPlateVehicle(...)` | 自动装牌 |
| `AddPlate(...)` | 添加号牌 |

**客户端常用**

| 接口 | 作用 |
|------|------|
| `OpenPlateAdjust()` / `OpenRealPlateAdjust()` | 调整车牌 |
| `AutoInstallPlate(...)` | 自动装牌 |

---

## ge_weaponback（背枪）

**客户端**

| 接口 | 作用 |
|------|------|
| `Refresh()` | 刷新背枪 |
| `Clear()` | 清除 |
| `OpenEditor()` | 打开编辑 |

---

## pazeee_holster_selector（收枪动作）

**客户端**

| 接口 | 作用 |
|------|------|
| `getSelectedAnim()` | 当前动作 |
| `playTransition()` / `startTransition()` | 播放过渡 |

---

## gege_cofeeuwu（猫咖）

**服务端 / 客户端**

| 接口 | 作用 |
|------|------|
| `openStaffMenu` / `openCustomerMenu` | 员工 / 顾客菜单 |
| `HasItem` / `AddItem` / `RemoveItem` | 物品 |
| `SendInvoice(...)` | 账单 |

---

## gg_killfx（击杀特效）

**服务端**

| 接口 | 作用 |
|------|------|
| `SetPlayerBackgroundInternal(targetSrc, backgroundId, updatedByIdentifier)` | 为玩家设置击杀横幅壁纸；`backgroundId` 为 `nil` / `''` / `'none'` 时清除 |
| `ReloadBackgrounds()` | 按配置同步壁纸表并刷新内存中的壁纸列表 |

调用示例：

```lua
exports['gg_killfx']:SetPlayerBackgroundInternal(targetSrc, 'fav_18', 'shop_script')
exports['gg_killfx']:SetPlayerBackgroundInternal(targetSrc, 'none', 'shop_script')
exports['gg_killfx']:ReloadBackgrounds()
```

---

## gg_jobapply（公职入职申请）

无对外 exports。管理人员使用配置中的审核命令打开审核台；玩家通过招录点瞄准交互填表。

---

## gege_accessoryshop（格格饰品屋）

**客户端**

| 接口 | 作用 |
|------|------|
| `GetEditorCatalogItems()` | 返回饰品店 ox 清单（供 `pudding_decor` 挂点编辑器等合并列表），元素含 `item`、`label`、`group` |

调用示例：

```lua
local list = exports['gege_accessoryshop']:GetEditorCatalogItems()
```

**客户端事件（可选监听）**

- `gege_accessoryshop:shopSettingsUpdated` — 老板保存店名/Blip 文案后广播 `(settings)`，用于同步地图名等

---

## ge-Scripts（通缉系统）

**服务端 export（ox_inventory 物品）**

| 接口 | 作用 |
|------|------|
| `UseTablet(event, item, inventory, slot, data)` | 使用 `Config.UseItem`（默认 `police_tablet`）时打开面板；仅 `Config.AllowedJobs` 通过校验的玩家会收到 UI |

`items.lua` 示例：

```lua
server = { export = 'ge-Scripts.UseTablet' },
```

**服务端事件（资源内部 / 需警察权限）**

| 事件 | 说明 |
|------|------|
| `ge-Scripts:server:getPlayers` | 拉取在线玩家列表 |
| `ge-Scripts:server:lookupPlayer` | 参数 `targetId`（number），按服务器 ID 查在线玩家 |
| `ge-Scripts:server:getWantedList` | 拉取通缉名单 |
| `ge-Scripts:server:getConfig` | 拉取原因/时长预设等 UI 配置 |
| `ge-Scripts:server:addWanted` | 参数 `data` 表：`identifier`, `sourceId`, `name`, `reason`, `duration`, `riskLevel`, `mugshotUrl` |
| `ge-Scripts:server:removeWanted` | 参数 `identifier` 或 `{ identifier, sourceId }` |
| `ge-Scripts:server:modifyTime` | 参数 `identifier`, `addMinutes` |
| `ge-Scripts:server:changeRisk` | 参数 `{ identifier, direction }`（1 升级 / -1 降级） |
| `ge-Scripts:server:saveMugshot` | 参数 `targetId`, `mugshotBase64` |

**客户端事件**

| 事件 | 说明 |
|------|------|
| `ge-Scripts:client:openUI` | 打开通缉 NUI（一般由服务端在校验权限后触发） |
| `ge-Scripts:client:setWanted` | 全服广播：`wanted`（boolean）, `info` 表（含 `identifier`, `sourceId`, `name`, `reason`, `issuedBy`, `riskLevel`, `mugshotUrl` 等） |
| `ge-Scripts:client:updateWantedCoords` | 警察端：`coords` 数组（通缉目标坐标，用于 blip） |
| `ge-Scripts:client:refreshList` | 面板打开时刷新名单 |
| `ge-Scripts:client:receivePlayers` / `receiveWantedList` / `receiveConfig` / `lookupPlayerResult` / `receiveMugshot` | NUI 数据回调，通常仅本资源使用 |

---

## 其他

| 资源 | 接口 |
|------|------|
| `gege-bindings` | 服务端 `UseTablet` |
| `safetyzone` | 服务端 `GetZoneConfig`；客户端 `GetCurrentRestrictedZone` |
| `gege_huaban_converted` / `gege_huaban_native` | `useHuaban` |
| `bodycam` / `qb-bodycam` | 客户端 `useBodycam` |
| `txsync` | `SyncPlayerName` / `SyncAllPlayers` / `GetFormattedName` 等 |
| `gege_rpchat` 完整列表 | 见该资源 fxmanifest 的 server_exports / client_exports |

---

改插件接口时，同步改这一页。
