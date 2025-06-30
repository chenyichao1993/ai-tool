export const metadata = {
  title: 'Team - ToolAIze',
  description: 'Meet the team behind ToolAIze, passionate about making AI tools accessible to everyone.'
};

import TeamClient from "./TeamClient";
import Breadcrumbs from "../Breadcrumbs";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <TeamClient />
      </div>
    </main>
  );
} 