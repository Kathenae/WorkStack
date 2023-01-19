import React from "react";

export default function SkillBadge({ skill, onClick }) {
    return (
        <span
            onClick={onClick}
            className='
                bg-transparent
                p-2
                mx-1
                font-semibold
                text-indigo-800
                border-indigo-800 border-2
                hover:text-indigo-500
                cursor-pointer
                rounded-xl'
        >
            {skill.name}
        </span>
    )
}
