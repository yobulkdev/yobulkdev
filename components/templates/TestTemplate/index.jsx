import { YoButton } from 'yoembed';

function App({ templateId }) {
  return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-1 h-[400px] w-[400px] justify-center bg-gray-100 items-center shadow-lg rounded-md">
          <div className="flex items-center justify-center h-[100px] w-[100px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <YoButton
            btnText="Import CSV"
            templateId={templateId}
            yoHostUrl={process.env.NEXT_PUBLIC_SERVER_HOST}
          />
        </div>
      </div>
  );
}

export default App;
