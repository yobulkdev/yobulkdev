import DemoCard from '../../components/demo/DemoCard';
import Layout from '../../layouts/Layout';

const listOfItems = [
  {
    title: 'Integer Length Verification',
    description: 'Numerical value of a maximum of 3 digits in length.',
    downloadLink:
      'https://drive.google.com/uc?export=download&id=1VCoLiqqX7aFUJp7dKmJoMMVcUJBtM6O_',
    importLink: '/templates/testtemplate/63f1e1b4db835d47c31261b2',
    templateId: '63f1e1b4db835d47c31261b2',
  },
  {
    title: 'Email Verification',
    description: 'Show errors for the emails with domain name Gmail & Yahoo.',
    downloadLink:
      'https://drive.google.com/uc?export=download&id=1ZcsINSt7EnDBDeH27BoWZl86rUEi2uoJ',
    importLink: '/templates/testtemplate/63f1e1b4db835d47c31261b3',
    templateId: '63f1e1b4db835d47c31261b3',
  },
  {
    title: 'Date Verification',
    description: 'Show errors for the dates which is not in DD-MM-YYYY format',
    downloadLink:
      'https://drive.google.com/uc?export=download&id=1Ka8pgbfDXivFFtfzW7WwGnz_FskHNH5m',
    importLink: '/templates/testtemplate/63f1e1b4db835d47c31261b4',
    templateId: '63f1e1b4db835d47c31261b4',
  },
  {
    title: 'String Verification',
    description: 'Show errors for the strings not starting with "YO" character',
    downloadLink:
      'https://drive.google.com/uc?export=download&id=1Qsm-zMq31eaKuhKeiiTZ0GqwUsCeU3DI',
    importLink: '/templates/testtemplate/63f1e1b4db835d47c31261b1',
    templateId: '63f1e1b4db835d47c31261b1',
  },
];

const index = () => {
  return (
    <Layout>
      <div className="overflow-x-auto h-screen dark:bg-gray-800">
        <div className="mx-4">
          <h1 className="py-2 text-gray-500 text-2xl font-medium tracking-wider text-center dark:text-gray-200">
            YoBulk Quick Demos 🚀
            <br />
          </h1>
          <div className="p-6 flex flex-col gap-4">
            {listOfItems.map((item, index) => (
              <DemoCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
