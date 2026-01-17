import React, { useEffect, useRef, useState } from 'react';

const GodModeHUD = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [stats, setStats] = useState({ fps: 60, memory: 40, cpu: 12 });

    // Floating Particles Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 2 + 1;
                this.color = `hsl(${Math.random() * 60 + 280}, 100%, 50%)`; // Magenta/Purple range
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connecting lines
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(217, 70, 239, ${1 - distance / 150})`; // Fuchsia line
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Fake System Stats Updater
    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                fps: Math.floor(55 + Math.random() * 10),
                memory: Math.floor(30 + Math.random() * 20),
                cpu: Math.floor(10 + Math.random() * 30)
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9998 }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />

            {/* Cyberpunk Overlay Borders */}
            <div style={{
                position: 'absolute', top: '20px', left: '20px',
                borderTop: '2px solid #d946ef', borderLeft: '2px solid #d946ef',
                width: '100px', height: '100px'
            }} />
            <div style={{
                position: 'absolute', bottom: '20px', right: '20px',
                borderBottom: '2px solid #d946ef', borderRight: '2px solid #d946ef',
                width: '100px', height: '100px'
            }} />

            {/* System Stats HUD */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontFamily: "'Courier New', monospace",
                color: '#d946ef',
                textAlign: 'right',
                textShadow: '0 0 5px #d946ef',
                pointerEvents: 'auto'
            }}>
                <h3>SYSTEM OVERRIDE</h3>
                <p>FPS: {stats.fps}</p>
                <p>RAM: {stats.memory}%</p>
                <p>CPU: {stats.cpu}%</p>
                <p>GRAVITY: <span style={{ color: 'red' }}>DISABLED</span></p>

                <button
                    onClick={onExit}
                    style={{
                        marginTop: '1rem',
                        background: 'transparent',
                        border: '1px solid #d946ef',
                        color: '#d946ef',
                        padding: '0.5rem 1rem',
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px rgba(217, 70, 239, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(217, 70, 239, 0.2)';
                        e.target.style.boxShadow = '0 0 20px rgba(217, 70, 239, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.boxShadow = '0 0 10px rgba(217, 70, 239, 0.3)';
                    }}
                >
                    [ DEACTIVATE ]
                </button>
            </div>
        </div>
    );
};

export default GodModeHUD;
