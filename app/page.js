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
const mapStatuses = [
  'ROUTING THROUGH OFFSHORE MIRRORS...',
  'VERIFYING ACCOUNT CLUSTERS...',
  'TRACE MASK ENABLED...',
  'LEDGER HASH CONFIRMED...',
  'NODE CHAIN SYNCHRONIZED...'
];
const networkStats = [
  ['ENCRYPTION', 'AES-256'],
  ['FIREWALL', 'ACTIVE'],
  ['UPLINKS', '7'],
  ['SATELLITES', '12']
];
const baseRoutingLogs = [
  'INITIALIZING GLOBAL ROUTE PROTOCOL...',
  'LOCATING OFFSHORE NODES...',
  'CONNECTING TO SWISS VAULT...',
  'ROUTE VERIFIED...',
  'ENCRYPTED CHANNEL ESTABLISHED...'
];
const mapNodes = ['USA ORIGIN NODE', 'CAYMAN RELAY', 'SWISS VAULT', 'PANAMA MIRROR', 'SINGAPORE LEDGER', 'MONACO ESCROW', 'BVI SHADOW NODE', 'DUBAI HOLDING NODE', 'LUXEMBOURG TRUST', 'HONG KONG MIRROR'];
const introPrefixes = ['SYS', 'NODE', 'ARC', 'BIO', 'NFC', 'VX'];
const destructStages = ['PURGING VICTOR ARCHIVE INDEX...', 'DELETING OFFSHORE NODE MAP...', 'WIPING CRIMINAL LEDGER CACHE...', 'SCRAMBLING BIOMETRIC KEY...', 'DESTROYING INHERITANCE ACCESS TOKEN...', 'SEALING DEAD MAN SWITCH...'];
const destructBars = ['DATA PURGE', 'KEY DESTRUCTION', 'LEDGER WIPE', 'SYSTEM COLLAPSE'];

const hexChunk = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
const makeLogLine = (idx) => `[${introPrefixes[idx % introPrefixes.length]}] HASH ${hexChunk(8)}-${hexChunk(8)} :: NODE-CHECK ${hexChunk(4)} :: INDEX ${Math.min(99, 18 + ((idx * 7) % 82))}%${idx % 4 === 0 ? ` :: ${introWarnings[idx % introWarnings.length]}` : ''}`;

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [showGlobalMap, setShowGlobalMap] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [mapProgress, setMapProgress] = useState(0);
  const [introLogs, setIntroLogs] = useState(() => Array.from({ length: 8 }, (_, i) => makeLogLine(i)));
  const [typedLine, setTypedLine] = useState('');
  const [warningLine, setWarningLine] = useState(introWarnings[0]);
  const [mapStatus, setMapStatus] = useState(mapStatuses[0]);
  const [routingLogs, setRoutingLogs] = useState(baseRoutingLogs);
  const [mapAnalytics, setMapAnalytics] = useState({ pps: 2851, latency: 23.7, integrity: 99.97, active: 10 });
  const [mapVideoFailed, setMapVideoFailed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [handshake, setHandshake] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selfDestructActive, setSelfDestructActive] = useState(false);
  const [destructComplete, setDestructComplete] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [destructLogs, setDestructLogs] = useState(() => Array.from({ length: 30 }, (_, i) => makeLogLine(i + 40)));
  const [destructBarsState, setDestructBarsState] = useState({ 'DATA PURGE': 0, 'KEY DESTRUCTION': 0, 'LEDGER WIPE': 0, 'SYSTEM COLLAPSE': 0 });
  const [welcomeVideoFailed, setWelcomeVideoFailed] = useState(false);
  const [welcomeVideoNeedsTap, setWelcomeVideoNeedsTap] = useState(false);

  const audioCtxRef = useRef(null);
  const humRef = useRef(null);
  const welcomeFallbackTimerRef = useRef(null);
  const welcomeVideoRef = useRef(null);

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



  const playTerminalClick = (base = 180, depth = 0, level = 0.0075) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !audioEnabled) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(base + depth * 8, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(72, base * 0.62), now + 0.018);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(level, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  };

  const playRouteConfirm = () => {
    playTone(142, 0.1, 0.012, 'triangle');
    setTimeout(() => playTone(84, 0.15, 0.0125, 'sine'), 22);
    setTimeout(() => playTerminalClick(138, 3, 0.0105), 35);
  };

  const playAccessGranted = () => {
    playTerminalClick(184, 2, 0.0115);
    setTimeout(() => playTone(206, 0.08, 0.0115, 'square'), 36);
    setTimeout(() => playTone(248, 0.1, 0.0105, 'triangle'), 90);
    setTimeout(() => playTone(92, 0.14, 0.011, 'sine'), 44);
  };

  const playAccessDenied = () => {
    playTone(108, 0.14, 0.012, 'sawtooth');
    setTimeout(() => playTone(78, 0.14, 0.0128, 'square'), 60);
    setTimeout(() => playTone(58, 0.16, 0.013, 'sine'), 125);
  };


  const playBreachPulse = (intensity = 1) => {
    const impact = Math.min(1.4, Math.max(0.8, intensity));
    playTone(96, 0.1, 0.0105 * impact, 'sawtooth');
    setTimeout(() => playTone(68, 0.14, 0.0115 * impact, 'square'), 40);
    setTimeout(() => playTone(54, 0.16, 0.012 * impact, 'sine'), 84);
  };

  const setHumLevel = (targetLevel = 0.008, ramp = 0.35) => {
    const ctx = audioCtxRef.current;
    const hum = humRef.current;
    if (!ctx || !hum) return;
    hum.gain.gain.cancelScheduledValues(ctx.currentTime);
    hum.gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetLevel), ctx.currentTime + ramp);
  };
  const handleMapVideoError = () => {
    // Film-prop fallback: keep HUD running and fall back to static map if video fails.
    console.error('Global routing background video failed to load for the current viewport.');
    setMapVideoFailed(true);
  };

  const handleEnableAudio = async () => {
    if (audioEnabled) return;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    const ctx = new AudioContextCtor();
    if (ctx.state === 'suspended') await ctx.resume();
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
    setHumLevel(0.009, 0.7);
    playTerminalClick(170, 1, 0.0068);
  };


  useEffect(() => {
    const updateViewport = () => setIsDesktop(window.innerWidth >= 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / 9800) * 100));
      setIntroProgress(next);
      if (next >= 100) {
        setShowIntro(false);
        setShowWelcomeVideo(true);
      }
    }, 90);
    return () => clearInterval(timer);
  }, [showIntro]);

  useEffect(() => () => {
    if (welcomeFallbackTimerRef.current) clearTimeout(welcomeFallbackTimerRef.current);
  }, []);

  useEffect(() => {
    if (!showGlobalMap) return;
    setMapProgress(0);
    const start = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / 10000) * 100));
      setMapProgress(next);
      if (next >= 100) setShowGlobalMap(false);
    }, 90);
    const statusTimer = setInterval(() => {
      setMapStatus(mapStatuses[Math.floor(Math.random() * mapStatuses.length)]);
      setRoutingLogs((prev) => [...prev.slice(-10), `CONNECTING ${mapNodes[1 + Math.floor(Math.random() * 9)]} :: OK`]);
      setMapAnalytics((prev) => ({ pps: 2500 + Math.floor(Math.random() * 900), latency: Number((20 + Math.random() * 8).toFixed(1)), integrity: Number((99.9 + Math.random() * 0.09).toFixed(2)), active: 10 }));
      playRouteConfirm();
    }, 550);
    return () => { clearInterval(progressTimer); clearInterval(statusTimer); };
  }, [showGlobalMap]);

  const isArchiveStage = !showIntro && !showWelcomeVideo && !showGlobalMap;

  useEffect(() => {
    if (!isArchiveStage) return;
    setBootIndex(-1);
    setBootComplete(false);
    setHandshake(0);
    setHandshakeComplete(false);
    setPassword('');
    setStatus('idle');
    setScanning(false);
    setScanProgress(0);
    setSelfDestructActive(false);
    setDestructComplete(false);
    setCountdown(10);
    setDestructBarsState({ 'DATA PURGE': 0, 'KEY DESTRUCTION': 0, 'LEDGER WIPE': 0, 'SYSTEM COLLAPSE': 0 });
  }, [isArchiveStage]);

  useEffect(() => {
    if (!audioEnabled) return;
    if (showIntro) return setHumLevel(0.0085, 0.45);
    if (showWelcomeVideo) return setHumLevel(0.0098, 0.4);
    if (showGlobalMap) return setHumLevel(0.0115, 0.35);
    setHumLevel(0.0135, 0.55);
  }, [showIntro, showWelcomeVideo, showGlobalMap, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prevHtmlOverflow; document.body.style.overflow = prevBodyOverflow; };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;
    const logTimer = setInterval(() => {
      setIntroLogs((prev) => [...prev.slice(-23), makeLogLine(prev.length + Math.floor(Math.random() * 3))]);
      playTerminalClick(150 + Math.random() * 26, 1, 0.0086);
    }, 95);
    return () => clearInterval(logTimer);
  }, [showIntro, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;
    const typeTimer = setInterval(() => {
      setTypedLine(`ARCHIVE PIPELINE ${hexChunk(4)}:${hexChunk(4)} READY`);
      playTerminalClick(168 + Math.random() * 18, 2, 0.009);
    }, 550);
    return () => clearInterval(typeTimer);
  }, [showIntro, audioEnabled]);

  useEffect(() => {
    if (!showIntro) return;
    const warningTimer = setInterval(() => setWarningLine(introWarnings[Math.floor(Math.random() * introWarnings.length)]), 1100);
    return () => clearInterval(warningTimer);
  }, [showIntro]);

  useEffect(() => {
    if (!isArchiveStage || bootComplete) return;
    if (bootIndex >= bootLines.length - 1) return setBootComplete(true);
    const timer = setTimeout(() => { setBootIndex((prev) => prev + 1); playTerminalClick(174, 3, 0.0096); }, 850);
    return () => clearTimeout(timer);
  }, [bootIndex, isArchiveStage, bootComplete, audioEnabled]);

  useEffect(() => {
    if (!isArchiveStage || !bootComplete || handshakeComplete) return;
    const timer = setInterval(() => setHandshake((prev) => {
      if (prev >= 100) return 100;
      const next = prev + 2;
      if (next % 10 === 0) playTerminalClick(114 + next * 0.65, 3, 0.0098);
      if (next >= 100) setHandshakeComplete(true);
      return Math.min(100, next);
    }), 80);
    return () => clearInterval(timer);
  }, [isArchiveStage, bootComplete, handshakeComplete, audioEnabled]);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => setScanProgress((prev) => (prev >= 100 ? 100 : prev + 4)), 65);
    return () => clearInterval(timer);
  }, [scanning]);

  useEffect(() => {
    if (scanProgress < 100 || !scanning) return;
    const reveal = setTimeout(() => { setStatus(password === 'VICTOR' ? 'granted' : 'denied'); setScanning(false); }, 400);
    return () => clearTimeout(reveal);
  }, [scanProgress, scanning, password]);

  useEffect(() => {
    if (status === 'granted') {
      playAccessGranted();
    }
    if (status === 'denied') {
      playAccessDenied();
      const timer = setTimeout(() => setSelfDestructActive(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (!selfDestructActive || destructComplete) return;
    const ct = setInterval(() => setCountdown((prev) => {
      const next = Math.max(0, prev - 1);
      playBreachPulse(next <= 3 ? 1.35 : 1.05);
      return next;
    }), 1000);
    const lt = setInterval(() => setDestructLogs((prev) => [...prev.slice(-65), makeLogLine(prev.length + 90)]), 80);
    const bt = setInterval(() => setDestructBarsState((prev) => ({
      'DATA PURGE': Math.min(100, prev['DATA PURGE'] + 6),
      'KEY DESTRUCTION': Math.min(100, prev['KEY DESTRUCTION'] + 7),
      'LEDGER WIPE': Math.min(100, prev['LEDGER WIPE'] + 8),
      'SYSTEM COLLAPSE': Math.min(100, prev['SYSTEM COLLAPSE'] + 9)
    })), 110);
    return () => { clearInterval(ct); clearInterval(lt); clearInterval(bt); };
  }, [selfDestructActive, destructComplete]);

  useEffect(() => {
    if (selfDestructActive && countdown === 0 && !destructComplete) {
      setDestructComplete(true);
      playTone(62, 0.3, 0.014, 'sawtooth');
    }
  }, [selfDestructActive, countdown, destructComplete]);

  useEffect(() => () => {
    const hum = humRef.current;
    const ctx = audioCtxRef.current;
    if (hum && ctx) { hum.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2); hum.osc.stop(ctx.currentTime + 0.22); }
    if (ctx) setTimeout(() => ctx.close(), 240);
  }, []);

  const bootFeed = useMemo(() => bootLines.slice(0, Math.max(0, bootIndex + 1)), [bootIndex]);
  const videoSrc = isDesktop ? '/data/landscape.mp4' : '/data/gemini_generated_video_86717de7.mp4';
  const videoSourceLabel = isDesktop ? 'LANDSCAPE' : 'PORTRAIT';
  const transitionToMap = () => {
    if (welcomeFallbackTimerRef.current) {
      clearTimeout(welcomeFallbackTimerRef.current);
      welcomeFallbackTimerRef.current = null;
    }
    setShowWelcomeVideo(false);
    setShowGlobalMap(true);
    setWelcomeVideoNeedsTap(false);
  };
  const handleWelcomeVideoError = () => {
    setWelcomeVideoFailed(true);
    if (welcomeFallbackTimerRef.current) clearTimeout(welcomeFallbackTimerRef.current);
    welcomeFallbackTimerRef.current = setTimeout(() => transitionToMap(), 5000);
  };
  const handleWelcomeVideoCanPlay = async () => {
    if (!showWelcomeVideo || !welcomeVideoRef.current) return;
    const video = welcomeVideoRef.current;
    video.muted = !audioEnabled;
    try {
      await video.play();
      setWelcomeVideoNeedsTap(false);
    } catch {
      if (audioEnabled) setWelcomeVideoNeedsTap(true);
    }
  };
  const handleWelcomeTapToPlay = async () => {
    const video = welcomeVideoRef.current;
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
      setWelcomeVideoNeedsTap(false);
    } catch {
      setWelcomeVideoNeedsTap(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('idle');
    setSelfDestructActive(false);
    setDestructComplete(false);
    setCountdown(10);
    setDestructBarsState({ 'DATA PURGE': 0, 'KEY DESTRUCTION': 0, 'LEDGER WIPE': 0, 'SYSTEM COLLAPSE': 0 });
    setScanProgress(0);
    setScanning(true);
  };
  const resetProp = () => {
    setStatus('idle');
    setPassword('');
    setSelfDestructActive(false);
    setDestructComplete(false);
    setCountdown(10);
    setDestructBarsState({ 'DATA PURGE': 0, 'KEY DESTRUCTION': 0, 'LEDGER WIPE': 0, 'SYSTEM COLLAPSE': 0 });
  };

  return (
    <main className="vault-root">
      <div className="scanlines" /><div className="flicker" />

      <div className={`intro-overlay ${showIntro ? 'active' : 'hidden'}`} aria-hidden={!showIntro}> 
        <div className="intro-shell"><header className="intro-header"><h1 className="glitch" data-text="VICTOR ARCHIVE">VICTOR ARCHIVE</h1><h2>VICTOR VAULT // PRE-ACCESS BOOTSTRAP</h2><span>SAFE MODE + OFFSHORE RELAY + NFC BRIDGE</span></header>
          <div className="intro-terminal"><div className="intro-feed">{introLogs.map((line, idx) => <p key={`${line}-${idx}`}>{line}</p>)}</div><div className="typed-line">&gt; {typedLine}</div><div className="warning-line">! {warningLine}</div><div className="intro-progress-wrap"><div className="intro-progress-bar" style={{ width: `${introProgress}%` }} /></div><p className="intro-progress-label">ARCHIVE INDEXING {introProgress}%</p></div>
        </div>
        <button className="skip-boot" type="button" onClick={() => { setShowIntro(false); setShowWelcomeVideo(true); }}>SKIP BOOT</button>
        <button className="enable-audio" type="button" onClick={handleEnableAudio}>{audioEnabled ? 'AUDIO ONLINE' : 'ENABLE AUDIO'}</button>
      </div>

      {showWelcomeVideo && (
        <section className="welcome-video-overlay" aria-live="polite">
          <div className="welcome-video-shell">
            <video
              ref={welcomeVideoRef}
              className="victor-welcome-video"
              autoPlay
              muted={!audioEnabled}
              playsInline
              preload="auto"
              onCanPlay={handleWelcomeVideoCanPlay}
              onEnded={transitionToMap}
              onError={handleWelcomeVideoError}
            >
              <source src="/data/gemini_generated_video_543d8e3a.mp4" type="video/mp4" />
            </video>
            <div className="welcome-video-hud">
              <p>VICTOR ARCHIVE</p>
              <p>RECORDED MESSAGE DETECTED</p>
              <p>PLAYBACK AUTHORIZED</p>
            </div>
            {welcomeVideoFailed && <p className="welcome-video-fallback">MESSAGE FEED ERROR :: FAILING OVER TO ROUTING MAP IN 00:05</p>}
            {welcomeVideoNeedsTap && (
              <button className="tap-play-message" type="button" onClick={handleWelcomeTapToPlay}>TAP TO PLAY MESSAGE</button>
            )}
          </div>
          <button className="skip-message" type="button" onClick={transitionToMap}>SKIP MESSAGE</button>
        </section>
      )}

      {showGlobalMap && (
        <section className="map-overlay" aria-live="polite">
          <header className="map-hero">
            <h1>VICTOR ARCHIVE</h1>
            <h2>GLOBAL OFFSHORE NODE ROUTING</h2>
            <p>Tracing Victor Archive financial relay network</p>
          </header>
          <div className="map-grid">
            <div className="map-globe">
              {!mapVideoFailed && (
                <>
                  <video
                    key={videoSrc}
                    className="map-bg-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={handleMapVideoError}
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                  <div className="video-source-debug">VIDEO SOURCE: {videoSourceLabel}</div>
                </>
              )}
            </div>
            <div className="map-terminal">
              <p className="map-status">{mapStatus}</p>
              <div className="map-side-panels">
                <div><h3>ROUTING ANALYTICS</h3><p>PACKETS/SEC: {mapAnalytics.pps}</p><p>LATENCY: {mapAnalytics.latency}ms</p><p>INTEGRITY: {mapAnalytics.integrity}%</p><p>ACTIVE ROUTES: {mapAnalytics.active}/10</p></div>
                <div><h3>NETWORK STATUS</h3>{networkStats.map(([k, v]) => <p key={k}>{k}: {v}</p>)}</div>
              </div>
              <div className="map-lower-panels">
                <div><h3>ROUTING LOG</h3>{routingLogs.slice(-10).map((line, idx) => <p key={`r-${idx}`}>00:00:{String(idx + 1).padStart(2, '0')} {line}</p>)}</div>
                <div><h3>NODE STATUS</h3>{mapNodes.map((n) => <p key={n}>{n} <strong>ONLINE</strong></p>)}</div>
                <div><h3>ROUTE ENCRYPTION KEY</h3><p>73AF-9C2B-1D4E-8F77-6B2A-9E11</p></div>
              </div>
              <div className="intro-progress-wrap"><div className="intro-progress-bar map-progress" style={{ width: `${mapProgress}%` }} /></div>
              <p className="intro-progress-label">OFFSHORE ROUTE SYNC {mapProgress}%</p>
              {mapProgress >= 100 && <p className="map-complete">ROUTE SYNCHRONIZATION COMPLETE<br />REDIRECTING TO VICTOR ARCHIVE SECURE INTERFACE...</p>}
              <p className="map-autotransfer">AUTO-TRANSFER IN: {mapProgress >= 100 ? '00:00' : `00:${String(Math.ceil((100 - mapProgress) / 10)).padStart(2, '0')}`}</p>
            </div>
          </div>
        </section>
      )}

      {!showIntro && !showWelcomeVideo && !showGlobalMap && <section className="vault-panel">{/* unchanged main access screen */}
        <header className="hero glitch" data-text="VICTOR ARCHIVE"><h1>VICTOR ARCHIVE</h1><p>SECURE INHERITANCE VAULT</p></header>
        <div className="grid-wrap"><div className="boot-module module"><h2>BOOT SEQUENCE</h2><div className="boot-feed">{bootFeed.map((line) => <p key={line}>{line}</p>)}</div></div><div className="handshake module"><h2>ENCRYPTED NODE HANDSHAKE</h2><div className="progress-track"><div className="progress-fill" style={{ width: `${handshake}%` }} /></div><span>{handshake}% COMPLETE</span></div><div className="nfc module gated-module" data-visible={handshakeComplete}><h2>NFC TOKEN DETECTED</h2><p className="tag">AUTH CHIP: V-A7-SAM-KEY</p><p className="tag">SIGNAL INTEGRITY: 99.7%</p><p className="tag">LOCATION LOCK: OFFSHORE NODE 14</p></div><div className="auth module gated-module" data-visible={handshakeComplete}><h2>ACCESS PHRASE</h2><form onSubmit={handleSubmit}><input value={password} onChange={(e) => setPassword(e.target.value.toUpperCase())} placeholder="ENTER PASSWORD" type="password" autoComplete="off" spellCheck="false" /><button type="submit">INITIATE FACIAL SCAN</button></form><div className={`face-scan ${scanning ? 'active' : ''}`}><div className="scan-beam" /><span>{scanning ? `FACIAL RECOGNITION ${scanProgress}%` : 'FACIAL RECOGNITION STANDBY'}</span></div>{status === 'granted' && <p className="result granted">ACCESS GRANTED</p>}{status === 'denied' && <p className="result denied">ACCESS DENIED</p>}</div></div>
        {status === 'granted' && <section className="dashboard module"><h2>ARCHIVE DASHBOARD</h2><ul><li><span>Inheritance File</span><strong>LOCKED</strong></li><li><span>Offshore Accounts</span><strong>ENCRYPTED</strong></li><li><span>Criminal Ledger</span><strong>CLASSIFIED</strong></li><li><span>Biometric Key</span><strong>SAM REQUIRED</strong></li></ul></section>}
      </section>}

      {selfDestructActive && <section className={`destruct-overlay ${destructComplete ? 'complete' : ''}`}><h1 className="glitch" data-text="SECURITY BREACH DETECTED">SECURITY BREACH DETECTED</h1><h2>UNAUTHORIZED BIOMETRIC SIGNATURE</h2><p className="destruct-countdown">T-MINUS {countdown}s</p><div className="destruct-stage-list">{destructStages.map((line) => <p key={line}>{line}</p>)}</div><div className="destruct-bars">{destructBars.map((bar) => <div key={bar}><label>{bar} {destructBarsState[bar]}%</label><div className="progress-track"><div className="progress-fill danger" style={{ width: `${destructBarsState[bar]}%` }} /></div></div>)}</div><div className="destruct-feed">{destructLogs.map((line, idx) => <p key={`${line}-${idx}`}>{line}</p>)}</div>{destructComplete && <div className="destruct-final"><h3>ARCHIVE DESTROYED</h3><p>CONNECTION TERMINATED</p></div>}<button type="button" className="reset-prop" onClick={resetProp}>RESET PROP</button></section>}
    </main>
  );
}
