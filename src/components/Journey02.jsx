import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Journey02() {
  // Canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene - Like the scenario
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  }, []);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export { Journey02 };
