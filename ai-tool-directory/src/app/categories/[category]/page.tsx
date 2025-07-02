import CategoryClient from './CategoryClient';

export default function Page(props: any) {
  return <CategoryClient categorySlug={props.params.category} />;
}

export async function generateStaticParams() {
  return [
    { category: 'ai-writing-%26-content-generation' },
    { category: 'image-generation-%26-design' },
  ];
} 