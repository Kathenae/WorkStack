import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import JobContent from '@/Components/JobContent';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import Container from '@/Components/Container';
import Conditional from '@/Components/Conditional';


export default function Show({ job, auth, errors: auth_errors }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Job</h2>}
        >
            <Head title="Show Job" />
            <Container>
                <Card>
                    <Card.Content>
                        <JobContent job={job} />
                        <div className="mt-12">
                            <PrimaryButton onClick={e => router.get(route('jobs.proposals.create', job.id))}>Apply</PrimaryButton>
                        </div>
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
            </Container>
        </AuthenticatedLayout>
    );
}
