import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import JobContent from '@/Components/JobContent';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import Container from '@/Components/Container';


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
                        <Card.OptionLink>

                        </Card.OptionLink>
                    </Card.Options>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
