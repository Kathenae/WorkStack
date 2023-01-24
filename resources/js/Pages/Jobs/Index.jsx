import Card from '@/Components/Card';
import Container from '@/Components/Container';
import JobCard from '@/Components/JobCard';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ jobs, auth, errors }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)

        const includesSearchTerm = (text) => {
            return text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        }

        const filterJob = (job) => {
            return includesSearchTerm(job.title) || job.skills.filter(skill => includesSearchTerm(skill.name)).length != 0
        }

        setFilteredJobs(jobs.filter(job => filterJob(job)))
    }

    const handleClear = (e) => {
        setSearchTerm('')
        setFilteredJobs(jobs);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Find Jobs</h2>}
        >
            <Head title="Find Jobs" />

            <Container>
                <Card>
                    <Card.Content className='p-6 text-gray-900 flex'>
                        <input value={searchTerm} onChange={handleSearch} type="text" placeholder='Search...' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow' />
                        <PrimaryButton className='flex-none mx-4' onClick={handleClear}>
                            {searchTerm == '' ? 'Search' : 'Clear'}
                        </PrimaryButton>
                    </Card.Content>
                </Card>

                {filteredJobs.map((job) => {
                    return <JobCard id={job.id} key={job.id} job={job} />
                })}
            </Container>
        </AuthenticatedLayout>
    );
}
