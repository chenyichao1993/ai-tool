import TagClient from './TagClient';
import { getAllTagParams } from './static-params';

export default function Page(props: any) {
  return <TagClient tagSlug={props.params.tag} />;
}

export async function generateStaticParams() {
  return getAllTagParams();
} 