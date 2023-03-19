import moment from 'moment';

const DATE_FORMATS_ARRAY = [
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'MM/DD/YYYY',
    'MM/DD/YYYY hh:mm:ss',
    'MM/DD/YYYY hh:mm:ss A',
    'MM/DD/YYYY hh:mm',
    'MM/DD/YYYY hh:mm A',
    'DD-MM-YYYY hh:mm:ss',
    'DD-MM-YYYY hh:mm:ss A',
    'DD-MM-YYYY hh:mm',
    'DD-MM-YYYY hh:mm A',
    'YYYY-MM-DD hh:mm:ss',
    'YYYY-MM-DD hh:mm:ss A',
    'YYYY-MM-DD hh:mm',
    'YYYY-MM-DD hh:mm A',
    'DD/MM/YYYY hh:mm:ss',
    'DD/MM/YYYY hh:mm:ss A',
    'DD/MM/YYYY hh:mm',
    'DD/MM/YYYY hh:mm A',
    'MM-DD-YYYY hh:mm:ss',
    'MM-DD-YYYY hh:mm:ss A',
    'MM-DD-YYYY hh:mm',
    'MM-DD-YYYY hh:mm A',
    'YYYY/MM/DD hh:mm:ss',
    'YYYY/MM/DD hh:mm:ss A',
    'YYYY/MM/DD hh:mm',
    'YYYY/MM/DD hh:mm A',
    'MM-DD-YYYY',
    'YYYY/MM/DD',
    'DD/MM/YYYY',
    "MMM D, YYYY"
];

function identifyDateTimeFormat(dateStrings) {
    const counts = {};
    for (let format of DATE_FORMATS_ARRAY) {
        counts[format] = 0;
    }
    for (let dateString of dateStrings) {
        for (let format of DATE_FORMATS_ARRAY) {
            const date = moment(dateString, format, true);
            if (date.isValid()) {
                counts[format]++;
            }
        }
    }
    let maxCount = 0;
    let maxFormat = '';
    for (let format in counts) {
        if (counts[format] > maxCount) {
            maxCount = counts[format];
            maxFormat = format;
        }
    }
    return maxFormat;
}

function convertToDateTimeFormat(dateStrings, targetFormat) {
    if (!targetFormat){
        return dateStrings
    }
    const convertedDates = [];
    for (let dateString of dateStrings) {
        const date = moment(dateString, DATE_FORMATS_ARRAY, false);
        if (date.isValid()) {
            let targetString = date.format(targetFormat);
            // Replace the separators in the target format with those in the source format
            let sourceSeparators = targetString.match(/[-/:]/) && targetString.match(/[-/:]/)[0];
            const targetSeparators = targetFormat.match(/[-/:]/) && targetFormat.match(/[-/:]/)[0];
            if (sourceSeparators !== null && targetSeparators !== null) {
                for (let i = 0; i < sourceSeparators.length; i++) {
                    const sourceSep = sourceSeparators[i];
                    const targetSep = targetSeparators[i];
                    targetString = targetString.replace(targetSep, sourceSep);
                }
            }
            convertedDates.push(targetString);
        } else {
            convertedDates.push(dateString)
        }
    }
    return convertedDates;
}

function autocorrectDateTime(dateStrings) {
    const format = identifyDateTimeFormat(dateStrings);
    return convertToDateTimeFormat(dateStrings, format);
}

export default autocorrectDateTime;