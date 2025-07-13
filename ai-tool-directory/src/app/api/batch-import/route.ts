import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 工具数据验证函数
function validateToolData(tool: any) {
  const requiredFields = ['name', 'category', 'websiteUrl', 'description'];
  const missingFields = requiredFields.filter(field => !tool[field]);
  if (missingFields.length > 0) {
    return { valid: false, error: `缺少必需字段: ${missingFields.join(', ')}` };
  }
  return { valid: true };
}

// 从CSV文件解析数据
function parseCSV(csvContent: string) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const tools = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const tool: any = {};
    headers.forEach((header, index) => {
      if (values[index]) {
        if (header === 'tags') {
          tool[header] = values[index].split('|').map((tag: string) => tag.trim());
        } else if (header === 'faq') {
          const faqPairs = values[index].split(',').map((pair: string) => {
            const [question, answer] = pair.split('|');
            return { question: question.trim(), answer: answer.trim() };
          });
          tool[header] = faqPairs;
        } else if (header === 'reviews') {
          tool[header] = values[index].split('|').map((review: string) => review.trim());
        } else if (header === 'keyFeatures' || header === 'useCases') {
          tool[header] = values[index].split('|').map((item: string) => item.trim());
        } else {
          tool[header] = values[index];
        }
      }
    });
    const validation = validateToolData(tool);
    if (validation.valid) {
      tools.push(tool);
    } else {
      console.error(`工具 "${tool.name || 'Unknown'}" 验证失败: ${validation.error}`);
    }
  }
  return tools;
}

// 合并到现有数据
function mergeTools(newTools: any[]) {
  const existingDataPath = path.join(process.cwd(), 'public', 'AI tool.json');
  const existingData = fs.readFileSync(existingDataPath, 'utf-8');
  const existingTools = JSON.parse(existingData);
  const existingNames = new Set(existingTools.map((tool: any) => tool.name.toLowerCase()));
  const toolsToAdd = [];
  const duplicates = [];
  for (const tool of newTools) {
    if (existingNames.has(tool.name.toLowerCase())) {
      duplicates.push(tool.name);
    } else {
      toolsToAdd.push(tool);
      existingNames.add(tool.name.toLowerCase());
    }
  }
  // 新工具只追加到末尾，不做排序
  const mergedTools = [...existingTools, ...toolsToAdd];
  // 自动同步新分类到categories.json
  try {
    const categoriesPath = path.join(process.cwd(), 'public', 'categories.json');
    let categories = [];
    if (fs.existsSync(categoriesPath)) {
      categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    }
    const categorySet = new Set(categories);
    const allCategories = mergedTools.map((tool: any) => tool.category).filter(Boolean);
    for (const cat of allCategories) {
      if (!categorySet.has(cat)) {
        categories.push(cat);
        categorySet.add(cat);
      }
    }
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  } catch (err) {
    console.error('同步categories.json失败:', err);
  }
  return { mergedTools, duplicates, added: toolsToAdd.length };
}

// 自动同步所有分类到categories.json和categories-meta.json
function syncCategoriesMeta() {
  const aiToolPath = path.join(process.cwd(), 'public', 'AI tool.json');
  const categoriesPath = path.join(process.cwd(), 'public', 'categories.json');
  const metaPath = path.join(process.cwd(), 'public', 'categories-meta.json');
  const emojiPool = [
    '📝', '🎨', '🎬', '🎵', '💼', '💻', '🔍', '📦', '🧠', '🌐', '🤖', '📊', '🗂️', '🛠️', '📚', '🧩', '🧰', '🗃️', '📈', '🧾', '🗒️', '📅', '🧮', '🧑‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍💼', '🧑‍🚀', '🧑‍⚖️', '🧑‍🍳', '🧑‍🔧', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗'
  ];
  function genDesc(category) {
    return `AI tools for ${category.toLowerCase()}.`;
  }
  const tools = JSON.parse(fs.readFileSync(aiToolPath, 'utf-8'));
  const seen = new Set();
  const categories = [];
  for (const tool of tools) {
    if (tool.category && !seen.has(tool.category)) {
      seen.add(tool.category);
      categories.push(tool.category);
    }
  }
  const meta = {};
  let emojiIdx = 0;
  for (const cat of categories) {
    let icon = emojiPool[emojiIdx % emojiPool.length];
    while (Object.values(meta).some(m => m.icon === icon)) {
      emojiIdx++;
      icon = emojiPool[emojiIdx % emojiPool.length];
    }
    meta[cat] = {
      icon,
      desc: genDesc(cat)
    };
    emojiIdx++;
  }
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
}

// 保存数据
function saveTools(tools: any[]) {
  const outputPath = path.join(process.cwd(), 'public', 'AI tool.json');
  fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
}

export async function POST(request: NextRequest) {
  let detailedResults: any[] = [];
  let message = '';
  let mergedTools: any[] = [];
  let successCount = 0;
  let duplicateCount = 0;
  let failedCount = 0;
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;
    if (!file) {
      return NextResponse.json(
        { success: false, message: '没有上传文件' },
        { status: 400 }
      );
    }
    const fileContent = await file.text();
    let newTools: any[] = [];
    if (format === 'csv') {
      newTools = parseCSV(fileContent);
    } else if (format === 'json') {
      try {
        const parsed = JSON.parse(fileContent);
        newTools = Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        throw new Error('JSON 格式错误');
      }
    } else {
      throw new Error('不支持的格式');
    }
    if (newTools.length === 0) {
      throw new Error('没有有效的工具数据');
    }
    // 读取现有工具名
    const existingDataPath = path.join(process.cwd(), 'public', 'AI tool.json');
    const existingData = fs.readFileSync(existingDataPath, 'utf-8');
    const existingTools = JSON.parse(existingData);
    const existingNames = new Set(existingTools.map((tool: any) => tool.name.toLowerCase()));
    // 详细结果统计
    const validTools = [];
    for (const tool of newTools) {
      const validation = validateToolData(tool);
      const name = tool.name || 'Unknown';
      if (!validation.valid) {
        detailedResults.push({ name, status: 'failed', reason: validation.error });
        failedCount++;
        continue;
      }
      if (existingNames.has(name.toLowerCase())) {
        detailedResults.push({ name, status: 'duplicate' });
        duplicateCount++;
        continue;
      }
      validTools.push(tool);
      existingNames.add(name.toLowerCase());
      detailedResults.push({ name, status: 'success' });
      successCount++;
    }
    // 合并并保存
    const mergeResult = mergeTools(validTools);
    mergedTools = mergeResult.mergedTools;
    // 自动同步分类
    syncCategoriesMeta();
    // 统计
    message = `成功导入 ${successCount} 个工具`;
    if (duplicateCount > 0) message += `，跳过 ${duplicateCount} 个重复工具`;
    if (failedCount > 0) message += `，${failedCount} 个失败`;
  } catch (error: any) {
    console.error('批量导入错误:', error);
    return NextResponse.json(
      { success: false, message: error.message || '服务器错误，请重试' },
      { status: 500 }
    );
  }
  return NextResponse.json({
    success: true,
    message,
    details: detailedResults,
    stats: {
      total: mergedTools.length,
      added: successCount,
      duplicates: duplicateCount,
      failed: failedCount
    }
  });
} 