'use client';

import { useEffect, useMemo, useState } from 'react';

const bootLines = [
  'Initializing VICTOR ARCHIVE shell...',
  'Loading secure inheritance vault modules...',
  'Verifying cinematic prop safeguards...',
  'Mounting synthetic ledger partitions...',
  'Establishing encrypted node handshake...',
  'Stand by for credential input...'
];

const introWarnings = [
  'VERIFYING NFC TOKEN',
  'DECRYPTING VICTOR ARCHIVE INDEX',
  'BIOMETRIC GATEWAY INITIALIZED',
  'OFFSHORE NODE ROUTE CONFIRMED',
  'CRIMINAL LEDGER MAP SEALED',
  'FACIAL SCAN MODULE STANDBY'
];

const introPrefixes = [
  'SYS',
  'NODE',
  'ARC',
  'BIO',
  'NFC',
  'VX'
];

const hexChunk = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');

const makeLogLine = (idx) => {
  const prefix = introPrefixes[idx % introPrefixes.length];
  const percent = `${Math.min(99, 18 + ((idx * 7) % 82))}%`;
  const warning = idx % 4 === 0 ? ` :: ${introWarnings[idx % introWarnings.length]}` : '';

  return `[${prefix}] HASH ${hexChunk(8)}-${hexChunk(8)} :: NODE-CHECK ${hexChunk(4)} :: INDEX ${percent}${warning}`;
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [introProgress, setIntroProgress] = useState(0);
  const [introLogs, setIntroLogs] = useState(() => Array.from({ length: 8 }, (_, i) => makeLogLine(i)));
  const [typedLine, setTypedLine] = useState('');
  const [warningLine, setWarningLine] = useState(introWarnings[0]);

  const [bootIndex, setBootIndex] = useState(0);
  const [handshake, setHandshake] = useState(0);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (!showIntro) return;

    const introLengthMs = 9800;
    const start = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      setIntroProgress(Math.min(100, Math.round((elapsed / introLengthMs) * 100)));
      if (elapsed >= introLengthMs) {
        setShowIntro(false);
      }
    }, 90);

    return () => clearInterval(progressTimer);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const logTimer = setInterval(() => {
      setIntroLogs((prev) => {
        const nextIndex = prev.length + Math.floor(Math.random() * 3);
        return [...prev.slice(-23), makeLogLine(nextIndex)];
      });
    }, 95);

    return () => clearInterval(logTimer);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const typeTimer = setInterval(() => {
      const target = `ARCHIVE PIPELINE ${hexChunk(4)}:${hexChunk(4)} READY`;
      setTypedLine(target);
    }, 550);

    return () => clearInterval(typeTimer);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const warningTimer = setInterval(() => {
      setWarningLine(introWarnings[Math.floor(Math.random() * introWarnings.length)]);
    }, 1100);

    return () => clearInterval(warningTimer);
  }, [showIntro]);

  useEffect(() => {
    if (bootIndex >= bootLines.length - 1) return;

    const timer = setTimeout(() => {
      setBootIndex((prev) => prev + 1);
    }, 850);

    return () => clearTimeout(timer);
  }, [bootIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHandshake((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!scanning) return;

    const timer = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4;
      });
    }, 65);

    return () => clearInterval(timer);
  }, [scanning]);

  useEffect(() => {
    if (scanProgress < 100 || !scanning) return;

    const reveal = setTimeout(() => {
      if (password === 'VICTOR') {
        setStatus('granted');
      } else {
        setStatus('denied');
      }
      setScanning(false);
    }, 400);

    return () => clearTimeout(reveal);
  }, [scanProgress, scanning, password]);

  const bootFeed = useMemo(() => bootLines.slice(0, bootIndex + 1), [bootIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('idle');
    setScanProgress(0);
    setScanning(true);
  };

  return (
    <main className="vault-root">
      <div className="scanlines" />
      <div className="flicker" />

      <div className={`intro-overlay ${showIntro ? 'active' : 'hidden'}`} aria-hidden={!showIntro}>
        <div className="intro-terminal">
          <header>
            <h2>VICTOR VAULT // PRE-ACCESS BOOTSTRAP</h2>
            <span>SAFE MODE + OFFSHORE RELAY + NFC BRIDGE</span>
          </header>

          <div className="intro-feed">
            {introLogs.map((line, idx) => (
              <p key={`${line}-${idx}`}>{line}</p>
            ))}
          </div>

          <div className="typed-line">&gt; {typedLine}</div>
          <div className="warning-line">! {warningLine}</div>

          <div className="intro-progress-wrap">
            <div className="intro-progress-bar" style={{ width: `${introProgress}%` }} />
          </div>
          <p className="intro-progress-label">ARCHIVE INDEXING {introProgress}%</p>
        </div>

        <button className="skip-boot" type="button" onClick={() => setShowIntro(false)}>
          SKIP BOOT
        </button>
      </div>

      <section className="vault-panel">
        <header className="hero glitch" data-text="VICTOR ARCHIVE">
          <h1>VICTOR ARCHIVE</h1>
          <p>SECURE INHERITANCE VAULT</p>
        </header>

        <div className="grid-wrap">
          <div className="boot-module module">
            <h2>BOOT SEQUENCE</h2>
            <div className="boot-feed">
              {bootFeed.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="handshake module">
            <h2>ENCRYPTED NODE HANDSHAKE</h2>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${handshake}%` }} />
            </div>
            <span>{handshake}% COMPLETE</span>
          </div>

          <div className="nfc module">
            <h2>NFC TOKEN DETECTED</h2>
            <p className="tag">AUTH CHIP: V-A7-SAM-KEY</p>
            <p className="tag">SIGNAL INTEGRITY: 99.7%</p>
            <p className="tag">LOCATION LOCK: OFFSHORE NODE 14</p>
          </div>

          <div className="auth module">
            <h2>ACCESS PHRASE</h2>
            <form onSubmit={handleSubmit}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value.toUpperCase())}
                placeholder="ENTER PASSWORD"
                type="password"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit">INITIATE FACIAL SCAN</button>
            </form>

            <div className={`face-scan ${scanning ? 'active' : ''}`}>
              <div className="scan-beam" />
              <span>{scanning ? `FACIAL RECOGNITION ${scanProgress}%` : 'FACIAL RECOGNITION STANDBY'}</span>
            </div>

            {status === 'granted' && <p className="result granted">ACCESS GRANTED</p>}
            {status === 'denied' && <p className="result denied">ACCESS DENIED</p>}
          </div>
        </div>

        {status === 'granted' && (
          <section className="dashboard module">
            <h2>ARCHIVE DASHBOARD</h2>
            <ul>
              <li><span>Inheritance File</span><strong>LOCKED</strong></li>
              <li><span>Offshore Accounts</span><strong>ENCRYPTED</strong></li>
              <li><span>Criminal Ledger</span><strong>CLASSIFIED</strong></li>
              <li><span>Biometric Key</span><strong>SAM REQUIRED</strong></li>
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
