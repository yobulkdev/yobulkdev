import applyFixes from "./applyFixes";
import getDatatypeFromRegex from "./regexParser";

function columnsPreprocessor(array, template) {
    const arrayValuesObj = {};
    const fields = array[0] ? Object.keys(array[0]) : []

    for (const field of fields) {
        let datatype = undefined;
        let format = undefined;
        let example = undefined;
        let column = template.columns.filter((e) => e.label == field)
        if (column.length > 0) {
            column = column[0]
        } else {
            column = {}
        }
        if (template.schema?.properties[field]?.pattern) {
            const datatypeAndFormat = getDatatypeFromRegex(template.schema?.properties[field]?.pattern)
            datatype = datatypeAndFormat.datatype
            format = datatypeAndFormat.format
        } else if (column.example) {
            datatype = template.schema?.properties[field]?.format
            example = column.example
        } else if (template.schema?.properties[field]?.format) {
            datatype = template.schema?.properties[field]?.format
        }
        arrayValuesObj[field] = { datatype: datatype, format: format, example: example, values: [] }
    }

    for (let obj of array) {
        for (const field of fields) {
            arrayValuesObj[field]?.values.push(obj[field])
        }
    }

    return arrayValuesObj;
}

function columnsPostProcessor(array, fixedColumns) {
    const fields = Object.keys(fixedColumns);
    for (const field of fields) {
        const fieldValues = fixedColumns[field]?.values
        for (const i in fieldValues) {
            if (!array[i]._corrections) array[i]._corrections = {}
            if (!array[i]._old) array[i]._old = {}
            if (array[i][field] !== fieldValues[i]) {
                array[i]._corrections[field] = fieldValues[i]
            }
        }
    }
    return array;
}

function autofix(array, template) {
    try {
        const processedColumnsObj = columnsPreprocessor(array, template);
        const fixedColumns = applyFixes(processedColumnsObj)
        const correctedObject = columnsPostProcessor(array, fixedColumns)
        return correctedObject;
    } catch (e) {
        return array;
    }

}

// // example usage
// let schema = {
//     type: 'object',
//     properties: {
//         id: { type: 'integer' },
//         first_name: { type: 'string', format: 'first_name' },
//         email: { type: 'string', format: 'custom-date-time', minLength: 1 },
//         date: { type: 'string', format: 'custom-date-time', minLength: 1 },
//         status: { type: 'string', format: 'custom-boolean' }
//     },
//     required: ['id', 'first_name', 'email', 'date', 'status'],
//     errorMessage: {
//         properties: {
//             first_name: 'Only string(With character A-Z) type is accepted.',
//             id: 'Only valid integer format type is accepted',
//             email: 'Only Valid email ID format is accepted',
//             date: 'Only valid date format is accepted',
//             status: 'Only boolean is accepted'
//         }
//     }
// }

// const array = [{
//     first_name: 'John',
//     date: '02/26/2022',
//     email: '2021-01-01',
//     status: 'FALSE'
// },
// {
//     first_name: 'Jane',
//     date: '03-31-1990',
//     email: '2022/01/01',
//     status: 'TRUE'
// },
// {
//     first_name: 'Janice',
//     date: '03-31-1990',
//     email: '2022/01/01',
//     status: 'False'
// },
// {
//     first_name: 'Jane',
//     date: '03-31-1990',
//     email: '2022/01/01',
//     status: 'true'
// }
// ];

// const correctedArray = autofix(array, schema);

export default autofix;