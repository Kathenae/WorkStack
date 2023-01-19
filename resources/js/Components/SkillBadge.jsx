import React from "react";

export default function SkillBadge({ skill, onClick }) {
    return (
        <span
            onClick={onClick}
            className='
                bg-transparent
                p-2
                ml-2
                mt-2
                inline-block
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
