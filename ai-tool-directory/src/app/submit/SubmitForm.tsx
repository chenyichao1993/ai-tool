'use client';
import React, { useState } from "react";

export default function SubmitForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState({ name: false, url: false, category: false, desc: false });
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit() {
    const newError = {
      name: !name.trim(),
      url: !url.trim(),
      category: !category.trim(),
      desc: !desc.trim()
    };
    setError(newError);
    if (Object.values(newError).some(Boolean)) {
      setShowModal(true);
      return;
    }
    setShowModal(false);
    setShowSuccess(true);
    setName(""); setUrl(""); setCategory(""); setDesc("");
  }

  return (
    <>
      {/* Error Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem 1.5rem 1.5rem 1.5rem', maxWidth: 340, width: '90vw', textAlign: 'center' }}>
            <div style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 12, color: '#4f46e5'}}>Something went wrong</div>
            <div style={{fontSize: '1rem', color: '#333', marginBottom: 20}}>
              Oops! It looks like you missed some required fields.<br />
              Please fill them in so we can process your submission.<br />
              Thank you!
            </div>
            <button style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 22, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem 1.5rem 1.5rem 1.5rem', maxWidth: 340, width: '90vw', textAlign: 'center' }}>
            <div style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 12, color: '#4f46e5'}}>Submission Successful</div>
            <div style={{fontSize: '1rem', color: '#333', marginBottom: 20}}>
              Thank you for your submission!<br />
              We have received your information and will review it as soon as possible.<br />
              Have a wonderful day!
            </div>
            <button style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 22, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input[type="url"], textarea, button.submit-btn {
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 22px !important;
              box-sizing: border-box !important;
              display: block !important;
            }
            button.submit-btn {
              background: #4f46e5 !important;
              color: #fff !important;
              font-weight: 600 !important;
              font-size: 1.1rem !important;
              padding: 0.75rem 0 !important;
              margin-top: 8px !important;
              border: none !important;
              transition: background 0.2s;
            }
            button.submit-btn:hover {
              background: #3730a3 !important;
            }
          `
        }}
      />
      <div className="flex flex-col gap-4" style={{maxWidth: 600}}>
        <label className="font-semibold block">Tool Name
          <input
            type="text"
            className="block border border-gray-300 px-3 py-2 mt-1"
            style={{
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              borderRadius: '22px',
              boxSizing: 'border-box',
              display: 'block',
              borderColor: error.name ? 'red' : '#d1d5db'
            }}
            placeholder="e.g. ChatGPT"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label className="font-semibold block">Website URL
          <input
            type="url"
            className="block border border-gray-300 px-3 py-2 mt-1"
            style={{
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              borderRadius: '22px',
              boxSizing: 'border-box',
              display: 'block',
              borderColor: error.url ? 'red' : '#d1d5db'
            }}
            placeholder="https://..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </label>
        <label className="font-semibold block">Category
          <input
            type="text"
            className="block border border-gray-300 px-3 py-2 mt-1"
            style={{
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              borderRadius: '22px',
              boxSizing: 'border-box',
              display: 'block',
              borderColor: error.category ? 'red' : '#d1d5db'
            }}
            placeholder="e.g. Writing, Image Generation"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </label>
        <label className="font-semibold block">Description
          <textarea
            className="block border border-gray-300 px-3 py-2 mt-1"
            style={{
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              borderRadius: '22px',
              boxSizing: 'border-box',
              display: 'block',
              borderColor: error.desc ? 'red' : '#d1d5db'
            }}
            rows={3}
            placeholder="Briefly describe the tool..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
          />
        </label>
        <button className="submit-btn" onClick={handleSubmit}>Submit Tool</button>
      </div>
    </>
  );
} 