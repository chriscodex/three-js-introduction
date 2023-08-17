import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function Text3D() {

  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const matcapTexture = textureLoader.load('/class12/textures/matcaps/3.png');

  const fontLoader = new FontLoader();

  fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Hello Three.js', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });

    // Centrar el texto 3D
    // textGeometry.computeBoundingBox();
    // textGeometry.translate(
    //   - (textGeometry.boundingBox.max.x - 0.02) / 2,
    //   - (textGeometry.boundingBox.max.y - 0.02) / 2,
    //   - (textGeometry.boundingBox.max.z - 0.03) / 2,
    // )
    textGeometry.center();

    // console.log(textGeometry.boundingBox);

    const material = new THREE.MeshMatcapMaterial();
    material.matcap = matcapTexture;
    // material.wireframe = true;
    // material.color = new THREE.Color(0x00ff00);

    const text = new THREE.Mesh(textGeometry, material);

    scene.add(text);

    console.time('donuts');

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 500; i++) {
      const donut = new THREE.Mesh(donutGeometry, material);

      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.x = scale;
      donut.scale.y = scale;
      donut.scale.z = scale;
      scene.add(donut);
    }
    console.timeEnd('donuts');
  });

  // Canvas
  const canvasRef = useRef(null);

  // Scene - Like the scenario
  const scene = new THREE.Scene();

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

export { Text3D };
