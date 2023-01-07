import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function ErrorTypeDropDown({ errData, selectErrorType }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!errData || !errData.errorCountbyColumn) return;
    let dropDownOptions = [];
    let defaultSelection;
    let totalErrorCount = 0
    errData.errorCountbyColumn.forEach((el) => {
      let obj = {};
      obj.name = el._id;
      obj.count = el.count;
      totalErrorCount += el.count;
      dropDownOptions.push(obj);
    });
    if (dropDownOptions.length === 0) {
      defaultSelection = { name: 'No errors yet', count: 0 }
    } else{
      defaultSelection = {name: 'No selection', count: totalErrorCount}
    }
    dropDownOptions.push(defaultSelection)
    setOptions(dropDownOptions);
    setSelected(defaultSelection);
  }, [errData, selectErrorType]);

  const handleSelect = (selectedOption) =>{
    selectErrorType(selectedOption.name)
    setSelected(selectedOption)
  }
  return (
    <div className="fixed top-18 w-48 z-40">
      <Listbox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default  bg-white py-2 pl-3 pr-10 text-left  border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-gray-500">
              {selected && selected.name}
            </span>
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
              {options.map((option, idx) => (
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
                          selected ? 'font-medium text-gray-500' : 'font-normal'
                        }`}
                      >
                        {option.name}{' '}
                        <span className="text-xs ml-2 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-300 text-red-600 rounded-full">
                          {option.count}{' '}
                        </span>
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
}
