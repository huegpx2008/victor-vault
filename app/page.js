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

export default function Home() {
  const [bootIndex, setBootIndex] = useState(0);
  const [handshake, setHandshake] = useState(0);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

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
