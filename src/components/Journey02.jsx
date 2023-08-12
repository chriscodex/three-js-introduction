import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Journey02() {
  // Canvas
  const canvasRef = useRef(null);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export { Journey02 };
