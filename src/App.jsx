import { Move } from './components/Movements/Move';
import { Groups } from './components/Movements/Groups';
import { Animation } from './components/Animations/Animation';
import { GsapAnimation } from './components/Animations/GsapAnimation';
import { Perspective } from './components/Cameras/Perspective';
import { Orthographic } from './components/Cameras/Orthographic';
import { Controls } from './components/Cameras/Controls';
import { ControlsAround } from './components/Cameras/ControlsAround';
import { Orbit } from './components/Cameras/Orbit';
import './App.css';

function App() {
  return (
    <div>
      {/* <h2>Movement</h2>
      <Move />
      <h2>Groups</h2>
      <Groups />
      <h3>Animation</h3>
      <Animation /> */}
      {/* <h1>Gsap Animation</h1>
      <GsapAnimation /> */}
      <h1>Controls Around</h1>
      <Orbit />
    </div>
  );
}

export default App;
