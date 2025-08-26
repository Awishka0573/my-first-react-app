import { useState } from 'react'


const Card = ({title}) => {
  const [hasLiked , setHasLiked] = useState(false);
  return (
    <div className="card">
      <h2>{title}</h2>

      <button onClick={() => setHasLiked(true)}> 
        {hasLiked ? "💌" : "❤"}
        
      </button> 
    </div>
  )
}

const App = () => {


  return (
    <div className="card-container">
      <Card title="I" />
      <Card title="am" />
      <Card title="Awishka" />
      <Card title="Isuru"/>
      <Card title="Kumara"/>
    </div>
  )
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
