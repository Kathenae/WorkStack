import Job from '@/Components/Job';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ jobs, auth, errors }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Find Jobs</h2>}
        >
            <Head title="Find Jobs" />

            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex">
                            <input type="text" placeholder='Search...' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow' />
                            <PrimaryButton className='flex-none mx-4'>Search</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            {jobs.map((job) => {
                return <Job id={job.id} key={job.id} job={job} />
            })}
        </AuthenticatedLayout>
    );
}
