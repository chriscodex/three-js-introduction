import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function RaycasterMouse() {
  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

  /* Lights */
  const ambientLight = new THREE.AmbientLight();
  ambientLight.color = new THREE.Color(0xffffff);
  ambientLight.intensity = 0.5;

  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 55);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  /**
   * Objects
   */
  const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  );
  object1.position.x = -2;

  const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  );

  const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  );
  object3.position.x = 2;

  scene.add(object1, object2, object3);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 3;
  scene.add(camera);

  useEffect(() => {
    /* Resize */
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    /* Animations */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate objets
      object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
      object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
      object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

      // Control update for damping
      controls.update();

      // Rendering every tick
      renderer.render(scene, camera);

      // Method that call the next frame
      window.requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <div>
      <canvas className="webgl" ref={canvasRef}></canvas>
    </div>
  );
}

export { RaycasterMouse };
