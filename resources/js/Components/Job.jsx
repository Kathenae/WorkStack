import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import SkillBadge from "./SkillBadge";

dayjs.extend(relativeTime)

export default function Job({ job }) {

    const [truncateDescrition, setTruncateDescription] = useState(true)

    const truncate = (text, length = 450) => {
        if (text.length <= length) {
            return text;
        }

        const new_text = text.slice(0, length);
        const lastSpaceIndex = new_text.lastIndexOf(" ");
        return new_text.slice(0, lastSpaceIndex) + "...";
    }

    const status = (status) => {
        let extraClasses = {
            'open': 'text-indigo-500',
            'closed': 'text-gray-300',
            'canceled': 'text-red-500',
            'completed': 'text-green-400',
        }

        return (
            <a
                href='/skills/frontend'
                className={'bg-transparent font-extrabold cursor-pointer rounded-xl ' + extraClasses[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </a>)
    }

    return (
        <div className="py-2">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className='font-semibold text-xl leading-tight mt-6'>
                            <a href="" className='hover:underline hover:text-indigo-700'>{job.title}</a>
                        </h2>
                        <small className='text-gray-400 text-sm mt-3'>
                            {job.type == 'fixed_price' ? "Fixed Price" : "Hourly"}
                            : ${job.min_price}-${job.max_price}
                            - Intermediate Level
                            <br />
                            Posted {dayjs(job.created_at).fromNow()}
                            - {status(job.status)}
                        </small>
                        <p className='mt-6 whitespace-pre-line'>{truncateDescrition ? truncate(job.description) : job.description}</p>
                        {job.description.length > 450 &&
                            <span
                                onClick={e => setTruncateDescription(!truncateDescrition)}
                                className='font-bold text-indigo-700 hover:underline hover:cursor-pointer'
                            >
                                {truncateDescrition ? "More" : "Less"}
                            </span>}

                        <div className='flex mt-4'>
                            {job.skills.map((skill) => {
                                return <SkillBadge key={skill.id} skill={skill} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
