import { autocorrectDateTime, autoCorrectBooleans} from "./rules";

const applyFixes = (processedColumns) => {
    const fields = Object.keys(processedColumns)
    for (const field of fields){
        switch (processedColumns[field].datatype){
            case 'custom-date-time':
                processedColumns[field].values = autocorrectDateTime(processedColumns[field].values)
                break;
            case 'custom-boolean':
                processedColumns[field].values = autoCorrectBooleans(processedColumns[field].values)
            default:
                break;    
        }
    }
    return processedColumns;
}

export default applyFixes;