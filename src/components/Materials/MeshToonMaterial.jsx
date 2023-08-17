import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mapCap from '/class12/textures/matcaps/3.png';
import gradientTxt from '/class12/textures/gradients/5.jpg';

function MeshToonMaterial() {
  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();

  const textureLoader = new THREE.TextureLoader(loadingManager);

  const gradiantTexture = textureLoader.load(gradientTxt);
  gradiantTexture.minFilter = THREE.NearestFilter
  gradiantTexture.magFilter = THREE.NearestFilter
  // gradiantTexture.generateMipmaps = false;

  // Canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene - Like the scenario
    const scene = new THREE.Scene();

    // Material
    const material = new THREE.MeshToonMaterial();
    material.gradientMap = gradiantTexture

    // Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      material
    );
    sphere.position.x = -1.5;
    // Plane
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1), material);
    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 16, 32),
      material
    );
    torus.position.x = 1.5;
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

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 3;
    // camera.lookAt(mesh.position);
    scene.add(camera);

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
      plane.rotation.y = elapsedTime * 0.1;
      plane.rotation.x = elapsedTime * 0.15;
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

export { MeshToonMaterial }