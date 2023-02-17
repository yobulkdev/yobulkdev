import React from 'react';
import Layout from '../../layouts/Layout';
import Link from 'next/link';

const librariesList = [
    {
        id: 1,
        template_name: 'CSV Libraries',
        template_description: 'Prepare the CSVs and data then get it validated by creating a YoBulk template before importing.',
        link: '/csvlibraries',
    },
    {
        id: 2,
        template_name: 'Template Libraries',
        template_description: 'We have prepared a list of popular template libraries that you can use to prepare your CSV file.',
        link: '/templatelibraries',
    },
    {
        id: 3,
        template_name: 'Regex Libraries',
        template_description: 'We have prepared a list of popular regex libraries that you can use to prepare your CSV file.',
        link: '/regexlibraries',
    }
];


const index = () => {
    return (
        <>
            <Layout>
                <div className="overflow-x-auto mx-4">
                    <div className="p-6">
                        <div className="mx-auto px-28 py-20 flex flex-col justify-center items-center">
                            <p className="uppercase text-3xl font-extrabold tracking-widest text-gray-600">
                                Welcome to YoBulk! Libraries
                            </p>
                        </div>
                        <>
                            <div className="grid grid-cols-3">
                                {librariesList.map((obj, idx) => (
                                    <div
                                        className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
                                        key={idx}
                                    >
                                        <div className="flex flex-col">
                                            <Link href={obj.link}>
                                                <h2 className="text-lg text-blue-500 cursor-pointer">
                                                    {obj.template_name}
                                                </h2>
                                            </Link>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-600">
                                                {obj.template_description}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-center">
                                            <Link href={obj.link}>
                                                <button
                                                    type="button"
                                                    className="bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-full text-sm px-3 py-1 text-center mr-2"
                                                >
                                                    View Libraries
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default index;