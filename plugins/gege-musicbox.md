---
layout: default
title: "格格音乐盒 · gege_musicbox"
---

# 格格音乐盒 · gege_musicbox

FiveM 可放置音乐盒：网易云风格 UI、精选歌单 / 搜索、全屏播放页、悬浮歌词、我喜欢（MySQL 永久保存）、多人同步听歌、肩扛音箱。支持 **ESX / QBCore / QBX**，背包 **ox_inventory / qb-inventory / qs-inventory**。

另含 **车载音乐**、**DJ 台**（排队点歌 / 打赏 / 扩音器 / 打碟动作 / 氛围灯）。

须配套同目录（或本服已部署）的 **xsound 魔改版**（听距、切屏恢复、续播进度等已改）。

当前版本见 `fxmanifest.lua`（v1.2.7）。

## 功能一览

| 功能 | 说明 |
|------|------|
| 便携音乐盒 | 背包放置；ox_target 打开 / 收回 / 扛起 |
| 车载音乐 | **F9** 或 `/carmusic`；下车暂停 / 上车恢复；车外再按 F9 或 `/carmusicstop` 可关闭 |
| DJ 台 | `Config.DJBooths` 预设；认领控台、离开松手 |
| DJ 排队点歌 | 观众排队；控台通过 / 播放 / 清空 |
| DJ 打赏 | 打赏当前控台 DJ（ESX/QB cash/bank） |
| DJ 扩音器 | 默认按住 **左 Alt**；可改键；配合 pma-voice |
| DJ 打碟动作 | **仅认领控台时**播放；离开后靠近不会再播 |
| DJ 氛围灯 | 发光圈 / 光束 / 烟雾 **仅 DJ 台**（普通音箱无） |
| 精选 / 搜索 | 官方热歌榜等 + `PlaylistIds_WYY`；顶栏搜索（历史 / 猜你喜欢 / 热搜榜 / 飙升榜） |
| 我喜欢 | 爱心收藏；需 oxmysql |
| 悬浮歌词 | 锚在音乐盒实体上方；视线对准才显示；字号固定 |
| 多人同步听歌 | xsound；须完成去墙 |

## 依赖

| 依赖 | 说明 |
|------|------|
| OneSync | 必需 |
| [oxmysql](https://github.com/overextended/oxmysql) | **必需（我喜欢）** |
| xsound（魔改版） | **必需（多人听歌）**，且须完成 **去墙** |
| ESX / qb-core / qbx_core | 可选，auto 检测 |
| ox / qb / qs 背包 | 可选；无背包时用命令放置（standalone） |
| ox_lib + ox_target | **必需（交互）** |
| pma-voice | 可选（DJ 扩音器距离覆盖） |

## xsound 去墙（必做）

不做去墙常见现象：**UI 在播、没声音、其他玩家听不到**。

详细步骤见：[`install/xsound_去墙说明.md`](install/xsound_去墙说明.md)

摘要：

1. **xsound 本体**：html 里 howler 等改为**本地 js**（勿用国外 CDN）
2. **歌曲外链**（可选）：部署 `install/audio_proxy.php`，开启 `Config.AudioProxy`
3. 启动顺序见下方 `server.cfg`

请使用与本资源配套的 **xsound**（含听距控音、切屏自动续播等修改）。

## 安装

1. 将 `gege_musicbox` 与配套 `xsound` 放到 `resources`。
2. 写 `server.cfg`：

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_target
ensure xsound
ensure gege_musicbox
add_ace group.admin gege_musicbox.admin allow
```

**注意：** `ox_target` 依赖 `ox_lib`；`oxmysql` 须在本资源之前启动。

### 精选与搜索

| 位置 | 数据来源 |
|------|----------|
| 精选 · 热门歌曲 | `Config.RecommendPlaylists` 里歌单的真实曲目（默认热歌榜） |
| 精选 · 官方歌单 | `Config.RecommendPlaylists` + `Config.PlaylistIds_WYY` |
| 搜索 · 历史 | 本机记录，可清空 |
| 搜索 · 猜你喜欢 | 网易云推荐新歌 |
| 搜索 · 热搜榜 | 网易云官方实时热搜 |
| 搜索 · 飙升榜 | 网易云官方飙升榜歌单（`19723756`） |

歌单 ID 来自 `https://music.163.com/#/playlist?id=` 后面的数字。

4. **我喜欢表**：启动时自动执行 `install/favorites.sql`，也可手动导入。
5. 添加物品 `musicbox`（见下方 **物品配置**，ox 必须写对 `export`）。
6. `ensure gege_musicbox`（改过 `items.lua` 时再 `ensure ox_inventory`）后进服。
7. 背包使用音乐盒 → 出现半透预览 → 瞄准地面按 **E** 放置 / **X** 取消。

## 操作

| 操作 | 方式 |
|------|------|
| 使用物品 | 调用 `gege_musicbox.useMusicbox` → 放置预览，**E** 确认 / **X** 取消 |
| 打开 / 收回 / 扛起 / 放下 | **ox_target** 对准音箱 |
| 车载音乐 | 上车后 **F9** 或 `/carmusic`；下车暂停、上车从暂停处续播；车外再按 **F9** 或 `/carmusicstop` 关闭 |
| DJ 台 | ox_target **打开** = 认领控台；**离开 DJ 台** = 松手 |
| DJ 点歌排队 | 观众点「点歌排队」；控台在 UI 里处理队列 |
| DJ 打赏 | ox_target「打赏 DJ」或排队面板打赏 |
| DJ 扩音器 | 控台靠近时按住 **左 Alt**（`Config.DJ.megaphoneKey`） |
| DJ 打碟 | 认领后自动播动作；**离开后不会因靠近再播** |
| 播放 | 精选 / 搜索 **双击** 或 ▶ |
| 搜索 | 顶栏搜索框；点开可见历史 / 猜你喜欢 / 热搜榜 / 飙升榜 |
| 氛围灯 | 仅 DJ 台 UI 右上角「光」 |
| 喜欢 | 底部爱心 |
| 悬浮歌词开关 | 底部播放条 **「词」**（点一下开、再点关，本地记住） |
| 全屏播放页 | 点底部黑胶封面 / 歌名 |
| UI 内 ◐ | 黑 / 白主题 |
| `/mbadmin` | 管理员查看数量 |

## DJ 台配置示例

```lua
Config.DJBooths = {
    {
        id = 'dj_club_1',
        label = '夜店 DJ 台',
        useModel = true,
        model = `sf_prop_sf_dj_desk_02a`,
        coords = vector4(214.94, -790.11, 29.84, 155),
        range = 10.0,              -- 此台听距（米）
        lyricsDistance = 10.0,     -- 此台悬浮歌词距离（可选）
        jobs = {},                 -- 空 = 不额外限制职业
    },
}
```

`useModel = false`：不生成模型，只在坐标交互（地图已有台子时用）。

### DJ 功能（`Config.DJ`）

| 项 | 说明 |
|----|------|
| `queueEnabled` / `queueMax` / `queuePerPlayer` | 排队开关与上限 |
| `tipEnabled` / `tipAccount` / `tipPresets` | 打赏 |
| `megaphoneEnabled` / `megaphoneKey` / `megaphoneDistance` | 扩音器 |
| `animEnabled` | 打碟动作总开关 |
| `animOnlyWhenPlaying` | `true` = 仅放歌时打碟；`false` = 认领靠近即打碟 |
| `animDict` / `animName` | 打碟动画（可改） |
| `animOffset` | 站位相对台子偏移；人卡进台子时调 Y（如 `-0.8`） |

### 歌词（`Config.WorldLyrics` / `Config.LyricOffset`）

| 项 | 说明 |
|----|------|
| `enabled` | 世界悬浮歌词默认开关；玩家可在播放器点「词」切换，本地记住 |
| `offsetZ` | 普通音箱歌词相对高度（米） |
| `fadeDistance` | 普通音箱：超过此距离隐藏歌词 |
| `djFadeDistance` | DJ 台默认歌词显示距离 |
| `djOffsetZ` | DJ 台歌词相对台面高度（米） |
| `DJBooths[].lyricsDistance` | 单台覆盖 |
| `Config.LyricOffset` | 全局偏移（秒）。歌词文件里的 `[offset:毫秒]` 会按歌生效；只有全部歌都偏了才改全局 |

### 氛围灯（`Config.AtmosphereLights`）

仅 **DJ 台** 生效（`djOnly = true`）。发光圈半径 **≠** 听距；听距以 `DJBooths.range` 为准。

## 车载（`Config.Vehicle`）

| 项 | 说明 |
|----|------|
| `Key` | 默认 `F9` |
| `Command` | 默认 `carmusic` |
| `Range` | 车外可听距离（米） |
| `PauseOnExit` / `ResumeOnEnter` | 下车暂停（彻底静音）/ 上车从暂停进度续播（同一辆） |
| `OnlyDriver` | 仅驾驶员可打开 |
| `ScreenLyrics` | 车内屏幕歌词 |

切屏回来会尝试自动续播（需配套 xsound）。下车再上车不会重头播放。

## 职业限制

```lua
Config.AllowedJobs = { 'dj', 'nightclub' } -- 空表 = 不限制
```

车载可用 `Config.Vehicle.AllowedJobs` 单独覆盖；DJ 台可用各自 `jobs`。

## 物品配置

物品名须与 `Config.ItemName` 一致（默认 `musicbox`）。**放置成功后才由本资源服务端扣 1 个**，不要在背包侧设成一用就消耗（ox 请 `consume = 0`）。

### ox_inventory（推荐）

在 `ox_inventory/data/items.lua` 写入：

```lua
['musicbox'] = {
    label = '音乐盒',
    weight = 1000,
    stack = false,
    close = true,
    consume = 0, 
    description = '可放置的便携音箱',
    client = {
        export = 'gege_musicbox.useMusicbox', 
    },
},
```

| 字段 | 说明 |
|------|------|
| `consume = 0` | 使用时 ox 不自动扣；确认放置后服务端再 `RemoveItem` |
| `export = 'gege_musicbox.useMusicbox'` | 客户端进入放置预览（与滑板等物品写法相同） |
| `stack = false` | 不叠堆，便于管理 |

**错误示例（会导致「使用没反应」）：**

```lua
client = { export = nil }, -- 错误：ox 不会调用任何逻辑
```

改完物品后执行：

```
ensure gege_musicbox
ensure ox_inventory
```

备用：本资源也会注册 ox `usingItem` hook；即便漏写 export，在 `gege_musicbox` 已启动时仍可能打开放置。**正式服请以 export 为准**，不要依赖 hook。

可选图标：把 `musicbox.png` 放到 `ox_inventory/web/images/`。

### QB / QBX `shared/items.lua`

```lua
musicbox = {
    name = 'musicbox',
    label = '音乐盒',
    weight = 1000,
    type = 'item',
    image = 'musicbox.png',
    unique = true,
    useable = true,
    shouldClose = true,
    description = '可放置的便携音箱',
},
```

本资源会 `CreateUseableItem`；使用后触发放置预览。

### QS Inventory

在 QS 物品列表中增加 `musicbox`，`useable = true`，名称与 `Config.ItemName` 一致。

### ESX（无 ox 时）

在 `items` 表插入 `musicbox`；本资源会 `RegisterUsableItem`。

### 无背包 / standalone

可用命令 `/musicbox` 打开放置（`Config.Inventory = 'none'` 或未检测到背包时）。

## 自定义模型

当前默认：原版收音机 `prop_boombox_01` + 肩扛动画 `molly@boombox1`（左肩、左手握把手、右手扶眼镜）。  
肩扛 `pos` / `rot` 已按这套动画调好，一般不用改。

自定义模型示例：`ice_music`（`stream/ice_music.ydr` / `.ytd` / `.ytyp`）。更换时：

1. 把 `ydr/ytd/ytyp` 放到 `gege_musicbox/stream/`
2. 在 `fxmanifest.lua` 增加：`data_file 'DLC_ITYP_REQUEST' 'stream/你的.ytyp'`
3. `Config.PropModel` 与 `Config.Carry.model` 改成你的模型名
4. 贴地不对：调 `Config.PropSnapMode`（`auto`/`origin`/`bottom`）或 `PropGroundOffset`
5. 肩扛错位：调 `Config.Carry.pos/rot`（换模型后必须重调，不能沿用收音机那组）

肩扛动画已内置 `stream/molly@boombox1.ycd`（无需 WC_EMOTES）。失败时可在 `Config.Carry` 里关动画或改兜底。

## 性能

- 无交互时客户端循环约 400–800ms
- 悬浮歌词对齐音乐盒实体顶部；移开视线隐藏；字号固定
- 听距：普通音箱 `DefaultRange`；车载 `Vehicle.Range`；DJ 台 `DJBooths.range`

## 常见问题

**背包使用音乐盒没反应**  
1）`items.lua` 必须是 `export = 'gege_musicbox.useMusicbox'`，且 `consume = 0`（`export = nil` 无效）；  
2）确认 `gege_musicbox` 与 `ox_inventory` 已启动，改物品后两边都 `ensure`；  
3）物品名是否与 `Config.ItemName`（默认 `musicbox`）一致；  
4）控制台是否有职业限制提示（`Config.AllowedJobs`）。

**听不到歌 / 别人听不到**  
1）做 **xsound 去墙**，并用配套魔改 xsound；  
2）站在对应听距内（普通默认 `DefaultRange` 50m / 车 `Vehicle.Range` / DJ `DJBooths.range`）；  
3）外链失败时开 `Config.AudioProxy`；  
4）系统未静音 FiveM。

**车载切屏后没声**  
需配套 xsound（切屏自动续播）；仍无则 `ensure xsound` + `ensure gege_musicbox` 后重开一曲。

**下车再上车从头播放**  
请同时 `ensure xsound` 与 `ensure gege_musicbox`（续播进度依赖两边）。确认 `Config.Vehicle.PauseOnExit` / `ResumeOnEnter` 为 `true`。

**DJ 离开后靠近又打碟**  
已改为仅认领中打碟；更新后 `ensure`，点「离开 DJ 台」后再靠近不应再播。

**打碟人卡进台子**  
调 `Config.DJ.animOffset`（例如 `vec3(0.0, -0.8, 0.0)`）。

**我喜欢不保存**  
确认 `oxmysql` 已启动且在本资源之前；表名 `gege_musicbox_favorites`。

**精选歌单只有几个**  
检查 `Config.PlaylistIds_WYY`；点刷新。

**搜索为空 / 点了没声**  
主站挂了会自动切 `ApiSecret.backupUrl`。两边都失败时再查备用地址和 Meting 兜底。

**放不下 / 提示没有音乐盒**  
背包没有该物品，或达到 `MaxBoxesPerPlayer` / `MaxBoxesGlobal`；取消放置（X）不会扣物品。

**扛起是抱箱子而不是扛肩**  
本资源已内置 `stream/molly@boombox1.ycd`。若仍异常：`ensure gege_musicbox` 后重进服；确认 `stream` 目录含该 ycd。

**ox_target 点不了**  
`ensure ox_lib` → `ensure ox_target` → `ensure gege_musicbox`；可试 `/mbrebind` 或 `/mbtarget` 排查。

## 更新日志

### 1.2.7 · 2026-08-29

**修复**
- 修复悬浮歌词飘到屏幕角落、不在音乐盒上方的问题
- 改按音箱实体顶部对齐，每帧跟随盒子位置；移开视线仍隐藏

### 1.2.6 · 2026-08-29

**优化**
- 音乐盒位置不变时，左右晃视角歌词不再跟着晃
- 移开视线仍隐藏；再看回音乐盒会重新对齐到盒子上方

### 1.2.5 · 2026-08-29

**修复**
- 世界悬浮歌词改回锚在音乐盒 / DJ 台上方
- 视角移开音乐盒即隐藏，只有看回去才再显示
- 字号保持固定，远近大小一致

### 1.2.4 · 2026-08-29

**修复**
- 悬浮歌词默认改到屏幕右侧中部，不再挡在人物头上
- 自己扛起音箱播放时，不再在自己头顶显示悬浮歌词（旁人仍可见）

### 1.2.3 · 2026-08-29

**优化**
- 世界悬浮歌词改回屏幕固定位置，左右晃视角不再跟着晃
- 默认显示在屏幕中上方，避免挡住人物；位置可用 screenX / screenY 调整
- 字号固定，听距内显示、超出隐藏

### 1.2.2 · 2026-08-29

**修复**
- 世界悬浮歌词改回显示在音箱上方，不再固定在屏幕底部

**优化**
- 字号保持固定，远近大小一致

### 1.2.1 · 2026-08-29

**优化**
- 世界悬浮歌词改为屏幕固定位置与固定字号，转视角不再跟着动，远近大小一致
- 听距内显示、超出听距隐藏；位置可在配置里用 screenX / screenY 调整

### 1.2.0 · 2026-08-26

**新增**
- 双接口：主站挂了会自动切备用接口（密钥只写在服务端，不进公开配置）
- 顶栏网易云式搜索：搜索历史、猜你喜欢、官方热搜榜 / 飙升榜
- 精选页默认官方榜可在配置里增删
- 播放器「词」开关世界悬浮歌词（点一下开、再点关，本地记住）

**优化**
- 歌词按每首歌自己的偏移对齐，不再用全局偏移硬套所有歌
- 搜索 / 收藏图标改为扁平实心图标

**修复**
- 车载播放一半下车再上车会重头播放：改为从暂停进度续播
- 下车不再弹出「车载已暂停」提示
- 肩扛音箱穿头 / 漂在身侧：挂点与肩扛动画对齐

更新后请同时 `ensure xsound` 与 `ensure gege_musicbox`。

### 1.1.2 · 2026-08-18

**修复**
- 下车后音乐又自己响：暂停后彻底静音，切屏/续播不再把已暂停的车载拉起来
- 司机听不到、旁人还能听到：下车后全员静音，只有坐回同一辆车才恢复
- 下车后无法暂停：车外再按 **F9** 或输入 `/carmusicstop` 可彻底关闭

### 1.1.0 · 2026-07-28

**新增**
- 车载音乐：快捷键 **F9** / `/carmusic`；下车暂停、上车恢复；车外可听（默认 40m）
- DJ 台：可在配置里预设多台；认领控台 / 离开松手
- DJ 排队点歌、打赏控台 DJ、扩音器（默认左 Alt）
- DJ 打碟动作（仅认领中播放）；站位可在配置里微调
- DJ 氛围灯（发光圈 / 光束 / 烟雾，仅 DJ 台）
- 悬浮歌词：普通音箱与 DJ 台距离分开配置
- 音乐接口密钥单独存放，避免写进公开配置

**优化**
- 听距改为按距离控音量，不再被 3D 音效或全局静音误截断
- 车载切屏回来自动续播（需配套 xsound）
- 氛围灯发光圈与听距解耦：圈半径 ≠ 可听距离

**修复**
- 听距配置无效 / 近处无声
- 车载快捷键由 F3 改为 F9
- 「离开 DJ 台」无效
- 离开后靠近仍打碟（改为仅认领中播动作）
- 听距控音偶发报错

### 说明

更新后请同时替换配套 **xsound 魔改版**，并按安装顺序 `ensure`。旧键位若仍生效，可在 FiveM 按键绑定里手动改「打开车载音乐」。
