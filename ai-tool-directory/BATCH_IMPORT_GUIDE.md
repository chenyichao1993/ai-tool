# 批量导入工具使用指南

## 概述

本指南介绍如何批量向网站添加AI工具。我们提供了多种方式来简化批量添加工具的过程。

## 方法一：使用命令行脚本

### 1. 准备数据文件

#### CSV 格式
创建一个CSV文件，包含以下列：

```csv
name,category,websiteUrl,description,tags,screenshot,whatIs,keyFeatures,useCases,whoIsFor,faq,reviews
"ChatGPT","AI Writing & Content Generation","https://chat.openai.com","AI聊天助手","Text Generation|AI Chat","/screenshots/chatgpt.png","详细描述","主要功能1|功能2","使用场景1|场景2","目标用户","问题1|答案1","评价1|评价2"
```

#### JSON 格式
创建一个JSON文件，格式如下：

```json
[
  {
    "name": "ChatGPT",
    "category": "AI Writing & Content Generation",
    "websiteUrl": "https://chat.openai.com",
    "description": "AI聊天助手",
    "tags": ["Text Generation", "AI Chat"],
    "screenshot": "/screenshots/chatgpt.png",
    "whatIs": "详细描述",
    "keyFeatures": ["主要功能1", "功能2"],
    "useCases": ["使用场景1", "场景2"],
    "whoIsFor": "目标用户",
    "faq": [
      {"question": "问题1", "answer": "答案1"}
    ],
    "reviews": ["评价1", "评价2"]
  }
]
```

### 2. 运行导入脚本

```bash
# 导入CSV文件
node batch-import.js tools.csv --format csv

# 导入JSON文件
node batch-import.js tools.json --format json
```

## 方法二：使用Web界面

### 1. 访问管理页面
访问 `/admin/batch-import` 页面

### 2. 下载模板
点击"下载 CSV 模板"按钮获取标准模板

### 3. 填写数据
按照模板格式填写工具信息

### 4. 上传文件
选择填写好的文件并上传

## 数据字段说明

### 必需字段
- `name`: 工具名称
- `category`: 工具分类
- `websiteUrl`: 官方网站链接
- `description`: 简短描述

### 可选字段
- `tags`: 标签数组（用 | 分隔）
- `screenshot`: 截图路径
- `whatIs`: 详细说明
- `keyFeatures`: 主要功能（用 | 分隔）
- `useCases`: 使用场景（用 | 分隔）
- `whoIsFor`: 目标用户
- `faq`: 常见问题（格式：问题|答案,问题|答案）
- `reviews`: 用户评价（用 | 分隔）

## 数据验证规则

1. **必需字段检查**: 所有必需字段都不能为空
2. **重复检查**: 相同名称的工具会被跳过
3. **格式验证**: 确保URL格式正确
4. **数据完整性**: 检查数组字段的格式

## 常见问题

### Q: 如何处理特殊字符？
A: 在CSV中，用双引号包围包含逗号的字段

### Q: 如何添加截图？
A: 将截图文件放在 `public/screenshots/` 目录下，然后在screenshot字段中引用路径

### Q: 导入失败怎么办？
A: 检查数据格式是否正确，确保所有必需字段都已填写

### Q: 如何更新现有工具？
A: 目前不支持更新，重复的工具名称会被跳过

## 最佳实践

1. **数据准备**: 使用Excel或Google Sheets准备数据，然后导出为CSV
2. **批量处理**: 建议一次导入不超过100个工具
3. **备份数据**: 导入前备份现有的 `AI tool.json` 文件
4. **测试导入**: 先用少量数据测试导入功能
5. **数据质量**: 确保所有URL都是有效的，描述信息准确完整

## 错误处理

脚本会自动处理以下情况：
- 重复的工具名称
- 缺少必需字段的数据
- 格式错误的文件
- 无效的URL格式

## 技术支持

如果遇到问题，请检查：
1. 文件格式是否正确
2. 必需字段是否完整
3. 数据格式是否符合要求
4. 文件编码是否为UTF-8 