import { useState } from "react";
import Select from "react-tailwindcss-select";

const MultiSelectComponent = () => {
    const options = [
        { value: "userOne", label: "userone@gmail.com" },
        { value: "userTwo", label: "usertwo@gmail.com" },
        { value: "userThree", label: "userthree@gmail.com" }
    ];

    const [animal, setAnimal] = useState(null);

    const handleChange = (e) => {
        console.log(e);
        setAnimal(e);
    };


    return (
        <div className="flex mt-7 align-middle items-center w-1/2">
            <div className='w-1/2'>
                <h1 className="text-md font-bold text-gray-500">Add Colaborators</h1>
            </div>
            <div className="w-1/2">
                <Select
                    value={animal}
                    onChange={handleChange}
                    options={options}
                    isMultiple
                />
            </div>

        </div>
    );
};

export default MultiSelectComponent;