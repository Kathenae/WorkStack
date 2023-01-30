import React from "react";

export default function SkillBadge({ skill, onClick }) {
    return (
        <span
            onClick={onClick}
            className='bg-transparent p-1 ml-2 mt-2 inline-block text-sm font-semibold text-indigo-600 border-indigo-600 border-2 hover:text-indigo-500 cursor-pointer rounded-xl'
        >
            {skill.name}
        </span>
    )
}
