import { useState, useContext } from 'react';
import { Context } from '../../../context';

const InputField = ({ colKey, name, desc, setModalData, placeholder }) => {
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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {name}
      </label>
      <input
        type="text"
        id="default-input"
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onBlur={(e) => handleBlur({ key: colKey, value: e.target.value })}
        value={
          state.isTemplateEditing
            ? state.templateColumnToEdit[colKey]
            : inputValue
        }
        onChange={handleChange}
      />

      <span className="text-gray-500 text-sm">{desc}</span>
    </div>
  );
};

export default InputField;
