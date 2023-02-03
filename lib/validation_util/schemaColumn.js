import cuid from 'cuid';

const schemaToColumn = ({ schema }) => {
  let schemaProps = schema.properties;
  let columns = [];
  Object.keys(schemaProps).forEach((k, idx) => {
    let column = {
      key: cuid(),
      label: k,
      data_type: schemaProps[k].type,
      is_required: schema.required ? schema.required.includes(k) : false,
    };
    columns.push(column);
  });
  return columns;
};

export { schemaToColumn };
