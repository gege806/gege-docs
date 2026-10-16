---
layout: default
title: "格格饰品屋（gege_accessoryshop）使用说明"
---

# 格格饰品屋（gege_accessoryshop）使用说明

版本：1.3.6  
资源名：`gege_accessoryshop`

---

## 依赖

请先确保服务器已启动：

- `es_extended`（ESX）
- `oxmysql`
- `ox_lib`
- `ox_inventory`
- `ox_target`
- `pudding_decor`（饰品挂点与 3D 试穿；需与饰品模型资源一并部署）

---

## 安装步骤

1. 将资源文件夹命名为 **`gege_accessoryshop`**，放入 `resources` 并 `ensure`。
2. 在 `server.cfg` 中保证 **`pudding_decor` 先于本资源启动**。
3. 把 **`install/ox_item.lua`** 中的饰品币物品合并进 ox_inventory 物品表。
4. 编辑 **`config.lua`**：店铺坐标（购买圈、店员 NPC、值班点）、职业名 `Config.Job`、饰品币单价等。
5. `Config.AutoInstallJob = true` 时会自动写入 ESX 职业与职级；`Config.AutoInstallShopTable = true` 时会自动创建店铺库存与兑换记录表。
6. 重启资源后进游戏测试购买圈与店员 NPC。

---

## 配置文件说明

| 配置项 | 说明 |
|--------|------|
| `Config.Job` | 店员职业名（兑币、工作台、上下班） |
| `Config.CoinItem` / `Config.CoinUnitPrice` | 饰品币物品名、银行兑换单价 |
| `Config.CoinPurchaseAmounts` | 工作台一键兑换数量选项 |
| `Config.CoinLogDisplayLimit` | 工作台「兑换记录」显示条数 |
| `Config.VendorMinGrade` / `Config.BossMinGrade` | 可兑币最低职级、可打开「店铺管理」最低职级 |
| `Config.Store` | 购买圈、店员 NPC（ox_target）、值班点坐标与 marker |
| `Config.Categories` | 顾客界面左侧分类 |
| `Config.AutoCatalog` | 是否自动从 ox 扫描饰品；关闭则仅用 `Config.Catalog` |
| `Config.CatalogIconWhitelistOnly` | 为 true 时仅上架清单内饰品 |
| `Config.DefaultStock` / `Config.RestockCostPerUnit` | 默认库存、老板补货单价 |
| `Config.CameraOrbit*` / `Config.PreviewMouseSensitivity` | 试穿镜头与鼠标旋转 |

挂点与偏移数据在 **`pudding_decor`**（含 `saved_offsets.json`）；本插件试穿会读取该资源的挂点。

---

## 顾客怎么玩

1. 到配置好的 **购买圈**（粉圈），按 **E** 打开饰品屋。
2. 左侧按分类或搜索选饰品；点一下 **试穿**，不同分类可同时叠穿（例如背包 + 头饰）。
3. 底部 **已选中** 栏显示当前试穿件数与小图标；**当前购买** 为即将下单的那一件。
4. 右侧游戏画面：**按住左键拖动** 转视角，**滚轮** 缩放；**ESC** 关闭界面。
5. 用 **饰品币** 点 **立即购买**；背包需有空位，且该商品有库存。

列表图标优先使用 ox_inventory 里对应物品的图片。

---

## 店员 / 老板

- **店员 NPC**：ox_target → **店员工作台**。
  - **兑换饰品币**：用银行余额兑换，可转给顾客或自用。
  - **兑换记录**：谁兑换、数量、金额、时间（新记录从安装该功能后起算）。
- **值班点**（若配置了 `Config.Store.duty`）：蓝圈 **E** 上下班。
- **店铺管理**（达到老板/店长职级）：改店名、副标题、地图 Blip 名；上架/下架、改价、补货（扣公账或银行，见配置）。

测试职级示例：`/setjob [id] killstore 4` 后打开 NPC 工作台。

---

## 挂点自己调（pudding_decor）

游戏内可视化挂点工具在 **`pudding_decor`** 资源：

| 命令 | 说明 |
|------|------|
| `/饰品挂点` 或 `/wearadjust` | 打开挂点编辑器 |
| `/accessoryattach` | 从本插件快捷打开同一编辑器 |

在编辑器里选饰品、调 Bone/位移/旋转，**保存** 后写入 `saved_offsets.json`，重启 `pudding_decor` 仍会加载。保存权限见 `pudding_decor` 的 `Config.StudioSaveAce`。

---

## 常见问题

1. **试穿位置不对**  
   确认 `pudding_decor` 已启动且含该饰品的挂点；用挂点编辑器保存后 `restart pudding_decor`。

2. **店里没有某饰品**  
   检查 ox 是否有该物品、是否在白名单/扫描规则内；老板是否在「店铺管理」里下架或库存为 0。

3. **兑币无记录**  
   仅记录功能上线之后的兑换；点「兑换记录」页 **刷新**。

4. **发给别人的服要和这边效果一致**  
   需一并拷贝 `gege_accessoryshop`、`pudding_decor`（含 `saved_offsets.json`）及对应饰品模型资源。

5. **新增 ox 物品后目录不更新**  
   `ensure gege_accessoryshop` 或重启资源，控制台应出现商品加载数量提示。

---

## 更新记录

- **1.3.6** 试穿栏多分类叠穿；兑换饰品币记录（时间、人员）；切换试穿性能优化；顾客界面 ESC 关闭  
- **1.3.5** 挂点编辑器可读全店清单；试穿挂点与 `pudding_decor` 同步  
- **1.3.2** 试穿挂点优先 export 链，Attach 与 pudding 一致  
- **1.2.x** 自动扫描 ox 饰品目录；内置店铺管理（MySQL 库存）

## 技术支持

售后群：492683667  
反馈时请附：报错全文、Framework / 背包版本、复现步骤。
