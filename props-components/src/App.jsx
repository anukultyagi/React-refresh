import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  const userItem = [
    {
      name: "anukul",
      age: 18
    },
    {
      name: "tyagi",
      age: 21
    }
  ]
  return (
    <>
      <main>
        {
          userItem.map((item,i) => {
            return <div key={i}><Card user={item.name} age={item.age} /></div>
          })
        }
      </main>
    </>
  )
}

export default App
