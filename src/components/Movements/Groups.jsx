import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Groups() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    /* Using groups */
    const group1 = new THREE.Group();
    scene.add(group1);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    group1.add(cube1);
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    cube2.position.x = -1.5;
    group1.add(cube2);
    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    cube3.position.x = 1.5;
    group1.add(cube3);

    group1.position.y = 1;
    group1.rotation.y = Math.PI / 4;

    const sizes = {
      width: 800,
      height: 600,
    };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 4;
    camera.position.x = 1;
    camera.position.y = 1;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export { Groups };
