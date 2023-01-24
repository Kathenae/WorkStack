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
                                By {proposal.user.name} - Price - ${proposal.price}
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
                            <Conditional showIf={auth.user && auth.user.id == proposal.user.id}>
                                <PrimaryButton onClick={e => router.get(route('proposals.edit', proposal.id))}>Edit</PrimaryButton>
                                <DangerButton onClick={e => router.delete(route('proposals.destroy', proposal.id))}>Delete</DangerButton>
                            </Conditional>
                        </div>
                    </Card.Content>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
