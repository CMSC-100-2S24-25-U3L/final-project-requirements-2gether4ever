import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className=''>Vite + React</h1>
      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
      <button className="btn btn-accent">Accent Button</button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl border-1">
        <figure><img src={viteLogo} alt="Card image" /></figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>Some description about the card</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
