import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ onClose }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Array to track drop y-coordinate for each column
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it crosses screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                cursor: 'pointer',
                backgroundColor: 'black'
            }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: '#0F0',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px',
                border: '1px solid #0F0',
                pointerEvents: 'none'
            }}>
                SYSTEM FAILURE DETECTED... CLICK TO REBOOT
            </div>
        </div>
    );
};

export default MatrixRain;
