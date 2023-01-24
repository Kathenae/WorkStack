import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import JobForm from '@/Components/JobForm';
import Card from '@/Components/Card';
import Container from '@/Components/Container';

export default function Edit({ skills, job, auth, errors: auth_errors }) {

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

            <Container>
                <Card>
                    <Card.Content>
                        <JobForm form={form} onSubmit={submit} skills={skills} />
                    </Card.Content>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
