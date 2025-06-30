'use client';
import { useState } from "react";
import ContactModal from "../components/ContactModal";

export default function TeamClient() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Our Team</h1>
      <p className="mb-4">Toolaize is built by a passionate team of AI enthusiasts, developers, and designers who believe in the power of artificial intelligence to transform the way we work and live.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Core Team</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Alex Chen</strong> – Founder & Product Lead</li>
        <li><strong>Maria Garcia</strong> – Lead Developer</li>
        <li><strong>John Smith</strong> – UX/UI Designer</li>
        <li><strong>Priya Patel</strong> – Community Manager</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Our Values</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Transparency and trust</li>
        <li>User-first design</li>
        <li>Continuous learning and improvement</li>
        <li>Passion for AI innovation</li>
      </ul>
      <p>Want to join us or collaborate? <span className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>Contact us</span>!</p>
      <ContactModal open={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
} 