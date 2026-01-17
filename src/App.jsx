import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OptimizationDemo from './components/OptimizationDemo';
import OptimizationGame from './components/OptimizationGame'; // Replaces OptimizationDemo
import BlogSection from './components/BlogSection'; // New
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiveDashboard from './components/LiveDashboard';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import GodModeHUD from './components/GodModeHUD'; // New Import
import { LanguageProvider } from './context/LanguageContext';
import useSound from './hooks/useSound';

function App() {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  const [godModeActive, setGodModeActive] = useState(false); // New State
  const [konamiIndex, setKonamiIndex] = useState(0);

  const { playSound } = useSound();

  // Konami Code Sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    // CTF Initial Hint
    console.log(
      "%cSTOP!✋\n%cWait, actually... keep looking.\nMaybe there's a 'flag' hidden in the terminal? Try looking around with 'ls'.",
      "color: red; font-size: 20px; font-weight: bold;",
      "color: #06B6D4; font-size: 14px;"
    );

    const handleKeyDown = (e) => {
      // Terminal Shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowTerminal(prev => {
          if (!prev) playSound('click');
          return !prev;
        });
      }

      // Konami Code Logic
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === konamiCode.length) {
          toggleGodMode();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, playSound]);

  const toggleGodMode = () => {
    const newState = !godModeActive;
    setGodModeActive(newState);

    if (newState) {
      document.body.classList.add('neon-mode');
      document.body.classList.remove('blueprint-mode'); // Ensure mutually exclusive
      playSound('success');
      // Auto-open terminal for effect
      setShowTerminal(true);
    } else {
      document.body.classList.remove('neon-mode');
    }
  };

  const toggleBlueprintMode = () => {
    // Toggle class directly for simplicity, or could use state if complex logic needed
    const isBlueprint = document.body.classList.toggle('blueprint-mode');
    if (isBlueprint) {
      document.body.classList.remove('neon-mode'); // Exclusive
      setGodModeActive(false);
      playSound('click');
    }
  };

  const triggerHoneypot = () => {
    playSound('error');
    setShowSecurityAlert(true);
    setTimeout(() => {
      setShowSecurityAlert(false);
    }, 5000);
  };

  return (
    <LanguageProvider>
      <div className="App">
        {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
        {/* Pass godMode prop to Terminal if needed in future, currently just styling */}
        {showTerminal && <Terminal
          onClose={() => setShowTerminal(false)}
          onAdmin={triggerHoneypot}
          onMatrix={() => setShowMatrix(true)}
        />}
        {godModeActive && <GodModeHUD onExit={toggleGodMode} />}

        {/* Security Alert Overlay */}
        {showSecurityAlert && (
          <div className="security-alert">
            <div className="alert-box">
              <AlertTriangle size={64} style={{ marginBottom: '1rem' }} />
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>SECURITY BREACH</h1>
              <p style={{ fontSize: '1.5rem', color: '#fff' }}>UNAUTHORIZED ACCESS DETECTED</p>
              <p style={{ marginTop: '2rem', color: '#999' }}>IP ADDRESS LOGGED AND TRACED TO LOCALHOST</p>
              <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>DEPLOYING COUNTER-MEASURES...</p>
            </div>
          </div>
        )}

        <Navbar
          onLogoClick={() => { setShowMatrix(true); playSound('error'); }}
          onBlueprintClick={toggleBlueprintMode}
        />

        {/* Floating Terminal Trigger */}
        <button
          onClick={() => { setShowTerminal(true); playSound('click'); }}
          title="Hazlo como un programador"
          onMouseEnter={() => playSound('hover')}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            zIndex: 900,
            backgroundColor: 'var(--card-bg, #1e293b)',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            padding: '0.8rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 15px var(--accent-primary)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
        >
          <TerminalIcon size={24} />
        </button>

        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <OptimizationGame />
          <Projects />
          <BlogSection />
          <Contact />
        </main>
        <Footer
          onAdminClick={triggerHoneypot}
          onHover={() => playSound('hover')}
        />
        <LiveDashboard />
      </div>
    </LanguageProvider>
  );
}

export default App;
