import React from "react";
import Dropdown from "./Dropdown";

const Card = ({ children, className = '' }) => {
    return (
        <div className={"bg-white relative shadow-sm sm:rounded-lg my-8 " + className}>
            {children}
        </div>
    )
}

const Content = ({ children, className = null }) => {
    return <div className={className ?? "p-6 text-gray-900"}>
        {children}
    </div>
}

const Options = ({ children }) => {
    return (
        <div className="absolute top-4 right-4">
            <Dropdown>
                <Dropdown.Trigger>
                    <button>
                        <i className="fi fi-rs-menu-dots text-gray-400 hover:text-gray-300"></i>
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    {children}
                </Dropdown.Content>
            </Dropdown>
        </div>
    )
}

const Link = ({ href, children }) => {
    return (
        <Dropdown.Link href={href}>
            {children}
        </Dropdown.Link>
    )
}

const Button = ({ onClick, children }) => {
    return (
        <Dropdown.Button onClick={onClick}>
            {children}
        </Dropdown.Button>
    )
}

Card.Content = Content;
Card.Options = Options;
Card.OptionLink = Link;
Card.OptionButton = Button;

export default Card;
