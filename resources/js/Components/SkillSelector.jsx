import React, { useState } from "react";
import SkillBadge from '@/Components/SkillBadge';

export default function SkillSelector({ skills, form }) {
    const { data, setData } = form;
    const [skillName, setSkillName] = useState('')

    const selectSkills = (e) => {
        const skillId = e.target.options[e.target.selectedIndex].value

        if (data.skills.find(s => s == skillId)) {
            return;
        }

        const newSkills = [skillId, ...data.skills];
        setData('skills', newSkills);
        setSkillName('');
    }

    const removeSkill = (skill) => {
        const newSkills = data.skills.filter(s => s != skill.id)
        setData('skills', newSkills)
    }

    return (
        <div>
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
                {data.skills.map(skillId => {
                    const skill = skills.find(s => s.id == skillId);
                    return <SkillBadge key={skill.id} skill={skill} onClick={(e) => removeSkill(skill)} />
                })}
            </div>
        </div>
    );
}
