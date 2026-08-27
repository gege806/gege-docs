---
layout: default
title: "格格执法记录仪插件使用文档"
---

# 格格执法记录仪插件使用文档

## 📋 概述

这是一个基于QBCore框架开发的AXON Body 4风格执法记录仪插件，为执法人员提供专业的执法记录功能界面。

## 🚀 功能特性

### 核心功能

* ✅ 三行信息显示：

  * 时间：实时显示当前时间（格式：YYYY-MM-DD HH:mm:ss）

  * 设备信息：显示AXON设备型号

  * 状态与职业：录制状态与执法人员职业并列显示

* ✅ 实时时间同步：每秒更新时间显示

* ✅ 专业UI设计：AXON Body 4风格，包含品牌LOGO

* ✅ 字体优化：粗糙字体效果，模拟真实设备显示

* ✅ 动画效果：支持多种切换动画

* ✅ 职业自动识别：根据玩家职业自动显示

* ✅ 响应式布局：适配不同屏幕尺寸

### 技术特性

* ✅ 完整的中文界面支持

* ✅ 配置化设计，便于自定义

* ✅ 完整的权限控制系统

* ✅ 网络状态同步功能（可选）

* ✅ 资源消耗低，性能优化

## ⚙️ 安装步骤

### 1. 基础安装

1. 将 qb-bodycam 文件夹放置在您的 resources 目录下

2. 将AXON Body 4的LOGO图片命名为 axon-logo.png 并放在 html/ 文件夹中

3. 确保您的服务器已安装以下依赖：

   * qb-core

   * ox_lib

   * ox_inventory（可选）

### 2. 配置修改

修改 config.lua 中的以下关键配置：

```
-- 基本设置
Config.Extras.EnableBodycam = true      -- 开启插件功能

-- 权限设置（根据需要修改）
Config.AllowedJobs = {
    ['police'] = true,
    ['ambulance'] = true,
    ['sheriff'] = true,
    -- ... 其他职业
}
```

### 3. 服务器启动

在 server.cfg 中添加：

```
ensure qb-bodycam
```

## 🎮 使用方法

### 命令列表

| 命令             | 说明        | 权限要求   |
| :------------- | :-------- | :----- |
| /bodycamon     | 开启执法记录仪   | 有权限的职业 |
| /bodycamoff    | 关闭执法记录仪   | 所有玩家   |
| /bodycamtoggle | 切换开关状态    | 有权限的职业 |
| /myinfo        | 查看当前信息    | 所有玩家   |
| /bodycamanim   | 查看/设置动画类型 | 所有玩家   |

### 通过物品使用（ox_inventory）

1. 在 ox_inventory 配置中添加物品：

```
['bodycam'] = {
    label = '执法记录仪',
    weight = 100,
    stack = false,
    consume = 0,
    client = {
        export = 'qb-bodycam.useBodycam'
    }
}
```

2. 在游戏中右键点击执法记录仪物品即可切换开关状态

## ⚡ 配置详解

### 1. 基本配置

```
Config.Bodycam = {
    DeviceInfo = "AXON BODY WF x7808569",  -- 设备显示名称
    DisplayDuration = 15000,              -- 通知显示时长
    EnableAnimation = true,               -- 启用动画
    AnimationDuration = 3000,             -- 动画时长
}
```

### 2. 职业权限配置

```
-- 允许使用执法记录仪的职业
Config.AllowedJobs = {
    ['police'] = true,      -- 警察
    ['ambulance'] = true,   -- 急救人员
    ['sheriff'] = true,     -- 治安官
    ['mechanic'] = false,   -- 机械师（禁用）
    ['taxi'] = false,       -- 出租车司机（禁用）
}
```

### 3. 职业翻译配置

```
-- 英文职业名称翻译为中文
Config.JobTranslations = {
    ['police'] = "洛圣都警察局",
    ['ambulance'] = "急救医疗",
    ['sheriff'] = "治安官办公室",
    ['unemployed'] = "无业",
    -- ... 更多翻译
}
```

### 4. 字体显示配置

```
Config.UI = {
    Position = "top-right",            -- 显示位置（右上角）
    Scale = 1.2,                      -- 缩放比例
    Colors = {
        recording = "rgba(255, 51, 51, 0.98)",  -- 录制中颜色（红色）
        idle = "rgba(255, 255, 255, 0.98)",     -- 已关闭颜色（白色）
        job = "rgba(255, 255, 255, 0.98)"       -- 职业颜色（白色）
    }
}
```

### 5. 附加功能配置

```
Config.Extras = {
    EnableBodycam = true,           -- 是否启用插件
    AutoSyncJob = true,             -- 自动同步职业更新
    EnableLogging = false,          -- 启用日志记录
    AutoDisableOnDeath = true,      -- 死亡时自动关闭
    DebugMode = false,              -- 调试模式
    Cooldown = 2000,                -- 操作冷却时间（毫秒）
    EnablePermissionCheck = true    -- 启用权限检查
}
```

## 🎨 界面说明

### UI布局说明

```
┌────────────────────────────────────┐
│  信息区域                           LOGO│
│  时间: 2024-01-25 22:50:00        │  │
│  设备: AXON BODY WF x7808569      │  │
│  状态: ● 录制中 | 警察            │  │
└────────────────────────────────────┘
```

### 显示的三行信息

1. 时间行：当前系统时间（实时更新，格式：YYYY-MM-DD HH:mm:ss）

   * 字体：Courier New等宽字体，模拟数字显示屏

   * 样式：粗体，白色，带文字阴影

2. 设备行：设备型号信息

   * 字体：Arial Black，粗体显示

   * 样式：白色，带文字阴影

3. 状态与职业行：

   * 录制状态：● 录制中（红色）/ ○ 已关闭（白色）

   * 分隔符：|

   * 职业：白色显示，使用Arial Black粗体字体

### 状态指示

* 🔴 录制中：红色圆点 + 闪烁动画 + 红色文字

* ⚪ 已关闭：白色圆圈 + 白色文字

* ⚪ 离线：灰色圆圈 + 灰色文字（未启用）

### 字体特点

* 粗糙字体效果：使用Arial Black字体，禁用字体平滑

* 等宽时间显示：使用Courier New等宽字体，模拟数字显示屏

* 优化字间距：提高可读性

* 清晰文字阴影：确保在任何背景下都清晰可见

## 🔧 高级配置

### 动画类型选择

插件提供6种动画类型：

1. bodycam_attach - 佩戴动画

2. bodycam_check - 检查动画（默认）

3. bodycam_radio - 对讲机动画

4. bodycam_adjust - 调整动画

5. bodycam_inspect - 检查设备动画

6. bodycam_quick - 快速切换动画

切换方法：

```
/bodycamanim bodycam_check  # 切换到检查动画
/bodycamanim                # 查看当前动画类型
```

### 响应式适配

插件自动适配不同屏幕分辨率：

* 桌面屏幕：正常尺寸显示

* 小屏幕/平板：适当缩小尺寸

* 手机屏幕：进一步缩小，确保布局完整

### 职业显示优化

1. 长职业名称处理：超过4个字符的职业名称会自动缩小字体并添加省略号

2. 职业颜色：白色显示，与状态信息形成对比

3. 实时更新：职业变更时自动更新显示

## 🐛 故障排除

### 常见问题

| 问题      | 可能原因      | 解决方案                      |
| :------ | :-------- | :------------------------ |
| UI不显示   | QBCore未加载 | 检查qb-core是否正确启动           |
| 没有权限    | 职业未在允许列表中 | 修改config.lua中的AllowedJobs |
| 动画不播放   | 动画字典不存在   | 更换其他动画类型                  |
| 字体显示模糊  | 浏览器字体平滑   | 这是故意设计的粗糙字体效果             |
| LOGO不显示 | 图片文件缺失    | 确保axon-logo.png在html文件夹中  |

### 调试模式

启用调试模式获取详细信息：

```
Config.Extras.DebugMode = true
```

启用后会在控制台输出详细的调试信息，包括：

* 插件启动状态

* 玩家职业和权限检查

* 执法记录仪开关状态

* 动画播放信息

### 日志系统

* 客户端日志：控制台输出（需要DebugMode开启）

* 服务器日志：可选记录到文件

* 可通过 Config.Extras.EnableLogging 控制

## 📱 兼容性

### 支持的框架

* ✅ QBCore（最新版本）

* ✅ ox_lib（必需）

* ✅ ox_inventory（可选）

### 系统要求

* FiveM服务器

* Lua 5.4+

* 现代浏览器内核（NUI显示）

### 已知兼容性问题

1. 字体平滑：某些浏览器可能强制启用字体平滑，可通过CSS强制禁用

2. 屏幕分辨率：极低分辨率下可能需要手动调整缩放

3. 资源冲突：与其他UI插件可能存在层叠问题

## 🔄 更新日志

### v1.1.0（当前版本）

* UI布局重构：

  * 职业移至状态后面，与状态同行显示

  * 移除警号显示

  * 优化整体布局

* 字体优化：

  * 使用粗糙字体效果（Arial Black）

  * 禁用字体平滑，模拟真实设备显示

  * 优化字间距和阴影效果

* 职业显示改进：

  * 职业颜色改为白色

  * 长职业名称自动处理

  * 实时职业同步更新

* LOGO集成：

  * 添加AXON Body 4品牌LOGO

  * LOGO显示在信息右侧

### v1.0.0

* 初始版本发布

* 完整的中文支持

* 优化的响应式设计

* 多种动画效果

* 完善的权限系统

## 📞 技术支持

格格QQ：2095857316

### 获取帮助

1. 检查 config.lua 配置是否正确

2. 启用 DebugMode 查看详细错误信息

3. 查看服务器控制台输出

### 注意事项

1. 配置备份：修改配置前务必备份

2. 资源重启：修改配置文件后需要重启资源

3. 权限检查：确保玩家职业在AllowedJobs列表中

4. LOGO图片：需要提供50×55像素的AXON Body 4 LOGO

### 自定义建议

1. 更换LOGO：替换html文件夹中的axon-logo.png文件

2. 调整位置：修改style.css中的#bodycam-container定位

3. 修改颜色：调整CSS中的颜色值

4. 添加职业：在Config.JobTranslations中添加新的职业翻译

## 📄 许可证

此插件为开源项目，遵循MIT许可证。可以自由修改和使用，但需保留原作者的版权声明。

***

提示：使用前请务必备份原有配置，修改配置后需要重启资源或服务器生效。建议在测试服务器上充分测试后再部署到生产环境
