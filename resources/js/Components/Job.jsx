import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import SkillBadge from "./SkillBadge";
import Dropdown from "./Dropdown";
import DangerButton from "./DangerButton";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import { Link, router, usePage } from "@inertiajs/react";

dayjs.extend(relativeTime)

export default function Job({ job }) {

    const { auth } = usePage().props;
    const [isShowingMore, setIsShowingMore] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const truncate = (text, length = 450) => {
        if (text.length <= length) {
            return text;
        }

        const new_text = text.slice(0, length);
        const lastSpaceIndex = new_text.lastIndexOf(" ");
        return new_text.slice(0, lastSpaceIndex) + "...";
    };

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

    const handleDelete = async (event) => {
        setIsDeleting(true)
        router.delete(route('jobs.destroy', job.id), { onFinish: () => setIsDeleting(false) });
    }

    return (
        <>
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden relative shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className='font-semibold text-xl leading-tight mt-6'>
                                <Link href={route('jobs.show', job.id)} className='hover:underline hover:text-indigo-700'>{job.title}</Link>
                            </h2>
                            <small className='text-gray-400 text-sm mt-3'>
                                {job.type == 'fixed_price' ? "Fixed Price" : "Hourly"}
                                : ${job.min_price}-${job.max_price}
                                - Intermediate Level
                                <br />
                                Posted {dayjs(job.created_at).fromNow()}
                                - {status(job.status)}
                            </small>
                            <p className='mt-6 whitespace-pre-line'>{isShowingMore ? job.description : truncate(job.description)}</p>
                            {job.description.length > 450 &&
                                <span
                                    onClick={e => setIsShowingMore(!isShowingMore)}
                                    className='font-bold text-indigo-700 hover:underline hover:cursor-pointer'
                                >
                                    {isShowingMore ? "Less" : "More"}
                                </span>
                            }

                            <div className='mt-4'>
                                {job.skills.map((skill) => {
                                    return <SkillBadge key={skill.id} skill={skill} />
                                })}
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <i className="fi fi-rs-menu-dots text-gray-400 hover:text-gray-300"></i>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {job.user.id == auth.user.id &&
                                        <>
                                            <Dropdown.Link href={route('jobs.edit', job.id)}>
                                                <i className="fi fi-rs-edit ml-2"></i> Edit
                                            </Dropdown.Link>
                                            <Dropdown.Button onClick={e => setShowDeleteModal(!showDeleteModal)}>
                                                <span className="text-red-600"><i className="fi fi-rs-trash ml-2"></i> Delete</span>
                                            </Dropdown.Button>
                                        </>
                                    }
                                    <Dropdown.Button onClick={e => alert('Job Post Reported')}>
                                        <span className="text-red-600"><i className="fi fi-rs-comment-exclamation ml-2"></i> Report</span>
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showDeleteModal} closeable={true}>
                <div className="p-1 flex flex-col">
                    <h3 className="text-md font-bold p-3">Please Confirm</h3>
                    <hr />
                    <div className="p-4">
                        <p className="">Are you sure you want to delete this Job Posting?</p>
                        <div className="mt-4">
                            <DangerButton className="mr-3" processing={isDeleting} onClick={handleDelete}>Confirm</DangerButton>
                            <SecondaryButton onClick={e => setShowDeleteModal(false)}>Cancel</SecondaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
