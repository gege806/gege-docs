---
layout: default
title: "樱花物语 gg_sakura"
---

# 樱花物语 gg_sakura

FiveM RP：**鲜花互动 + 花店经营**。粉嫩 UI，适合社交 / 人气玩法。

版本：`1.2.0`

## 功能一览

| 模块 | 内容 |
|------|------|
| 送花互动 | 靠近玩家送花、可选留言、收花特效、大额全服公告 |
| 魅力值 | 收礼加魅力、每日上限、收礼/送礼统计 |
| 排行榜 | 魅力人气榜；颁奖台人气雕像 |
| 花店零售 | 28 种成品花、库存、公告、售价从低到高 |
| 经营后台 | 库存、金库存取、营业额、销售记录、调价促销 |
| 员工管理 | 雇佣 / 解雇 / 调级（见习→老板） |
| 花艺制作 | 制作台消耗原料补库存；便宜花材料少，贵的/花海材料多 |
| 关系绑定 | 恋人 / 兄弟 / 闺蜜；关心阶段；头顶图标；解绑后 24h 冷却 |

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
ensure es_extended
ensure gg_sakura
```

5. 修改 `config.lua` 中花店坐标等配置（配置文件含完整注释）

## 命令

| 命令 | 说明 |
|------|------|
| `/flowershop` | 打开花店面板 |
| `/mycharm` | 魅力面板（旧社交 UI 开启时） |
| `/flowerrank` | 魅力排行榜（旧社交 UI 开启时） |
| `/sakuracard` | 预览收花特效 |

店门口用 **ox_target** 打开花店；对玩家瞄准选「赠送鲜花」。

## 权限等级

职业名：`florist`

| Grade | 职位 | 权限 |
|------|------|------|
| 0 | 见习花艺师 | 制作、看销售、存款 |
| 1 | 花艺师 | 同上 |
| 2 | 资深花艺 | 同上 |
| 3 | 店长 | + 公告、雇佣、调价促销 |
| 4 | 老板 | + 取款、解雇、调级 |

## 关系绑定

- 送花可选：恋人 / 兄弟 / 闺蜜，或仅送花不绑定
- 关心值按送花束数累计；阶段：初级 → 中级(100) → 高级(1000) → 完美(高级后再送 520 束花海泛舟/蓝紫花海)
- 头顶图标：`Config.Bond.iconDisplay` = `alt`（按住左 Alt）/ `always`（一直显示）/ `proximity`（靠近才显示）
- 解除绑定后，同一对 + 同一身份 **24 小时**内不可再绑（`Config.Bond.unbindCooldown = 86400`）

## 全服公告

一次送满 `Config.GiftAnnounce.minAmount`（默认 **88**）束：全服视频 + 文案；可自定义文案。

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
```

## 地图 + 颁奖台

- 花园地图：独立资源 `wuja_garden_company`
- 颁奖台：已并入本资源 `podium/`

```cfg
ensure wuja_garden_company
ensure gg_sakura
```

不要再单独 `ensure rcnk_podium`。

## 自定义

主要改 `config.lua`（含完整字段注释）。花材数据在 `shared/flowers.lua`。

## 更新日志

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
