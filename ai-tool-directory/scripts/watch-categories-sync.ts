import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const emojiPool = [
  '📝', '🎨', '🎬', '🎵', '💼', '💻', '🔍', '📦', '🧠', '🌐', '🤖', '📊', '🗂️', '🛠️', '📚', '🧩', '🧰', '🗃️', '📈', '🧾', '🗒️', '📅', '🧮', '🧑‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍💼', '🧑‍🚀', '🧑‍⚖️', '🧑‍🍳', '🧑‍🔧', '🧑‍🌾', '🧑‍🎤', '🧑‍🎓', '🧑‍✈️', '🧑‍🚒', '🧑‍🚗'
];
function genDesc(category: string) {
  return `AI tools for ${category.toLowerCase()}.`;
}
const root = process.cwd();
const aiToolPath = path.join(root, 'public', 'AI tool.json');
const categoriesPath = path.join(root, 'public', 'categories.json');
const metaPath = path.join(root, 'public', 'categories-meta.json');

function syncCategoriesMeta() {
  if (!fs.existsSync(aiToolPath)) return;
  const tools = JSON.parse(fs.readFileSync(aiToolPath, 'utf-8'));
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const tool of tools) {
    if (tool.category && !seen.has(tool.category)) {
      seen.add(tool.category);
      categories.push(tool.category);
    }
  }
  const meta: Record<string, { icon: string; desc: string }> = {};
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
  console.log(`[${new Date().toLocaleTimeString()}] 分类同步完成！`);
}

console.log('正在监听AI tool.json分类变动...');
syncCategoriesMeta(); // 启动时先同步一次
chokidar.watch(aiToolPath).on('change', () => {
  syncCategoriesMeta();
}); 