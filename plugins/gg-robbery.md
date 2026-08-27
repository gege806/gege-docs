---
layout: default
title: "GG Robbery — 便利店 & 太平洋银行抢劫"
---

# GG Robbery — 便利店 & 太平洋银行抢劫

> 半 RP 风格的 FiveM 抢劫脚本，支持 ESX / QB-Core / QBX_Core 自动识别。

---

## 特性

- **多框架兼容**：自动识别 ESX / QB-Core / QBX_Core
- **多背包兼容**：ox_inventory / 框架默认背包
- **便利店抢劫**：10 个内置位置，持枪威胁触发
- **太平洋银行**：4 阶段流程（切电 → 黑客 → 钻金库 → 抢劫）
- **警力检查**：警察在线数量门槛
- **冷却机制**：防刷收益（单店 / 玩家 / 银行全服）
- **半 RP 平衡**：流程清晰、上手快、奖励合理
- **警报系统**：自动通知警察并标记地图

---

## 依赖

| 资源 | 必须 | 说明 |
|------|------|------|
| `ox_lib`         | ✅ | 通知 / 进度条 / skillCheck |
| `ox_target`      | ✅ | NPC / 区域交互 (所有抢劫触发都通过 ox_target) |
| `es_extended` 或 `qb-core` 或 `qbx_core` | ✅ | 任选其一 |
| `ox_inventory`   | 推荐 | 不装则用框架默认背包 |
| `lb-tablet`      | 可选 | 警察平板自动接收抢劫警报 |

> `Inventory` / `UseLBTablet` 都是 `auto` 自动检测资源是否启动。

---

## 安装

1. 把 `gg_robbery` 文件夹放进 `resources/`
2. 在 `server.cfg` 中加入：
   ```
   ensure ox_lib
   ensure ox_target
   ensure gg_robbery
   ```
3. 根据需要修改 `config.lua`

---

## 配置说明

### 框架自动识别
默认 `Config.Framework = 'auto'`，自动检测。如需手动指定：

```lua
Config.Framework = 'esx'   -- 'esx' | 'qb' | 'qbx'
Config.Inventory = 'ox'    -- 'ox' | 'default'
```

### 便利店抢劫 `Config.Stores`

| 字段 | 说明 |
|------|------|
| `minPolice`       | 至少在线警察数量 |
| `cooldown`        | 单店冷却（秒） |
| `globalCooldown`  | 玩家全局冷却（秒） |
| `holdupTime`      | 持枪威胁等待时间（秒） |
| `requiredWeapons` | 必须装备的武器列表 |
| `rewards.moneyMin/Max` | 脏钱奖励范围 |
| `rewards.items`   | 额外掉落物品列表 |
| `locations`       | 便利店收银员坐标列表 |

### 太平洋银行 `Config.Pacific`

| 字段 | 说明 |
|------|------|
| `minPolice`     | 至少在线警察数量 |
| `cooldown`      | 抢劫冷却（秒，全服） |
| `dailyLimit`    | 每日全服次数（0=无限） |
| `requiredItems` | 必备物品（撬锁器 / 安全卡 / 热熔剂） |
| `powerTime/hackTime/drillTime/lootTime` | 各阶段时长 |
| `skillcheck.difficulty` | 黑客小游戏难度数组 |
| `rewards`       | 脏钱 + 物品奖励 |

---

## 玩法流程

### 便利店

1. 装备允许的武器（手枪/霰弹枪/SMG/AR）
2. 走近收银员（< 2 米）
3. 按 **E** 触发抢劫
4. 警察收到警报
5. 等待 90 秒不离开收银员
6. 倒计时结束自动获得脏钱

### 太平洋银行

1. 携带必备物品到银行（撬锁器 / 安全卡 / 热熔剂）
2. 检查警力（≥ 4）
3. 找到 **电源箱** 按 E 启动
4. 切断电源（30 秒）
5. 找到 **控制面板** 按 E，完成黑客小游戏
6. 找到 **金库门** 按 E，钻 120 秒
7. 进入金库 按 E 抢劫 90 秒
8. 获得脏钱 + 金条 + 钻石
9. 离开区域

---

## 物品要求（数据库）

需要在你的物品数据库（`ox_inventory/data/items.lua` 或 `qb-core/shared/items.lua`）中存在：

```
markedbills      -- 脏钱物品
lockpick         -- 撬锁器
security_card_01 -- 安全卡 A
thermite         -- 热熔剂
goldbar          -- 金条
diamond          -- 钻石
rolex            -- 劳力士
```

如果有缺失的物品，请在 `config.lua` 修改对应物品名。

---

## 管理员命令

| 命令 | 权限 | 说明 |
|------|------|------|
| `gg_robbery_reset` | 仅控制台 | 重置太平洋银行抢劫状态 |

---

## 自定义

### 调整便利店位置

修改 `config.lua` 的 `Config.Stores.locations`：

```lua
{ coords = vec4(x, y, z, heading), name = '店名' },
```

### 调整太平洋银行触发点

修改 `config.lua` 的 `Config.Pacific`：

```lua
powerBox = vec3(x, y, z),
panel    = vec3(x, y, z),
drill    = vec3(x, y, z),
loot     = vec3(x, y, z),
```

### 修改奖励

`Config.Stores.rewards` / `Config.Pacific.rewards` 都支持完整自定义。

---

## 故障排查

- **「无法抢劫」**：检查警察是否够数，或冷却是否未过
- **NPC 不出现**：检查 `cashierModel` 是否合法
- **无进度条**：确认已 ensure `ox_lib`
- **物品不发放**：检查物品名是否存在于数据库

---

## License

MIT — 免费使用，欢迎修改。
