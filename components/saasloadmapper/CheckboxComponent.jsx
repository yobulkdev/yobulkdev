const CheckboxComponent = (props) => {
  const checkboxHandler = (e) => {
    let checked = e.target.checked;
    let colId = props.column.colId;
    props.node.setDataValue(colId, checked);
  };
  return (
    <input type="checkbox" onClick={checkboxHandler} checked={props.value} />
  );
};

export default CheckboxComponent;
