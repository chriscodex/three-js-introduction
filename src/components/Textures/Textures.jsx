import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import colorImage from '/public/textures/door/color.jpg';

function Textures() {
  /* Textures */
  // Loading manager
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log('on Start');
  };
  loadingManager.onLoad = () => {
    console.log('on Load');
  };
  loadingManager.onProgress = () => {
    console.log('on Progress');
  };
  loadingManager.onError = () => {
    console.log('on Error');
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorTexture = textureLoader.load('/public/textures/door/color.jpg');
  const alphaTexture = textureLoader.load('/public/textures/door/alpha.jpg');
  const heightTexture = textureLoader.load('/public/textures/door/height.jpg');
  const normalTexture = textureLoader.load('/public/textures/door/normal.jpg');
  const ambientOcclusionTexture = textureLoader.load(
    '/public/textures/door/ambientOcclusion.jpg'
  );
  const metalnessTexture = textureLoader.load(
    '/public/textures/door/alpha.jpg'
  );
  const roughnessTexture = textureLoader.load(
    '/public/textures/door/alpha.jpg'
  );

  // colorTexture.repeat.x = 2
  // colorTexture.repeat.y = 3

  // colorTexture.wrapS = THREE.RepeatWrapping
  // colorTexture.wrapT = THREE.RepeatWrapping

  // colorTexture.wrapS = THREE.MirroredRepeatWrapping
  // colorTexture.wrapT = THREE.MirroredRepeatWrapping

  // colorTexture.offset.x = 0.5
  // colorTexture.offset.y = 0.5

  // colorTexture.rotation = Math.PI / 4
  // colorTexture.center.x = 0.5
  // colorTexture.center.y = 0.5

  // Canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene - Like the scenario
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: colorTexture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // console.log(geometry.attributes.uv);

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

    // Fullscreen Mode
    window.addEventListener('dblclick', () => {
      const canvas = canvasRef.current;

      if (canvas) {
        if (canvas.requestFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            canvas.requestFullscreen();
          }
        } else if (canvas.mozRequestFullScreen) {
          if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
          } else {
            canvas.mozRequestFullScreen();
          }
        } else if (canvas.webkitRequestFullscreen) {
          if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
          } else {
            canvas.webkitRequestFullscreen();
          }
        } else if (canvas.msRequestFullscreen) {
          if (document.msFullscreenElement) {
            document.msExitFullscreen();
          } else {
            canvas.msRequestFullscreen();
          }
        }
      }
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      100
    );
    camera.position.z = 3;
    camera.lookAt(mesh.position);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    // controls.target.y = 1;
    // controls.target.x = 1;
    // controls.update();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    /* Animations */
    const tick = () => {
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

export { Textures };
