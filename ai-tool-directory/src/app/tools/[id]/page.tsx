import ToolClient from './ToolClient';
import fs from 'fs';
import path from 'path';

export default function Page(props: any) {
  return <ToolClient id={props.params.id} />;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  return tools.map((tool: any) => ({ id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown' }));
} 