import Card from '@/Components/Card';
import Conditional from '@/Components/Conditional';
import Container from '@/Components/Container';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, errors, jobs, proposals }) {

    const [isJobListOpen, setIsJobListOpen] = useState(false)
    const [isProposalListOpen, setisProposalListOpen] = useState(false)

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Container>
                <Card className='mb-4 py-0'>
                    <Card.Content>
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Jobs ({jobs.length})</h2>
                            <button onClick={e => setIsJobListOpen(!isJobListOpen)}><i className={"fi fi-rs-angle-" + (isJobListOpen ? "down" : "right")}></i></button>
                        </div>
                        <Conditional showIf={isJobListOpen}>
                            <div className="mt-8">
                                {jobs.map(job => <h4 key={job.id} className='font-semibold text-indigo-500 py-4 border-t'><Link className='hover:underline' href={route('jobs.proposals.index', job.id)} >{job.title}</Link></h4>)}
                            </div>
                        </Conditional>
                    </Card.Content>
                </Card>
                <Card className='mb-4 mt-0 py-0'>
                    <Card.Content>
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Proposals ({proposals.length})</h2>
                            <button onClick={e => setisProposalListOpen(!isProposalListOpen)}><i className={"fi fi-rs-angle-" + (isProposalListOpen ? "down" : "right")}></i></button>
                        </div>
                        <Conditional showIf={isProposalListOpen}>
                            <div className="mt-8">
                                {proposals.map(proposal => <h4 key={proposal.id} className='font-semibold text-indigo-500 py-4 border-t'><Link className='hover:underline' href={route('proposals.show', proposal.id)}>{proposal.job.title}</Link></h4>)}
                            </div>
                        </Conditional>
                    </Card.Content>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
