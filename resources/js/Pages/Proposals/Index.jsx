import Card from '@/Components/Card';
import Conditional from '@/Components/Conditional';
import Container from '@/Components/Container';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import JobProposals from '@/Components/JobProposals';
import JobCard from '@/Components/JobCard';

export default function Index({ proposals, job, auth, errors: auth_errors }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Proposals - {job.title}</h2>}
        >
            <Head title="View Proposals" />
            <Container>
                <JobCard job={job} />
                <JobProposals proposals={proposals} />
            </Container>
        </ AuthenticatedLayout >
    )
}
