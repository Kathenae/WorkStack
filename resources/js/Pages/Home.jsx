import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-24 mb-52 sm:rounded-lg">
                        <div className="text-gray-900">
                            <h2 className="font-bold font-serif text-7xl text-indigo-600 leading-tight transition-opacity">
                                Stack your <br />
                                work for success
                            </h2>
                            <p className="mt-2 text-gray-600 text-xl text-justify">
                                Build personal connections. With top talent and <br />
                                premier opportunities. Here and Now.
                            </p>

                            <div className="space-x-3 mt-4">
                                <PrimaryButton onClick={e => router.get(route('jobs.index'))} className='text-lg w-36 text-center justify-center'>Find Jobs</PrimaryButton>
                                <SecondaryButton onClick={e => router.get(route('jobs.create'))} className='text-lg w-36 text-center justify-center border-indigo-600'>Start hiring</SecondaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 mb-52">
                        <div className="mt-12">
                            <h3 className='text-4xl text-gray-800 font-bold font-serif mb-2'>Discover the best talents by expertise</h3>
                            <p>Looking for a job? <Link className='font-semibold text-indigo-600 hover:underline'>Browse Jobs</Link></p>
                        </div>
                        <div className="grid mt-8 gap-y-4 gap-x-8 grid-cols-3">
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Software Developemnt
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    10k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Sales and Marketing
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    25k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Art and Design
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    25k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Finance and Economy
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    25k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Architecture and Engineering
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    25k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-md shadow-md text-center">
                                <div className="text-lg leading-7 font-semibold">
                                    <a
                                        href="https://laravel.com/"
                                        className="hover:underline text-gray-600"
                                    >
                                        Legal
                                    </a>
                                </div>
                                <div className="text-gray-400">
                                    25k Active Talents
                                </div>
                                <div className='mt-4 grid grid-cols-2 text-gray-400'>
                                    <div className="">
                                        <p>
                                            4.5/5 Avg Rating
                                        </p>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-yellow-400"></i>
                                        <i className="fi-rs-star text-gray-200"></i>
                                    </div>
                                    <div>
                                        <p>
                                            4.0/5 Avg Completion
                                        </p>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-600"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                        <i className="fi-rs-star text-indigo-200"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 mb-44 overflow-hidden sm:rounded-lg">
                        <div className="">
                            <h3 className='text-4xl text-gray-800 font-bold font-serif mb-2'>Built to last</h3>
                            <p>WorkStack was built the latest most robust technologies</p>
                        </div>
                        <div className="grid mt-8 grid-cols-1 md:grid-cols-2">
                            <div className="p-6 bg-white border-gray-200">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://laravel.com/"
                                            className="hover:underline text-gray-600"
                                        >
                                            Laravel
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 text-sm">
                                        Laravel is a free, open-source PHP web application framework designed for the development of web applications following the model-view-controller (MVC) architectural. It also provides a set of tools and features for tasks such as routing, authentication, and caching.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white border-gray-200 border-l">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://inertiajs.com/"
                                            className="hover:underline text-gray-600"
                                        >
                                            InertiaJs
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 text-sm">
                                        Inertia.js is a framework that allows developers to build single-page apps (SPAs) using classic server-side routing and controllers, but with the feel of a SPA. It allows for seamless transitions between server-rendered pages, which can improve performance and provide a more app-like experience for the end-users.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white border-gray-200 border-r border-t">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://reactjs.org/"
                                            className="hover:underline text-gray-600"
                                        >
                                            React
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 text-sm">
                                        React is a JavaScript library for building user interfaces. It allows developers to build complex UI's by breaking them down into smaller, reusable components. React uses a virtual DOM (Document Object Model) to efficiently update the view when the state of the application changes, making it a fast and efficient option for building web apps.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white border-gray-200 border-t">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-600">
                                        <a
                                            href="https://www.mysql.com/"
                                            className="hover:underline text-gray-600"
                                        >
                                            MySQL
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 text-sm">
                                        MySQL is a free, open-source relational database management system. It uses SQL (Structured Query Language) to manage and manipulate data stored in databases. MySQL is known for its robustness and scalability, making it a popular choice for building high-performance web applications.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
