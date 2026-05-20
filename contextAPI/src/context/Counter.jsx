import { createContext, useState } from "react";

export const CounterContext = createContext(null)

export const CounterContextProvider = (props) => {

    const [count, setCount] = useState(0)

    const values = { count, setCount }

    return (
        <CounterContext.Provider value={values}>
            {props.children}
        </CounterContext.Provider>
    )
}