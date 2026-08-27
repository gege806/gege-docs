---
layout: default
title: "ge_loading"
---

# ge_loading

格格高级加载界面 · FiveM Loadscreen  
版本 `v1.1.0` · 零依赖 · 全框架通用

---

## 插件更新日志

### v1.1.0

- 中央动态标题：多种动画可选，描边渐变白
- 导航改为 5 项：音乐、更新日志、按键、社交、团队
- 音乐播放器改为图标下玻璃卡片；封面自动识别；改善自动播放与断播

### v1.0.0

- 首发：Wasabi 风格加载界面
- 本地视频 / 幻灯片 / 在线视频背景
- 更新日志、团队、规则、按键、音乐、社交
- 主题色、粒子、按 Tab 隐藏界面

---

## 功能

- 中央动态标题（描边光流 / 发光 / 扫光 / 脉冲 / 霓虹 / 漂浮）
- 五个导航：音乐、服务器、按键、社交、团队
- 本地视频 / 幻灯片 / Streamable / YouTube / FiveManage 背景
- 音乐播放器（封面自动识别、音量、播放列表、空格播放暂停）
- QQ / KOOK 社区联系（点击复制）
- 更新日志、按键可视化、团队轮播
- 主题色、粒子、按 Tab 隐藏界面

---

## 安装

1. 将文件夹 `ge_loading` 放入 `resources`
2. `server.cfg` 写入（建议靠前启动）:
   ```
   ensure ge_loading
   ```
3. 重启服务器或 `ensure ge_loading`

---

## 配置

所有设置在根目录 `config.js`。

### 常用项

```js
BackgroundType: 'video',
UseLocalVideo: true,
LocalVideoFile: 'gege.mp4',

MainColor: '#6366f1',
ShowParticles: true,

AnimatedTitle: true,
AnimatedTitleText: '服务器名称',
AnimatedTitleSize: 64,
AnimatedTitleDuration: 4,
AnimatedTitleEffect: 'stroke',

DisableAutoPlayMusic: false,
RandomizeMusics: true,
DefaultVolume: 0.5,
```

### 标题动画 `AnimatedTitleEffect`

| 值 | 效果 |
|---|---|
| `stroke` | 描边光流（默认） |
| `glow` | 呼吸发光 |
| `shimmer` | 扫光 |
| `pulse` | 轻微缩放 |
| `neon` | 霓虹闪烁 |
| `float` | 上下漂浮 |
| `none` | 无动画 |

### 隐藏导航

```js
HiddenOptions: [
    // 'music',
    // 'server',
    // 'keybinds',
    // 'social',
    // 'staff',
],
```

### 服务器补丁（界面 `Updates`）

点导航第二个图标打开。配置在 `config.js`：

```js
ServerIntro: '',

Updates: [
    {
        title: '补丁说明 #1',
        version: 'v1.0.0',
        date: '2026年3月20日',
        changes: [
            { name: '新增载具', description: '说明文字...' },
            { name: '性能优化', description: '说明文字...' },
        ],
    },
],
```

### 社区联系（点击复制）

```js
CommunityContacts: [
    { name: 'QQ群', text: '群号', icon: 'qq' },
    { name: 'KOOK', text: '邀请码', icon: 'kook', copy: 'https://...' },
],
```

### 音乐

```js
Songs: [
    {
        name: '曲名',
        artist: '歌手',
        file: 'song.mp3',
        cover: '',
    },
],
```

封面留空时：同名图片 → MP3 内嵌封面 → 在线搜索。

---

## 素材建议

| 类型 | 格式 | 建议 |
|------|------|------|
| 背景视频 | `.webm` `.mp4` | 1080p，建议较小体积 |
| 音乐 | `.mp3` | 128–192kbps |
| 封面/头像 | `.jpg` `.png` 或 URL | 封面建议正方形 |

---

## 注意

- `server.cfg` 中本资源尽量靠前 `ensure`
- 改完配置后需 `ensure ge_loading`
