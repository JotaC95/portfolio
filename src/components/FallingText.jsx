import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useLanguage } from '../context/LanguageContext';

const FallingText = ({ text = "React Bits Falling Text", trigger = "auto", duration = 0, onFinished }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Events } = Matter;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: sceneRef.current.clientHeight, // Dynamic height
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Boundaries
        const width = render.options.width;
        const height = render.options.height;

        const ground = Bodies.rectangle(width / 2, height + 60, width, 60, { isStatic: true, render: { visible: false } });
        const wallLeft = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { visible: false } });
        const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { visible: false } });

        World.add(world, [ground, wallLeft, wallRight]);

        // Words
        const words = text.split(' ');
        const bodies = [];

        words.forEach((word, index) => {
            const fontSize = 24; // Smaller for bio text
            const roundedWidth = word.length * (fontSize * 0.6);

            const body = Bodies.rectangle(
                Math.random() * (width - 100) + 50,
                Math.random() * (height / 2),
                roundedWidth,
                fontSize,
                {
                    restitution: 0.8,
                    friction: 0.5,
                    render: {
                        fillStyle: 'transparent', // Draw custom text
                        text: {
                            content: word,
                            color: '#94A3B8', // Slate 400
                            size: fontSize,
                            family: 'Inter, sans-serif'
                        }
                    }
                }
            );
            bodies.push(body);
        });

        World.add(world, bodies);

        // Custom Render Hook for Text
        Events.on(render, 'afterRender', function () {
            const context = render.context;
            context.font = '24px "Inter", sans-serif'; // Match bio font
            context.textAlign = 'center';
            context.textBaseline = 'middle';

            bodies.forEach(body => {
                const { x, y } = body.position;
                const { content, color } = body.render.text;

                context.save();
                context.translate(x, y);
                context.rotate(body.angle);
                context.fillStyle = color;
                context.fillText(content, 0, 0);
                context.restore();
            });
        });

        // Mouse Control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // Run
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Cleanup Timeout
        let timeout;
        if (duration > 0 && onFinished) {
            timeout = setTimeout(() => {
                onFinished();
            }, duration);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(world);
            Engine.clear(engine);
        };
    }, [text, duration, onFinished]);

    return (
        <div
            ref={sceneRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10
            }}
        />
    );
};

export default FallingText;
