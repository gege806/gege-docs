---
layout: default
title: "kooktxAdmin"
---

📢 txAdmin 处罚公告同步到 KOOK —— 使用说明
📌 简介
该 FiveM 资源能够将 txAdmin 中的玩家处罚事件（封禁、踢出、解封）自动同步到 KOOK（开黑啦） 指定频道的卡片消息中，方便管理员和玩家实时查看处罚记录。

📦 依赖
FiveM 服务器（使用 txAdmin 面板）

KOOK 机器人（拥有发送频道消息权限）

确保服务器已安装并启用了 txAdmin

⚙️ 安装步骤
将资源文件夹（例如命名为 txadmin-kook-log）放入服务器的 resources 目录。

编辑 config.lua 文件，填入你的 KOOK 机器人配置（见下文）。

在服务器配置（server.cfg）中添加以下行，确保资源随服务器启动：

plaintext
ensure txadmin-kook-log
重启服务器或手动启动资源：

plaintext
start txadmin-kook-log
🔧 配置说明（config.lua）
lua
Config = {
    KookBotToken = "你的机器人Token",          -- 必填，KOOK 机器人的 Token
    KookChannelId = "频道ID",                  -- 必填，要发送消息的频道 ID
    KookApiBase = "https://www.kookapp.cn/api/v3", -- API 地址，一般无需修改
    Debug = false,                              -- 调试模式，设为 true 可在控制台查看详细信息
    DeduplicationSeconds = 30,                   -- 同一 actionId 的去重时间（秒），防止重复通知
    PingEveryone = true                          -- 是否在卡片中 @全体成员
}
获取 KOOK Bot Token：在【https://developer.kookapp.cn/】 KOOK 开发者平台 创建一个机器人，获取 Token，并邀请机器人到你的服务器。

获取频道 ID：在 KOOK 客户端中，右键点击目标频道 → 复制 ID（需要开启开发者模式）。

API 地址：通常保持默认即可，除非 KOOK 更换 API 地址。

去重时间：部分事件可能重复触发，设置合理时间避免多次发送相同通知。

@全体成员：如果开启，卡片末尾会包含 (met)all(met) 标签，机器人需要有 @全体成员 的权限。

🚀 使用方法
配置完成后，无需额外操作。当 txAdmin 触发以下事件时，资源会自动向 KOOK 频道发送卡片消息：

封禁（ban）：显示玩家、原因、封禁时长、处理人

踢出（kick）：显示玩家、原因、处理人

解封（unban）：显示玩家、原因、处理人（卡片主题为“成功”）

卡片会根据处罚类型显示不同颜色：

🔴 红色：永久封禁

🟡 黄色：踢出游戏

🟢 绿色：撤销封禁

📝 自定义修改
如果你希望修改卡片中的提示文字、表情或底部文字，可以编辑 server.lua 中的：

Emojis 表（自定义表情符号）

BuildPunishmentCard 函数中的标题、主题逻辑

卡片底部 footer 内容（目前默认为 "UFJ通知系统"）

⚠️ 注意事项
确保 KOOK 机器人拥有 发送频道消息 的权限，并已加入目标频道。

如果开启 PingEveryone，机器人还需要有 @全体成员 的权限。

调试模式开启后，会在服务器控制台打印详细日志，方便排查问题，生产环境建议关闭。

如果配置后没有消息，请检查 Token 和频道 ID 是否正确，并尝试重启资源。

🆘 故障排查
检查服务器控制台是否有红色错误提示（例如 Token 无效、频道 ID 错误）。

在 txAdmin 执行一次处罚操作，观察控制台是否有 [KOOK响应] 类似的输出。

确保 txAdmin 版本与资源兼容（本资源基于 txAdmin 事件开发，一般通用）。

📄 许可证
本资源遵循 MIT 许可证，可自由修改和分发

如有任何问题，欢迎联系格格-2095857316
