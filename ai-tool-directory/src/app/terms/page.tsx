export const metadata = {
  title: 'Service Terms - ToolAIze',
  description: 'Read the terms of service for using ToolAIze.'
};

import TermsClient from "./TermsClient";
import Breadcrumbs from "../Breadcrumbs";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <TermsClient />
      </div>
    </main>
  );
} 