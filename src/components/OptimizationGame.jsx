import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Play, RotateCcw, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const OptimizationGame = () => {
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [won, setWon] = useState(false);

    // PID Parameters
    const [kp, setKp] = useState(0.5);
    const [ki, setKi] = useState(0.0);
    const [kd, setKd] = useState(0.1);

    // Simulation State
    const [time, setTime] = useState(0);
    const dataRef = useRef([]);
    const frameRef = useRef();

    // System Model (Mass-Spring-Damper)
    const stateRef = useRef({
        position: 0,
        velocity: 0,
        integral: 0,
        lastError: 0
    });

    const setPoint = 50; // Target value
    const physics = {
        mass: 1.0,
        damping: 0.5,
        spring: 0.1
    };

    const resetGame = () => {
        setIsPlaying(false);
        setWon(false);
        setTime(0);
        dataRef.current = [];
        stateRef.current = { position: 0, velocity: 0, integral: 0, lastError: 0 };
        // Draw initial static state
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            drawGrid(ctx);
        }
    };

    const drawGrid = (ctx) => {
        const { width, height } = ctx.canvas;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        // Target Line (Set Point)
        const targetY = height - (setPoint / 100) * height;
        ctx.strokeStyle = '#10B981'; // Green
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.moveTo(0, targetY);
        ctx.lineTo(width, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
    };

    const runSimulation = useCallback(() => {
        if (!isPlaying || won) return;

        const ctx = canvasRef.current.getContext('2d');
        const { width, height } = ctx.canvas;
        const state = stateRef.current; // mutable ref for performance

        // PID Calculation
        const error = setPoint - state.position;
        state.integral += error * 0.1; // dt approx
        const derivative = (error - state.lastError) / 0.1;

        const output = (kp * error) + (ki * state.integral) + (kd * derivative);

        // Physics Step ( Euler Integration )
        const acceleration = (output - physics.damping * state.velocity - physics.spring * state.position) / physics.mass;
        state.velocity += acceleration * 0.1;
        state.position += state.velocity * 0.1;
        state.lastError = error;

        // Visual Data Limit
        if (state.position > 120) state.position = 120; // Clamp
        if (state.position < -20) state.position = -20;

        setTime(prev => prev + 1);
        dataRef.current.push(state.position);
        if (dataRef.current.length > width) dataRef.current.shift();

        // Draw Frame
        ctx.clearRect(0, 0, width, height);
        drawGrid(ctx);

        // Draw Process Variable
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8'; // Blue
        ctx.lineWidth = 2;
        dataRef.current.forEach((val, i) => {
            const x = width - (dataRef.current.length - i);
            const y = height - (val / 100) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Win Condition Check: Stable near 50 for 100 frames
        const stabilityLength = 100;
        if (dataRef.current.length > stabilityLength) {
            const lastSegment = dataRef.current.slice(-stabilityLength);
            const isStable = lastSegment.every(v => Math.abs(v - setPoint) < 2);
            if (isStable) {
                setWon(true);
                setIsPlaying(false);
            }
        }

        frameRef.current = requestAnimationFrame(runSimulation);
    }, [isPlaying, kp, ki, kd, won]);

    useEffect(() => {
        if (isPlaying) {
            frameRef.current = requestAnimationFrame(runSimulation);
        } else {
            cancelAnimationFrame(frameRef.current);
        }
        return () => cancelAnimationFrame(frameRef.current);
    }, [isPlaying, runSimulation]);

    useEffect(() => {
        // Initial Draw
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const ctx = canvas.getContext('2d');
            drawGrid(ctx);
        }
        window.addEventListener('resize', resetGame);
        return () => window.removeEventListener('resize', resetGame);
    }, []);

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">CONTROL THEORY CHALLENGE</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Tune the PID Controller to stabilize the system wave on the green target line.
                        Prove your mastery of feedback loops.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 300px',
                    gap: '2rem',
                    backgroundColor: 'var(--bg-card)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>

                    {/* Graph Area */}
                    <div style={{ position: 'relative', height: '400px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

                        {won && (
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: 'rgba(0,0,0,0.7)', animate: 'fadeIn'
                            }}>
                                <Award size={64} color="#F59E0B" />
                                <h3 style={{ fontSize: '2rem', color: '#fff', textShadow: '0 0 10px #F59E0B' }}>SYSTEM STABILIZED</h3>
                                <p style={{ color: '#ccc' }}>Optimal PID Values Found</p>
                                <button onClick={resetGame} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                    Reset Simulation
                                </button>
                            </div>
                        )}
                        {!isPlaying && !won && time === 0 && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                color: '#555', pointerEvents: 'none'
                            }}>
                                Hit Start to Run
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Sliders */}
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', fontWeight: 'bold' }}>
                                <span>P (Proportional)</span>
                                <span>{kp.toFixed(2)}</span>
                            </label>
                            <input
                                type="range" min="0" max="2" step="0.01"
                                value={kp} onChange={e => setKp(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#38bdf8' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Immediate error response (Spring)</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 'bold' }}>
                                <span>I (Integral)</span>
                                <span>{ki.toFixed(3)}</span>
                            </label>
                            <input
                                type="range" min="0" max="0.1" step="0.001"
                                value={ki} onChange={e => setKi(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#10B981' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Accumulated error correction (Bias)</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B', fontWeight: 'bold' }}>
                                <span>D (Derivative)</span>
                                <span>{kd.toFixed(2)}</span>
                            </label>
                            <input
                                type="range" min="0" max="5" step="0.01"
                                value={kd} onChange={e => setKd(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#F59E0B' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Future prediction (Damping)</p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            {!isPlaying ? (
                                <button onClick={() => setIsPlaying(true)} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <Play size={20} /> START
                                </button>
                            ) : (
                                <button onClick={() => setIsPlaying(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: '#ef4444', color: '#ef4444' }}>
                                    PAUSE
                                </button>
                            )}
                            <button onClick={resetGame} className="btn btn-outline" title="Reset">
                                <RotateCcw size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OptimizationGame;
