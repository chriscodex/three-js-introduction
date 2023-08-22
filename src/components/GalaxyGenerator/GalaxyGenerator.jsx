import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';

function GalaxyGenerator() {
  const gui = new dat.GUI({ width: 400 });

  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

  /* Galaxy */
  const parameters = {};
  parameters.count = 1000;
  parameters.size = 0.02;
  parameters.radius = 5;

  let geometry = null;
  let material = null;
  let points = null;

  const generateGalaxy = () => {
    // Destroy old galaxy
    if (points !== null) {
      geometry.dispose();
      material.dispose();
      scene.remove(points);
    }
    // Geometry
    geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(parameters.count * 3);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * 3;
      positions[i3 + 2] = (Math.random() - 0.5) * 3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Points
    points = new THREE.Points(geometry, material);
    scene.add(points);
  };

  generateGalaxy();

  gui
    .add(parameters, 'count')
    .min(100)
    .max(100000)
    .step(100)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, 'size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy);
  gui
    .add(parameters, 'radius')
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(generateGalaxy);
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

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Material
  const materialCube = new THREE.MeshStandardMaterial();
  materialCube.roughness = 0.4;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    materialCube
  );

  scene.add(cube);

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

export { GalaxyGenerator };
