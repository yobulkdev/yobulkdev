import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout';

const Configuration = () => {

    const [configList, setConfigList] = useState([]);

    useEffect(() => {
        axios
            .get('/api/templates') //to be changed to /api/config
            .then((res) => {
                setConfigList(res.data.filter((el) => el['template_name'])); // to be changed to config_name
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
                            <button className="bg-white border-2 hover:bg-blue-500 hover:text-white text-black py-1 px-2 rounded shadow-sm">
                                Add Configuration
                            </button>
                        </Link>
                    </div>

                    {/* TODO: Create a List Here for Configs Availiable */}
                    {/* HERE */}
                    {configList &&
                        configList.map((obj, idx) => (
                            <div
                                className="mt-4 border-2 rounded-md py-1 px-2 flex align-middle justify-between"
                                key={idx}
                            >
                                <div className="flex flex-col">
                                    <Link href={`/configuration/${obj._id}`}>
                                        <h2 className="text-lg text-blue-500 cursor-pointer">
                                            {obj.template_name}
                                        </h2>
                                    </Link>
                                </div>

                                <div className="mt-1">
                                    <Link href={`/configuration/testconfig/${obj._id}`}>
                                        <button
                                            type="button"
                                            className="text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Preview
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}


                </div>
            </div>
        </Layout>
    );
};

export default Configuration;