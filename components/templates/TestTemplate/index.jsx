import { YoButton } from 'yoembed';

function App({ templateId }) {
  return (
    <div className="flex flex-col h-full justify-center items-center dark:bg-gray-800">
      <div className="mt-3 fixed top-0">
        <YoButton
          btnText="Import CSV"
          templateId={templateId}
          yoHostUrl={'http://localhost:5050'}
        />
      </div>
    </div>
  );
}

export default App;
