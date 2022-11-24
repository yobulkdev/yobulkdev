import React, { useMemo } from 'react';

const TooltipComponent = (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );
  var errormsg = '';
  var errorcol = '';

  var onColOver = props.column.colId;
  var validationArr = [];

  if (props.data && props.data.validationData.length > 0) {
    validationArr = props.data.validationData;
    if (validationArr.find((x) => x.key === onColOver)) {
      errorcol = ' Column :' + onColOver;

      errormsg =
        ' Error :' +
        validationArr.find((x) => x.key === onColOver).error_message;
    }
  }
  return (
    <>
      {errormsg ? (
        <div className="custom-tooltip">
          <p>{errorcol}</p>
          <p>{errormsg}</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default TooltipComponent;
