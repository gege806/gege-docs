---
layout: default
title: "FiveM ESX 服务器进服须知插件使用文档"
---

# FiveM ESX 服务器进服须知插件使用文档

## 概述

这个插件为基于ESX框架的FiveM服务器提供了一个美观的进服须知界面，新玩家进入服务器后需要阅读并接受服务器规则才能继续游戏。插件支持一次性确认（永久记录）、自定义规则内容、链接按钮、管理员命令等功能。

## 功能特点

* ✅ 美观的欢迎界面和规则展示

* ✅ 支持自定义服务器Logo和规则内容

* ✅ 链接按钮带图标，可跳转到外部网页

* ✅ 阅读倒计时功能，必须阅读一定时间后才能接受

* ✅ 一次性确认，使用数据库永久记录玩家接受状态

* ✅ 支持管理员重置玩家的接受状态

* ✅ 可配置的显示延迟时间

* ✅ 拒绝规则后自动踢出玩家

* ✅ 响应式设计，支持各种屏幕尺寸

## 安装步骤

### 1. 下载插件文件

将插件文件夹 esx_welcome 放入您的FiveM服务器的 resources 目录中。

### 2. 导入SQL表（可选）

如果您使用数据库存储玩家接受状态（默认启用），插件会自动创建所需的表。但如果您想手动创建，可以使用以下SQL：

sql

```
CREATE TABLE IF NOT EXISTS `user_welcome_status` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `identifier` VARCHAR(100) NOT NULL,
    `accepted` TINYINT(1) NOT NULL DEFAULT 0,
    `accepted_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `player_name` VARCHAR(100),
    `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3. 配置服务器

在 server.cfg 文件中添加以下行：

cfg

```
ensure esx_welcome
```

### 4. 配置插件

编辑 config.lua 文件，根据您的服务器需求进行配置。主要配置项包括：

* 服务器名称和Logo

* 规则内容和标题

* 链接设置

* 计时器设置

* 消息文本

* 管理员组设置

### 5. 添加图片资源

将您的服务器Logo放入 html/logo.png，并将链接图标放入 html/icons/ 目录中。

### 6. 重启服务器

完成以上步骤后，重启您的FiveM服务器。

## 配置说明

### 基本设置

```
Config.EnableWelcome = true -- 是否启用欢迎通知
Config.EnableRules = true -- 是否显示规则界面
Config.RequireRulesAcceptance = true -- 是否需要接受规则
Config.OneTimeAcceptance = true -- 是否只需确认一次
```

### 计时器设置

```
Config.ReadTimeRequired = 15 -- 需要阅读的秒数
Config.EnableCountdown = true -- 是否启用倒计时
Config.WelcomeDelay = 5000 -- 欢迎界面延迟显示时间(毫秒)
```

### 数据库设置

```
Config.UseDatabase = true -- 是否使用数据库存储确认状态
Config.DatabaseTable = "user_welcome_status" -- 数据库表名
```

### 权限设置

```
Config.AdminGroups = {
    "admin",
    "superadmin",
    "mod" -- 可以根据需要添加其他管理员组
}
```

### 服务器信息

```
Config.ServerName = "都市风云 RP 服务器"
Config.ServerLogo = "logo.png" -- 服务器Logo路径
```

### 规则内容

```
Config.RulesTitle = "服务器规则"
Config.RulesContent = {
    "尊重其他玩家，禁止任何形式的侮辱、歧视或骚扰行为",
    "禁止使用任何外挂、作弊程序或利用游戏漏洞",
    -- 更多规则...
}
```

### 链接设置

```
Config.Links = {
    {name = "完整规则", url = "https://example.com/rules", icon = "rules.png"},
    {name = "加入Discord", url = "https://example.com/discord", icon = "discord.png"},
    -- 更多链接...
}
```

### 消息设置

```
Config.WelcomeMessage = "欢迎来到服务器！"
Config.DeclineMessage = "您已拒绝服务器规则"
Config.AcceptMessage = "感谢您接受服务器规则"
```

### 命令设置

```
Config.TestCommand = "testwelcome" -- 测试欢迎界面的命令
Config.AdminResetCommand = "resetwelcomestatus" -- 重置玩家欢迎状态的管理员命令
```

## 使用说明

### 玩家使用

1. 新玩家进入服务器后，会等待配置的延迟时间（默认5秒）后显示欢迎界面。

2. 玩家必须阅读规则内容，并等待倒计时结束（默认15秒）后才能点击"接受"按钮。

3. 如果玩家点击"拒绝"按钮，将会被踢出服务器。

4. 一旦玩家接受了规则，下次登录时将不再显示欢迎界面（除非管理员重置了状态）。

### 管理员使用

#### 测试欢迎界面

管理员可以使用以下命令测试欢迎界面：

```
/testwelcome
```

#### 重置玩家欢迎状态

管理员可以使用以下命令重置指定玩家的欢迎状态：

```
/resetwelcomestatus <玩家ID>
```

示例：

```
/resetwelcomestatus 1
```

这将会重置玩家ID为1的欢迎状态，该玩家下次登录时需要重新接受规则。

## 自定义样式

如果您想要修改欢迎界面的样式，可以编辑 html/style.css 文件。该文件包含了所有的样式定义，您可以根据需要调整颜色、字体、布局等。

## 故障排除

### 常见问题

1. 欢迎界面不显示

   * 检查 config.lua 中的 Config.EnableRules 是否设置为 true

   * 检查控制台是否有错误信息

2. 数据库不工作

   * 确保 Config.UseDatabase 设置为 true

   * 检查数据库连接是否正常

3. 权限问题

   * 检查 Config.AdminGroups 中的组名是否与您的服务器权限组匹配

4. 图片不显示

   * 确保图片文件位于正确的路径

   * 检查图片文件名是否与配置中的名称一致

### 获取帮助

如果您遇到无法解决的问题，请检查控制台错误信息，并根据错误信息进行排查。如果问题仍然存在，请联系插件开发者。

## 更新日志

### v1.0.0

* 初始版本发布

* 实现基本欢迎界面功能

* 添加数据库支持

* 添加管理员命令

## 版权信息

此插件由格格开发，欢迎修改和分发，但请保留原作者信息
