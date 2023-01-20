import React, { useState } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import SkillBadge from '@/Components/SkillBadge';


export default function JobForm({ form, onSubmit, skills }) {

    const { data, setData, processing, errors } = form;

    const [skillName, setSkillName] = useState('')

    const selectSkills = (e) => {
        const selectedSkill = e.target.options[e.target.selectedIndex].value

        if (data.skills.find(s => s == selectedSkill)) {
            return;
        }

        const newSkills = [selectedSkill, ...data.skills];
        setData('skills', newSkills);
        setSkillName('');
    }

    const removeSkill = (skill) => {
        const newSkills = data.skills.filter(s => s != skill.id)
        setData('skills', newSkills)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Job Form</h2>
            <div className='my-6'>
                <InputLabel forInput="">Title</InputLabel>
                <input
                    type='text'
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    placeholder="Job Title"
                    className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                />
                <InputError message={errors.title} className="mt-2" />
            </div>
            <div className='my-6'>
                <InputLabel forInput="">Description</InputLabel>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    placeholder="Describe the job..."
                    className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    rows="10"
                >
                </textarea>
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="my-6">
                <InputLabel forInput="">Job Type</InputLabel>
                <div className='flex mt-2'>
                    <div className='flex mr-6'>
                        <input type="radio" className='mr-2' name="type" value="fixed_price" onChange={e => e.target.checked && setData('type', 'fixed_price')} />
                        <InputLabel forInput="">Fixed Price</InputLabel>
                    </div>
                    <div className='flex'>
                        <input type="radio" className='mr-2' name="type" value="hourly" onChange={e => e.target.checked && setData('type', 'hourly')} />
                        <InputLabel forInput="">Hourly</InputLabel>
                    </div>
                </div>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="my-6">
                <InputLabel forInput="">Price (USD)</InputLabel>
                <div className='flex'>
                    <input
                        type='number'
                        value={data.min_price}
                        onChange={e => setData('min_price', e.target.value)}
                        placeholder="Minimum Price"
                        className='block mr-4 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    />
                    <input
                        type='number'
                        value={data.max_price}
                        onChange={e => setData('max_price', e.target.value)}
                        placeholder="Maximum Price"
                        className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    />
                </div>
                <InputError message={errors.min_price} className="mt-2" />
                <InputError message={errors.max_price} className="mt-2" />
            </div>

            <div className="my-6">
                <InputLabel forInput="">Skills</InputLabel>
                <div className='relative'>
                    <input
                        type='text'
                        value={skillName}
                        onChange={e => setSkillName(e.target.value)}
                        placeholder="What skills are you looking for?"
                        className='block mr-4 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    />
                    {skillName.length > 0 &&
                        <select
                            multiple
                            onChange={selectSkills}
                            className="block mr-4 absolute bottom-10 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            {skills.filter(s => s.name.toLowerCase().includes(skillName.toLowerCase())).map((skill) => (
                                <option key={skill.id} value={skill.id}>{skill.name}</option>
                            ))}
                        </select>
                    }
                </div>

                <div className='mt-4'>
                    {data.skills.map(skill_id => {
                        const skill = skills.find(s => s.id == skill_id);
                        return <SkillBadge key={skill.id} skill={skill} onClick={(e) => removeSkill(skill)} />
                    })}
                </div>

            </div>
            <PrimaryButton className='mt-4' processing={processing}>Publish</PrimaryButton>
        </form>
    )
}
