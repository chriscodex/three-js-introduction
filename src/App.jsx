import { Move } from './components/Movements/Move';
import { Groups } from './components/Movements/Groups';
import { Animation } from './components/Animations/Animation';
import { GsapAnimation } from './components/Animations/GsapAnimation';
import { Perspective } from './components/Cameras/Perspective';
import { Orthographic } from './components/Cameras/Orthographic';
import { Controls } from './components/Cameras/Controls';
import { ControlsAround } from './components/Cameras/ControlsAround';
import { Orbit } from './components/Cameras/Orbit';
import { Fullscreen } from './components/Fullscreen/Fullscreen';
import { BufferGeometry } from './components/Geometries/BufferGeometry';
import { BufferGeometryMultiples } from './components/Geometries/BufferGeometryMultiples';
import { DatGUI } from './components/DebugUI/DatGUI';
import { Textures } from './components/Textures/Textures';
import { MeshBasicMaterial } from './components/Materials/MeshBasicMaterial';
import './App.css';

function App() {
  return (
    <div>
      <MeshBasicMaterial />
    </div>
  );
}

export default App;
