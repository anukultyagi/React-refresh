import { useContext, useState } from 'react'
import Counter from './component/Counter'
import { CounterContext } from './context/Counter'


function App() {
  const counterState = useContext(CounterContext)

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-stone-600'>
      <h1 className='p-3'>main</h1>
      <h1>count is {counterState.count}</h1>
      <Counter setCount={counterState.setCount} />
    </div>
  )
}

export default App
