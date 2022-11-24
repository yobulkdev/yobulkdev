import React from 'react';
import Link from 'next/link';

const Stepper = ({ step }) => {
  return (
    <nav className="mb-12 mt-1">
      <ol className="flex justify-center ">
        <li
          className={`relative w-[150px] text-center text-sm font-light italic
          after:content-[''] after:absolute after:left-[50%] after:top-[150%] after:w-5 after:h-5 
          after:bg-blue-500 after:rounded-full after:z-50
          `}
        >
          <Link href="/csvupload">Choose CSV File</Link>
        </li>
        <li
          className={`relative w-[150px] text-center text-sm font-light italic
      before:content-[''] before:absolute before:left-[-50%] before:top-[calc(150%+0.5rem)] before:w-full before:h-1 
     ${
       step > 1
         ? ' before:bg-blue-500  after:bg-blue-500 '
         : 'before:bg-gray-300  after:bg-gray-300'
     }
      after:content-[''] after:absolute after:left-[50%] after:top-[150%] after:w-5 after:h-5 
      after:rounded-full after:z-50
      `}
        >
          <Link href="/snapshotviewer">View Snapshot</Link>
        </li>

        <li
          className={`relative w-[150px] text-center text-sm font-light italic
      before:content-[''] before:absolute before:left-[-50%] before:top-[calc(150%+0.5rem)] before:w-full before:h-1 
      ${
        step > 2
          ? ' before:bg-blue-500  after:bg-blue-500 '
          : 'before:bg-gray-300  after:bg-gray-300'
      }
      after:content-[''] after:absolute after:left-[50%] after:top-[150%] after:w-5 after:h-5 
      after:rounded-full after:z-50
      `}
        >
          <Link href="/schemamapper">Validation Template</Link>
        </li>
        <li
          className={`relative w-[150px] text-center text-sm font-light italic
      before:content-[''] before:absolute before:left-[-50%] before:top-[calc(150%+0.5rem)] before:w-full before:h-1 
      ${
        step > 3
          ? ' before:bg-blue-500  after:bg-blue-500 '
          : 'before:bg-gray-300  after:bg-gray-300'
      }
      after:content-[''] after:absolute after:left-[50%] after:top-[150%] after:w-5 after:h-5 
       after:rounded-full after:z-50
      `}
        >
          <Link href="/dataviewer">Processed Data</Link>
        </li>
      </ol>
    </nav>
  );
};

export default Stepper;
