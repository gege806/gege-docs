---
layout: default
title: "pazeee_holster_selector"
---

# pazeee_holster_selector

Pazeee 武器收拔动作选择器：中文 NUI 选动作，换枪时自动播放拔枪/收枪动画。

支持 **动作币购买**、**试用**、**管理员发放动作币**。动画已内置在 `stream/`（44 个 `.ycd`），**不必再装 `wqdz`**。

---

## 1. 依赖

| 资源 | 说明 |
|------|------|
| `ox_lib` | 通知、管理员菜单；可选回退 ox_lib 菜单 |
| `oxmysql` | 动作币 / 拥有 / 试用等数据表 |
| `ox_inventory` | 推荐；**不用改背包源码** |
| 或 `qb-inventory` + `qb-weapons` | 见第 5 节 |

默认使用自研 NUI（`web/`）。回退 ox_lib 菜单：`Config.UseCustomUI = false`。

---

## 2. 安装

1. 把整个 `pazeee_holster_selector` 放进 `resources`
2. 确认 `stream/` 里有 44 个 `pazeee@ww*.ycd`
3. 在 `server.cfg` 按下面写（顺序很重要）
4. 配置管理员（发动作币）——**推荐写 config，不依赖 add_principal**：

```lua
-- config.lua（已默认写入）
Config.AdminIdentifiers = {
    'license:11396fd03eb03e1808010cdc2442cb9bc83015c4',
    '11396fd03eb03e1808010cdc2442cb9bc83015c4',
}
```

说明：很多服实际标识是 `license2:`，`add_principal identifier.license:...` 经常识别不到，所以本资源直接读上面的列表。

### ox_inventory（推荐）

```cfg
# 必须写在 ensure ox_inventory 之前，否则关不掉自带收拔动画
setr inventory:weaponanims false

ensure ox_lib
ensure oxmysql
ensure ox_inventory
ensure pazeee_holster_selector
```

也可写成：

```cfg
exec @pazeee_holster_selector/ox_weaponanims.cfg
```

**不要** `ensure wqdz`，**不要**改 `ox_inventory` 的 lua。本资源直接监听 `ox_inventory:currentWeapon`。

### QB 背包

```cfg
ensure qb-core
ensure qb-inventory
ensure qb-weapons
ensure ox_lib
ensure oxmysql
ensure pazeee_holster_selector
```

并按第 5 节处理 `qb-weapons`（ox 用户可跳过）。

数据表启动时自动创建；失败可手动导入 `sql/install.sql`。

---

## 3. 动作币 / 试用 / 管理

开启商店（默认开）：`Config.UseShop = true`。

| 功能 | 说明 |
|------|------|
| 试用 | 未购买动作可点「试用」，时长 `Config.TrialSeconds`（默认 10 秒）；到期后可再次试用 |
| 购买 | 花费动作币永久解锁；价格见 `Config.StylePrices` / `Config.DefaultStylePrice` |
| 免费 | 在 `Config.FreeStyleIds` 里勾选；留空 = 全部收费 |
| 发放 | `/ge 玩家ID 数量`，例：`/ge 3 10`（负数扣除） |
| 武器专属 | 管理员给某把枪绑定固定动作；玩家可在 UI 选「武器专属」或「个人购买」 |

界面：右上角显示动作币；卡片显示价格 / 试用中 / 已拥有；**点击卡片才选中**（鼠标悬停不会切换）。右侧可切换动画来源，**不会覆盖已购买的个人动作**。

### 武器专属动画

1. 管理员按 `J` 打开界面 → 左侧 **管理**（或 `/holsterweapon`）
2. 拿着枪选动作后点「绑定手上武器」，或手动填 `WEAPON_PISTOL`
3. 玩家在右侧选：
   - **个人购买**：用商店里选中/购买的动作
   - **武器专属**：该枪有绑定时用专属动作；没绑定则回退个人动作

也可在 `config.lua` 写死默认：

```lua
Config.WeaponStyles = {
    [`WEAPON_PISTOL`] = 'wwzi',
}
```

---

## 4. 常用配置（`config.lua`）

| 项 | 默认 | 说明 |
|----|------|------|
| `Config.MenuKey` | `J` | 打开动作菜单 |
| `Config.DefaultStyle` | `wwa` | 默认动作 id |
| `Config.UseCustomUI` | `true` | 自研 NUI；`false` 回退 ox_lib |
| `Config.UseShop` | `true` | 动作币商店 + 试用 |
| `Config.StartingCoins` | `0` | 新玩家初始动作币 |
| `Config.TrialSeconds` | `10` | 试用秒数 |
| `Config.DefaultStylePrice` | `1` | 默认价格 |
| `Config.StylePrices` | — | 每个动作价格 |
| `Config.FreeStyleIds` | `{}` | 免费动作；空表 = 全收费 |
| `Config.UseOxInventoryEvent` | `true` | 听 ox 换枪；`false` 轮询手上武器 |
| `Config.PreviewOnSelect` | `true` | 应用时预览拔枪 |
| `Config.StyleNotes` / `label` | — | 菜单显示的中文名 |
| `Config.UsePermissions` | `false` | 旧版「限制动作需授权」；一般保持关闭 |
| `Config.GiveCoinCommand` | `ge` | 发币命令：`/ge ID 数量` |
| `Config.UseWeaponStyles` | `true` | 武器专属动画 |
| `Config.DefaultAnimMode` | `personal` | 默认：`personal` 个人 / `weapon` 专属 |
| `Config.WeaponStyleCommand` | `holsterweapon` | 管理武器绑定 |
| `Config.WeaponStyles` | `{}` | 配置里写死的默认绑定 |
| `Config.AdminIdentifiers` | 见 config | 管理员 license（推荐） |
| `Config.AdminAce` | `pazeee_holster_selector.admin` | 备用 ACE |

管理员（推荐写进 `config.lua`）：

```lua
Config.AdminIdentifiers = {
    'license:11396fd03eb03e1808010cdc2442cb9bc83015c4',
}
```

---

## 5. 命令

| 命令 / 按键 | 作用 |
|-------------|------|
| `J` | 打开选择界面 |
| `/holsteranim` | 打开菜单 |
| `/holsteranim wwa` | 直接切到指定动作（需已解锁） |
| `/testholsteranim wwa draw` | 测试拔枪 |
| `/testholsteranim wwa holster` | 测试收枪 |
| `/ge 3 10` | 给 ID 为 3 的玩家发 10 动作币（管理员） |
| `/holsterweapon` | 管理武器专属动画绑定（管理员） |
| `/holsteradmin` | 管理菜单（发币 / 武器专属） |
| `/holsteruiclose` | NUI 卡死时强制关界面 |

当前选中会写入客户端 KVP，重进服保留（仍受拥有/试用状态约束）。

---

## 6. 背包对接

### ox_inventory

1. `setr inventory:weaponanims false`（在 `ensure ox_inventory` **之前**）
2. `ensure pazeee_holster_selector`

不要改 ox_inventory 源码。

### qb-inventory / qb-weapons

1. 若还装着 `0r_holsterAnim`，关掉其 QB 背包相关开关（只用本资源可跳过）
2. 停用 `qb-weapons/client/weapdraw.lua`，避免和本资源叠动画
3. 本资源兼容 `0r_holsterAnim:Holster:DrawWeapon` / `HolsterWeapon`；也可 `Config.UseOxInventoryEvent = false` 用轮询换枪

---

## 8. 常见问题

| 现象 | 处理 |
|------|------|
| 还有背包自带收拔动画 | `setr inventory:weaponanims false` 必须在 `ensure ox_inventory` **前面** |
| 买不了 / 试用无效 | 确认 `oxmysql` 已启动；看控制台是否数据库初始化成功；可手动导 `sql/install.sql` |
| 管理菜单打不开 | 加 ACE：`pazeee_holster_selector.admin` |
| 动作币为 0 | `/ge 玩家ID 数量` 发放 |
| 某个动作不播 | `/testholsteranim <id> draw` / `holster`；检查 `stream` 与 dict/clip |
| 动画完全没有 | 确认 `stream/` 44 个 ycd，`fxmanifest` 的 `ANIM_FILE` 完整 |
| NUI 关不掉 | `/holsteruiclose` |

---

### 数据表（`UseShop = true` 时）

| 表 | 用途 |
|----|------|
| `pazeee_holster_coins` | 玩家动作币 |
| `pazeee_holster_owned` | 已购买动作 |
| `pazeee_holster_trials` | 试用到期时间 |
| `pazeee_holster_weapon_styles` | 武器 → 专属动作 |
| `pazeee_holster_prefs` | 玩家动画来源偏好 |
| `pazeee_holster_permissions` | 旧版限制授权（`UsePermissions`） |
