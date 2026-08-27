---
layout: default
title: "lb-jobapply - 洛圣都人事局公职招录系统"
---

# lb-jobapply - 洛圣都人事局公职招录系统

## 📋 概述

**lb-jobapply** 是一个专为 FiveM 服务器设计的公职招录管理系统，采用政府公文风格界面，提供完整的岗位申请、审核、管理功能。系统支持自定义岗位图标、实时通知、权限管理等高级功能。

## ✨ 主要特性

### 🎯 核心功能
- **岗位申请系统** - 玩家可在线申请公职岗位
- **审核管理** - 管理员可批准/拒绝申请，添加审核意见
- **自定义内容** - 支持自定义岗位描述、薪酬、要求、图标等
- **实时通知** - lb-phone 集成，实时推送申请状态更新
- **权限控制** - 基于职级的精细权限管理

### 🎨 界面特色
- **政府风格** - 采用官方政务系统视觉设计
- **RP 沉浸** - 全中文政府公文风格文案
- **响应式** - 适配各种屏幕尺寸
- **图标支持** - 支持 emoji 和图片 URL 作为岗位图标

### 📱 技术特性
- **lb-phone 集成** - 遵循 lb-phone 官方 API（`AddCustomApp` / `SendNotification` / `SendCustomAppMessage` / `GetEquippedPhoneNumber`）
- **多框架支持** - 自动检测 QB-Core / Qbox / ESX，Framework Bridge 统一 API
- **rem 响应式 UI** - CSS 全部采用 rem 单位，启用 `fixBlur=true` 获得 Phone 内高分辨率渲染
- **数据库缓存** - 高性能服务端缓存机制
- **自定义应用名称** - 可配置 APP 显示名称和描述

## 🚀 安装指南

### 前置要求
- **FiveM 服务器** (推荐 b3258+)
- **框架**：`qb-core` / `qbx_core` / `es_extended` 任选其一
- **lb-phone** 插件
- **oxmysql** 数据库插件

### 安装步骤

1. **下载插件**
   将 `lb-jobapply` 文件夹放入服务器的 `resources` 目录。

2. **数据库配置**
   ```sql
   -- 插件会自动创建所需表，无需手动建表
   -- 包含表：job_applications, job_custom_content
   ```

3. **server.cfg 配置**
   ```cfg
   # 三选一，遵从你服务器现有框架
   ensure qb-core            # 或 ensure qbx_core / ensure es_extended
   ensure oxmysql
   ensure lb-phone
   ensure lb-jobapply
   ```

4. **重启服务器**
   控制台将输出：
   ```
   [lb-jobapply] 已检测框架: qb     ← 或 qbox / esx
   [lb-jobapply] 数据库表已就绪
   [lb-jobapply] APP注册成功!
   ```

## ⚙️ 配置说明

### 基础配置 (config.lua)

```lua
-- APP 应用名称
Config.AppName = '公职招录'
Config.AppDescription = '洛圣都市政府人事局 · 公职岗位招录与人事管理服务平台'

-- 申请冷却时间（秒）
Config.ApplyCooldown = 300

-- 管理员最低职级
Config.ManageMinGrade = 0

-- 管理权限映射
Config.ManagePermissions = {
    ['police'] = {'police'},           -- 警察可管理警察岗位
    ['ambulance'] = {'ambulance'},     -- 医护可管理医护岗位
    ['mechanic'] = {'mechanic'},       -- 机械师可管理机械师岗位
    ['judge'] = {'police', 'ambulance', 'mechanic', 'judge'}  -- 法官可管理所有岗位
}

-- 公职岗位列表
Config.Jobs = {
    {
        id = 'police',
        name = '洛圣都警察局',
        fullname = 'Los Santos Police Department',
        icon = '🚔',
        department = '执法司法系统',
        description = '...',
        requirements = {...},
        salary = '$3,500/周 + 执勤补贴',
        slots = 15,
    },
    -- 更多岗位...
}

-- 调试日志开关
Config.DebugLog = false
```

### 表单字段配置

```lua
Config.FormFields = {
    { id = 'realname', label = '真实姓名', type = 'text', required = true },
    { id = 'age', label = '年龄', type = 'number', required = true },
    { id = 'phone', label = '联系电话', type = 'tel', required = true },
    { id = 'experience', label = '工作经历', type = 'textarea', required = false },
    { id = 'reason', label = '申请动机', type = 'textarea', required = true },
}
```

## 👥 使用指南

### 玩家使用

1. **打开 lb-phone**
   - 进入手机应用列表
   - 找到"公职招录"应用

2. **浏览岗位**
   - 查看所有可用公职岗位
   - 点击岗位查看详细信息
   - 了解岗位要求、薪酬待遇等

3. **提交申请**
   - 选择要申请的岗位
   - 填写申请表单（姓名、年龄、电话、经历、动机）
   - 点击"呈报申请"提交

4. **查看状态**
   - 在"我的申请"中查看申请历史
   - 实时接收审核结果通知

### 管理员使用

1. **权限检查**
   - 确保您的职位在 `Config.ManagePermissions` 中配置
   - 确保职级满足 `Config.ManageMinGrade` 要求

2. **审核申请**
   - 进入应用的"管理后台"
   - 查看待审核申请列表
   - 点击申请查看详细信息
   - 选择"批准"或"拒绝"，可添加审核意见

3. **编辑岗位信息**
   - 在管理后台选择"编辑招录公告"
   - 可修改：
     - 岗位图标（支持 emoji 或图片 URL）
     - 岗位职能概述
     - 薪酬福利待遇
     - 编制名额
     - 任职要求
     - 招录通告

4. **实时通知**
   - 审核结果会自动通知申请人
   - 所有在线管理员会收到新申请通知

## 🖼️ 图标设置

### 支持格式
- **Emoji**：如 `🚔`、`⚕️`、`🔧`
- **图片 URL**：如 `https://example.com/police.png`

### 设置步骤
1. 进入管理后台
2. 选择要编辑的岗位
3. 在"岗位图标"字段输入：
   - Emoji：直接输入 `🚔`
   - 图片：输入完整 URL
4. 保存即可生效

### 推荐图标
- 警察：`🚔` 或警徽图片
- 医护：`⚕️` 或医疗十字图片
- 机械师：`🔧` 或工具图片
- 法官：`⚖️` 或法槌图片

## 🏗️ 框架适配架构

本资源采用 **Framework Bridge** 设计，自动检测服务器框架并提供统一 API。

### Bridge API

**服务端** (`server/bridge.lua`):
| API | 说明 |
|---|---|
| `Bridge.GetPlayer(source)` | 返回标准化 Player 对象 |
| `Bridge.GetPlayerByIdentifier(id)` | 通过 citizenid / ESX identifier 查找 |
| `Bridge.GetPlayers()` | 返回在线玩家 source 数组 |
| `Bridge.RegisterCallback(name, fn)` | 跨框架注册服务端回调 |
| `Bridge.Notify(src, msg, type)` | 发送通知 |

**客户端** (`client/bridge.lua`):
| API | 说明 |
|---|---|
| `Bridge.GetPlayerData()` | 返回标准化玩家数据 |
| `Bridge.TriggerCallback(name, cb, ...)` | 跨框架触发服务端回调 |
| `Bridge.Notify(msg, type, duration)` | 显示通知 |

### 标准化 Player 对象

```lua
{
    source     = number,       -- 玩家 source
    identifier = string,       -- citizenid (QB/Qbox) 或 license:xxx (ESX)
    firstname  = string,
    lastname   = string,
    job = {
        name   = string,
        grade  = number,       -- ESX 直接是数字，QB/Qbox 已平铺自 grade.level
    },
    _raw       = table,        -- 原始 player 对象（高级用法）
}
```

## 🔧 高级配置

### 权限管理

#### 职级控制
```lua
-- 设置最低管理职级（0=无限制，1=最低职级，10=最高职级）
Config.ManageMinGrade = 5
```

#### 岗位权限
```lua
-- 配置不同职位可管理的岗位
Config.ManagePermissions = {
    ['police'] = {'police'},                    -- 警察只能管理警察岗位
    ['ambulance'] = {'ambulance'},              -- 医护只能管理医护岗位
    ['judge'] = {'police', 'ambulance', 'judge'} -- 法官可管理多个岗位
}
```

### 数据库管理

#### 表结构
```sql
-- 申请表
CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    citizenid VARCHAR(50) NOT NULL,
    job_id VARCHAR(50) NOT NULL,
    job_name VARCHAR(100) NOT NULL,
    realname VARCHAR(100) DEFAULT '',
    age INT DEFAULT 0,
    phone VARCHAR(20) DEFAULT '',
    experience TEXT DEFAULT NULL,
    reason TEXT DEFAULT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    reviewed_by VARCHAR(50) DEFAULT NULL,
    review_note VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 自定义内容表
CREATE TABLE job_custom_content (
    job_id VARCHAR(50) PRIMARY KEY,
    description TEXT DEFAULT NULL,
    requirements TEXT DEFAULT NULL,
    salary VARCHAR(100) DEFAULT NULL,
    slots INT DEFAULT NULL,
    notice TEXT DEFAULT NULL,
    icon TEXT DEFAULT NULL,
    updated_by VARCHAR(50) DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🐛 故障排除

### 常见问题

#### 1. 启动报错 `No such export GetCoreObject in resource qb-core`
**原因**：服务器使用 ESX/Qbox，不是 QB-Core。
**解决**：v1.1.0+ 已取消 qb-core 硬依赖，请确认使用最新版本。检查控制台是否输出 `[lb-jobapply] 已检测框架: ...`。

#### 2. 控制台输出 `已检测框架: unknown`
**原因**：`qb-core` / `qbx_core` / `es_extended` 三个框架资源都未 `started`。
**解决**：在 `server.cfg` 中 `ensure` 你的框架资源，且必须在 `lb-jobapply` 之前。

#### 3. 应用不显示在 lb-phone 中
**解决方案：**
- 检查 `fxmanifest.lua` 是否正确配置
- 确保 `lb-phone` 已正常启动
- 检查控制台是否有注册错误信息
- 重启 `restart lb-jobapply`

#### 4. 无法提交申请
**解决方案：**
- 检查玩家是否有有效的 `citizenid` (QB/Qbox) 或 `identifier` (ESX)
- 确保数据库连接正常
- 检查 `Config.ApplyCooldown` 设置

#### 5. 管理后台不显示
**解决方案：**
- 检查玩家职位是否在 `Config.ManagePermissions` 中
- 确认玩家职级满足 `Config.ManageMinGrade` 要求
- ESX 玩家的职级是数字，QB/Qbox 是 `grade.level`——Bridge 已统一

#### 6. 图标不显示
**解决方案：**
- 确认图片 URL 可访问
- 检查图片格式是否支持（jpg, png, gif, svg）
- 验证 HTTPS 证书有效性

#### 7. 通知不工作
**解决方案：**
- 确保 `lb-phone` 通知功能正常
- 检查手机通知是否正常发出
- 确认对方身上有手机

#### 8. UI 字号过小或过大
**解决方案：**
在 `html/style.css` 顶部调整根字号：
```css
html {
    font-size: 150%;  /* 默认 150%，可改 100%~200% */
}
```

### 调试模式

启用调试日志：
```lua
Config.DebugLog = true
```

调试信息会输出到服务器控制台，帮助定位问题。

## 🔄 更新日志

### v1.1.0 (当前版本)
- ✨ **多框架支持**：新增 Framework Bridge，自动检测并适配 QB-Core / Qbox / ESX
- ✨ **取消 qb-core 硬依赖**：未安装 qb-core 也可运行
- ✨ **优化 lb-phone 集成**：使用 `GetEquippedPhoneNumber` 官方 export 取代直接查表
- ✨ **CSS rem 重构**：启用 `fixBlur=true`，在 lb-phone 中获得高分辨率渲染
- ✨ **根字号可调**：通过 `html { font-size: % }` 一键缩放整体 UI
- 🐛 修复 `size` 单位异常（59812 kB → 5981 kB）
- 🔧 代码重构：全部 `QBCore.*` 调用走 `Bridge.*` 适配层

### v1.0.0
- ✅ 基础申请审核功能
- ✅ lb-phone 集成
- ✅ 自定义岗位内容
- ✅ 权限管理系统
- ✅ 政府风格界面
- ✅ 图标支持（emoji + 图片 URL）
- ✅ 自定义应用名称配置
- ✅ 启动 ASCII 艺术字显示

## 📞 技术支持

如遇到问题或需要技术支持，请提供以下信息：
- FiveM 服务器版本（如 b3258）
- 使用的框架及版本（QB-Core / Qbox / ESX）
- lb-phone 版本
- 启动日志中 `[lb-jobapply] 已检测框架: ...` 输出
- 控制台错误信息
- 相关配置文件

## 📄 许可证

本项目采用 MIT 许可证，详情请参阅 LICENSE 文件。

---

**洛圣都市政府人事局** - 公职招录管理平台  
*为洛圣都的公共服务事业选拔优秀人才*
