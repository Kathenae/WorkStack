import React, { createContext, useContext } from "react";

const CondtionalContext = createContext()

const Conditional = ({ children, showIf, nested }) => {
    if (nested === undefined) {
        return <>
            {showIf && children}
        </>
    }

    return <CondtionalContext.Provider value={showIf}>
        {children}
    </CondtionalContext.Provider>
}

Conditional.True = ({ children }) => {
    const { showIf } = useContext(CondtionalContext)
    return <>
        {showIf && children}
    </>
}

Conditional.False = ({ children }) => {
    const { showIf } = useContext(CondtionalContext)
    return <>
        {!showIf && children}
    </>
}

export default Conditional
