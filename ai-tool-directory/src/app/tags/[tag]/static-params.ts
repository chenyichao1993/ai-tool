import fs from 'fs';
import path from 'path';

function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function getAllTagParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const tagSet = new Set<string>();
  tools.forEach((tool: any) => {
    if (Array.isArray(tool.tags)) {
      tool.tags.forEach((tag: string) => tagSet.add(slugifyTag(tag)));
    }
  });
  return Array.from(tagSet).map(tag => ({ tag }));
} 