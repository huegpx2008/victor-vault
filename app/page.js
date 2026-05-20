'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [bootComplete, setBootComplete] = useState(false);
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const audioCtxRef = useRef(null);
  const humRef = useRef(null);

  const playTone = (frequency = 540, duration = 0.06, gainValue = 0.022, type = 'sine') => {
    const ctx = audioCtxRef.current;
    if (!ctx || !audioEnabled) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  const setHumLevel = (targetLevel = 0.008, ramp = 0.35) => {
    const ctx = audioCtxRef.current;
    const hum = humRef.current;
    if (!ctx || !hum) return;

    hum.gain.gain.cancelScheduledValues(ctx.currentTime);
    hum.gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetLevel), ctx.currentTime + ramp);
  };

  const handleEnableAudio = async () => {
    if (audioEnabled) return;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(72, ctx.currentTime);
    humGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    humOsc.connect(humGain);
    humGain.connect(ctx.destination);
    humOsc.start();

    audioCtxRef.current = ctx;
    humRef.current = { osc: humOsc, gain: humGain };
    setAudioEnabled(true);
    setHumLevel(0.006, 0.7);
    playTone(680, 0.08, 0.018, 'triangle');
  };

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
    if (!audioEnabled) return;

    if (showIntro) {
      setHumLevel(0.006, 0.45);
      return;
    }

    setHumLevel(0.01, 0.55);
  }, [showIntro, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const logTimer = setInterval(() => {
      setIntroLogs((prev) => {
        const nextIndex = prev.length + Math.floor(Math.random() * 3);
        return [...prev.slice(-23), makeLogLine(nextIndex)];
      });
      playTone(560 + Math.random() * 120, 0.045, 0.012, 'square');
    }, 95);

    return () => clearInterval(logTimer);
  }, [showIntro, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;

    const typeTimer = setInterval(() => {
      const target = `ARCHIVE PIPELINE ${hexChunk(4)}:${hexChunk(4)} READY`;
      setTypedLine(target);
      playTone(630 + Math.random() * 80, 0.06, 0.014, 'triangle');
    }, 550);

    return () => clearInterval(typeTimer);
  }, [showIntro, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;

    const warningTimer = setInterval(() => {
      setWarningLine(introWarnings[Math.floor(Math.random() * introWarnings.length)]);
    }, 1100);

    return () => clearInterval(warningTimer);
  }, [showIntro]);

  useEffect(() => {
    if (showIntro || bootComplete) return;

    if (bootIndex >= bootLines.length - 1) {
      setBootComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setBootIndex((prev) => prev + 1);
      playTone(690, 0.07, 0.016, 'sine');
    }, 850);

    return () => clearTimeout(timer);
  }, [bootIndex, showIntro, bootComplete, audioEnabled]);

  useEffect(() => {
    if (showIntro || !bootComplete || handshakeComplete) return;

    const timer = setInterval(() => {
      setHandshake((prev) => {
        if (prev >= 100) {
          setHandshakeComplete(true);
          return 100;
        }

        const next = prev + 2;
        if (next >= 100) {
          setHandshakeComplete(true);
          return 100;
        }

        if (next % 10 === 0) {
          playTone(260 + next * 2, 0.05, 0.011, 'square');
        }

        return next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [showIntro, bootComplete, handshakeComplete, audioEnabled]);

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

  useEffect(() => {
    if (status === 'granted') {
      playTone(820, 0.09, 0.02, 'triangle');
      setTimeout(() => playTone(1020, 0.1, 0.018, 'sine'), 110);
    }

    if (status === 'denied') {
      playTone(220, 0.13, 0.02, 'sawtooth');
      setTimeout(() => playTone(180, 0.14, 0.016, 'square'), 120);
    }
  }, [status]);

  useEffect(() => () => {
    const hum = humRef.current;
    const ctx = audioCtxRef.current;

    if (hum && ctx) {
      hum.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      hum.osc.stop(ctx.currentTime + 0.22);
    }

    if (ctx) {
      setTimeout(() => {
        ctx.close();
      }, 240);
    }
  }, []);

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
        <div className="intro-shell">
          <header className="intro-header">
            <h1 className="glitch" data-text="VICTOR ARCHIVE">VICTOR ARCHIVE</h1>
            <h2>VICTOR VAULT // PRE-ACCESS BOOTSTRAP</h2>
            <span>SAFE MODE + OFFSHORE RELAY + NFC BRIDGE</span>
          </header>

          <div className="intro-terminal">
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
        </div>

        <button className="skip-boot" type="button" onClick={() => setShowIntro(false)}>
          SKIP BOOT
        </button>

        <button className="enable-audio" type="button" onClick={handleEnableAudio}>
          {audioEnabled ? 'AUDIO ONLINE' : 'ENABLE AUDIO'}
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

          <div className="nfc module gated-module" data-visible={handshakeComplete}>
            <h2>NFC TOKEN DETECTED</h2>
            <p className="tag">AUTH CHIP: V-A7-SAM-KEY</p>
            <p className="tag">SIGNAL INTEGRITY: 99.7%</p>
            <p className="tag">LOCATION LOCK: OFFSHORE NODE 14</p>
          </div>

          <div className="auth module gated-module" data-visible={handshakeComplete}>
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
