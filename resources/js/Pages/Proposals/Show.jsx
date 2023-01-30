import Card from "@/Components/Card";
import Conditional from "@/Components/Conditional";
import Container from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import JobCard from "@/Components/JobCard";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ job, proposal, auth, errors }) {

    const status = (status) => {
        let extraClasses = {
            'pending': 'text-indigo-500',
            'declined': 'text-red-500',
            'accepted': 'text-green-400',
        }

        return (
            <a
                href='/skills/frontend'
                className={'bg-transparent font-extrabold cursor-pointer rounded-xl ' + extraClasses[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </a>)
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Proposal</h2>}
        >
            <Head title="Show Proposal" />
            <Container>
                <Card>
                    <Card.Content>
                        <div>
                            <h2 className="font-semibold text-2xl text-gray-800 leading-tight">Proposal - {job.title}</h2>
                            <small className='text-gray-400 text-sm mt-3'>
                                By {proposal.user.name} - Price - ${proposal.price} - {status(proposal.status)}
                            </small>
                        </div>

                        <Link href={route('jobs.show', job.id)} className='font-semibold text-indigo-600 hover:underline block mt-4'>View Job Details</Link>

                        <div className="my-12">
                            <small className="font-semibold text-xl text-gray-800 leading-tight">Cover Letter</small>
                            <p className='whitespace-pre-line border-2 border-gray-100 p-6 rounded-md'>{proposal.coverLetter}</p>
                        </div>

                        <div className="space-x-2">
                            <Conditional showIf={auth.user && auth.user.id == job.user.id}>
                                <PrimaryButton>Accept</PrimaryButton>
                                <SecondaryButton>Decline</SecondaryButton>
                            </Conditional>
                        </div>
                    </Card.Content>
                    <Card.Options>
                        <Conditional showIf={auth.user && proposal.user.id == auth.user.id}>
                            <Card.OptionLink href={route('proposals.edit', proposal.id)}>
                                <i className="fi fi-rs-edit ml-2"></i> Edit
                            </Card.OptionLink>
                            <Card.OptionButton>
                                <span className="text-red-600"><i className="fi fi-rs-trash ml-2"></i> Delete</span>
                            </Card.OptionButton>
                        </Conditional>
                        <Card.OptionButton onClick={e => alert('Job Post Reported')}>
                            <span className="text-red-600"><i className="fi fi-rs-comment-exclamation ml-2"></i> Report</span>
                        </Card.OptionButton>
                    </Card.Options>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
