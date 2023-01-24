import ProposalForm from '@/Components/ProposalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Index({ proposals, job, auth, errors: auth_errors }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{job.title} - Proposals</h2>}
        >
            <Head title="Create Proposal" />
            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        </div>
                    </div>
                </div>
            </div>
        </ AuthenticatedLayout >
    )
}
