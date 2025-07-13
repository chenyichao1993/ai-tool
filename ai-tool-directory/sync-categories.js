const fs = require('fs');
const path = require('path');

// 语义优先icon映射
const semanticIconMap = {
  'AI Writing & Content Generation': '📝',
  'Image Generation & Design': '🎨',
  'Video Production & Editing': '🎬',
  'Audio Processing & Generation': '🎵',
  'Office Productivity Tools': '💼',
  'Coding & Development': '💻',
  'Search & Prompt Engineering': '🔍',
  'Productivity & Organization': '📦',
  'Chatbots & Virtual Companions': '🤖',
};

// emoji池，保证足够多且风格统一
const emojiPool = [
  '📝','🎨','🎬','🎵','💼','💻','🔍','📦','🤖',
  '📊','🗂️','🛠️','📚','🧩','🧰','🗃️','📈','🧾','🗒️','📅','🧮','🧑‍💻','🧑‍🏫','🧑‍🔬','🧑‍🎨','🧑‍💼','🧑‍🚀','🧑‍⚖️','🧑‍🍳','🧑‍🔧','🧑‍🌾','🧑‍🎤','🧑‍🎓','🧑‍✈️','🧑‍🚒','🧑‍🚗','📁','📂','📋','📌','📎','📏','📐','🖊️','🖋️','🖌️','🖍️','📝','📒','📓','📔','📕','📗','📘','📙','📚','📖','🔖','🔗','🧷','🧮','🧾','🗃️','🗄️','🗂️','🗒️','🗓️','🗑️','🔒','🔓','🔏','🔐','🔑','🗝️','🛡️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','🔫','🏹','🛡️','🔧','🔩','⚙️','🗜️','⚖️','🔗','⛓️','🧰','🧲','🧪','🧫','🧬','🔬','🔭','📡','💡','🔦','🏮','🕯️','🧯','🛢️','💸','💵','💴','💶','💷','💰','💳','💹','💱','💲','🧾','💼','📁','📂','🗂️','🗃️','🗄️','🗑️','🔒','🔓','🔏','🔐','🔑','🗝️','🛡️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','🔫','🏹','🛡️','🔧','🔩','⚙️','🗜️','⚖️','🔗','⛓️','🧰','🧲','🧪','🧫','🧬','🔬','🔭','📡','💡','🔦','🏮','🕯️','🧯','🛢️','💸','💵','💴','💶','💷','💰','💳','💹','💱','💲','🧾','💼'
];

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

function getUniqueIcon(usedIcons, category) {
  // 先用语义icon
  if (semanticIconMap[category] && !usedIcons.has(semanticIconMap[category])) {
    return semanticIconMap[category];
  }
  // 再用emoji池
  for (const emoji of emojiPool) {
    if (!usedIcons.has(emoji)) {
      return emoji;
    }
  }
  // 实在不够就用📦
  return '📦';
}

try {
  const aiToolsPath = path.join(__dirname, 'public', 'AI tool.json');
  const categoriesPath = path.join(__dirname, 'public', 'categories.json');
  const categoriesMetaPath = path.join(__dirname, 'public', 'categories-meta.json');

  const aiToolsData = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
  const categories = [...new Set(aiToolsData.map(tool => tool.category))];

  const categoriesMeta = {};
  const usedIcons = new Set();
  for (const category of categories) {
    const icon = getUniqueIcon(usedIcons, category);
    usedIcons.add(icon);
    categoriesMeta[category] = {
      icon,
      desc: descMap[category] || `AI tools for ${category.toLowerCase()}.`
    };
  }

  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  fs.writeFileSync(categoriesMetaPath, JSON.stringify(categoriesMeta, null, 2));
  console.log('✅ categories.json 和 categories-meta.json 已自动同步，icon唯一且语义优先');
  console.log(`共${categories.length}个分类，icon已全部分配`);
} catch (error) {
  console.error('❌ 同步失败:', error.message);
} 