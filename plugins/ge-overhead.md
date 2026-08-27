---
layout: default
title: "GE-Overhead | 头顶显示系统"
---

# GE-Overhead | 头顶显示系统

FiveM 头顶信息显示插件，支持 ESX 和 QBCore 双框架。

## 功能特性

- ✅ 自动检测 ESX / QBCore 框架
- ✅ 头顶显示：玩家名字、服务器ID、职业标签、职级
- ✅ 17种预设职业图标（自动根据职业名匹配）
- ✅ 自定义头像（仅管理员可设置，支持URL）
- ✅ 默认头像（👤），普通玩家不可更改
- ✅ 距离自适应透明度（超过淡出距离后逐渐消失）
- ✅ 头顶固定不晃（NUI 每帧同步世界坐标转屏幕坐标）
- ✅ 管理员称号系统（6种稀有度颜色）
- ✅ 隐藏原生游戏名字标签
- ✅ 数据持久化（MySQL）

---

## 依赖项

| 依赖 | 说明 |
|------|------|
| `oxmysql` | 数据库 |
| `es_extended` | ESX 框架（二选一） |
| `qb-core` | QBCore 框架（二选一） |

---

## 安装方法

1. 将 `ge-overhead` 文件夹放入 `resources` 目录
2. 在数据库中执行 `ge_overhead.sql`（或资源启动时自动创建）
3. 在 `server.cfg` 中添加：
   ```
   ensure ge-overhead
   ```
4. 添加管理员 ACE 权限（可选）：
   ```
   add_ace group.admin ge_overhead.admin allow
   ```

---

## 配置说明（config.lua）

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `Config.Framework` | `'auto'` | 框架选择，auto=自动检测 |
| `Config.MaxDistance` | `30.0` | 最大显示距离（米） |
| `Config.FadeStartDistance` | `20.0` | 开始淡出距离（米） |
| `Config.HeightOffset` | `1.0` | 头顶高度偏移 |
| `Config.RefreshInterval` | `100` | 刷新间隔（毫秒） |
| `Config.ShowPlayerId` | `true` | 是否显示玩家ID |
| `Config.ShowJobLabel` | `true` | 是否显示职业标签 |
| `Config.ShowTitle` | `true` | 是否显示称号 |
| `Config.ShowAvatar` | `true` | 是否显示头像 |
| `Config.ShowIcon` | `true` | 是否显示职业图标 |

---

## 管理员命令

> 需要在 `Config.AdminGroups` 中的权限组，或拥有 `ge_overhead.admin` ACE 权限

| 命令 | 参数 | 说明 |
|------|------|------|
| `/settitle` | `[玩家ID] [称号] [颜色等级]` | 设置玩家称号 |
| `/deltitle` | `[玩家ID]` | 移除玩家称号 |
| `/seticon` | `[玩家ID] [图标编号1-17]` | 设置玩家自定义图标 |
| `/delicon` | `[玩家ID]` | 移除玩家自定义图标（恢复自动匹配） |
| `/setavatar` | `[玩家ID] [头像URL]` | 设置玩家头像URL |

---

## 称号颜色等级

| 等级 | 颜色 | 说明 |
|------|------|------|
| `common` | 白色 | 普通 |
| `uncommon` | 绿色 | 非凡 |
| `rare` | 蓝色 | 稀有 |
| `epic` | 紫色 | 史诗 |
| `legendary` | 橙色 | 传说 |
| `mythic` | 红色（发光） | 神话 |

### 示例
```
/settitle 1 服务器大大 legendary
/settitle 2 首席警官 rare
/deltitle 3
/seticon 1 1
/setavatar 1 https://example.com/avatar.jpg
```

---

## 17种预设图标

| 编号 | 名称 | 匹配职业名 |
|------|------|-----------|
| 1 | 警察 👮 | police |
| 2 | 医生 🏥 | ambulance |
| 3 | 技师 🔧 | mechanic |
| 4 | 出租车 🚕 | taxi |
| 5 | 律师 ⚖️ | lawyer |
| 6 | 房产 🏠 | realestate |
| 7 | 记者 📰 | reporter |
| 8 | 厨师 👨‍🍳 | chef |
| 9 | 法官 🔨 | judge |
| 10 | 军人 🎖️ | military |
| 11 | 消防员 🚒 | fire / firefighter |
| 12 | VIP ⭐ | — |
| 13 | 市长 🏛️ | mayor |
| 14 | 商人 💼 | business |
| 15 | 赛车手 🏎️ | racer |
| 16 | 飞行员 ✈️ | pilot |
| 17 | 无业 😴 | unemployed |

---
