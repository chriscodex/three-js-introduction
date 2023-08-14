import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Controls() {
  // Canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene - Like the scenario
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);

    // Edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(edgesMesh)
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      100
    );
    camera.position.z = 3;
    camera.lookAt(mesh.position);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);

    /* Animations */
    // Instance the clock
    const clock = new THREE.Clock();

    const tick = () => {
      // Clock
      const elapsedTime = clock.getElapsedTime();

      // mesh.rotation.y = (elapsedTime * Math.PI) / 2;

      camera.position.x = cursor.x * 10;
      camera.position.y = cursor.y * 10;
      camera.lookAt(mesh.position);

      // Rendering every tick
      renderer.render(scene, camera);

      // Method that call the next frame
      window.requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export { Controls };
