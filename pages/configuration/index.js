import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout';
import { PlusIcon } from '@heroicons/react/24/outline';

const Configuration = () => {

    const [configList, setConfigList] = useState([]);

    useEffect(() => {
        axios
            .get('/api/importer') //to be changed to /api/config
            .then((res) => {
                setConfigList(res.data); // to be changed to config_name
            })
            .catch((e) => console.log(e));
    }, []);


    return (
        <Layout>
            <div className="overflow-x-auto mx-4 mt-10">
                <div className="p-6 ">
                    <div className="flex align-middle justify-between">
                        <h1 className="text-2xl font-bold text-gray-500">Importer Configuration</h1>
                        <Link href={`/configcreate`}>
                            <button className="flex bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-6 py-2 text-center mb-2">
                                <PlusIcon className="w-5 mr-1" />
                                Add an Importer
                            </button>
                        </Link>
                    </div>

                    {/* TODO: Create a List Here for Configs Availiable */}
                    {/* HERE */}
                    <div className="grid grid-cols-3">

                        {configList &&
                            configList.map((obj, idx) => (
                                <div
                                    className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
                                    key={idx}
                                >
                                    <div className="flex flex-col">
                                        <Link href={`/configuration/${obj._id}`}>
                                            <h2 className="text-lg text-blue-500 cursor-pointer">
                                                {obj.name}
                                            </h2>
                                        </Link>
                                    </div>

                                    <div className="mt-4">
                                        <Link href={`/configuration/testconfig/${obj.templateId}`}>
                                            <button
                                                type="button"
                                                className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Preview
                                            </button>
                                        </Link>
                                        <Link href={`/configuration/${obj._id}`}>
                                            <button
                                                type="button"
                                                className="bg-white border-2 border-black text-black hover:text-white hover:bg-black focus:outline-none font-medium rounded-full text-sm px-6 py-2 text-center mb-2"
                                            >
                                                View
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            ))}


                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Configuration;