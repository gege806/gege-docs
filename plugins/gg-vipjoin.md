---
layout: default
title: "gg_vipjoin — FiveM VIP 进服动画"
---

# gg_vipjoin — FiveM VIP 进服动画

在玩家**完全进入游戏**那一刻，为 Config 里配置过的玩家播放 **头像 + 头像框 + 背景视频/GIF + 背景音乐 + 欢迎语** 的全屏进服动画，可广播给全服。

### 支持

- **头像 / 头像框**：本地 PNG / URL / 图床短 ID / Discord 自动获取
- **背景**：MP4 / WEBM 视频，或 GIF / PNG / JPG / WEBP 静态图
- **背景音乐**：MP3 / OGG / WAV（独立于视频，特别适合配 GIF）
- **位置**：屏幕左 / 右 / 中
- **队列**：多人同时进服严格按**进服先后**顺序广播，不重叠
- **冷却**：同玩家 5 分钟内不重复触发，防断线刷屏
- **ZSX 兼容**：自动等 `ZSX_Multicharacter` 选完角色 / `ZSX_UIV2` UI 走完才播放

---

## 一、安装

1. 把整个 `gg_vipjoin` 文件夹放进 `resources/`
2. `server.cfg` 加：
   ```
   ensure gg_vipjoin
   ```
3. 资源文件放对位置：
   - 头像 / 头像框 → `html/assets/avatars/`（PNG / JPG / GIF / WEBP）
   - 背景 → `html/assets/videos/`（MP4 / WEBM / **GIF**）
   - 音乐 → `html/assets/sounds/`（MP3 / OGG / WAV）

---

## 二、最简配置

打开 `config.lua`，在 `Config.Players` 里写一行：

```lua
Config.Players = {
    ["license:11396fd03eb03e1808010cdc2442cb9bc83015c4"] = {
         image = "https://pic1.imgdb.cn/item/69f2de6cf97149b1cf3616dc.jpg",
         frame = "assets/avatars/1.png",   -- 头像框 (留空 = 不显示)
         name  = "格格",
         video = "assets/videos/gege2.mp4",
         duration = 18000,
         welcomeMessages = {
             subTitle = "王不见王"
         }
     },
}
```

保存 → `restart gg_vipjoin` → 玩家进服自动播放动画。

---

## 三、所有可配置字段

每个玩家支持的字段，**全部可选**：

| 字段 | 说明 | 例子 |
|---|---|---|
| `image` | 头像（本地 / URL / 图床短 ID） | `'https://i.imgur.com/x.gif'` |
| `frame` | **头像框** PNG，透明背景叠在头像外层 | `'assets/avatars/frame_gold.png'` |
| `name` | 显示名（覆盖游戏内昵称） | `'篱落'` |
| `video` | 背景（视频 or 静态图，见第四章） | `'assets/videos/22.mp4'` |
| `music` | **背景音乐**（配 GIF 最佳） | `'assets/sounds/bgm.mp3'` |
| `musicVolume` | 音乐音量 0.0~1.0 | `0.6` |
| `duration` | 显示时长（毫秒）。视频/音乐更长时自动延长 | `12000` |
| `theme` | 覆盖默认主题 | 见下 |
| `welcomeMessages` | 覆盖默认欢迎语 | 见下 |

### `theme` 子字段

```lua
theme = {
    color  = '#ff4dd2',   -- 主题色 (CSS)
    accent = '#ffd1f0',   -- 辅助色 (光晕)
    icon   = '♛',          -- 徽章图标
    label  = 'KING',       -- 顶部小字标签
}
```

### `welcomeMessages` 子字段

```lua
welcomeMessages = {
    title    = "{playerName} 大驾光临！",   -- 标题，{playerName} 会被替换为玩家名
    subTitle = "全场欢迎，红毯铺起来",       -- 副标题/欢迎语
}
```

### 完整定制例子

```lua
Config.Players = {
    ["license:20fa8adcd4e25f4f53da0c387d52f5c8ea5aab9e"] = {
        image       = "https://pic1.imgdb.cn/item/xxx.jpg",
        frame       = "assets/avatars/frame_gold.png",  -- 金色头像框
        name        = "格格",
        video       = "assets/videos/22.gif",            -- 用 GIF 做静态背景
        music       = "assets/sounds/bgm.mp3",           -- 配 GIF 的 BGM
        musicVolume = 0.6,
        duration    = 12000,
        theme = {
            color  = '#ff4dd2',
            accent = '#ffd1f0',
            icon   = '♛',
            label  = '服主',
        },
        welcomeMessages = {
            title    = "{playerName} 大驾光临！",
            subTitle = "大小姐驾到，通通闪开",
        },
    },
}
```

---

## 四、背景类型（`video` 字段）

脚本会根据文件后缀**自动选**播放方式：

| 后缀 | 行为 |
|---|---|
| `.mp4` / `.webm` | 当视频播放一次，播完后卡片退场 |
| `.gif` / `.png` / `.jpg` / `.webp` | 当**静态图**显示，退场按 `duration` 控制 |

> **GIF 背景配 `music` 最完美**：GIF 本身没声音，加 music 就有氛围。卡片会一直显示到 `duration` / 音乐长度 / 视频长度三者中较长的那个结束。

**注意**：`fxmanifest.lua` 默认只放行 `assets/videos/` 下 `*.mp4 / *.webm / *.gif`。如果要用 PNG/JPG 当背景图，在 `fxmanifest.lua` 的 `files` 块加上：

```lua
'html/assets/videos/*.png',
'html/assets/videos/*.jpg',
```

---

## 五、全局默认设置

玩家没在 `Config.Players` 里自定义时走这些默认值：

```lua
Config.NotificationSettings = {
    duration = 8000,     -- 显示时长 (ms)
    volume   = 0.3,      -- 视频音量 0.0~1.0
    muted    = false,    -- 视频是否静音
    position = 'right',  -- 'left' | 'right' | 'center'
}

Config.WelcomeMessages = {
    title    = "",       -- 空 = fallback 到 "{playerName}"
    subTitle = "",       -- 空 = fallback 到 "欢迎加入服务器"
}

Config.Theme = {
    color         = '#ffd700',
    accent        = '#ffdd00',
    icon          = '',
    label         = '梦想小镇2.0-VIP',
    defaultAvatar = 'assets/avatars/default.png',  -- 玩家没设 image 时的 fallback
    defaultFrame  = '',                             -- 玩家没设 frame 时的 fallback
}
```

---

## 六、获取玩家 license

| 方法 | 操作 |
|---|---|
| 服务器控制台 | 输入 `players` |
| txAdmin | 后台 → Players → 点开玩家 → Identifiers |
| 服务器日志 | 玩家加入时控制台会打印 `Player connecting: ... license:xxx` |

**Config.Players 的 key 必须带 `license:` 前缀**，例如：
```lua
["license:20fa8adcd4e25f4f53da0c387d52f5c8ea5aab9e"] = { ... }
```

---

## 七、图床

不想把资源放服务器本地，直接用图床：

### 完整 URL（最直接）

```lua
image = "https://i.imgur.com/jiluo.gif",
video = "https://example.com/bg.mp4",
music = "https://example.com/song.mp3",
frame = "https://example.com/frame.png",
```

### 图床短 ID 模式

`config.lua` 里设：
```lua
Config.ImageHost = 'https://i.imgur.com/'
```

之后 **`image / video / music / frame`** 四个字段只写短 ID 会自动拼接：
```lua
image = "jiluo.gif",   -- 自动拼成 https://i.imgur.com/jiluo.gif
```

常见图床直链前缀：
| 图床 | ImageHost |
|---|---|
| Imgur | `https://i.imgur.com/` |
| SM.MS | `https://s2.loli.net/` |
| GitHub Raw | `https://raw.githubusercontent.com/<user>/<repo>/main/` |
| imgdb.cn | `https://pic1.imgdb.cn/item/` |

---

## 八、命令

| 命令 | 谁能用 | 用途 |
|---|---|---|
| `/vipjoin_test` | 已配置的 VIP 玩家 | 立即播放自己的**完整**动画（仅自己可见，测试用） |
| `/vipjoin_preview [image]` | 任何客户端 | 本地 NUI 预览主题 / 头像（**不连服务端，不测视频/音乐/队列**） |

例子：F8 控制台输入下面这行直接看效果：
```
vipjoin_preview https://i.imgur.com/jiluo.gif
```

关闭自测试：`Config.AllowSelfTest = false`

---

## 九、Discord 头像（可选）

玩家没设 `image` 时，可以自动拿他 Discord 账号的头像作为 fallback：

```lua
Config.RemoteAvatar = {
    allow      = true,
    timeoutMs  = 4000,
    useDiscord = true,           -- 启用 Discord 头像
    botToken   = 'Bot xxxxxxx',  -- Discord Developer Portal 里拿
}
```

要求：

1. 玩家 identifier 里有 `discord:xxx`（玩家连 FiveM 时要开着 Discord 客户端）
2. 服务器能访问 `discord.com` + `cdn.discordapp.com`
3. Bot Token 有读取用户信息权限

没配 / 拿不到 → 回退到 `Config.Theme.defaultAvatar`。

---

## 十、高级设置

```lua
Config.TriggerDelayMs  = 1500   -- 客户端【完全进入游戏后】再延迟多少毫秒触发
Config.QueueGapMs      = 500    -- 保留字段（当前版本未使用）
Config.CooldownSeconds = 300    -- 同玩家冷却（秒），防断线刷屏
Config.BroadcastToAll  = true   -- true=全服可见，false=仅本人可见
Config.AllowSelfTest   = true   -- 允许 /vipjoin_test 自测
```

### 触发时机详解

`TriggerDelayMs` **不是"进服后多久"**。客户端会先等**下面所有条件**都满足，再 `Wait(TriggerDelayMs)`：

1. 网络激活
2. 玩家 Ped 生成
3. 黑屏淡出结束
4. `IsPlayerSwitchInProgress` 结束
5. **`ZSX_Multicharacter`**：等玩家按键选完角色
6. **`ZSX_UIV2`**：等 `IsUIBusy()` 返回 false
7. 玩家控制权打开（能移动）
8. NUI 焦点**连续 2 秒**无占用
9. 再 `Wait(TriggerDelayMs)` 作 buffer

如果 VIP 在角色选择卡 5 分钟还没 ready，服务端会**强制广播**一次，不丢动画。

### 队列顺序保证

服务端按玩家**进服先后**（`playerJoining` 触发时间）严格排队：

- 即使 B 比 A 先加载完，B 要等 A 广播完才轮到
- 断线 / 退出的人会自动跳过，不阻塞后面的人

### 动画特效

```lua
Config.Animation = {
    enter      = 'slideLeft',   -- 入场: slideLeft / slideRight / fadeIn / zoomIn
    exit       = 'slideLeft',   -- 退场
    particles  = true,          -- 粒子背景
    avatarRing = true,          -- 头像光圈
    typewriter = true,          -- 欢迎语打字机效果
}
```

---

## 十二、常见问题

**Q：玩家进服没反应？**
- 检查 license 是否正确（必须带 `license:` 前缀）
- 检查冷却 `Config.CooldownSeconds`，临时设 0 再测
- F8 控制台 `vipjoin_preview` 看 NUI 能否正常
- 用 `/vipjoin_test` 确认玩家配置本身是否生效

**Q：MP4 不显示？**
- 路径从 `assets/...` 开头（不要写 `html/assets/...`）
- 文件确实在 `html/assets/videos/`
- `fxmanifest.lua` 的 `files` 块要有 `*.mp4`（默认已含）

**Q：GIF 头像不动？**
- 确认是真的动态 GIF（别把 PNG 改后缀）
- 路径 `assets/avatars/x.gif` 或 `https://...gif`

**Q：想用 PNG / JPG 做背景（不是视频）？**
- 放到 `html/assets/videos/xxx.png`
- `fxmanifest.lua` 的 `files` 块加一行 `'html/assets/videos/*.png'`
- `video = "assets/videos/xxx.png"`

**Q：多个玩家同时进服会重叠吗？**
- 不会，严格按**进服顺序**排队，前一个人播完下一个才开始

**Q：VIP 在角色选择卡很久？**
- 5 分钟后服务端强制广播，不丢动画

**Q：视频 / 音乐比 `duration` 长？**
- 系统自动延长退场时间，不会提前切断
