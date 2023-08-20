import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

function HauntedHouse() {
  const gui = new dat.GUI();
  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

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

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = 0;

  scene.add(floor);

  const house = new THREE.Group();
  scene.add(house);

  // Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2, 4),
    new THREE.MeshBasicMaterial({ color: '#ac8e82' })
  );
  walls.position.y = 2 / 2;
  house.add(walls);

  // Roof
  // const roof = new THREE.Mesh(new THREE.ConeGeometry())

  /* Lights */
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  // gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
  scene.add(ambientLight);

  // Directional light
  const moonLight = new THREE.DirectionalLight('#ffffff', 0.5);
  moonLight.position.set(4, 5, -2);
  // gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
  // gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
  // gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
  // gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
  scene.add(moonLight);

  const moonLightHelper = new THREE.DirectionalLightHelper(moonLight, 1);
  scene.add(moonLightHelper);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 5;
  camera.position.y = 5;
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

export { HauntedHouse };
