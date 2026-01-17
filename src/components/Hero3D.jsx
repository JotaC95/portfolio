import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedShape = () => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
            // Add a subtle "breathing" scale effect
            const scale = 2 + Math.sin(time) * 0.2;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2} ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <MeshDistortMaterial
                color={hovered ? "#06B6D4" : "#38BDF8"} // Cyan to Light Blue
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                wireframe={true} // Wireframe looks very "engineering"
            />
        </Sphere>
    );
};

const Hero3D = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.6
        }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#F59E0B" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

                <AnimatedShape />

                {/* Disable zoom to keep layout stable, but allow rotation */}
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
