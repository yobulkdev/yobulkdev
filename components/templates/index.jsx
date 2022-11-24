import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainBar = () => {
  const [templates, setTemplates] = useState();

  useEffect(() => {
    axios
      .get('/api/templates')
      .then((res) => {
        setTemplates(res.data.filter((el) => el['template_name']));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="p-12">
      <div className="flex align-middle justify-between">
        <h1 className="text-2xl font-bold text-gray-500">Templates</h1>
        <Link href={`/templatecreate`}>
          <button className="bg-white border-2 hover:bg-blue-500 hover:text-white text-black py-1 px-2 rounded shadow-sm">
            Add Template
          </button>
        </Link>
      </div>

      {templates &&
        templates.map((obj, idx) => (
          <div
            className="mt-14 border-2 rounded-md p-4 flex align-middle justify-between"
            key={idx}
          >
            <div className="flex flex-col">
              <h2 className="text-lg text-blue-500">{obj.template_name}</h2>
              <p className="text-stone-500">No imports</p>
            </div>

            <div>
              <Link href={`/templates/${obj._id}`}>
                <button
                  type="button"
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#2c71b2] border-2 border-[#2c71b2] items-center"
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainBar;
