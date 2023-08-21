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

  const doorColorTexture = textureLoader.load(
    '/16-hauntedHouse/door/color.jpg'
  );
  const doorAlphaTexture = textureLoader.load(
    '/16-hauntedHouse/door/alpha.jpg'
  );
  const doorAmbientOclusionTexture = textureLoader.load(
    '/16-hauntedHouse/door/ambientOcclusion.jpg'
  );
  const doorHeightTexture = textureLoader.load(
    '/16-hauntedHouse/door/height.jpg'
  );
  const doorNormalTexture = textureLoader.load(
    '/16-hauntedHouse/door/normal.jpg'
  );
  const doorMatalnessTexture = textureLoader.load(
    '/16-hauntedHouse/door/metalness.jpg'
  );
  const doorRoughnessTexture = textureLoader.load(
    '/16-hauntedHouse/door/roughness.jpg'
  );

  const bricksColorTexture = textureLoader.load(
    '/16-hauntedHouse/bricks/color.jpg'
  );
  const bricksAmbientOclusionTexture = textureLoader.load(
    '/16-hauntedHouse/bricks/ambientOcclusion.jpg'
  );
  const bricksNormalTexture = textureLoader.load(
    '/16-hauntedHouse/bricks/normal.jpg'
  );
  const bricksRoughnessTexture = textureLoader.load(
    '/16-hauntedHouse/bricks/roughness.jpg'
  );

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

  // Axis Helper
  const axisHelper = new THREE.AxesHelper();
  scene.add(axisHelper);

  // Fog
  const fog = new THREE.Fog('#262837', 0.5, 15);
  scene.fog = fog;

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
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: '#ac8e82' })
  );
  walls.position.y = 2.5 / 2;
  house.add(walls);

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
  );
  roof.position.y = 2.5 + 1 / 2;
  roof.rotation.y = Math.PI / 4;
  house.add(roof);

  // Door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMatalnessTexture,
      roughnessMap: doorRoughnessTexture,
    })
  );
  door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  );
  door.position.z = 2 + 0.001;
  door.position.y = 2 / 2;
  house.add(door);

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(0.8, 0.2, 2.2);

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.4, 0.1, 2.1);

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.4, 0.4, 0.4);
  bush3.position.set(-0.8, 0.1, 2.2);

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.scale.set(0.15, 0.15, 0.15);
  bush4.position.set(-1, 0.05, 2.6);

  house.add(bush1, bush2, bush3, bush4);

  // Graves
  const graves = new THREE.Group();
  scene.add(graves);

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.4, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
  }

  /* Lights */
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.12);
  // gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
  scene.add(ambientLight);

  // Directional light
  const moonLight = new THREE.DirectionalLight('#ffffff', 0.12);
  moonLight.position.set(4, 5, -2);
  // gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
  // gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
  // gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
  // gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
  scene.add(moonLight);

  const moonLightHelper = new THREE.DirectionalLightHelper(moonLight, 1);
  scene.add(moonLightHelper);

  // Door Light
  const doorLight = new THREE.PointLight('#ff7d46', 2, 7);
  doorLight.position.set(0, 2.2, 2.7);
  house.add(doorLight);

  const doorLightHelper = new THREE.PointLightHelper(doorLight, 0.1);
  house.add(doorLightHelper);

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
    renderer.setClearColor('#262837');

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
