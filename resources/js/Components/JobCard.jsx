import React, { useState } from "react";
import Dropdown from "./Dropdown";
import DangerButton from "./DangerButton";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import { Link, router, usePage } from "@inertiajs/react";
import JobContent from "./JobContent";
import Card from "./Card";
import Conditional from "./Conditional";

export default function JobCard({ job }) {

    const { auth } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (event) => {
        setIsDeleting(true)
        router.delete(route('jobs.destroy', job.id), { onFinish: () => setIsDeleting(false) });
    }

    return (
        <>
            <Card>
                <Card.Content>
                    <JobContent job={job} />
                </Card.Content>
                <Card.Options>
                    <Conditional showIf={auth.user && job.user.id == auth.user.id}>
                        <Card.OptionLink href={route('jobs.edit', job.id)}>
                            <i className="fi fi-rs-edit ml-2"></i> Edit
                        </Card.OptionLink>
                        <Card.OptionButton onClick={e => setShowDeleteModal(!showDeleteModal)}>
                            <span className="text-red-600"><i className="fi fi-rs-trash ml-2"></i> Delete</span>
                        </Card.OptionButton>
                    </Conditional>
                    <Card.OptionButton onClick={e => alert('Job Post Reported')}>
                        <span className="text-red-600"><i className="fi fi-rs-comment-exclamation ml-2"></i> Report</span>
                    </Card.OptionButton>
                </Card.Options>
            </Card>
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
