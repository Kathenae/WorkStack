import React from "react";

export default function Container({ children, className }) {
    return (
        <div className={"pt-12 pb-6 " + className}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}
