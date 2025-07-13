const fs = require('fs');
const path = require('path');

// 同步分类函数
function syncCategories() {
  try {
    const aiToolsPath = path.join(__dirname, 'public', 'AI tool.json');
    const categoriesPath = path.join(__dirname, 'public', 'categories.json');
    const categoriesMetaPath = path.join(__dirname, 'public', 'categories-meta.json');
    
    // 读取AI tool.json
    const aiToolsData = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
    
    // 提取所有唯一的分类
    const categories = [...new Set(aiToolsData.map(tool => tool.category))];
    
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
    
    // 写入categories-meta.json
    fs.writeFileSync(categoriesMetaPath, JSON.stringify(categoriesMeta, null, 2));
    
    console.log(`🔄 [${new Date().toLocaleTimeString()}] 分类已自动同步 (${categories.length} 个分类)`);
    
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
  }
}

// 监听文件变化
function watchFile() {
  const aiToolsPath = path.join(__dirname, 'public', 'AI tool.json');
  
  console.log('👀 开始监听 AI tool.json 文件变化...');
  console.log('按 Ctrl+C 停止监听');
  
  fs.watch(aiToolsPath, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(`📝 检测到 ${filename} 文件变化`);
      // 延迟一点时间确保文件写入完成
      setTimeout(syncCategories, 100);
    }
  });
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--watch') || args.includes('-w')) {
    // 先同步一次
    syncCategories();
    // 然后开始监听
    watchFile();
  } else {
    // 只同步一次
    syncCategories();
  }
}

if (require.main === module) {
  main();
}

module.exports = { syncCategories }; 