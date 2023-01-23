import DangerButton from "@/Components/DangerButton";
import Job from "@/Components/Job";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";

export default function Show({ job, proposal, auth, errors }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Proposal</h2>}
        >
            <Head title="Show Proposal" />
            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white mx-8 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="font-semibold text-2xl text-gray-800 leading-tight">Proposal - {job.title}</h2>
                            <small className='text-gray-400 text-sm mt-3'>
                                By {proposal.user.name} - Price - ${proposal.price}
                            </small>
                            <Link href={route('jobs.show', job.id)} className='font-semibold text-indigo-600 hover:underline block mt-4'>View Job Details</Link>
                            <div className="my-12">
                                <small className="font-semibold text-xl text-gray-800 leading-tight">Cover Letter</small>
                                <p className='whitespace-pre-line border-2 border-gray-100 p-6 rounded-md'>{proposal.coverLetter}</p>
                            </div>
                            {auth.user && auth.user.id == job.user.id &&
                                <div className="space-x-2">
                                    <PrimaryButton>Accept</PrimaryButton>
                                    <SecondaryButton>Decline</SecondaryButton>
                                </div>
                            }
                            {auth.user && auth.user.id == proposal.user.id &&
                                <div className="space-x-2">
                                    <PrimaryButton>Edit</PrimaryButton>
                                    <DangerButton>Delete</DangerButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
