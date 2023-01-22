import React, { useState } from "react";
import SkillBadge from '@/Components/SkillBadge';
import api from "@/api";
import PrimaryButton from "./PrimaryButton";

export default function SkillSelector({ skills, form }) {
    const { data, setData } = form;
    const [createdSkills, setCreatedSkills] = useState([])
    const [skillName, setSkillName] = useState('')

    const selectSkills = (e) => {
        const skillId = e.target.options[e.target.selectedIndex].value

        // If the skills has already been added
        if (data.skills.find(s => s == skillId)) {
            return;
        }

        setData('skills', [skillId, ...data.skills]);
        setSkillName('');
    }

    const removeSkill = (skill) => {
        setData('skills', data.skills.filter(s => s != skill.id))
    }

    const addSkill = (e) => {
        e.preventDefault();

        api.post('/skills/sync', {
            'name': skillName
        })
            .then(response => {
                const skill = response.data;

                // If the skills has already been added
                if (data.skills.find(s => s == skill.id)) {
                    return;
                }

                setCreatedSkills([skill, ...createdSkills]);
                setData('skills', [skill.id, ...data.skills]);
                setSkillName('');
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div>
            <div className='relative'>
                <div className="flex">
                    <input
                        type='text'
                        value={skillName}
                        onChange={e => setSkillName(e.target.value)}
                        placeholder="What skills are you looking for?"
                        className='block mr-4 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    />
                    <PrimaryButton onClick={addSkill}>Add</PrimaryButton>
                </div>
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
                    let skill = skills.find(s => s.id == skillId);

                    if (skill == null) {
                        skill = createdSkills.find(s => s.id == skillId);
                    }

                    return <SkillBadge key={skill.id} skill={skill} onClick={(e) => removeSkill(skill)} />
                })}
            </div>
        </div>
    );
}
