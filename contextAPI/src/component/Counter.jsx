import React from 'react'

const Counter = (props) => {

    const increment = () => {
        props.setCount(prev => prev + 1)
    }

    const decrement = () => {
        props.setCount(prev => prev - 1)
    }

    return (
        <section className='flex gap-3'>
            <button onClick={decrement} className='bg-amber-500 px-3 py-2 rounded-md'>Decrement</button>
            <button onClick={increment} className='bg-amber-500 px-3 py-2 rounded-md'>Increment</button>
        </section>
    )
}

export default Counter