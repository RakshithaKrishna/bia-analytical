import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDPlot = ({ plotPoints, newPoints }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 25;

        // Set up the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Create geometries for the plot points
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const materialStatic = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue for stored points
        const materialNew = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for new points

        // Add static plot points
        plotPoints.forEach(point => {
            const sphere = new THREE.Mesh(geometry, materialStatic);
            sphere.position.set(point.x, point.y, point.z);
            scene.add(sphere);
        });

        // Add new points
        newPoints.forEach(point => {
            const sphere = new THREE.Mesh(geometry, materialNew);
            sphere.position.set(point.x, point.y, point.z);
            scene.add(sphere);
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on component unmount
        return () => {
            mount.removeChild(renderer.domElement);
        };
    }, [plotPoints, newPoints]);

    return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
};

export default ThreeDPlot;
