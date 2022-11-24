import { useState, useContext } from 'react';
import { Context } from '../../context';

export default function Toggle(props) {
  const [enabled, setEnabled] = useState(props.value);
  const { state, dispatch } = useContext(Context);
  return (
    <div className="flex">
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          readOnly
        />
        <div
          onClick={() => {
            props.setValue(!enabled);
            dispatch({
              type: 'CURRENT_FILE_TEMPLATE_UPDATE',
              payload: props.data,
            });
            setEnabled(!enabled);
          }}
          className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-400  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"
        ></div>
      </label>
    </div>
  );
}
