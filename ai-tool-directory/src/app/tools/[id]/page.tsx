import ToolClient from './ToolClient';
import fs from 'fs';
import path from 'path';

function slugifyToolName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[.\s]+/g, '-')      // 点和空格都变成 -
    .replace(/[^a-z0-9-]/g, '');  // 只保留小写字母、数字、-
}

function getToolNameFromSlug(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const names = tools.map((item: any) => item.name) as string[];
  for (const name of names) {
    if (slugifyToolName(name) === slug) {
      return name;
    }
  }
  return null;
}

export default function Page(props: any) {
  const idSlug = props.params.id;
  const toolName = getToolNameFromSlug(idSlug);
  return <ToolClient id={idSlug} toolName={toolName} />;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const names = tools.map((item: any) => item.name) as string[];
  return names.map(name => ({ id: slugifyToolName(name) }));
} 