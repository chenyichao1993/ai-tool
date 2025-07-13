const fs = require('fs');
const path = require('path');

// 工具数据验证函数
function validateToolData(tool) {
  const requiredFields = ['name', 'category', 'websiteUrl', 'description'];
  const missingFields = requiredFields.filter(field => !tool[field]);
  
  if (missingFields.length > 0) {
    console.error(`工具 "${tool.name || 'Unknown'}" 缺少必需字段: ${missingFields.join(', ')}`);
    return false;
  }
  
  return true;
}

// 生成slug函数（与现有代码保持一致）
function slugifyToolName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[.\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// 从CSV文件导入
function importFromCSV(csvFilePath) {
  const csv = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const tools = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const tool = {};
    
    headers.forEach((header, index) => {
      if (values[index]) {
        if (header === 'tags') {
          tool[header] = values[index].split('|').map(tag => tag.trim());
        } else if (header === 'faq') {
          // 假设FAQ格式为 "问题|答案,问题|答案"
          const faqPairs = values[index].split(',').map(pair => {
            const [question, answer] = pair.split('|');
            return { question: question.trim(), answer: answer.trim() };
          });
          tool[header] = faqPairs;
        } else if (header === 'reviews') {
          tool[header] = values[index].split('|').map(review => review.trim());
        } else if (header === 'keyFeatures' || header === 'useCases') {
          tool[header] = values[index].split('|').map(item => item.trim());
        } else {
          tool[header] = values[index];
        }
      }
    });
    
    if (validateToolData(tool)) {
      tools.push(tool);
    }
  }
  
  return tools;
}

// 从JSON文件导入
function importFromJSON(jsonFilePath) {
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  const tools = JSON.parse(data);
  
  const validTools = [];
  for (const tool of tools) {
    if (validateToolData(tool)) {
      validTools.push(tool);
    }
  }
  
  return validTools;
}

// 合并到现有数据
function mergeTools(newTools) {
  const existingDataPath = path.join(process.cwd(), 'public', 'AI tool.json');
  const existingData = fs.readFileSync(existingDataPath, 'utf-8');
  const existingTools = JSON.parse(existingData);
  
  const existingNames = new Set(existingTools.map(tool => tool.name.toLowerCase()));
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
  
  if (duplicates.length > 0) {
    console.log(`发现重复工具: ${duplicates.join(', ')}`);
  }
  
  const mergedTools = [...existingTools, ...toolsToAdd];
  
  // 按名称排序
  mergedTools.sort((a, b) => a.name.localeCompare(b.name));
  
  return mergedTools;
}

// 保存数据
function saveTools(tools) {
  const outputPath = path.join(process.cwd(), 'public', 'AI tool.json');
  fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
  console.log(`成功保存 ${tools.length} 个工具到 ${outputPath}`);
}

// 同步分类到categories.json和categories-meta.json
function syncCategories(tools) {
  const categoriesPath = path.join(process.cwd(), 'public', 'categories.json');
  const categoriesMetaPath = path.join(process.cwd(), 'public', 'categories-meta.json');
  
  // 提取所有唯一的分类
  const categories = [...new Set(tools.map(tool => tool.category))];
  
  // 为每个分类创建默认的meta信息
  const categoriesMeta = {};
  const iconMap = {
    'AI Writing & Content Generation': '📝',
    'Image Generation & Design': '🎨',
    'Video Production & Editing': '🎬',
    'Audio Processing & Generation': '🎵',
    'Office Productivity Tools': '💼',
    'Coding & Development': '💻',
    'Search & Prompt Engineering': '🔍',
    'Productivity & Organization': '📦',
    'Chatbots & Virtual Companions': '🤖'
  };
  
  const descMap = {
    'AI Writing & Content Generation': 'AI writing, content generation, summarization, and more.',
    'Image Generation & Design': 'AI drawing, image generation, design assistant, and creative tools.',
    'Video Production & Editing': 'AI video creation, editing, and production tools.',
    'Audio Processing & Generation': 'AI audio processing, speech synthesis, and music generation.',
    'Office Productivity Tools': 'Office automation, productivity, document processing, and more.',
    'Coding & Development': 'AI coding assistants, code generation, and developer tools.',
    'Search & Prompt Engineering': 'AI search, prompt engineering, and information retrieval tools.',
    'Productivity & Organization': 'AI productivity, organization, and workflow management tools.',
    'Chatbots & Virtual Companions': 'AI chatbots, virtual assistants, and conversational AI tools.'
  };
  
  categories.forEach(category => {
    categoriesMeta[category] = {
      icon: iconMap[category] || '🔧',
      desc: descMap[category] || `AI tools for ${category.toLowerCase()}.`
    };
  });
  
  // 写入categories.json
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  console.log('✅ categories.json 已自动同步');
  
  // 写入categories-meta.json
  fs.writeFileSync(categoriesMetaPath, JSON.stringify(categoriesMeta, null, 2));
  console.log('✅ categories-meta.json 已自动同步');
  
  console.log(`📊 发现 ${categories.length} 个分类，已自动同步`);
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('使用方法:');
    console.log('  node batch-import.js <文件路径> [--format csv|json]');
    console.log('');
    console.log('示例:');
    console.log('  node batch-import.js tools.csv --format csv');
    console.log('  node batch-import.js tools.json --format json');
    return;
  }
  
  const filePath = args[0];
  const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'json';
  
  if (!fs.existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`);
    return;
  }
  
  let newTools;
  
  try {
    if (format === 'csv') {
      newTools = importFromCSV(filePath);
    } else if (format === 'json') {
      newTools = importFromJSON(filePath);
    } else {
      console.error('不支持的格式。请使用 --format csv 或 --format json');
      return;
    }
    
    console.log(`成功导入 ${newTools.length} 个工具`);
    
    const mergedTools = mergeTools(newTools);
    saveTools(mergedTools);
    
    // 自动同步分类
    syncCategories(mergedTools);
    
    console.log('批量导入完成！');
    
  } catch (error) {
    console.error('导入过程中发生错误:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  importFromCSV,
  importFromJSON,
  mergeTools,
  validateToolData
}; 