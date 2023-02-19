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
    <div id="home" className="w-full text-center">
      <div className="max-w-[1240px] mx-auto px-28 py-20 flex flex-col justify-center items-center">
        <div>
          <p className="uppercase text-5xl font-extrabold tracking-widest text-gray-600">
            Welcome to YoBulk!
          </p>
          <h1 className="py-3 text-gray-500 text-2xl font-medium tracking-wider">
            Open Source <b className="text-[#3B2EC9] ">Flatfile.com</b>{' '}
            Alternative
            <br />
            <span className="text-blue-500 normal-case">
              An Open source platform for exchanging data between businesses.
            </span>
          </h1>
        </div>

        <div className="w-full flex flex-col gap-1 mt-4 rounded-md shadow-md bg-gray-50 text-left py-2 px-4">
          <h1 className="py-2 text-gray-500 text-2xl font-medium tracking-wider text-center">
            YoBulk Quick Walkthrough 🚀
            <br />
          </h1>
          <p className="mt-1 text-gray-500 text-center">
            This demo walks a user through importing an CSV into a pre-defined
            template.
          </p>

          <div className="p-4">
            <div className="w-full flex flex-col gap-1 shadow-md rounded-md text-left py-2 px-4 bg-white">
              <h1 className="text-xl">Step 1 </h1>
              <div className="flex justify-between text-center items-center">
                <p className="text-md text-gray-700">
                  Download a sample CSV with some errors.
                </p>
                <Link href="https://drive.google.com/uc?export=download&id=1iYSU8CswQz8e_3wRCMpWARz8fXnAzBJR">
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px]  text-sm text-white p-2 rounded-md">
                    Download CSV
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 mt-2 shadow-md rounded-md text-left py-2 px-4 bg-white">
              <div className='flex justify-between items-center'>
                <h1 className="text-xl flex items-center gap-2">
                  Step 2
                </h1>
                <Popover className="z-10">
                  <Popover.Button>
                    <InformationCircleIcon className="h-5 w-5 text-gray-400" />
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 bg-white rounded border-2 p-2 -translate-x-1/2 ">
                    <p>
                      Create a template with the same schema as the CSV. You can
                    </p>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>

              <div className="flex justify-between text-center items-center">
                <p className="text-md text-gray-700">
                  Start the Import Flow and make the corrections.
                </p>
                <Link href={`/templates/testtemplate/${defaultTemplateId}`}>
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px]  text-sm text-white p-2 rounded-md">
                    Import CSV
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 mt-2 shadow-md rounded-md text-left py-2 px-4 bg-white">
              <h1 className="text-xl">Step 3 </h1>
              <div className="flex justify-between text-center items-center">
                <p className="text-left text-md text-gray-700">
                  Go To Imports Section and check the Status. <br /> CSV Data is
                  imported successfully to your MongoDB.
                </p>
                <Link href="/imports">
                  <button className="bg-[#5EB4EA] w-[160px] h-[40px]  text-sm text-white p-2 rounded-md">
                    Validate Import Status
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 shadow-2xl rounded-md text-left py-2 px-4 mt-4 bg-white">
          <h1 className="py-2 text-gray-500 text-2xl font-medium tracking-wider text-center">
            Sample CSVs to Try 👨🏻‍💻
            <br />
          </h1>

          <div className="p-4 flex  flex-wrap justify-between">
            <Link href="https://drive.google.com/uc?export=download&id=1lTgaCFkY-x91NXwltO9oAQ3NnEiwZstk">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m-1">
                CSV with 1 million records
              </button>
            </Link>
            <Link href="https://drive.google.com/uc?export=download&id=1ox_bREP5eTVzbntJ1eCPuTHRyAHhK1VX">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m1">
                CSV for custom mail validation
              </button>
            </Link>
            <Link href="https://drive.google.com/uc?export=download&id=1IhOATPL-GJNORxOh-FBQwKLGFzLtOED-">
              <button className="bg-[#5EB4EA] text-sm text-white p-2 rounded-md m-1">
                CSV for custom integer validation
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="p-4 justify-center">
        <p className="text-center text-gray-700">Made With ❤️ by YoBulk Team</p>
      </footer>
    </div >
  );
};

export default Home;
