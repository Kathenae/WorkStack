import Card from '@/Components/Card';
import Container from '@/Components/Container';
import ProposalForm from '@/Components/ProposalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Create({ job, auth, errors: auth_errors }) {
    const form = useForm({
        coverLetter: '',
        price: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        form.post(route('jobs.proposals.store', job.id))
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Proposal</h2>}
        >
            <Head title="Create Proposal" />
            <Container>
                <Card>
                    <Card.Content>
                        <ProposalForm form={form} onSubmit={handleSubmit} />
                    </Card.Content>
                </Card>
            </Container>
        </ AuthenticatedLayout >
    )
}
