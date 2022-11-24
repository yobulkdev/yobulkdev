import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <div id="home" className="w-full text-center">
      <div className="max-w-[1240px] mx-auto p-28 flex justify-center items-center">
        <div>
          <p className="uppercase text-3xl font-bold tracking-widest text-gray-500">
            Welcome to YoBulk!
          </p>
          <h1 className="py-4 text-gray-500 text-lg">
            A scalable opensource{' '}
            <span className="text-[#5651e5]"> CSV Importer for SaaS</span>
          </h1>

          <div className="flex items-center justify-start gap-6 max-w-[330px] m-auto py-4 bg-blue-100  border rounded-md mb-10">
            <h1 className="py-2 text-gray-500">Sample CSVs to Download...</h1>
            <a
              href="https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2021-financial-year-provisional/Download-data/annual-enterprise-survey-2021-financial-year-provisional-csv.csv"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline-offset-1"
            >
              40000 Rows
            </a>

            <a
              href=" https://excelbianalytics.com/wp/wp-content/uploads/2021/09/50000-HRA-Records.zip"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline-offset-1"
            >
              50000 Rows
            </a>
          </div>
          <div>
            <button
              type="button"
              onClick={() => router.push('/csvupload')}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Lets Start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
