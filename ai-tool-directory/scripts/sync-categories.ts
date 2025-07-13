import fs from 'fs';
import path from 'path';

// 预设emoji池，icon不重复
const emojiPool = [
  '📝', '🎨', '🎬', '🎵', '💼', '💻', '🔍', '📦', '🧠', '🌐', '🤖', '📊', '🗂️', '🛠️', '📚', '🧩', '🧰', '🗃️', '📈', '🧾', '🗒️', '📅', '🧮', '🧑‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍💼', '🧑‍🚀', '🧑‍⚖️', '🧑‍🍳', '🧑‍🔧', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗', '🧑‍🔬', '🧑‍🎨', '🧑‍💻', '🧑‍🏫', '🧑‍🔧', '🧑‍🍳', '🧑‍🚀', '🧑‍⚖️', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗'
];

// AI风格desc生成
function genDesc(category: string) {
  return `AI tools for ${category.toLowerCase()}.`;
}

const root = process.cwd();
const aiToolPath = path.join(root, 'public', 'AI tool.json');
const categoriesPath = path.join(root, 'public', 'categories.json');
const metaPath = path.join(root, 'public', 'categories-meta.json');

const tools = JSON.parse(fs.readFileSync(aiToolPath, 'utf-8'));
const seen = new Set<string>();
const categories: string[] = [];

// 按首次出现顺序收集所有唯一分类
for (const tool of tools) {
  if (tool.category && !seen.has(tool.category)) {
    seen.add(tool.category);
    categories.push(tool.category);
  }
}

// 生成icon和desc，icon不重复
const meta: Record<string, { icon: string; desc: string }> = {};
let emojiIdx = 0;
for (const cat of categories) {
  let icon = emojiPool[emojiIdx % emojiPool.length];
  // 保证icon唯一
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

// 写入categories.json
fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
// 写入categories-meta.json
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));

console.log('分类同步完成！'); 