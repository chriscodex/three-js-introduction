import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import * as dat from 'dat.gui';

function Shadows() {
  const gui = new dat.GUI({ width: 400 });

  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();

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
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 0.7;
  gui.add(material, 'metalness').min(0).max(1).step(0.001);
  gui.add(material, 'roughness').min(0).max(1).step(0.001);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.position.x = -1.5;
  sphere.castShadow = true;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  );
  cube.castShadow = true;

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );
  torus.position.x = 1.5;
  torus.castShadow = true;

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;
  plane.receiveShadow = true;

  scene.add(sphere, cube, torus, plane);

  /* Lights */
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.intensity = 2;
  scene.add(ambientLight);
  // gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);

  // Directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, -1);

  directionalLight.castShadow = true;
  
  directionalLight.shadow.mapSize.width = 1024 ;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.camera.near = 0;
  directionalLight.shadow.camera.far = 8;
  // directionalLight.shadow.camera.top = 2;
  // directionalLight.shadow.camera.right = 2;
  // directionalLight.shadow.camera.bottom = -2;
  // directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.radius = 10;

  scene.add(directionalLight)

  gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
  gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
  gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
  gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);

  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    1
  );
  scene.add(directionalLightHelper);

  const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  scene.add(directionalLightCameraHelper)

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

    // Types of render shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.shadowMap.enabled = true;

    /* Animations */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      cube.rotation.y = elapsedTime * 0.1;
      cube.rotation.x = elapsedTime * 0.15;
      sphere.rotation.y = elapsedTime * 0.1;
      sphere.rotation.x = elapsedTime * 0.15;
      torus.rotation.y = elapsedTime * 0.1;
      torus.rotation.x = elapsedTime * 0.15;

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

export { Shadows };
