import Breadcrumbs from "../Breadcrumbs";
import SubmitForm from "./SubmitForm";

export const metadata = {
  title: 'Submit Tool - ToolAIze',
  description: 'Submit your AI tool to ToolAIze and help others discover great AI solutions.'
};

export default function SubmitToolPage() {
  return (
    <main className="bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 sm:pt-8 pb-6 sm:pb-8">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Submit a New AI Tool</h1>
        <p className="mb-4">Do you know an AI tool that should be listed on ToolAIze? Fill out the form below to submit your tool for review. We welcome submissions from developers, companies, and users alike.</p>
        <SubmitForm />
        <p className="text-sm text-gray-500 mt-4">All submissions are reviewed before being published. We may contact you for more information.</p>
      </div>
    </main>
  );
}
