import React, { useEffect, useState } from "react";
import SkillBadge from '@/Components/SkillBadge';
import api from "@/api";
import PrimaryButton from "./PrimaryButton";

export default function SkillSelector({ skills, form }) {
    const { data: { skills: selectedSkills }, setData } = form;
    const [newSkills, setnewSkills] = useState([])
    const [skillName, setSkillName] = useState('')
    const [showSelections, setshowSelections] = useState(false)

    useEffect(() => {

        const handleShowSelection = (event) => {
            const target = event.target;
            const clickedOnParent = target.parentElement && target.parentElement.id == 'selectionElement';
            if (target.id === 'inputElement' || target.id === 'selectionElement' || clickedOnParent) {
                setshowSelections(true);
            }
            else {
                setshowSelections(false);
            }
        }

        document.addEventListener('click', handleShowSelection, true);

        return () => {
            document.removeEventListener('click', handleShowSelection, true);
        }
    })

    const selectSkill = (skill) => {

        // If the skills has already been added
        if (selectedSkills.find(s => s == skill.id)) {
            return;
        }

        setData('skills', [skill.id, ...selectedSkills]);
        setSkillName('');
    }

    const removeSkill = (skill) => {
        setData('skills', selectedSkills.filter(s => s != skill.id))
    }

    const addSkill = async (e) => {
        e.preventDefault();

        if (skillName.length <= 0) {
            return;
        }

        try {
            const response = await api.post('/skills/sync', {
                'name': skillName
            })

            const skill = response.data;

            if (selectedSkills.find(s => s == skill.id)) {
                return;
            }

            setnewSkills([skill, ...newSkills]);
            setData('skills', [skill.id, ...selectedSkills]);
            setSkillName('');
        } catch (error) {
            console.error(error)
        }
    }

    const filteredSkills = () => {
        return skills.filter(s => s.name.toLowerCase().includes(skillName.toLowerCase()))
    }

    return (
        <div>
            <div className='relative'>
                <div className="flex">
                    <div className="w-full relative">
                        <input
                            id="inputElement"
                            type='text'
                            value={skillName}
                            onChange={e => setSkillName(e.target.value)}
                            placeholder="What skills are you looking for?"
                            className='block rounded-r-none mr-4 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                        />
                        {showSelections && skillName.length > 0 && filteredSkills().length > 0 &&
                            <div
                                id="selectionElement"
                                className="block absolute bg-gray-50 hover:border-indigo-300 hover:ring hover:ring-indigo-200 hover:ring-opacity-50 border-gray-200 border-2 bottom-12 w-full min-h-0 max-h-96 overflow-y-auto p-4 rounded-md shadow-lg"
                            >
                                {filteredSkills().map((skill) => (
                                    <SkillBadge key={skill.id} skill={skill} onClick={(e) => selectSkill(skill)}>{skill.name}</SkillBadge>
                                ))}
                            </div>
                        }
                    </div>
                    <PrimaryButton onClick={addSkill} className="rounded-l-none">Add</PrimaryButton>
                </div>
            </div>

            <div className='mt-4'>
                {selectedSkills.map(skillId => {
                    let skill = skills.find(s => s.id == skillId);

                    if (skill == null) {
                        skill = newSkills.find(s => s.id == skillId);
                    }

                    return <SkillBadge key={skill.id} skill={skill} onClick={(e) => removeSkill(skill)} />
                })}
            </div>
        </div>
    );
}
