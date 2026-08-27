---
layout: default
title: "格格执法记录仪插件使用文档"
---

# 格格执法记录仪插件使用文档

## 概述

AXON Body 4 风格执法记录仪插件，支持 **ESX / QBCore / QBXCore** 多框架自动检测，为执法人员提供专业的执法记录 HUD 界面，包含 OX 背包物品对接、开枪自动激活、UI 拖拽定位等功能。

## 功能特性

- **多框架支持**：ESX、QBCore、QBXCore 三大框架，支持自动检测
- **OX 背包对接**：通过 `bodycam` 物品使用，支持 `ox_inventory` export 与框架可用物品双注册
- **开枪自动激活**：检测到武器使用时自动开启记录仪（需持有物品）
- **专业 UI**：AXON Body 4 仿真界面（REC 录制指示、频道、警员信息、部门、时间、Logo）
- **UI 拖拽定位**：玩家可自定义 HUD 位置，保存至本地 KVP
- **实时时间同步**：每秒更新日期与时间（`APR 30 2026` / `17 : 36 : 23` / `GMT+8`）
- **音效系统**：自定义 wav 音效（开始录制 / 停止录制 / 枪声检测）
- **职业自动识别**：显示职级、姓名、警号、部门名称
- **权限控制**：按职业配置使用权限
- **倒地自动上传**：警员倒地时自动关闭 UI 并提示上传至终端

## 安装步骤

### 1. 放置资源

将 `bodycam` 文件夹放入服务器 `resources` 目录。

### 2. 依赖确认

确保已安装以下资源：

- `ox_lib`（必需）
- `ox_inventory`（必需，用于物品检测与使用）
- 框架任选其一：`qb-core` / `qbx-core` / `es_extended`

### 3. 添加 OX 背包物品

打开 `install/ox_inventory/items.lua`，将注释块内的代码复制到 `ox_inventory/data/items.lua` 的 `return { }` 表内：

> **说明**：`install/ox_inventory/items.lua` 仅为安装参考片段（整段写在 `--[[ ]]` 注释中），不会被 bodycam 资源加载。这样可避免 FiveM 上传/加密资产时对无效 Lua 语法报错。

```lua
['bodycam'] = {
    label = '执法记录仪',
    weight = 500,
    stack = false,
    close = true,
    consume = 0,
    description = 'AXON Body 4 执法记录仪，使用后开启/关闭录制',
    client = {
        export = 'bodycam.useBodycam',
        image = 'bodycam.png',
    },
},
```

同时将物品图片 `bodycam.png` 放入 `ox_inventory/web/images/`。

服务端会自动注册 QBCore / ESX 可用物品作为备用（非 OX 环境时使用）。

### 4. 框架配置

打开 `config.lua`，设置框架类型：

```lua
Config.Core = 'auto'      -- 自动检测（推荐）
-- Config.Core = 'QBCore'  -- 强制 QB-Core
-- Config.Core = 'ESX'     -- 强制 ESX
-- Config.Core = 'QBXCore' -- 强制 QBX-Core
```

**自动检测逻辑**：

- 若指定了具体框架，先尝试加载该框架
- 若指定框架未找到，按 QBXCore → QBCore → ESX 优先级自动检测
- 设为 `'auto'` 时直接走自动检测流程

### 5. 启动资源

在 `server.cfg` 中确保启动顺序：

```cfg
ensure ox_lib
ensure qb-core          # 或 es_extended / qbx-core
ensure ox_inventory
ensure bodycam
```

## UI 界面说明

HUD 默认显示在**屏幕右上角**，布局如下：

| 区域 | 内容 |
|:--|:--|
| 顶栏左侧 | `REC` + 红色录制圆点 |
| 顶栏居中 | `AXON BODY 4` |
| 顶栏右侧 | 信号图标 + `W# 警号` + 静音麦克风图标 |
| 中间第一行 | `职级 姓名 [警号]` |
| 中间第二行 | 部门名称（如 `POLICE DEPARTMENT`） |
| 底栏 | 日期 · 时间 · 时区 |
| 右侧 | Axon 黄色 Logo（`axon-logo.png`） |

警员信息自动读取：

- **姓名**：`charinfo.firstname` + `lastname`
- **职级**：`job.grade.name`
- **警号**：`metadata.badge` 或自动生成
- **部门**：`Config.UI.DepartmentLabels` 或职业翻译

## 命令列表

| 命令 | 说明 | 权限 |
|:--|:--|:--|
| `/bodycamon` | 开启执法记录仪 | 允许的职业 + 持有物品 |
| `/bodycamoff` | 关闭执法记录仪 | 所有玩家 |
| `/bodycamtoggle` | 切换开关状态 | 允许的职业 + 持有物品 |
| `/bodycamgunshot` | 切换枪声自动激活 | 所有玩家 |
| `/bodycammove` | 进入/退出 UI 拖拽模式 | 所有玩家 |
| `/bodycamresetui` | 重置 UI 为默认右上角位置 | 所有玩家 |
| `/setbadge [警号]` | 设置警号 | 允许的职业 |
| `/myinfo` | 查看当前信息 | 所有玩家 |

**物品使用**：在 OX 背包中点击 `bodycam` 物品，等同于 `/bodycamtoggle`。

### UI 拖拽操作

1. 输入 `/bodycammove` 进入拖拽模式
2. 按住 HUD 面板拖动到目标位置
3. **松手**自动保存（写入本地 KVP，重启后保留）
4. 按 **ESC** 取消本次调整
5. 输入 `/bodycamresetui` 恢复默认右上角位置

## 配置详解

### 1. 物品配置

```lua
Config.Item = {
    Name = 'bodycam',           -- ox_inventory 中的物品名称
    RequireItem = true,         -- 是否需要持有物品才能使用/自动开启
    Label = '执法记录仪',
    Description = 'AXON Body 4 执法记录仪，使用后开启/关闭录制',
}
```

设为 `RequireItem = false` 则跳过物品检测，有权限的玩家可直接使用。

### 2. 执法记录仪配置

```lua
Config.Bodycam = {
    DeviceInfo = "AXON BODY 4 WF x7808569",  -- 备用设备信息（旧版字段）
    DisplayDuration = 15000,                 -- 通知显示时长（毫秒）
    EnableAnimation = false,                 -- 启用开关动画
    AnimationDuration = 3000,                  -- 动画时长（毫秒）
    Sounds = {
        Start = { custom = true, file = "BodyCamStart.wav" },
        Stop = { custom = true, file = "BodyCamStop.wav" },
        GunshotDetection = { custom = true, file = "BodyCamStart.wav" },
    }
}
```

### 3. 警号配置

```lua
Config.Badge = {
    CustomBadge = "00000",
    MinLength = 4,
    MaxLength = 8,
}
```

警号获取优先级：`metadata.badge` → `variables.badge`（ESX）→ 自动生成 → 默认值。

### 4. 职业权限

```lua
Config.AllowedJobs = {
    ['police'] = true,
    ['sheriff'] = true,
    ['ambulance'] = true,
    -- ...
}
```

只有值为 `true` 的职业才能使用执法记录仪。

### 5. UI 配置

```lua
Config.UI = {
    DeviceModel = "AXON BODY 4",     -- HUD 顶部型号文字
    ChannelPrefix = "W#",            -- 频道前缀（显示为 W# 1100）
    Timezone = "GMT+8",              -- 时区显示
    DepartmentUppercase = true,      -- 部门名称转大写

    DepartmentLabels = {
        ['police'] = "POLICE DEPARTMENT",
        ['lspd'] = "POLICE DEPARTMENT",
        ['ambulance'] = "EMERGENCY MEDICAL SERVICES",
        -- 可按职业自定义英文/中文部门名
    },

    Colors = {
        recording = "rgba(255, 51, 51, 0.98)",
        idle = "rgba(79, 195, 247, 0.98)",
        gunshot = "rgba(255, 165, 0, 0.98)",
    },

    Drag = {
        Enabled = true,
        Command = 'bodycammove',
        ResetCommand = 'bodycamresetui',
        KvpKey = 'bodycam_ui_position',
        Default = { top = 18, right = 24 },  -- 默认右上角
    },
}
```

若希望部门显示中文，将 `DepartmentLabels` 中对应职业改为中文即可，例如：

```lua
['police'] = "洛圣都警察局",
```

### 6. 枪声自动激活

```lua
Config.Gunshot = {
    EnableAutoActivate = true,
    AutoActivateDelay = 100,
    Notification = true,
    GunshotCooldown = 10000,
}
```

**触发条件**：

1. 玩家正在开枪（排除拳头、手电筒、电击枪）
2. 职业在 `AllowedJobs` 列表中
3. 持有 `bodycam` 物品（`RequireItem = true` 时）
4. 冷却时间已过

若记录仪已开启，开枪时会显示枪声检测橙色警示。

### 7. 功能开关

```lua
Config.Extras = {
    EnableBodycam = true,
    AutoSyncJob = true,
    EnableLogging = false,
    AutoDisableOnDeath = true,      -- 倒地时关闭 UI 并提示上传
    AutoGenerateBadge = true,
    DebugMode = false,
    Cooldown = 2000,
    EnablePermissionCheck = true,
}
```

**倒地行为**：开启 `AutoDisableOnDeath` 后，警员倒地且记录仪处于开启状态时，会自动关闭 HUD 并提示：

> 警员倒地执法记录仪自动上传到终端

## 多框架兼容说明

### QBCore / QBXCore

直接兼容。服务端自动注册 `CreateUseableItem`，客户端通过 OX export 或事件 `bodycam:client:useItem` 触发。

### ESX

自动适配以下差异：

| 功能 | QBCore | ESX |
|:--|:--|:--|
| 获取玩家数据 | `QBCore.Functions.GetPlayerData()` | `ESX.GetPlayerData()` |
| 通知 | `QBCore.Functions.Notify()` | `ESX.ShowNotification()` |
| 服务端获取玩家 | `QBCore.Functions.GetPlayer(src)` | `ESX.GetPlayerFromId(src)` |
| 警号存储 | `metadata.badge` | `variables.badge` |
| 可用物品 | `CreateUseableItem` | `RegisterUsableItem` |
| 职业更新 | `QBCore:Client:OnJobUpdate` | `esx:setJob` |

### OX 背包

物品检测优先使用：

```lua
exports.ox_inventory:Search('count', 'bodycam')
```

若 OX 未启动，会回退到框架背包物品列表检测。

## 故障排除

| 问题 | 原因 | 解决方案 |
|:--|:--|:--|
| UI 不显示 | 框架未加载 / 未开启记录仪 | 检查控制台框架检测日志，使用物品或 `/bodycamon` |
| 没有权限 | 职业不在列表中 | 修改 `Config.AllowedJobs` |
| 提示没有执法记录仪 | 未持有物品 | 添加 `bodycam` 物品，或设 `RequireItem = false` |
| 点击物品无反应 | OX export 路径错误 | 确认资源名为 `bodycam`，export 为 `bodycam.useBodycam` |
| 上传资源报错 items.lua 语法错误 | 安装片段被当作脚本解析 | 使用最新版 `install/ox_inventory/items.lua`（内容在注释块内），勿直接 `require` 该文件 |
| 枪声不自动开启 | 无物品 / 功能关闭 | 确认持有物品且 `EnableAutoActivate = true` |
| LOGO 不显示 | 图片缺失 | 确保 `html/axon-logo.png` 存在 |
| UI 位置异常 | KVP 数据损坏 | 使用 `/bodycamresetui` 重置 |
| 拖拽无效 | 功能已关闭 | 确认 `Config.UI.Drag.Enabled = true` |

### 调试模式

```lua
Config.Extras.DebugMode = true
```

启用后控制台输出：插件启动状态、框架检测、职业/警号、记录仪开关状态。

## 更新日志

### v1.4.1（当前版本）

- **修复**：`install/ox_inventory/items.lua` 改为注释块安装片段，修复 FiveM 资产上传时 `unexpected symbol near '['` 语法错误

### v1.4.0

- **UI 重构**：AXON Body 4 仿真 HUD（REC、频道、警员信息、部门、时间、Logo）
- **OX 背包完整对接**：`install/ox_inventory/items.lua` + export + 服务端可用物品注册
- **UI 拖拽定位**：`/bodycammove`、`/bodycamresetui`，位置本地 KVP 保存
- **倒地提示优化**：「警员倒地执法记录仪自动上传到终端」
- **物品检测增强**：OX 优先，框架背包回退
- **多框架支持**：ESX、QBCore、QBXCore 自动检测
- **枪声检测优化**：延迟 100ms，需持有物品才自动激活
- **默认动画关闭**：`EnableAnimation = false`（可按需开启）

### v1.2.0

- 新增开枪自动激活功能
- 新增音效系统
- 新增 `/bodycamgunshot` 命令

### v1.1.0

- UI 布局重构
- 添加 AXON Body 4 LOGO

### v1.0.0

- 初始版本发布

## 技术支持

格格 QQ：2095857316  
售后群：492683667

### 注意事项

1. 修改配置后需重启 `bodycam` 资源
2. 资源文件夹必须命名为 `bodycam`（与 OX export 一致）
3. 确保 `ox_inventory` 中已添加 `bodycam` 物品及图片
4. `html/axon-logo.png` 必须存在，否则 Logo 区域空白
5. 建议先在测试服验证物品使用、UI 拖拽、倒地提示

## 许可证

此插件为开源项目，遵循 MIT 许可证。可自由修改和使用，但需保留原作者版权声明。
