'use client';
import { useState } from "react";
import ContactModal from "../components/ContactModal";

export default function AboutClient() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">Toolaize is dedicated to helping users discover, compare, and leverage the best AI tools for every task. Our mission is to make the rapidly evolving world of AI accessible and useful for everyone, from professionals to hobbyists.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Our Mission</h2>
      <p className="mb-4">We aim to provide a comprehensive, up-to-date, and user-friendly platform for exploring the latest and most effective AI tools across various domains. We believe that by making AI tools easy to find and understand, we empower individuals and organizations to achieve more.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Why Toolaize?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Curated and regularly updated AI tool listings</li>
        <li>Detailed categories and tags for easy navigation</li>
        <li>Community-driven reviews and ratings (coming soon)</li>
        <li>Resources and guides to help you get started with AI</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>If you have any questions, suggestions, or partnership inquiries, please <span className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>contact us</span>.</p>
      <ContactModal open={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
} 