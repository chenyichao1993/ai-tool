export const metadata = {
  title: 'Privacy Policy - ToolAIze',
  description: 'Read the privacy policy for ToolAIze and learn how we protect your data.'
};

import PrivacyClient from "./PrivacyClient";
import Breadcrumbs from "../Breadcrumbs";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <PrivacyClient />
      </div>
    </main>
  );
} 