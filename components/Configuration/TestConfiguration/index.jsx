import { YoButton } from 'yoembed';

const TestConfiguration = ({ configId }) => {
    return (
        <div className="flex flex-col justify-center items-center mt-3">
            <YoButton
                btnText="Import CSV"
                templateId={configId}
                yoHostUrl={'http://localhost:3000'}
            />
        </div>
    );
};

export default TestConfiguration;
