

import { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    if ( WebGL.isWebGLAvailable() ) {

      // Initiate function or other initializations here
      animate();
    
    } else {
    
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById( 'container' ).appendChild( warning );
    
    }
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;