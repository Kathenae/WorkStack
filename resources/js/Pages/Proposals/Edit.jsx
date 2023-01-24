import Card from '@/Components/Card';
import Container from '@/Components/Container';
import ProposalForm from '@/Components/ProposalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Edit({ proposal, auth, errors: auth_errors }) {
    const form = useForm(proposal);

    const handleSubmit = (event) => {
        event.preventDefault()
        form.put(route('proposals.update', proposal.id))
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Proposal</h2>}
        >
            <Head title="Edit Proposal" />
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
