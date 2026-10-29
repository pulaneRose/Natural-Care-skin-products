import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 300,
      background: 'var(--text-primary)',
      color: 'var(--bg-primary)',
      padding: '0.9rem 1.4rem',
      borderRadius: '999px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.88rem',
      fontWeight: 500,
      animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      maxWidth: '90vw'
    }}>
      {type === 'success' && <CheckCircle2 size={18} color="#A3B18A" />}
      {type === 'info' && <Info size={18} color="#D3C7DC" />}
      {type === 'error' && <AlertCircle size={18} color="#E76F51" />}
      <span>{message}</span>
      <button onClick={onClose} style={{ color: 'var(--bg-primary)', marginLeft: '0.5rem', opacity: 0.8 }}>
        <X size={16} />
      </button>
    </div>
  );
}
