'use client';
import { useState } from "react";
import ContactModal from "../components/ContactModal";

export default function PrivacyClient() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">At Toolaize, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal information you provide (e.g., name, email) when submitting forms</li>
        <li>Usage data collected automatically (e.g., IP address, browser type, pages visited)</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and improve our services</li>
        <li>To communicate with you about your submissions or inquiries</li>
        <li>To analyze website usage and improve user experience</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
      <p className="mb-4">We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You can request access to or deletion of your personal data by contacting us</li>
        <li>You may opt out of non-essential communications at any time</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>If you have questions about this policy, please <span className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>contact us</span>.</p>
      <ContactModal open={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
} 