import { useState } from 'react'
import './App.css'
import React from 'react';
import Timer from './components/Timer';
import Memes from './components/Memes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>ProcrasTech Timer!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
          <p>
              <div>
                  <Timer/>
                  <Memes/>
              </div>
          </p>
      </div>
        <p className="read-the-docs">
      </p>
    </>
  )
}

export default App
