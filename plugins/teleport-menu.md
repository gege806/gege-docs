---
layout: default
title: "格格定制传送菜单使用文档"
---

# 格格定制传送菜单使用文档

## 概述

格格定制传送菜单是一个专为FiveM服务器设计的用户友好型传送系统，允许管理员和授权玩家快速传送到预设地点或与其他玩家互动。

## 功能特点

1. ​​玩家操作​​：

   * 传送至玩家：输入玩家ID后传送到该玩家身边

   * 拉取玩家：输入玩家ID后将该玩家拉到自己身边

2. ​​地点传送​​：

   * 预设地点传送：一键传送到警察局、医院、市政厅、机场等预设位置

3. ​​玩家信息显示​​：

   * 显示当前玩家名称、职业/权限等级和ID

## 安装步骤

### 1. 创建资源文件夹

在服务器的 resources目录下创建一个新文件夹，例如 teleport-menu。

### 2. 添加文件

将以下文件放入该文件夹：

* index.html（包含HTML/CSS/JS代码）

* __resource.lua（资源清单文件）

* server.lua（服务器端脚本）

* client.lua（客户端脚本）

### 3. 编辑资源清单文件 (__resource.lua)

```
lua
```

复制

```
resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

ui_page 'index.html'

client_scripts {
    'client.lua'
}

server_scripts {
    'server.lua'
}

files {
    'index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
}
```

### 4. 服务器端脚本 (server.lua)

```
lua
```

复制

```
-- 示例服务器端处理
RegisterServerEvent('teleport:teleportToPlayer')
AddEventHandler('teleport:teleportToPlayer', function(targetId)
    local src = source
    -- 添加权限检查逻辑
    TriggerClientEvent('teleport:clientTeleport', src, targetId)
end)

-- 类似处理其他事件...
```

### 5. 客户端脚本 (client.lua)

```
lua
```

复制

```
-- 示例客户端命令
RegisterCommand("teleportmenu", function()
    -- 添加权限检查
    SetNuiFocus(true, true)
    local playerInfo = {
        name = GetPlayerName(PlayerId()),
        job = "管理员", -- 从服务器获取实际数据
        grade = "高级",
        id = GetPlayerServerId(PlayerId())
    }
    SendNUIMessage({
        action = 'showMenu',
        playerInfo = playerInfo
    })
end, false)
```

### 6. 启动资源

在 server.cfg文件中添加以下行：

```
cfg
```

复制

```
ensure teleport-menu
```

## 使用说明

### 打开菜单

在游戏中输入指令：

```
复制
```

/teleportmenu

### 界面导航

1. ​​标签页切换​​：

   * 点击顶部标签在"玩家操作"和"地点传送"之间切换

2. ​​玩家操作​​：

   * 在输入框中输入目标玩家ID

   * 点击"传送至玩家"传送到该玩家

   * 点击"拉取玩家"将该玩家拉到你身边

3. ​​地点传送​​：

   * 点击预设地点按钮（警察局、医院等）传送到该位置

### 关闭菜单

* 点击红色"关闭菜单"按钮

* 或按ESC键

## 自定义配置

### 修改预设地点

1. 在HTML文件中找到地点按钮代码：

```
html
```

下载

复制

预览

```
<button class="location-btn" data-location="police">
    <i class="fas fa-shield-alt"></i> 警察局
</button>
```

2. 修改或添加新地点：

```
html
```

下载

复制

预览

```
<button class="location-btn" data-location="newlocation">
    <i class="fas fa-new-icon"></i> 新地点名称
</button>
```

3. 在服务器端脚本中添加对应的坐标：

```
lua
```

复制

```
local locations = {
    police = vector3(428.23, -981.07, 30.71),
    hospital = vector3(299.1, -584.36, 43.28),
    newlocation = vector3(x, y, z) -- 添加新地点坐标
}
```

### 修改权限设置

在服务器端脚本中添加权限检查：

```
lua
```

复制

```
-- 示例权限检查
RegisterServerEvent('teleport:teleportToPlayer')
AddEventHandler('teleport:teleportToPlayer', function(targetId)
    local src = source
    local player = ESX.GetPlayerFromId(src)
    
    -- 检查玩家是否有权限
    if player.getGroup() == 'admin' then
        TriggerClientEvent('teleport:clientTeleport', src, targetId)
    else
        TriggerClientEvent('esx:showNotification', src, '~r~权限不足!')
    end
end)
```

### 修改玩家信息显示

在客户端脚本中修改发送到UI的数据：

```
lua
```

复制

```
SendNUIMessage({
    action = 'showMenu',
    playerInfo = {
        name = GetPlayerName(PlayerId()),
        job = playerData.job.label, -- 从服务器获取
        grade = playerData.job.grade_label,
        id = GetPlayerServerId(PlayerId())
    }
})
```

## 注意事项

1. ​​权限管理​​：

   * 默认实现中没有严格的权限控制，请根据您的服务器框架添加权限检查

   * 建议只对管理员或特定权限组开放此功能

2. ​​坐标设置​​：

   * 确保所有预设地点都有正确的坐标

   * 可以使用 /tp命令在游戏中获取准确坐标

3. ​​性能优化​​：

   * 当菜单打开时，会启用NUI焦点，可能影响游戏性能

   * 确保在关闭菜单时正确释放焦点

4. ​​UI定制​​：

   * 可以通过修改CSS文件自定义颜色、大小和布局

   * 图标使用Font Awesome，可以替换为其他图标类名

## 技术支持

如有任何问题或需要进一步定制，请联系开发者：

QQ:2095857316
