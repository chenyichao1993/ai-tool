import fs from 'fs';
import path from 'path';

export function getAllTagParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const tagSet = new Set();
  tools.forEach((tool: any) => {
    if (Array.isArray(tool.tags)) {
      tool.tags.forEach((tag: string) => tagSet.add(tag.toLowerCase().replace(/\s+/g, '-')));
    }
  });
  return Array.from(tagSet).map(tag => ({ tag }));
} 