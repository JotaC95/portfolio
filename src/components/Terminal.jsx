import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Terminal = ({ onClose, onAdmin, onMatrix }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Percival OS v1.0.0 [Secure Shell]' },
        { type: 'output', content: 'Type "help" for available commands.' },
    ]);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const { t } = useLanguage();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        let output = '';

        switch (trimmedCmd) {
            case 'help':
                output = `Available commands:
  help      - Show this help message
  whoami    - Display user identity
  clear     - Clear terminal history
  skills    - List technical capabilities
  projects  - List latest project codenames
  contact   - Show contact info
  red_pill  - See how deep the rabbit hole goes
  sudo      - Execute command as superuser
  date      - Show system time
  exit      - Close terminal`;
                break;
            case 'whoami':
                output = 'visitor@percival-portfolio:~$ authenticated as Guest User';
                break;
            case 'skills':
                output = `
  > Frontend: React, Three.js, CSS3
  > Backend: Node.js, Python, C++
  > Security: Network Analysis, Encryption Basics
  > IoT: MQTT, ESP32, SCADA`;
                break;
            case 'projects':
                output = `
  1. Auto-Clean Hotel Manager (React Native)
  2. IoT Dashboard (Real-time WebSocket)
  3. Gym Tracker (Data Analytics)
  4. Portfolio v3 (Cybersecurity Enhanced)`;
                break;
            case 'contact':
                output = 'Email: hello@example.com | Phone: +1 234 567 890';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'weather':
                output = "Error 404: Window not found. Look outside.";
                break;
            case 'red_pill':
            case 'choice':
                // Cinematic Sequence
                setHistory(prev => [...prev, { type: 'command', content: `visitor@percival:~$ ${cmd}` }]);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "The Matrix has you..." }]);
                }, 1000);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "Follow the white rabbit." }]);
                }, 3000);

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "Knock, knock, Neo." }]);
                }, 5000);

                setTimeout(() => {
                    if (onMatrix) onMatrix();
                }, 6000);

                return; // Return early to handle custom history updates
            case 'matrix': // Kept as legacy alias but hidden
                if (onMatrix) onMatrix();
                return;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                onClose();
                return;
            case 'sudo':
            case 'admin':
            case 'root':
                output = 'Initiating root access sequence...';
                if (onAdmin) setTimeout(onAdmin, 800);
                break;
            case 'ls':
                output = 'src  public  package.json  README.md  secret_key.txt';
                break;
            case 'cat secret_key.txt':
                output = 'percival{c0mm4nd_l1n3_m4st3r}';
                break;
            default:
                if (trimmedCmd === '') return;
                output = `Command not found: ${trimmedCmd}. Type "help" for assistance.`;
        }

        setHistory(prev => [
            ...prev,
            { type: 'command', content: `visitor@percival:~$ ${cmd}` },
            { type: 'output', content: output }
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                width: '600px',
                maxWidth: '90%',
                height: '400px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'Fira Code', monospace",
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{
                    backgroundColor: '#1e293b',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #334155'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                        <TerminalIcon size={16} />
                        <span>visitor@percival:~</span>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={16} />
                    </button>
                </div>

                {/* Console Body */}
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto',
                    color: '#e2e8f0',
                    fontSize: '0.9rem'
                }} onClick={() => inputRef.current?.focus()}>
                    {history.map((line, i) => (
                        <div key={i} style={{
                            marginBottom: '0.5rem',
                            whiteSpace: 'pre-wrap',
                            color: line.type === 'command' ? '#38bdf8' : line.content.includes('percival{') ? '#10b981' : '#cbd5e1'
                        }}>
                            {line.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span style={{ color: '#10b981', marginRight: '0.5rem' }}>visitor@percival:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#e2e8f0',
                                flex: 1,
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: 'inherit'
                            }}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
