import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { Transition, Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function CustomValidationDropdown({
  options,
  handleCustomFormatSelection,
  handleFormatSelection,
}) {
  const [selected, setSelected] = useState('Select ...');
  const handleSelection = (val) => {
    handleCustomFormatSelection(val);
    handleFormatSelection(options);
    setSelected(val);
  };
  return (
    <>
      {options.custom_validations && (
        <Listbox value={selected} onChange={handleSelection}>
          <div className="relative ml-11 mb-1 w-44 z-10">
            <Listbox.Button className="relative w-full cursor-default  bg-white py-2 pl-3 pr-10 text-left  border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-gray-500">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.custom_validations.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected
                              ? 'font-medium text-gray-500'
                              : 'font-normal'
                          }`}
                        >
                          {option}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </>
  );
}
