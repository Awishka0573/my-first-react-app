import React from 'react'

const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500 ">
         Hello world!
      </h1>
  </div>
  )
}

export default App




























// import { useEffect, useState } from 'react'


// const Card = ({title}) => {

//   const [count,setCount] = useState(0);
//   const [hasLiked , setHasLiked] = useState(false);

//   useEffect(() => {
//     console.log('${title} has been liked  : ${hasLiked}');
//   },  [hasLiked, title]);


//   return (
//     <div className="card" onClick={() => setCount(count + 1)}>
//       <h2>{title} <br /> {count || } </h2>

//       <button onClick={() => setHasLiked(!hasLiked)}> 
//         {hasLiked ? "💌" : "❤"}
        
//       </button> 
//     </div>
//   )
// }

// const App = () => {


//   return (
//     <div className="card-container">
//       <Card title="I" />
//       <Card title="am" />
//       <Card title="Awishka" />
//       <Card title="Isuru"/>
//       <Card title="Kumara"/>
//     </div>
//   )
// }


// export default App;
