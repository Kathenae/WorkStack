import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Job from '@/Components/Job';


export default function Show({ job, auth, errors: auth_errors }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Job</h2>}
        >
            <Head title="Show Job" />

            <div className="pt-12 pb-6">
                <Job job={job} />
            </div>
        </AuthenticatedLayout>
    );
}
