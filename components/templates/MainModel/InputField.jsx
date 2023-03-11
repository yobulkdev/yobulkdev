import { useState, useContext } from 'react';
import { Context } from '../../../context';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const InputField = ({
  colKey,
  name,
  desc,
  setModalData,
  placeholder,
  clearRequired,
  required,
}) => {
  const [inputValue, setInputValue] = useState();
  const { state, dispatch } = useContext(Context);

  const handleBlur = ({ key, value }) => {
    setModalData((prev) => {
      if (prev.find((el) => el.key === key)) {
        return prev.map((obj) => (obj.key === key ? { key, value } : obj));
      } else {
        return [...prev, { key, value }];
      }
    });
  };

  const handleChange = (e) => {
    clearRequired(false);
    if (state.isTemplateEditing) {
      dispatch({
        type: 'SET_CUR_TEMPLATE_EDIT_COLUMN',
        payload: { ...state.templateColumnToEdit, [colKey]: e.target.value },
      });
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="default-input"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-between"
      >
        <span>
          {name}{' '}
          {required && (
            <span className="text-base font-semibold text-red-500">*</span>
          )}
        </span>
        {required && !inputValue && (
          <span className="text-sm text-red-400 mt-1">
            <InformationCircleIcon className="w-3 inline mb-1 mr-1" />
            This field is required
          </span>
        )}
      </label>
      <input
        type="text"
        id="default-input"
        placeholder={placeholder}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          required && !inputValue && 'border-red-400'
        }`}
        onBlur={(e) => handleBlur({ key: colKey, value: e.target.value })}
        value={
          state.isTemplateEditing
            ? state.templateColumnToEdit[colKey]
            : inputValue
        }
        onChange={handleChange}
      />
      <span className="text-gray-500 dark:text-gray-300 text-sm">{desc}</span>
    </div>
  );
};

export default InputField;
