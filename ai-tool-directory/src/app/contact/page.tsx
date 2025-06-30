export const metadata = {
  title: 'Contact Us - ToolAIze',
  description: 'Contact the ToolAIze team for support, feedback, or partnership inquiries.'
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Have a question, suggestion, or partnership inquiry? Fill out the form below or email us at <a href="mailto:contact@toolaize.com" className="text-indigo-600 hover:underline">contact@toolaize.com</a>.</p>
      <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4" style={{maxWidth: 600}}>
        <label className="font-semibold">Your Name
          <input type="text" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="Your name" required />
        </label>
        <label className="font-semibold">Your Email
          <input type="email" className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" placeholder="you@email.com" required />
        </label>
        <label className="font-semibold">Message
          <textarea className="block w-full border border-gray-300 rounded px-3 py-2 mt-1" rows={4} placeholder="How can we help you?" required />
        </label>
        <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700">Send Message</button>
      </form>
      <p className="text-sm text-gray-500 mt-4">We aim to respond to all inquiries within 2 business days.</p>
    </main>
  );
} 