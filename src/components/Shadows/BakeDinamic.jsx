import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function BakeDinamic() {
  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const bakedShadow = textureLoader.load('/textures/shadows/bakedShadow.jpg');
  const simpleShadow = textureLoader.load('/textures/shadows/simpleShadow.jpg');

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

  // Axis Helper
  const axisHelper = new THREE.AxesHelper();
  scene.add(axisHelper);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Material
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  material.roughness = 0.7;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(sphere, plane);

  /* Lights */
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.intensity = 2;
  scene.add(ambientLight);

  // PointLight
  const pointLight = new THREE.PointLight(0xffffff, 3);

  pointLight.position.set(2, 2, 2);
  scene.add(pointLight);

  // Spotlight helper
  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelper);

  const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      alphaMap: simpleShadow,
    })
  );
  sphereShadow.rotation.x = -Math.PI / 2;
  sphereShadow.position.y = plane.position.y + 0.01;
  scene.add(sphereShadow);

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

      // Update the sphere
      sphere.position.x = Math.cos(elapsedTime) * 1.2;
      sphere.position.z = Math.sin(elapsedTime) * 1.2;
      sphere.position.y = Math.abs(Math.sin(elapsedTime * 1.5));

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

export { BakeDinamic };
