import React, { useMemo } from 'react';

const TooltipComponent = (props) => {
  var errormsg = '';
  var errorcol = '';

  var onColOver = props.column.colId;
  var validationArr = [];

  if (props.data && props.data.validationData.length > 0) {
    validationArr = props.data.validationData;
    if (validationArr.find((x) => x.key === onColOver)) {
      errorcol = ' Column: ' + onColOver;
      errormsg =
        ' Error: ' +
        validationArr.find((x) => x.key === onColOver).error_message;
    }
  }
  return (
    <>
      {errormsg ? (
        <div className="w-200 h-30 p-3 bg-yellow-300 rounded-md  text-gray-700">
          <p className="font-medium break-words">{errorcol}</p>
          <p className="text-red-500 font-medium break-words">{errormsg}</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default TooltipComponent;
