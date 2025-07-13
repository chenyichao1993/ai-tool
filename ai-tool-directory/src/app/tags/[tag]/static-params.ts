import fs from 'fs';
import path from 'path';

function slugifyTag(tag: string) {
  // 首先处理包含括号的tag，只保留括号前的主要部分
  let processedTag = tag;
  if (tag.includes('(')) {
    processedTag = tag.split('(')[0].trim();
  }
  
  return processedTag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, ' ')  // 将特殊字符替换为空格
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllTagParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const tagSet = new Set<string>();
  const debugPairs: { raw: string, slug: string }[] = [];
  tools.forEach((tool: any) => {
    if (Array.isArray(tool.tags)) {
      tool.tags.forEach((tag: any) => {
        if (typeof tag === 'string' && tag.trim()) {
          const slug = slugifyTag(tag);
          tagSet.add(slug);
          debugPairs.push({ raw: tag, slug });
        }
      });
    }
  });
  const allTags = Array.from(tagSet).filter(Boolean);
  console.log('所有tag原始值和slug：', debugPairs);
  console.log('所有tag参数slug：', allTags);
  return allTags.map(tag => ({ tag }));
} 