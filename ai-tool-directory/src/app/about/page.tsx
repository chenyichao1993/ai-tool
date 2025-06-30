export const metadata = {
  title: 'About Us - ToolAIze',
  description: 'Learn more about ToolAIze, our mission, and our vision for the future of AI tools navigation.'
};

import AboutClient from "./AboutClient";
import Breadcrumbs from "../Breadcrumbs";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <AboutClient />
      </div>
    </main>
  );
} 