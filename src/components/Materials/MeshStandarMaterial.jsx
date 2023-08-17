import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mapCap from '/class12/textures/matcaps/3.png';
import gradientTxt from '/class12/textures/gradients/5.jpg';
import * as dat from 'dat.gui';

function MeshStandarMaterial() {
  const gui = new dat.GUI({ width: 400 });

  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();

  const textureLoader = new THREE.TextureLoader(loadingManager);

  const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
  const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
  const doorAmbientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg'
  );
  const doorMetalnessTexture = textureLoader.load('/textures/door/alpha.jpg');
  const doorRoughnessTexture = textureLoader.load(
    '/textures/door/roughness.jpg'
  );

  const matcapTexture = textureLoader.load(mapCap);

  const gradiantTexture = textureLoader.load(gradientTxt);
  gradiantTexture.minFilter = THREE.NearestFilter;
  gradiantTexture.magFilter = THREE.NearestFilter;

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

  // Material
  const material = new THREE.MeshStandardMaterial();
  material.map = doorColorTexture;
  // material.metalness = 0.45;
  // material.roughness = 0.65;
  material.aoMap = doorAmbientOcclusionTexture;
  material.aoMapIntensity = 3;
  material.displacementMap = doorHeightTexture;
  material.displacementScale = 0.05;
  material.metalnessMap = doorMetalnessTexture;
  material.roughnessMap = doorRoughnessTexture;
  material.normalMap = doorNormalTexture;
  material.normalScale.set(1, 1);
  material.transparent = true;
  material.alphaMap = doorAlphaTexture;

  gui.add(material, 'metalness').min(0).max(1).step(0.0001);
  gui.add(material, 'roughness').min(0).max(1).step(0.0001);
  gui.add(material, 'aoMapIntensity').min(0).max(15).step(0.001);
  gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

  // Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
  );
  sphere.position.x = -1.5;
  sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );

  // Plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 1, 100, 100),
    material
  );

  plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  // Torus
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
  );
  torus.position.x = 1.5;
  torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
  );

  scene.add(sphere, plane, torus);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 50);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

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

      // Update rotation objects
      sphere.rotation.y = elapsedTime * 0.1;
      sphere.rotation.x = elapsedTime * 0.15;
      plane.rotation.y = elapsedTime * 0.05;
      plane.rotation.x = -elapsedTime * 0.05;
      torus.rotation.y = elapsedTime * 0.1;
      torus.rotation.x = elapsedTime * 0.15;

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

export { MeshStandarMaterial };
