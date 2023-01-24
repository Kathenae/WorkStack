import React from "react";

export default function Conditional({ children, showIf }) {
    return <>
        {showIf && children}
    </>
}
