import RenderComponent from './RenderComponent';

const importers = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar:
            'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar:
            'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar:
            'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

const organizations = [
    {
        id: 1,
        name: 'Company A',
    },
    {
        id: 2,
        name: 'Company B',
    },
    {
        id: 3,
        name: 'Company C',
    },
    {
        id: 4,
        name: 'Company D',
    },
    {
        id: 5,
        name: 'Company E',
    },
    {
        id: 6,
        name: 'Company F',
    },
    {
        id: 7,
        name: 'Company G',
    },
];

const ConfigList = () => {
    const list = [
        {
            id: 1,
            title: 'Attach The Importer to a Template',
            itemsList: importers,
        },
        {
            id: 2,
            title: 'Attach it to an Organization',
            itemsList: organizations,
        },
        {
            id: 3,
            title: 'Attach a theme JSON Object',
            itemsList: importers,
        },
        {
            id: 4,
            title: 'Attach it to a workspace',
            itemsList: organizations,
        }
    ];

    return (
        <div className="p-6">

            {list.map((item) => (
                <RenderComponent
                    title={item.title}
                    itemsList={item.itemsList}
                    key={item.id}
                />
            ))}

            <div className="flex my-4 align-middle items-center">
                <div className='w-1/2'>
                    <h1 className="text-md font-bold text-gray-500">Attach a Webhook URL</h1>
                </div>
                <div className="mt-2 w-1/2">
                    <input
                        type="text"
                        className="bg-gray-50
                        border border-gray-300 rounded-lg
                        text-gray-900 text-sm
                        focus:ring-blue-500 focus:border-blue-500 
                        block w-full
                        p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='E.g. https://api.myapp.com/myendpoint'
                    />
                </div>
            </div>


        </div>
    );
};

export default ConfigList;