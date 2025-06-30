import Breadcrumbs from "../Breadcrumbs";
import UpdateForm from "./UpdateForm";

export const metadata = {
  title: 'Update Tool - ToolAIze',
  description: 'Request an update to an existing AI tool listing on ToolAIze.'
};

export default function UpdateToolPage() {
  return (
    <main className="bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 sm:pt-8 pb-6 sm:pb-8">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Update an Existing Tool</h1>
        <p className="mb-4">If you notice outdated or incorrect information about an AI tool listed on ToolAIze, please use the form below to request an update. Your feedback helps us keep our directory accurate and useful.</p>
        <UpdateForm />
        <p className="text-sm text-gray-500 mt-4">All update requests are reviewed before changes are made. We may contact you for clarification.</p>
      </div>
    </main>
  );
} 