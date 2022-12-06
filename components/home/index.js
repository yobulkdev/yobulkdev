import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <div id="home" className="w-full text-center">
      <div className="max-w-[1240px] mx-auto p-28 flex justify-center items-center">
        <div>
          <p className="uppercase text-3xl font-bold tracking-widest text-gray-600">
            Welcome to YoBulk!
          </p>
          <h1 className="py-4 text-gray-500 text-lg">
            A scalable opensource{' '}
            <span className="text-blue-500"> CSV Importer for SaaS</span>
          </h1>

          <div className="flex items-center justify-start gap-6 w-auto m-auto bg-white shadow-sm  border rounded-xl mb-10">
            <h1 className="flex py-2 w-30 bg-blue-500 h-full text-white">
              Sample CSVs to Download...
            </h1>

            <div className="flex">
              <a
                href="https://drive.google.com/uc?id=1N1UMgvM4VO64lOnpkzSPft5Wt-SJokHG&export=download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline-offset-1 border-r-2"
              >
                CSV with 50k records
              </a>

              <a
                href="https://drive.google.com/uc?id=1wzo1yVtYv9UyZUCNOZ2Fq4QITFDXKHVw&export=download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline-offset-1 border-r-2"
              >
                CSV for Datatype validation
              </a>
              <a
                href="https://drive.google.com/uc?id=1yP2awQiwHE-gCEScZWTwP5K6XGokvAZ_&export=download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline-offset-1 border-r-2"
              >
                CSV for custom mail validation
              </a>
              <a
                href="https://drive.google.com/uc?id=1QbM5GmIGVg_ZJCdcE2etWX55qKj2UU7L&export=download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline-offset-1  border-r-2"
              >
                CSV for custom integer validation
              </a>
              <a
                href="https://drive.google.com/uc?id=1pcmwsRo0XqTUAcjMGgYH2tzW8xAl13nd&export=download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline-offset-1 "
              >
                CSV with 1 million records
              </a>
            </div>
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
