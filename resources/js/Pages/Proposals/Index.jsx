import Card from '@/Components/Card';
import Container from '@/Components/Container';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import React from "react";

export default function Index({ proposals, job, auth, errors: auth_errors }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{job.title} - Proposals</h2>}
        >
            <Head title="Create Proposal" />
            <Container>

            </Container>
        </ AuthenticatedLayout >
    )
}
