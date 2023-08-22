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
// import { DatGUI } from './components/DebugUI/DatGUI';
import { Textures } from './components/Textures/Textures';
import { MeshBasicMaterial } from './components/Materials/MeshBasicMaterial';
import { MeshNormalMaterial } from './components/Materials/MeshNormalMaterial';
import { MeshMatcapMaterial } from './components/Materials/MeshMatcapMaterial';
import { MeshDepthMaterial } from './components/Materials/MeshDepthMaterial';
import { MeshLambartMaterial } from './components/Materials/MeshLambartMaterial';
import { MeshPhongMaterial } from './components/Materials/MeshPhongMaterial';
import { MeshToonMaterial } from './components/Materials/MeshToonMaterial';
import { MeshStandarMaterial } from './components/Materials/MeshStandarMaterial';
import { EnvironmentMap } from './components/Materials/EnvironmentMap';
import { Text3D } from './components/Text3D/Text3D';
import { AmbientLights } from './components/Lights/AmbientLights';
import { DirectionalLights } from './components/Lights/DirectionalLights';
import { Hemisphere } from './components/Lights/Hemisphere';
import { PointLight } from './components/Lights/PointLight';
import { RectLight } from './components/Lights/RectLight';
import { Spotligh } from './components/Lights/Spotligh';
import { ShadowsDirectional } from './components/Shadows/ShadowsDirectional';
import { ShadowsSpotlight } from './components/Shadows/ShadowsSpotlight';
import { ShadowsPointlight } from './components/Shadows/ShadowsPointlight';
import { Bake } from './components/Shadows/Bake';
import { BakeDinamic } from './components/Shadows/BakeDinamic';
import { HauntedHouse } from './components/HauntedHouse/HauntedHouse';
import { ParticlesSphere } from './components/Particles/ParticlesSphere';
import { Particles } from './components/Particles/Particles';
import { ParticlesColors } from './components/Particles/ParticlesColors';
import { ParticlesWave } from './components/Particles/ParticlesWave';
import './App.css';

function App() {
  return (
    <div>
      <ParticlesWave />
    </div>
  );
}

export default App;
