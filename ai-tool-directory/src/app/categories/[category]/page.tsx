import CategoryClient from './CategoryClient';
import fs from 'fs';
import path from 'path';

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getCategoryNameFromSlug(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const categories = Array.from(new Set(tools.map((item: any) => item.category))) as string[];
  for (const category of categories) {
    if (slugifyCategory(category) === slug) {
      return category;
    }
  }
  return null;
}

export default function Page(props: any) {
  const categorySlug = props.params.category;
  const categoryName = getCategoryNameFromSlug(categorySlug);
  return <CategoryClient categorySlug={categorySlug} categoryName={categoryName} />;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const categories = Array.from(new Set(tools.map((item: any) => item.category))) as string[];
  return categories.map(category => ({ category: slugifyCategory(category) }));
} 