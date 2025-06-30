# AI工具导航网站

## 项目简介
本项目是一个AI工具导航网站，类似toolify.ai，帮助用户快速找到合适的AI工具。

## 重要开发原则
- **除非有必要，否则绝不改动之前已经写好的代码。** 这个要求从现在起到项目结束全程适用，避免新增功能导致已实现功能失效。
- 所有新功能都应增量开发，仅在相关文件内实现，不影响现有功能。
- 每次有新讨论或决策，都要实时同步到README，保证文档与开发进度一致。

## 功能列表
- 搜索功能（关键词搜索）
- 分类筛选（按类别、价格、评分等）
- 工具卡片展示（基础信息）
- 工具详情页（详细信息，包括简介、功能、截图、用法等）
- 多语言支持（中英文切换）
- 登录与游客模式（部分功能需登录）
- 评分、评论、收藏、分享等扩展功能

### 需要登录的功能
- 一键收藏/加入清单
- 用户评分/评论
- 价格/功能变动订阅提醒
- 我的清单/工具对比
- 反馈/纠错
- 历史浏览记录

### 无需登录即可使用的功能
- 查看工具详情、简介、官网链接
- 一键复制链接/简介
- AI智能摘要/优缺点分析
- 多语言切换
- 深色模式/无障碍支持
- 相关工具推荐
- 快捷跳转到教程/社区

## 用户系统
- 支持游客模式与登录模式
- 游客模式下，部分功能（如收藏、评论、订阅）需登录
- 登录后可享受完整功能

## UI/UX设计
- 极简、现代、响应式
- 深色模式/无障碍支持
- 弹窗设计：游客点击需登录功能时，弹出友好提示，支持登录/注册
- 登录/注册支持邮箱、手机号、第三方（如Google、GitHub）
- 视觉风格现代、简洁、不打扰用户

## 工具详情页顶部设计（最新讨论结论）
1. **全部内容用地道英文展示。**
2. **顶部信息区布局：**
   - 左侧：工具logo、名称、英文一句话简介、显眼"Open site"或"Visit website"按钮（带外链icon，新标签页打开）、星级评分、评论数、收藏数（心形icon）、评论数可点击、可选元数据（如上线时间、月访问量、社交账号/邮箱）。
   - **标签区：**
     - 以自动生成的功能相关英文关键词为主（如"AI Image Generator""AI Photo Editor"）。
     - 属性类标签（如"Freemium""Opensource"）可有，但以功能为主。
     - 圆角、浅色边框、多行展示，后续可支持点击筛选。
     - 有助于用户理解和SEO。
   - **右侧截图/演示图：**
     - 单张图片，自动抓取工具官网首页首屏（后期可人工补充）。
     - 鼠标悬停时，图片中央浮现大号白色"Visit Website"遮罩。
     - 点击图片新标签页跳转官网。
     - 视觉风格简洁现代。
   - **操作按钮：**
     - "Advertise this tool""Update this tool"暂不需要，后续有流量再加。
   - **其他元素：**
     - 评分、收藏、评论、分享等社交功能，全部英文、现代极简风格、交互流畅。

3. **差异化亮点：**
   - AI自动摘要/关键特性区块（可选，后续扩展）
   - 一键复制官网/简介
   - 收藏、评分、评论需登录，未登录弹窗引导
   - 标签支持筛选/跳转同类工具（后续扩展）
   - 截图支持全屏预览（后续扩展）

## 开发计划
1. 按上述方案实现工具详情页顶部
2. 多语言支持
3. 用户系统（登录/游客）
4. 评分、评论、收藏、分享等扩展功能

## 技术栈
- 前端：React、Next.js、Tailwind CSS
- 后端：Node.js、Express
- 数据库：MongoDB
- 部署：Vercel

## 贡献指南
欢迎提交PR和Issue！

## 许可证
MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
