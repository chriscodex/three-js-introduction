import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'

function Raycaster() {
  const gui = new dat.GUI({ width: 400 });

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

  gui.add(ambientLight, 'intensity').min(0).max(1).setValue(0.01);
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

  // Material
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 0.4;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.position.x = -1.5;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );
  torus.position.x = 1.5;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(sphere, cube, torus, plane);

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

export { Raycaster };
