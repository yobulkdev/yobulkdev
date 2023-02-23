import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { FaAtlassian, FaShopify, FaHubspot } from 'react-icons/fa';
import { SiAsana, SiWoocommerce } from "react-icons/si";
import { BsMicrosoft, BsLinkedin } from "react-icons/bs";

const templateLibraries = [
    {
        title: "Jira",
        icon: <FaAtlassian />,
        route: "https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-a-csv-file",
    },
    {
        title: "Asana",
        icon: <SiAsana />,
        route: "https://asana.com/guide/help/api/csv-importer",
    },
    {
        title: "Big Commerce",
        image: "https://www.battleroadiporeview.com/wp-content/uploads/2020/09/bigcommerce.png",
        route: "https://support.bigcommerce.com/s/article/Importing-Exporting-Products?language=en_US",
    },
    {
        title: "Shopify",
        icon: <FaShopify />,
        route: "https://help.shopify.com/en/manual/products/import-export/using-csv#overwriting-csv-file",
    },
    {
        title: "woocommerce",
        icon: <SiWoocommerce />,
        route: "https://woocommerce.com/document/product-csv-import-suite-importing-products/",
    },
    {
        title: "Microsoft",
        icon: <BsMicrosoft />,
        route: "https://support.microsoft.com/en-us/office/create-or-edit-csv-files-to-import-into-outlook-4518d70d-8fe9-46ad-94fa-1494247193c7",
    },
    {
        title: "Linkedin",
        icon: <BsLinkedin />,
        route: "https://www.linkedin.com/help/linkedin/answer/a423102/company-and-contact-targeting-list-templates?lang=en",
    },
    {
        title: "Hubspot",
        icon: <FaHubspot />,
        route: "https://knowledge.hubspot.com/crm-setup/set-up-your-import-file",
    }
];

const MainBar = () => {

    return (
        <div>
            <div className="flex align-middle items-center gap-4 mb-2">
                <Link href="/libraries">
                    <ArrowLeftIcon className="h-5 cursor-pointer" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-500">CSV Libraries</h1>
            </div>

            <div className="p-4">
                <p className="text-gray-500">
                    Prepare the CSVs and data then get it validated by creating a {""}
                    <Link href="/templatecreate#2">
                        <span className='font-semibold cursor-pointer underline underline-offset-4'>YoBulk template</span>
                    </Link>{" "}
                    before importing.
                </p>
            </div>

            <div className="grid grid-cols-3">
                {templateLibraries &&
                    templateLibraries.map((obj, idx) => (
                        <div
                            className="mt-4 bg-white rounded-md flex flex-col align-middle justify-between p-4 mx-2 shadow-sm"
                            key={idx}
                        >
                            <div className="flex items-center gap-2">
                                <div>
                                    {obj.icon ? obj.icon : <Image src={obj.image} alt={obj.title} width={24} height={24} />}
                                </div>
                                <h2 className="text-lg text-blue-500">
                                    {obj.title.toUpperCase()}
                                </h2>
                            </div>

                            <div className="mt-4">
                                <Link href={obj.route} >
                                    <a target="_blank" rel="noopener noreferrer">
                                        <button
                                            type="button"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-full text-sm mr-2"
                                        >
                                            Prepare CSV
                                        </button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MainBar;
