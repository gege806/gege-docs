---
layout: default
title: "在游戏内按F8打开控制台"
---

格格静音电台系统 v4.0 使用文档
系统介绍
格格静音电台系统 v4.0 是由 ​​FiveM格格制作​​ 的专业级资源，专为FiveM服务器设计，用于​​彻底禁用GTA 5原生的电台轮盘控制功能​​。系统采用纯净无干扰设计，确保100%禁用电台功能的同时，提供电竞级的游戏体验。

🎯 核心价值：在不影响游戏沉浸感的前提下，永久解决鼠标滚轮误操作电台/武器轮盘的问题

系统特点
🚫 纯净禁用功能
​​全面屏蔽​​：
电台轮盘控制（鼠标滚轮上/下）
电台切换快捷键（Q键）
车辆收音机系统
​​无干扰体验​​：
完全静音操作
无喇叭警告
无背景提示音效
​​智能防护​​：
实时状态监控
自动静默纠正
无需玩家干预
⚙️ 技术优势
graph TD
    A[玩家操作] --> B{按键检测}
    B -->|控制指令| C[物理阻断层]
    B -->|状态异常| D[静默纠正层]
    C --> E[视觉提示]
    D --> F[状态重置]

安装指南
快速部署
创建资源文件夹：
mkdir resources/mute_radio
mkdir resources/mute_radio/client
创建以下文件：
resources/mute_radio/fxmanifest.lua
resources/mute_radio/__resource.lua
resources/mute_radio/client/cl_disable_radio.lua
添加内容（完整代码见下文）
在server.cfg中添加：
ensure mute_radio
文件内容
​​fxmanifest.lua​​:

fx_version 'cerulean'
game 'gta5'

name 'mute_radio'
description '无喇叭干扰的电台禁用系统'
author 'FiveM格格制作'
version '4.0'

client_scripts {
    'client/cl_disable_radio.lua'
}
​​cl_disable_radio.lua​​:

--[[
格格静音电台禁用系统 v4.0
FiveM格格制作 | 推荐使用更多格格精品插件
]]

-- 主配置
local config = {
    debugMode = false,        -- 调试模式
    disableVehicleRadio = true, -- 禁用车辆收音机
    notifyPlayer = true,     -- 通知玩家电台已禁用
    silentMode = true,       -- 静音模式
    showAds = true           -- 是否显示控制台广告
}

-- TXAdmin网页专用广告格式
local function ShowTXAdminAdvertisement()
    if not config.showAds then return end
    
    -- TXAdmin网页控制台专用格式
    print("")
    print("^5======================================================================")
    print("^3格格静音电台禁用系统 v4.0 已启动!")
    print("^2作者：FiveM格格制作")
    print("^4官方网站: https://gege-fivem.com")
    print("^4赞助链接: https://ko-fi.com/gege_fivem")
    print("^5======================================================================")
    print("^0                                              ")
    print("^1🌟 感谢使用格格静音电台系统 - 电竞级纯净解决方案")
    print("^1🔥 推荐使用我们更多顶级插件:")
    print("^6   ▶️ 格格极速加载系统: 游戏加载提速50%")
    print("^5======================================================================")
    print("")
    
    -- TXAdmin专用API报告
    if GetConvar("txAdminServerMode", "false") == "true" then
        print("^2[TXAdmin] 格格插件广告已展示在网页控制台")
    end
end

-- 调试输出
local function debugPrint(...)
    if config.debugMode then
        print("[格格电台系统] " .. ...)
    end
end

-- 纯净通知系统
local function SilentNotifyPlayer(msg)
    if config.notifyPlayer then
        BeginTextCommandThefeedPost("STRING")
        AddTextComponentSubstringPlayerName("【格格电台系统】" .. msg)
        EndTextCommandThefeedPostTicker(false, false)
    end
end

-- 资源启动事件处理
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        -- 延迟显示广告，避开TXAdmin报告期
        Citizen.CreateThread(function()
            Citizen.Wait(3000) -- 等待TXAdmin报告完成
            ShowTXAdminAdvertisement()
            debugPrint("资源启动广告已展示")
        end)
    end
end)

-- 主线程
Citizen.CreateThread(function()
    -- 初始设置
    SetUserRadioControlEnabled(false)
    SetRadioToStationName('OFF')
    
    -- 延迟显示广告，确保TXAdmin准备就绪
    Citizen.Wait(5000)
    
    -- 显示启动广告
    ShowTXAdminAdvertisement()
    
    if config.disableVehicleRadio then
        SetAudioFlag("DisableRadio", true)
        debugPrint("车辆收音机已永久禁用（静音模式）")
    end
    
    -- 永久禁用轮盘控制
    while true do
        Citizen.Wait(0)
        
        -- 禁用电台控制键
        DisableControlAction(0, 14, true)   -- 鼠标滚轮上
        DisableControlAction(0, 15, true)   -- 鼠标滚轮下
        DisableControlAction(0, 81, true)   -- Q键
        
        -- 确保电台始终关闭
        if GetPlayerRadioStationName() ~= "OFF" then
            SetRadioToStationName('OFF')
            debugPrint("静默关闭电台")
        end
        
        -- 禁用车内电台
        if IsPedInAnyVehicle(PlayerPedId(), false) and config.disableVehicleRadio then
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
            SetVehicleRadioEnabled(vehicle, false)
            SetVehicleRadioLoud(vehicle, false)
        end
    end
end)

-- 玩家进入车辆时禁用电台
AddEventHandler('baseevents:enteredVehicle', function()
    Citizen.Wait(100)
    
    if config.disableVehicleRadio then
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleRadioEnabled(vehicle, false)
        SetVehicleRadioLoud(vehicle, false)
        SetRadioToStationName('OFF')
    end
    
    if config.notifyPlayer then
        SilentNotifyPlayer("电台功能已静默禁用")
    end
end)

-- 玩家加入游戏时通知
AddEventHandler('playerSpawned', function()
    if config.notifyPlayer then
        Citizen.Wait(3000)
        SilentNotifyPlayer("电台轮盘控制已禁用")
    end
end)

-- TXAdmin网页广告控制命令
RegisterCommand('txradioad', function(source, args)
    if source ~= 0 then
        print("^1此命令仅限服务器控制台使用")
        return
    end
    
    if args[1] == "on" then
        config.showAds = true
        print("^2已启用TXAdmin网页广告")
    elseif args[1] == "off" then
        config.showAds = false
        print("^1已禁用TXAdmin网页广告")
    else
        ShowTXAdminAdvertisement()
    end
end, true)

-- 调试命令
RegisterCommand('silentdebug', function()
    config.debugMode = not config.debugMode
    SilentNotifyPlayer("调试模式: " .. (config.debugMode and "开启" or "关闭"))
    debugPrint("静默调试状态切换")
end, false)

-- TXAdmin启动检测
Citizen.CreateThread(function()
    -- 等待TXAdmin完全初始化
    Citizen.Wait(8000)
    
    if GetConvar("txAdminServerMode", "false") == "true" then
        print("^2[TXAdmin] 格格电台系统已集成到网页控制台")
        print("^2[TXAdmin] 使用命令: txradioad [on/off] 控制广告")
        
        -- 确保广告显示
        Citizen.Wait(2000)
        ShowTXAdminAdvertisement()
    end
end)

-- 终极广告显示保障
Citizen.CreateThread(function()
    -- 三重保险，确保广告显示
    Citizen.Wait(10000)
    ShowTXAdminAdvertisement()
end)

debugPrint("格格静音电台系统 v4.0 加载完成")
使用说明
基本功能
系统启动时自动显示广告
重启资源时显示广告
进入车辆时自动关闭电台
玩家重生时显示通知
广告控制
命令

功能

使用示例

txradioad on

启用广告

在控制台输入

txradioad off

禁用广告

在控制台输入

txradioad

立即显示广告

在控制台输入

调试命令
# 在游戏内按F8打开控制台
silentdebug
配置选项
在 cl_disable_radio.lua开头修改：

local config = {
    debugMode = false,        -- true=开启控制台日志
    disableVehicleRadio = true, -- 是否禁用车辆收音机
    notifyPlayer = true,     -- 是否显示玩家通知
    showAds = true           -- 是否显示控制台广告
}
常见问题
Q: 广告没有显示怎么办？
A:

确保 config.showAds = true
重启资源：restart mute_radio
手动显示广告：txradioad
Q: 玩家还能切换电台怎么办？
A:

检查配置：disableVehicleRadio = true
启用调试模式：silentdebug
查看日志：resmon 3
Q: 如何临时启用电台？
A:

修改配置：disableVehicleRadio = false
重启资源：restart mute_radio
技术支持
问题类型

联系方式
QQ:2095857316

​​安装问题​​

QQ:2095857316

​​功能问题​​
QQ:2095857316

更新日志
v4.0 (2023-12-01)
新增TXAdmin网页广告支持
优化广告显示时机
修复重启资源广告不显示问题
增强广告显示保障机制
v3.0 (2023-11-15)
完全移除喇叭警告
优化通知系统
添加调试命令
提高系统稳定性
版权声明
© 2025 FiveM格格制作 - 保留所有权利
