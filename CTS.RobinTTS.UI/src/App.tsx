import Home from "./Components/Home/Home";
import { AudioProvider } from './Contexts/AudioContext'


// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

function App() {
  return (
    <AudioProvider>
      <div>
        <Home />
      </div>
    </AudioProvider>
  )
}

export default App;
