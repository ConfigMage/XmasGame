import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import HostGame from './pages/HostGame'
import PlayerGame from './pages/PlayerGame'
import SoloGame from './pages/SoloGame'

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen festive-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<HostGame />} />
          <Route path="/host/:roomCode" element={<HostGame />} />
          <Route path="/play" element={<PlayerGame />} />
          <Route path="/play/:roomCode" element={<PlayerGame />} />
          <Route path="/solo" element={<SoloGame />} />
          <Route path="/solo/:gameId" element={<SoloGame />} />
        </Routes>
      </div>
    </GameProvider>
  )
}

export default App
