import { useState } from 'react'
import './App.css'
import { VideoRoom } from './components/VideoRoom';

function App() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="App">
      <h1>Virtual Call with Virtual background</h1>
      <h3>Test 4</h3>
      {
        !joined
          ? (
            <button
              onClick={() => setJoined(true)}
            >
              Join Room
            </button>

          )

          : (
            <VideoRoom />
          )
      }

    </div>
  )
}

export default App
