import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import JobForm from '@/Components/JobForm';
import Card from '@/Components/Card';
import Container from '@/Components/Container';

export default function Create({ skills, auth, errors: auth_errors }) {

    const form = useForm({
        'title': '',
        'description': '',
        'min_price': '',
        'max_price': '',
        'type': '',
        'status': '',
        'skills': [],
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('jobs.store'), { onSuccess: () => form.reset() });
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={auth_errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Job</h2>}
        >
            <Head title="Create Job" />

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
