import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import JobForm from '@/Components/JobForm';

export default function Create({ skills, job, auth, errors: auth_errors }) {

    const form = useForm({ ...job, skills: job.skills.map(s => s.id) });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('jobs.update', job.id), { onSuccess: () => form.reset() });
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Job</h2>}
        >
            <Head title="Edit Job" />

            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <JobForm form={form} onSubmit={submit} skills={skills} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
