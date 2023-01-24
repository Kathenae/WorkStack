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
            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProposalForm form={form} onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </ AuthenticatedLayout >
    )
}