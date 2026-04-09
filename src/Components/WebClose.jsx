import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');

  .maint-root {
    min-height: 100vh;
    background-color: #0a0a0b;
    background-image: radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0));
    font-family: 'Josefin Sans', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.25rem;
    position: relative;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .maint-root *, .maint-root *::before, .maint-root *::after {
    box-sizing: border-box;
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(120,119,198,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(120,119,198,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.25);
    border-radius: 100px;
    padding: 5px 14px 5px 10px;
    font-size: 12px;
    font-weight: 500;
    color: #22c55e;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .logo {
    margin-bottom: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    width: 62px;
    height: 62px;
    background: rgba(120,119,198,0.15);
    border: 1px solid rgba(120,119,198,0.3);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .logo-name {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #f0f0f5;
    text-transform: uppercase;
  }

  .logo-name span {
    color: #9998d8;
  }

  .card {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .card h1 {
    font-size: 26px;
    font-weight: 700;
    color: #f0f0f5;
    margin: 0 0 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .card p.subtitle {
    font-size: 14px;
    font-weight: 300;
    color: #8888aa;
    line-height: 1.8;
    max-width: 440px;
    margin: 0 auto 2rem;
    letter-spacing: 0.03em;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 2rem;
    width: 100%;
  }

  .feature {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px 10px;
    text-align: center;
    transition: border-color 0.2s;
  }

  .feature:hover {
    border-color: rgba(120,119,198,0.4);
  }

  .feature-icon {
    width: 32px;
    height: 32px;
    margin: 0 auto 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-title {
    font-size: 12px;
    font-weight: 600;
    color: #f0f0f5;
    margin-bottom: 2px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .feature-sub {
    font-size: 11px;
    color: #55556a;
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .progress-wrap {
    margin-bottom: 2rem;
  }

  .progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #55556a;
    margin-bottom: 8px;
  }

  .progress-track {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #7877c6, #9998d8);
    border-radius: 100px;
    animation: shimmer 2.5s ease-in-out infinite;
    transition: width 1s ease;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin: 0 0 2rem;
  }

  .contact-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #55556a;
    margin-bottom: 1rem;
  }

  .contact-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 11px 22px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;
    font-family: 'Josefin Sans', Arial, sans-serif;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: none;
  }

  .btn-instagram {
    background: linear-gradient(135deg, rgba(225,48,108,0.15), rgba(253,121,8,0.12));
    border: 1px solid rgba(225,48,108,0.3);
    color: #f77ab1;
  }

  .btn-instagram:hover {
    background: linear-gradient(135deg, rgba(225,48,108,0.25), rgba(253,121,8,0.2));
    border-color: rgba(225,48,108,0.5);
    transform: translateY(-2px);
  }

  .btn-whatsapp {
    background: rgba(37,211,102,0.1);
    border: 1px solid rgba(37,211,102,0.25);
    color: #4ade80;
  }

  .btn-whatsapp:hover {
    background: rgba(37,211,102,0.18);
    border-color: rgba(37,211,102,0.45);
    transform: translateY(-2px);
  }

  .footer {
    margin-top: 2rem;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.08em;
    color: #55556a;
    text-align: center;
    text-transform: uppercase;
  }

  @media (max-width: 480px) {
    .card { padding: 2rem 1.25rem; }
    .card h1 { font-size: 20px; }
    .features { grid-template-columns: 1fr; }
    .contact-buttons { flex-direction: column; align-items: stretch; }
    .btn { justify-content: center; }
    .logo-name { font-size: 22px; }
  }
`;

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#f77ab1" strokeWidth="1.75"/>
    <circle cx="12" cy="12" r="4.5" stroke="#f77ab1" strokeWidth="1.75"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#f77ab1"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.2-1.58A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22a9.93 9.93 0 0 1-5.05-1.38l-.36-.22-3.73.95.98-3.64-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.45c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.11.56-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#4ade80"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 7 6 7 13H17C17 6 12 2 12 2Z" stroke="#7877c6" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 13V17C9 18.1 9.9 19 11 19H13C14.1 19 15 18.1 15 17V13" stroke="#7877c6" strokeWidth="1.5"/>
    <path d="M7 13C5.5 13 4 14 4 15.5C4 17 5 18 7 18" stroke="#7877c6" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 13C18.5 13 20 14 20 15.5C20 17 19 18 17 18" stroke="#7877c6" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="9" r="1.5" fill="#9998d8"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" stroke="#7877c6" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 3Z" stroke="#7877c6" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="#9998d8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" rx="2.5" fill="#7877c6" opacity="0.9"/>
    <rect x="18" y="4" width="10" height="10" rx="2.5" fill="#9998d8" opacity="0.6"/>
    <rect x="4" y="18" width="10" height="10" rx="2.5" fill="#9998d8" opacity="0.6"/>
    <rect x="18" y="18" width="10" height="10" rx="2.5" fill="#7877c6" opacity="0.9"/>
  </svg>
);

const features = [
  { icon: <RocketIcon />, title: "Faster", sub: "Optimized performance" },
  { icon: <SparkleIcon />, title: "Redesigned", sub: "Fresh new look" },
  { icon: <ShieldIcon />, title: "Secure", sub: "Enhanced security" },
];

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="maint-root">
        <div className="grid-overlay" />

        <div className="container">
          <div className="status-badge">
            <span className="status-dot" />
            We'll be back soon
          </div>

          <div className="logo">
            <div className="logo-icon">
              <LogoIcon />
            </div>
            <div className="logo-name">
              Devrex<span>Digital</span>
            </div>
          </div>

          <div className="card">
            <h1>Under Maintenance</h1>
            <p className="subtitle">
              We're working hard behind the scenes to bring you a better experience.
              Our team is upgrading the site and we'll be live very soon.
            </p>

            <div className="features">
              {features.map((f) => (
                <div className="feature" key={f.title}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-sub">{f.sub}</div>
                </div>
              ))}
            </div>

            <div className="progress-wrap">
              <div className="progress-label">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="divider" />

            <p className="contact-label">Get in touch while we're away</p>

            <div className="contact-buttons">
              <a
                className="btn btn-instagram"
                href="https://www.instagram.com/devrexdigital/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
                @devrexdigital
              </a>
              <a
                className="btn btn-whatsapp"
                href="https://wa.me/923136610125"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                +92 313 6610125
              </a>
            </div>
          </div>

          <div className="footer">
            &copy; {new Date().getFullYear()} DevrexDigital. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
