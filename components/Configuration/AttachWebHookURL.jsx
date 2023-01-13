const AttachWebHookURL = ({ setAttachWebHookURL, availiable = true }) => {
  return (
    <div
      className={`flex flex-col border-2  rounded-md ${
        !availiable ? 'cursor-no-drop border-black' : 'border-[#64B6EB]'
      }`}
    >
      {availiable ? null : (
        <div className="rounded-t-sm bg-black text-center text-white">
          COMING SOON
        </div>
      )}
      <div className="flex p-4 align-middle items-center">
        <div className="flex flex-col w-5/12">
          <h2 className="text-lg font-bold text-gray-500">
            Attach A Webhook URL
          </h2>
          <p className="text-gray-400">URL where imported data is sent to</p>
        </div>

        <div className="flex flex-col justify-center w-1/2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg
                                    text-gray-900 text-sm
                                    focus:ring-blue-500 focus:border-blue-500 
                                    block w-full
                                    p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="E.g. https://api.myapp.com/myendpoint"
            onChange={(e) => setAttachWebHookURL(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AttachWebHookURL;
