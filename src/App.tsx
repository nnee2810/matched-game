import React from "react"
import "./App.css"
import Board from "./components/Board"

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Board />
      </main>
    </div>
  )
}

export default App
