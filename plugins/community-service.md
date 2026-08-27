---
layout: default
title: "community_service — 社区服务 / 拔草惩罚"
---

# community_service — 社区服务 / 拔草惩罚

管理员下派后玩家被传送到拔草场，按 E 拔草累计次数，完成自动释放回原位置。

## 功能

- `/cs <玩家ID> [次数]` 派发社区服务（默认 50 次）
- 玩家被传送到 `Config.Zone.center` 坐标
- 区域内按 **E** 拔草，动画 4 秒，每次 +1
- 屏幕底部 HUD 显示进度 `🌱 社区服务 12 / 50`
- 完成后自动传回**开始前的位置**
- 离开区域 `radius + 10m` → 软警告；`+ 40m` → 直接拉回
- 掉线自动保存剩余次数（MySQL）
- 重连自动恢复：稍等 3 秒后再次传送到拔草场继续服刑
- `/cs_release <ID>` 管理员提前放人（支持对离线玩家清记录）
- `/cs_list` 查看当前在服名单
- 叠加：对已在服玩家再跑 `/cs ID 次数` 会叠加到总数
- 完成奖励（可选）：金钱 / 物品

## 依赖

- `es_extended` 或 `qb-core` / `qbx_core`
- `ox_lib`
- `oxmysql`

## 安装

1. 文件夹放 `resources/community_service/`
2. `server.cfg`：
   ```
   ensure community_service
   ```
3. `config.lua`：
   - `Zone.center` → 改到你想要的拔草场坐标
   - `DefaultCount` → 默认次数
   - `PullDurationSec` → 单次耗时
   - 管理员权限：`command.cs_admin` ACE 或 ESX / QBCore / QBOX 权限
4. 资源启动时会自动读取并执行 `install.sql`，无需手动建表

## 命令

| 命令 | 说明 |
|---|---|
| `/cs 12` | 派 12 号做默认 50 次拔草 |
| `/cs 12 100` | 派 12 号做 100 次 |
| `/cs_release 12` | 提前释放 12 号 |
| `/cs_list` | 列出在服玩家 |

所有命令管理员（ACE `command.cs_admin` 或 ESX `admin/superadmin`）可用，控制台直接可执行。

## 持久化

- 每次拔草后立即写库
- 玩家 `esx:playerLoaded` / `QBCore:Server:PlayerLoaded` / `qbx_core:server:playerLoaded` 触发时查库，若有未完成刑期 → 等 3 秒自动传送到拔草场并恢复剩余进度

## 定制

### 换动画
改 `Config.Anim.dict` / `name`

### 完成后给钱
```lua
Config.Reward = { money = 0, bank = 500, item = { name = 'water', count = 3 } }
```

### 多地点拔草
目前是单点区域。要多地点可扩展 `Config.Zone` 为数组并改最近距离判断。需要的话告诉我。
