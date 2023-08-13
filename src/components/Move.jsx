import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Move() {
  // Canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene - Like the scenario
    const scene = new THREE.Scene();

    // Axes helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    /* Objects */
    // Red Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Position
    mesh.position.x = 0.7;
    mesh.position.y = -0.6;
    mesh.position.z = -1;

    // Set the position instead of x, y, z
    // mesh.position.set(0.7, -0.6, -1)

    // It transform the vector in 1
    // mesh.position.normalize()

    // Legth of the vector
    // console.log(mesh.position.length());

    /* Scale */
    mesh.scale.x = 2;
    mesh.scale.y = 0.5;
    mesh.scale.z = 0.5;
    mesh.scale.set(2, 0.5, 0.5);

    // Sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    camera.position.x = 1;
    camera.position.y = 1;
    scene.add(camera);

    // Position from mesh to camera
    // console.log(mesh.position.distanceTo(camera.position));

    /* Look at */
    // camera.lookAt(mesh.position)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);
  }, []);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export { Move };
