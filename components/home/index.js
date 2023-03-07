import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';

const Home = () => {
  const router = useRouter();
  const [defaultTemplateId, setDefaultTemplateId] = useState();

  useEffect(() => {
    axios
      .get('/api/templates')
      .then((res) => {
        const defaultTemplate = res.data.filter((el) => {
          return el['template_name'] === 'YoBulk';
        })[0];
        setDefaultTemplateId(defaultTemplate?._id);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="home" className="w-full text-center dark:bg-gray-800">
      <div className="max-w-[1240px] mx-auto px-28 pt-7 flex flex-col justify-center items-center">
        <div>
          <p className="uppercase text-5xl font-extrabold tracking-widest text-gray-600 dark:text-gray-200">
            Welcome to YoBulk!
          </p>
          <p className='underline flex gap-3 justify-center text-blue-600 hover:text-blue-800 visited:text-purple-600'>
            <a href="https://yobulk.dev/" target='_blank' rel='noreferrer'>Site</a>
            <a href="https://doc.yobulk.dev/" target='_blank' rel='noreferrer'>Docs</a>
          </p>
          <h1 className="py-3 text-gray-500 text-2xl font-medium tracking-wider dark:text-gray-300">
            Open Source{' '}
            <a
              href="https://flatfile.com/"
              className="no-underline hover:underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              flatfile.com{' '}
            </a>
            Alternative
            <br />
            <span className="text-blue-400 normal-case">
              An Embeddable Open source platform for exchanging data between
              businesses.
            </span>
          </h1>
        </div>

        <div className="w-full flex flex-col gap-1 mt-4 bg-gray-50 text-left py-2 px-4 dark:bg-gray-900">
          <h1 className="py-2 text-gray-500 dark:text-gray-200 text-2xl font-medium tracking-wider text-center">
            YoBulk Quick Walkthrough 🚀
            <br />
          </h1>
          <p className="mt-1 text-gray-500 text-center dark:text-gray-200">
            Demo of importing and validating a CSV with a pre-configured
            template.
          </p>

          <div className="p-4 text-black dark:text-white">
            <div className="w-full flex flex-col gap-1 shadow-sm text-left py-2 px-4 bg-white dark:bg-gray-800">
              <h1 className="text-xl">Step 1 </h1>
              <div className="flex justify-between text-center items-center">
                <p className="text-md text-gray-700 dark:text-gray-300">
                  The template is pre-configured with the field values: id,
                  name, email, date, status.
                </p>
                <Link href="https://drive.google.com/uc?export=download&id=1iYSU8CswQz8e_3wRCMpWARz8fXnAzBJR">
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px]  text-sm text-white p-2 rounded-md dark:bg-white dark:text-black">
                    Download CSV
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 mt-2 shadow-sm text-left py-2 px-4 bg-white dark:bg-gray-800">
              <div className="flex gap-4 items-center">
                <h1 className="text-xl flex items-center gap-2">Step 2</h1>
                <Popover className="z-10 flex ">
                  <Popover.Button>
                    <InformationCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 mt-6 ml-24 bg-white rounded border-2 p-2 -translate-x-1/2 transition ease-in-out delay-300">
                    <p>Create a template with the same schema as the CSV.</p>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>

              <div className="flex justify-between text-center items-center">
                <p className="text-md text-gray-700 dark:text-gray-300">
                  Start the Import Flow and make the corrections.
                </p>
                <Link href={`/templates/testtemplate/${defaultTemplateId}`}>
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px] text-sm text-white p-2 rounded-md dark:bg-white dark:text-black">
                    Import CSV
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 mt-2 text-left py-2 px-4 bg-white dark:bg-gray-800">
              <h1 className="text-xl">Step 3 </h1>
              <div className="flex justify-between text-center items-center">
                <p className="text-left text-md text-gray-700 dark:text-gray-300">
                  Go To Imports Section and check the status. <br /> CSV Data is
                  imported successfully to your MongoDB.
                </p>
                <Link href="/imports">
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px]  text-sm text-white p-2 rounded-md dark:bg-white dark:text-black">
                    Validate Import Status
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 shadow-sm text-left py-2 px-4 mt-4 border bg-slate-50 dark:bg-gray-900">
          <h1 className="py-2 text-gray-500 text-2xl font-medium tracking-wider text-center dark:text-gray-200">
            Sample CSVs to Try 👨🏻‍💻
            <br />
          </h1>

          <div className="p-4 flex  flex-wrap justify-between">
            <Link href="https://drive.google.com/uc?export=download&id=1lTgaCFkY-x91NXwltO9oAQ3NnEiwZstk">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m-1 dark:bg-white dark:text-black">
                CSV with 1 million records
              </button>
            </Link>
            <Link href="https://drive.google.com/uc?export=download&id=1ox_bREP5eTVzbntJ1eCPuTHRyAHhK1VX">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m-1 dark:bg-white dark:text-black">
                CSV for custom mail validation
              </button>
            </Link>
            <Link href="https://drive.google.com/uc?export=download&id=1IhOATPL-GJNORxOh-FBQwKLGFzLtOED-">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m-1 dark:bg-white dark:text-black">
                CSV for custom integer validation
              </button>
            </Link>
          </div>
        </div>
      
      </div>

      <footer className="p-4 justify-center">
        <p className="text-center text-gray-700 dark:text-gray-300">
          Made With ❤️ by YoBulk Team
        </p>
      </footer>
    </div>
  );
};

export default Home;
