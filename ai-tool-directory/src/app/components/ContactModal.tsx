"use client";
import React, { useState } from "react";
import styles from "../Footer.module.css";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  email?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, email = "cocolovetin@foxmail.com" }) => {
  const [copied, setCopied] = useState(false);
  if (!open) return null;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {}
  };
  return (
    <div className={styles.contactModalOverlay} onClick={onClose}>
      <div className={styles.contactModalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.contactModalTitle}>Contact Email</div>
        <div className={styles.contactModalEmail}>{email}</div>
        <div className={styles.contactModalBtnRow}>
          <button className={styles.contactModalButton} onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <button className={styles.contactModalButtonSecondary} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 