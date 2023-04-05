import { autocorrectDateTime, autoCorrectBooleans} from "./rules";

const applyFixes = (processedColumns) => {
    const fields = Object.keys(processedColumns)
    for (const field of fields){
        switch (processedColumns[field].datatype){
            case 'custom-date-time':
                processedColumns[field].values = autocorrectDateTime(processedColumns[field].values, processedColumns[field].format)
                break;
            case 'custom-boolean':
                processedColumns[field].values = autoCorrectBooleans(processedColumns[field].values, processedColumns[field].format)
            default:
                break;    
        }
    }
    return processedColumns;
}

export default applyFixes;