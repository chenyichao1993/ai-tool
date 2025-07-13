# 分类同步指南

本项目提供了多种方式来自动同步AI工具分类，确保 `categories.json` 和 `categories-meta.json` 文件始终与 `AI tool.json` 中的分类保持一致。

## 🚀 自动同步方式

### 1. 批量导入时自动同步

当你使用批量导入功能时，分类会自动同步：

```bash
# 导入CSV文件
npm run import-tools tools.csv --format csv

# 导入JSON文件  
npm run import-tools tools.json --format json
```

导入完成后会自动：
- 更新 `AI tool.json`
- 同步 `categories.json`
- 同步 `categories-meta.json`

### 2. 文件监听自动同步

在开发过程中，可以启动文件监听模式：

```bash
npm run watch-categories
```

这会：
- 监听 `AI tool.json` 文件的变化
- 当文件发生变化时自动同步分类
- 实时显示同步状态

### 3. 手动同步

如果需要手动同步分类：

```bash
npm run sync-categories
```

## 📁 文件说明

- `AI tool.json` - 主要的工具数据文件
- `categories.json` - 分类列表文件
- `categories-meta.json` - 分类元数据文件（包含图标和描述）

## 🔧 脚本说明

### batch-import.js
- 批量导入工具数据
- 自动去重和验证
- **自动同步分类**

### sync-categories.js  
- 手动同步分类
- 提取所有唯一分类
- 生成默认的图标和描述

### watch-categories-sync.js
- 文件监听模式
- 实时自动同步
- 支持 `--watch` 参数

## 📊 分类统计

当前支持的分类：
- AI Writing & Content Generation 📝
- Image Generation & Design 🎨  
- Video Production & Editing 🎬
- Audio Processing & Generation 🎵
- Office Productivity Tools 💼
- Coding & Development 💻
- Search & Prompt Engineering 🔍
- Productivity & Organization 📦
- Chatbots & Virtual Companions 🤖

## ⚠️ 注意事项

1. **新分类处理**：如果导入的工具包含新分类，会自动添加到分类列表中
2. **图标映射**：新分类会使用默认图标 🔧，可以在 `categories-meta.json` 中手动修改
3. **描述生成**：新分类会自动生成描述，格式为 "AI tools for [分类名]."
4. **文件备份**：建议在大量修改前备份相关文件

## 🎯 最佳实践

1. **开发时**：使用 `npm run watch-categories` 实时同步
2. **批量导入**：使用 `npm run import-tools` 自动同步
3. **手动调整**：直接编辑 `categories-meta.json` 自定义图标和描述
4. **定期检查**：使用 `npm run sync-categories` 确保分类一致性 