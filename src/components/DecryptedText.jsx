import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const DecryptedText = ({ text, className, style, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Controls how fast the decryption resolves
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span className={className} style={style}>{displayText}</span>;
};

export default DecryptedText;
