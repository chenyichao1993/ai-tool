'use client';
import { useState } from "react";
import ContactModal from "../components/ContactModal";

export default function TermsClient() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Service Terms</h1>
      <p className="mb-4">By using Toolaize, you agree to the following terms and conditions. Please read them carefully.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Use of the Website</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Toolaize is provided for informational purposes only</li>
        <li>You may not use the site for unlawful or harmful activities</li>
        <li>Content is provided "as is" without warranties of any kind</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Intellectual Property</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All content and trademarks are the property of their respective owners</li>
        <li>You may not copy or redistribute content without permission</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
      <p className="mb-4">Toolaize is not liable for any damages or losses resulting from the use of this website or the information provided.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Changes to Terms</h2>
      <p className="mb-4">We may update these terms from time to time. Continued use of the site constitutes acceptance of the new terms.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>If you have questions about these terms, please <span className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>contact us</span>.</p>
      <ContactModal open={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
} 