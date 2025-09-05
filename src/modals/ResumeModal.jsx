// src/modals/ResumeModal.jsx
import { useState } from 'react';

const ResumeModal = () => {
  const [launched, setLaunched] = useState(false);

  const handleDownload = () => {
    setLaunched(true);
    setTimeout(() => {
      // Simulate download
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Shubham_Lohar_Resume.pdf';
      link.click();
      setLaunched(false);
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-cyan-300 !mb-1">📄 Resume Satellite</h3>
      <p className="text-gray-400 text-sm !mb-5">Initiate transmission to Earth.</p>

      <div className="bg-gray-800 !p-5 rounded border border-gray-600 text-center">
        <div className="text-6xl !mb-3">📄</div>
        <h4 className="font-bold">Shubham Lohar – Full-Stack Developer</h4>
        <p className="text-sm text-gray-400 !mb-4">PDF • 3.92 KB • Encrypted</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDownload}
            disabled={launched}
            className="!px-6 !py-2 cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-70 rounded font-semibold transition flex items-center !gap-2"
          >
            {launched ? (
              <>
                🚀 Launching... <span className="loading-dots"> </span>
              </>
            ) : (
              '📤 Beam Resume to Earth'
            )}
          </button>

          <a
            href="mailto:techshubhu@gamil.com?subject=Hiring%20Request"
            className="!px-6 !py-2 border border-gray-600 hover:border-cyan-500 rounded transition flex items-center !gap-2"
          >
            📧 Email Directly
          </a>
        </div>
      </div>

      <p className="text-xs text-gray-500 !mt-4 text-center">
        Transmission secured via TLS-9 encryption. No aliens allowed.
      </p>
    </div>
  );
};

// Add CSS for loading dots
const style = document.createElement('style');
style.textContent = `
  .loading-dots::after {
    content: '.';
    animation: dots 1.5s steps(5, end) infinite;
  }
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;
document.head.appendChild(style);

export default ResumeModal;