import { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    // Orbit controlls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add FPS stats.
    const stats = Stats();
    document.body.appendChild(stats.dom);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/smoliv/scene.gltf', (gltfScene) => {
      // transform & scale
      // gltfScene.scene.rotation.y = Math.PI / 8;
      // gltfScene.scene.position.y = 3;
      // gltfScene.scene.scale.set(10,10,10);

      scene.add(gltfScene.scene);
    })

    const animate = () => {
      stats.update();
      controls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
