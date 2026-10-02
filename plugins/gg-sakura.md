---
layout: default
title: "樱花物语 gg_sakura"
---

# 樱花物语 gg_sakura

FiveM RP：**鲜花互动 + 花店经营**。粉嫩 UI，适合社交 / 人气玩法。

版本：`1.2.1`

## 功能一览

| 模块 | 内容 |
|------|------|
| 送花互动 | 靠近玩家送花、可选留言、收花特效、大额全服公告 |
| 魅力值 | 收礼加魅力、每日上限、**月榜魅力**、收礼/送礼统计 |
| 排行榜 | 总榜 + **月榜**；颁奖台展示月榜前三雕像 |
| 花店零售 | 28 种成品花、库存、公告、售价从低到高 |
| 经营后台 | 库存、金库存取、营业额、销售记录、调价促销 |
| 员工管理 | 雇佣 / 解雇 / 调级（见习→老板） |
| 花艺制作 | 制作台消耗原料补库存；便宜花材料少，贵的/花海材料多 |
| 关系绑定 | 恋人 / 兄弟 / 闺蜜；关心阶段；头顶图标；解绑后 24h 冷却 |
| 颁奖台 | 已内置 `podium/`：鲜花人气**月榜**雕像、留言板、互动表情 |

## 依赖

- `ox_lib`
- `oxmysql`
- 框架：`es_extended` / `qb-core` / `qbx_core`（`Config.Framework = 'auto'`）
- 推荐：`ox_target`、`ox_inventory`

## 安装

1. 把 `gg_sakura` 放进 `resources`
2. 导入 SQL：
   - 必做：`sql/install.sql`
   - ESX 另做：`sql/esx_job.sql`
3. 物品与图标：
   - **ox_inventory**：合并 `install/ox_items.lua` 到 `ox_inventory/data/items.lua`
   - 复制 `install/images/*.png` 到 `ox_inventory/web/images/`
   - **QB**：参考 `install/qb_shared_snippet.txt`
4. `server.cfg`：

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_target
ensure ox_inventory
ensure es_extended   # 或 qb-core / qbx_core
ensure wuja_garden_company   # 可选：花园地图
ensure gg_sakura
```

5. 修改 `config.lua`、`podium/shared/config.lua`（**行尾中文注释**：`Config.xxx = 值 -- 说明`）

> 不要再单独 `ensure rcnk_podium`，颁奖台已并入本资源。

## 命令

| 命令 | 说明 |
|------|------|
| `/flowershop` | 打开花店面板 |
| `/mycharm` | 魅力面板（需开启旧社交 UI：`Config.SocialUI.charm`） |
| `/flowerrank` | 魅力排行榜（需开启旧社交 UI：`Config.SocialUI.ranking`） |
| `/sakuracard` | 预览收花特效 |
| `/giveflower` | 快捷送花（客户端） |
| `/awardstage_admin` | 颁奖台管理面板（需在 `PodiumConfig.AdminPanel.admins` 配置标识符） |

店门口用 **ox_target** 打开花店；对玩家瞄准选「赠送鲜花」。

## 权限等级

职业名：`florist`（与 `Config.JobName` 一致）

| Grade | 职位 | 权限 |
|------|------|------|
| 0 | 见习花艺师 | 制作、看销售、存款 |
| 1 | 花艺师 | 同上 |
| 2 | 资深花艺 | 同上 |
| 3 | 店长（`Config.ManagerGrade`） | + 公告、雇佣、调价促销 |
| 4 | 老板（`Config.BossGrade`） | + 取款、解雇、调级 |

## 关系绑定

- 送花可选：恋人 / 兄弟 / 闺蜜，或仅送花不绑定
- 关心值按送花束数累计；阶段：初级 → 中级(100) → 高级(1000) → 完美(高级后再送 520 束「花海泛舟 / 蓝紫花海」)
- 头顶图标：`Config.Bond.iconDisplay` = `alt`（按住左 Alt）/ `always` / `proximity`
- 解除绑定后，同一对 + 同一身份 **24 小时**内不可再绑（`Config.Bond.unbindCooldown = 86400`）

## 全服公告

一次送满 `Config.GiftAnnounce.minAmount`（默认 **88**）束：全服视频 + 文案；可自定义文案。  
占位符：`{from}` `{to}` `{flower}` `{emoji}` `{relation}`（文案中不展示数量）。

## 花艺制作

员工到店内 **花艺制作台** 制作（不在后台 NUI）：

1. 原料：采集点采花茎/绿叶，或批发供应商买包装纸/丝带/染色剂
2. 制作台选花与数量 → 成品进店库存
3. 配方随售价升高材料增多（花海类难度高）

当班员工越多制作越快；零售给当班员工提成。配置见 `Config.Industry` / `Config.Craft` / `Config.Gather`。

## 产业经营

| 功能 | 说明 |
|------|------|
| 批发进货 | `Config.Shops[].supplier` |
| 员工储物柜 | `Config.Shops[].stashPoint` |
| 调价促销 | 后台定价面板 |
| 提成 / 加速 | `Config.Industry` |

已有库可执行：

```sql
ALTER TABLE `sakura_shops` ADD COLUMN `pricing_json` LONGTEXT NULL;
ALTER TABLE `sakura_shops` ADD COLUMN `promo_json` LONGTEXT NULL;
ALTER TABLE `sakura_sales` MODIFY `sale_type` ENUM('retail','gift_pack','restock','craft') NOT NULL DEFAULT 'retail';

-- 月榜字段（1.2.1；新装 install.sql 已含）
ALTER TABLE `sakura_charm` ADD COLUMN `monthly_charm` INT NOT NULL DEFAULT 0;
ALTER TABLE `sakura_charm` ADD COLUMN `monthly_month` CHAR(7) NULL;
ALTER TABLE `sakura_charm` ADD INDEX `idx_monthly_month_charm` (`monthly_month`, `monthly_charm`);
```

## 魅力月榜 + 颁奖台

颁奖台内置在 `podium/`，默认只刷 **鲜花人气月榜 Top 3**。

| 项 | 说明 |
|------|------|
| 数据表 | `sakura_charm.monthly_charm` / `monthly_month`（`YYYY-MM`） |
| 跨月重置 | 服务端按月 **整表重置一次**（缓存当月标记，避免每分钟全表 UPDATE） |
| 刷新间隔 | 默认 **300000 ms（5 分钟）**，见 `PodiumConfig.DataSource` / `FlowersIntegration` |
| 主配置开关 | `Config.Podium.enabled`；`Config.Podium.resource = 'gg_sakura'` |
| 颁奖台坐标 | `podium/shared/config.lua` → `PodiumConfig.Stages` |
| 管理面板 | `/awardstage_admin` + `PodiumConfig.AdminPanel.admins` |

```cfg
ensure wuja_garden_company   # 可选花园地图
ensure gg_sakura
```

### 导出（给其他资源读榜）

| Export | 说明 |
|--------|------|
| `GetPopularityRanking` | 总魅力榜 Top 3 |
| `GetPopularityMonthlyRanking` | **月榜** Top 3（颁奖台默认用这个） |
| `GetPodiumRanking(monthly)` | `monthly=true` 月榜，否则总榜 |
| `GetCharm` / `AddCharm` | 读 / 加魅力 |

## 自定义

| 文件 | 用途 |
|------|------|
| `config.lua` | 花店、职业、绑定、制作、采集、公告等（行尾中文注释） |
| `podium/shared/config.lua` | 颁奖台位置、刷新、雕像、管理权限 |
| `shared/flowers.lua` | 花材定价、视频绑定等 |

## 更新日志

### 1.2.1 — 2026-10-02

**魅力 / 颁奖台**
- 正式启用 **月榜魅力**（`monthly_charm` + `monthly_month`）
- 颁奖台默认对接 **鲜花人气月榜** Top 3（`GetPopularityMonthlyRanking`）
- 月榜跨月重置改为「当月只跑一次」，降低数据库压力
- 颁奖台数据刷新默认改为 **5 分钟**（原更频繁刷新易造成 hitch）

**配置**
- `config.lua` / `podium/shared/config.lua`：注释统一为行尾中文 `Config.xxx = 值 -- 说明`
- 补充 `Config.Podium` 开关与资源名

### 1.2.0 — 2026-08-23

**关系绑定**
- 头顶图标显示：可设为按住左 Alt 显示 / 一直显示 / 靠近才显示
- 送花面板身份选项：带图标；顺序为恋人 → 兄弟 → 闺蜜 → 仅送花
- 已绑定身份时显示进度条：距下一级还差多少（含冲完美专属花进度）

**送花 / 公告**
- 全服视频公告门槛：一次送满 **88** 束（可在配置里改）
- 大额公告：上视频下文案；可自定义文案；去掉数量展示与多余信息行
- 收花方本地特效条：显示「谁 送出 什么花 x 数量」

**花店 / 制作**
- 购买列表、调价列表、送花选花：按售价从低到高
- 制作台配方列表：按成本 / 材料量从易到难
- 制作配方重做：便宜花材料少好做；花海 / 高价花材料多、难度高
- 成品花成本与难度大致同步

### 1.1.7 及更早

- 花店经营、花艺制作、采集、批发、关系绑定、送花特效与全服公告等基础功能
- 完美阶段：高级后再送 520 束「花海泛舟 / 蓝紫花海」
- 颁奖台并入本资源、人气榜对接
