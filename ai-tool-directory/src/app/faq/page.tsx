export const metadata = {
  title: 'FAQ - ToolAIze',
  description: 'Frequently asked questions about ToolAIze and using AI tools.'
};

import FAQClient from "./FAQClient";
import Breadcrumbs from "../Breadcrumbs";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <FAQClient />
      </div>
    </main>
  );
} 