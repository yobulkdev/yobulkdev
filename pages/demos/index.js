import DemoCard from '../../components/demo/DemoCard';
import Layout from '../../layouts/Layout';

const listOfItems = [
  {
    title: 'Integer Length Verification',
    description: 'Numerical value of a maximum of 3 digits in length.',
    downloadLink:
      'https://drive.google.com/uc?id=1wzo1yVtYv9UyZUCNOZ2Fq4QITFDXKHVw&export=download',
    importLink: '/templates/testtemplate/63d4ac4fc0e9bdb301ed5731',
    templateId: '63ba9d3d045f129d55e27be1',
  },
  {
    title: 'Email Verification',
    description: 'Show errors for the emails with domain name Gmail & Yahoo.',
    downloadLink:
      'https://drive.google.com/uc?id=1wzo1yVtYv9UyZUCNOZ2Fq4QITFDXKHVw&export=download',
    importLink: '/templates/testtemplate/63d4ac4fc0e9bdb301ed5731',
    templateId: '63d4ac4fc0e9bdb301ed5731',
  },
  {
    title: 'Date Verification',
    description: 'Show errors for the dates which is not in DD-MM-YYYY format',
    downloadLink:
      'https://drive.google.com/uc?id=1wzo1yVtYv9UyZUCNOZ2Fq4QITFDXKHVw&export=download',
    importLink: '/templates/testtemplate/63d4ac4fc0e9bdb301ed5731',
    templateId: '63d4ac4fc0e9bdb301ed5731',
  },
  {
    title: 'String Verification',
    description: 'Show errors for the strings not starting with "YO" character',
    downloadLink:
      'https://drive.google.com/uc?id=1wzo1yVtYv9UyZUCNOZ2Fq4QITFDXKHVw&export=download',
    importLink: '/templates/testtemplate/63d4ac4fc0e9bdb301ed5731',
    templateId: '63d4ac4fc0e9bdb301ed5731',
  },
];

const index = () => {
  return (
    <Layout>
      <div className="overflow-x-auto mx-4">
        <h1 className="py-2 text-gray-500 text-2xl font-medium tracking-wider text-center">
          YoBulk Quick Demos 🚀
          <br />
        </h1>
        <div className="p-6 flex flex-col gap-4">
          {listOfItems.map((item, index) => (
            <DemoCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default index;
