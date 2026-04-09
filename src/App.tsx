import { useState } from 'react'
import './App.css'
import Bible from './Bible'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Bible Tests</h1>
          <p>
            test
          </p>

        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <Bible></Bible>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
