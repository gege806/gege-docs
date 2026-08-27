---
layout: default
title: "gege-bindings"
---

# gege-bindings

一套用于 FiveM 服务器的进服审核与账号绑定系统，支持 **QQ、KOOK 用户名、设备标识、白码、管理员审核、后台管理**。

当前版本采用“先进服，再审核”的模式：玩家进入服务器后自动弹出审核 UI，未审核前锁定操作，提交申请后生成个人白码，管理员可在后台查看并审核。

---

## 核心功能

- **主服进入后弹审核 UI**：玩家进入服务器后自动弹出审核界面。
- **未审核锁定操作**：审核完成前无法关闭 UI，玩家控制会被锁定。
- **QQ 审核**：QQ 必须为 5-12 位数字，真实性交由管理员人工审核。
- **KOOK 用户名**：支持中文、英文、数字等用户名，仅限制长度。
- **个人白码**：玩家提交申请时自动生成个人白码。
- **白码防重复**：生成白码时会检查数据库，撞码会自动重新生成。
- **设备标识记录**：记录玩家设备 / license 标识，方便限制重复绑定。
- **管理员后台**：支持查看申请、QQ、KOOK、设备标识、白码、状态、日志等。
- **审核通过 / 拒绝**：管理员可通过后台处理玩家申请。
- **黑名单管理**：支持记录黑名单信息。
- **SQL 自动加载**：资源启动时自动加载 `binding_schema.sql` 并创建数据表。
- **自动字段迁移**：旧表缺少 `whitelist_code` 字段时会自动补齐。
- **高级简约 UI**：审核页采用居中单焦点、低饱和、克制阴影与动效的视觉风格。

---

## 运行依赖

请确保以下资源已安装并先于本资源启动：

- `oxmysql`
- `ox_lib`
- `qb-core` 或 `es_extended`

`Config.Framework` 默认是 `auto`，会自动识别 QB / ESX。

---

## 安装方法

1. 将 `fivem-bindings` 放入服务器 `resources` 目录。
2. 确保数据库连接已经配置好 `oxmysql`。
3. 在 `server.cfg` 中加入：

```cfg
ensure oxmysql
ensure ox_lib
ensure fivem-bindings
```

4. 启动或重启服务器。
5. 资源启动后会自动加载 `binding_schema.sql` 创建数据库表。

---

## 数据库说明

资源内置 SQL 文件：

```text
binding_schema.sql
```

启动时会自动加载并执行。主要数据表包括：

- `binding_applications`：玩家审核申请记录
- `binding_accounts`：已完成绑定的账号记录
- `binding_whitelist_codes`：白码记录
- `binding_blacklist`：黑名单记录
- `binding_logs`：系统日志

如果是旧数据库，资源还会自动检查并补充：

- `binding_applications.whitelist_code`

---

## 玩家审核流程

1. 玩家进入服务器。
2. 自动弹出审核 UI。
3. 玩家填写：
   - QQ 号
   - KOOK 用户名
4. 点击提交审核。
5. 系统立即生成个人白码。
6. 页面显示：
   - 当前状态
   - 白码
   - 设备标识
7. 玩家将白码发给管理员。
8. 管理员后台查看申请并审核。
9. 审核通过后，玩家不再被审核 UI 卡住。

---

## UI 状态显示

审核 UI 会显示：

- 当前状态
- 白码
- 设备标识

常见状态：

- `未提交审核`
- `已提交审核，等待管理员处理`
- `审核通过，等待使用白码`

白码显示逻辑：

- 新申请提交时立即生成白码
- 旧申请没有白码时会自动补生成
- 每个白码会写入申请记录和白码表

---

## 管理后台

管理员可通过三种方式打开后台：

### 1. 命令打开

```text
/bindingpanel
```

### 2. 职业权限打开

可在 `config.lua` 配置允许打开后台的职业和最低等级：

```lua
Config.AdminJobs = {
    { name = 'police', minGrade = 4 },
    { name = 'admin', minGrade = 0 },
    { name = 'boss', minGrade = 0 },
}
```

支持：

- QBCore：`PlayerData.job.name` / `PlayerData.job.grade.level`
- ESX：`xPlayer.job.name` / `xPlayer.job.grade`

### 3. OX 背包物品打开

资源支持使用 `ox_inventory` 物品打开后台。默认物品名：

```text
binding_tablet
```

`config.lua` 配置：

```lua
Config.AdminItem = {
    enabled = true,
    name = 'binding_tablet',
    requireAdminPermission = true,
}
```

如果 `requireAdminPermission = true`，玩家使用物品时仍需要满足管理员组或职业权限。  
如果 `requireAdminPermission = false`，只要使用物品即可打开后台。

需要在 `ox_inventory/data/items.lua` 添加物品：
```lua
['binding_tablet'] = {
    label = '审核平板',
    weight = 500,
    stack = false,
    close = true,
    consume = 0,
    client = {
        event = 'binding:useTablet',
    },
    description = '绑定管理系统终端',
}
```
修改后建议重启：

```cfg
restart ox_inventory
restart fivem-bindings
```

后台支持查看：

- 玩家申请
- Identifier
- QQ
- KOOK 用户名
- 白码
- 审核状态
- 备注
- 创建时间
- 账号记录
- 白码记录
- 黑名单
- 日志

后台可执行：

- 通过申请
- 拒绝申请
- 生成白码
- 导出白码
- 查看日志
- 黑名单管理

---

## 配置说明

主要配置文件：

```text
config.lua
```

常用配置：

### 框架

```lua
Config.Framework = 'auto'
```

可选：

- `auto`
- `qb`
- `esx`

### 白码长度

```lua
Config.WhitelistCodeLength = 8
```

建议使用 8-12 位。

### 必填项

```lua
Config.Require = {
    QQ = true,
    KOOK = true,
    WhitelistCode = true,
    HardwareBinding = true,
}
```

### 绑定限制

```lua
Config.Bindings = {
    OneHardwareOneAccount = true,
    OneAccountOneQQ = true,
    OneAccountOneKOOK = true,
    OneHardwareOneQQ = true,
    OneHardwareOneKOOK = true,
}
```

### 管理员权限组

```lua
Config.AdminGroups = {
    'admin',
    'superadmin',
    'god',
}
```

---

## 白码生成规则

白码生成时会：

1. 随机生成白码。
2. 查询数据库是否已存在。
3. 如果存在，重新生成。
4. 如果不存在，写入 `binding_whitelist_codes`。
5. 写入成功后返回给玩家申请。

这样可以避免不同玩家拿到重复白码。

---

## SQL 手动导入

正常情况下不需要手动导入 SQL。  
如果你想手动导入，可以执行资源内的：

```text
binding_schema.sql
```

如果已有旧表并且缺少白码字段，可执行：

```sql
ALTER TABLE binding_applications
ADD COLUMN whitelist_code VARCHAR(32) DEFAULT NULL;
```

如果提示字段已存在，可以忽略。

---

## 资源重启

修改配置或文件后，执行：

```text
restart fivem-bindings
```

或在 `server.cfg` 中确保：

```cfg
ensure fivem-bindings
```

---

## 注意事项

- QQ 的真实有效性无法仅靠脚本自动判断，当前采用管理员人工审核。
- KOOK 使用“用户名”而不是纯数字 ID，支持中文用户名。
- FiveM 没有统一硬件 ID，这里使用玩家 identifier / license 作为设备约束依据。
- 上线前建议先在测试服验证数据库、审核流程和后台权限。
- 如果修改了 SQL 表结构，建议重启资源并查看控制台是否有数据库报错。

---

## 当前版本状态

当前版本已包含：

- 进服后审核 UI
- 未审核锁定
- QQ / KOOK 提交
- 白码生成与防重复
- 后台审核
- 白码显示
- SQL 自动加载
- 数据表自动创建
- 旧字段自动迁移
- 高级简约审核 UI
