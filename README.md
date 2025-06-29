# AI工具导航网站（AI Tool Directory Website）

本项目旨在打造一个类似 toolify.ai 的AI工具导航网站，收录和展示优质AI工具，支持多语言、响应式设计、SEO优化，适合全球用户访问和使用。

---

## 项目背景

- 目标：帮助用户发现和筛选最好的AI网站和AI工具，提升AI工具的可见性和使用效率。
- 参考站点：[toolify.ai](https://www.toolify.ai)
- 数据来源：已整理的50个AI工具，分类存储于 `AI tool.json` 文件中。

---

## 核心功能

1. **搜索功能**
   - 顶部有搜索框，支持关键词实时搜索和高亮。
2. **分类筛选**
   - 分类筛选按钮，支持多分类选择和统计。
3. **工具卡片展示**
   - 每个工具以卡片形式美观排列，包含logo、名称、简介。
   - 响应式布局，适配手机和电脑。
   - 卡片悬停效果。
4. **工具详情页**
   - 点击卡片在新页面（新标签页）打开工具详细介绍，原页面不跳转。
   - 详情页内容和样式参考toolify.ai。
5. **首页导语**
   - 首页顶部有明显导语："Discover the best AI websites and AI tools"，并突出显示。
6. **多语言支持**
   - 网站主语言为英文，支持多种主流语言切换（国际化）。
7. **登录与游客模式**
   - 支持用户登录（第三方或邮箱注册），也支持游客直接浏览。

---

## 扩展功能建议

- 工具评分和评论系统
- 用户收藏和分享功能
- 工具使用教程和文档
- 工具对比与推荐
- 工具更新日志与使用统计
- 个性化推荐与搜索历史
- 用户反馈与分类管理
- 深色模式支持
- 工具使用统计与更新提醒

---

## 技术选型与架构

- **前端框架**：Next.js（支持SEO、国际化、路由、SSR）
- **UI 框架**：Tailwind CSS（现代简洁、响应式）
- **国际化**：react-i18next（多语言切换）
- **认证系统**：Firebase Auth 或 Supabase Auth（支持第三方登录和邮箱注册）
- **数据存储**：JSON文件（`AI tool.json`，后续可升级为数据库）
- **路由管理**：Next.js自带
- **状态管理**：可选（如Redux），视功能复杂度而定

---

## 数据准备与格式说明

### 数据文件
- 文件名：`AI tool.json`
- 存放位置：项目根目录
- 数据内容：包含所有AI工具的详细信息

### 推荐JSON结构示例

[
  {
    "name": "ChatGPT",
    "description": "AI-powered chatbot for conversations.",
    "category": "Chatbot",
    "logoUrl": "https://xxx/logo.png",
    "websiteUrl": "https://chatgpt.com"
  },
  {
    "name": "Midjourney",
    "description": "AI art generation platform.",
    "category": "Art",
    "logoUrl": "https://xxx/logo.png",
    "websiteUrl": "https://midjourney.com"
  }
  // ... 其他工具
]

#### 字段说明
- `name`：工具英文名称
- `description`：简要英文介绍
- `category`：所属分类（英文）
- `logoUrl`：Logo图片链接
- `websiteUrl`：工具官网链接

### 数据准备操作建议

#### 方案一：自行导出JSON（已采用）
1. 整理Excel内容，导出为CSV。
2. 使用 https://csvjson.com/csv2json 工具将CSV转为JSON。
3. 按推荐结构保存为 `AI tool.json`，放到项目根目录。

#### 方案二：由开发者协助整理
- 可直接上传Excel文件或复制表格内容，由开发者协助转换为JSON。

---

## SEO与国际化优化建议
- 每个工具详情页添加独立meta信息
- 自动生成sitemap.xml和robots.txt
- 页面加载速度优化
- 添加结构化数据（schema.org）
- 支持多语言切换，内容自动适配

---

## UI/UX设计参考
- 整体风格参考toolify.ai首页，简洁、现代、响应式
- 首页顶部有明显导语和搜索框
- 分类筛选和卡片布局清晰美观
- 详情页内容丰富，支持新标签页打开

---

## 开发流程与进度
- [x] 需求确认与文档完善
- [x] 数据准备（AI tool.json）
- [ ] 技术选型与项目初始化
- [ ] 核心功能开发
- [ ] 扩展功能开发
- [ ] 测试与优化
- [ ] 部署上线

---

## 开发日志
- 2024-03-xx: 项目初始化，需求分析，数据准备，文档完善

---

如有任何疑问或补充需求，请随时沟通！本README会持续同步项目进展和决策。 