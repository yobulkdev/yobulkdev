const getDatatypeFromRegex = (regex) => {
    const samples = {
        '2022-01-22': { datatype: 'custom-date-time', format: 'YYYY-MM-DD' },
        '2022/01/22': { datatype: 'custom-date-time', format: 'YYYY/MM/DD' },
        '50/01/22': { datatype: 'custom-date-time', format: 'YY/MM/DD' },
        '22-02-2022': { datatype: 'custom-date-time', format: 'DD-MM-YYYY' },
        '22/02/2022': { datatype: 'custom-date-time', format: 'DD/MM/YYYY' },
        '22/02/50': { datatype: 'custom-date-time', format: 'DD/MM/YY' },
        '02-22-2022': { datatype: 'custom-date-time', format: 'MM-DD-YYYY' },
        '02/22/2022': { datatype: 'custom-date-time', format: 'MM/DD/YYYY' },
        '02/22/50': { datatype: 'custom-date-time', format: 'MM/DD/YY' },
        '04/08/2023 14:30:00': { datatype: 'custom-date-time', format: 'MM/DD/YYYY hh:mm:ss' },
        '04/08/2023 02:30:00 PM': { datatype: 'custom-date-time', format: 'MM/DD/YYYY hh:mm:ss A' },
        '04/08/2023 14:30': { datatype: 'custom-date-time', format: 'MM/DD/YYYY hh:mm' },
        '04/08/2023 02:30 PM': { datatype: 'custom-date-time', format: 'MM/DD/YYYY hh:mm A' },
        '08-04-2023 14:30:00': { datatype: 'custom-date-time', format: 'DD-MM-YYYY hh:mm:ss' },
        '08-04-2023 02:30:00 PM': { datatype: 'custom-date-time', format: 'DD-MM-YYYY hh:mm:ss A' },
        '08-04-2023 14:30': { datatype: 'custom-date-time', format: 'DD-MM-YYYY hh:mm' },
        '08-04-2023 02:30 PM': { datatype: 'custom-date-time', format: 'DD-MM-YYYY hh:mm A' },
        '2023-04-08 14:30:00': { datatype: 'custom-date-time', format: 'YYYY-MM-DD hh:mm:ss' },
        '2023-04-08 02:30:00 PM': { datatype: 'custom-date-time', format: 'YYYY-MM-DD hh:mm:ss A' },
        '2023-04-08 14:30': { datatype: 'custom-date-time', format: 'YYYY-MM-DD hh:mm' },
        '2023-04-08 02:30 PM': { datatype: 'custom-date-time', format: 'YYYY-MM-DD hh:mm A' },
        '08/04/2023 14:30:00': { datatype: 'custom-date-time', format: 'DD/MM/YYYY hh:mm:ss' },
        '08/04/2023 02:30:00 PM': { datatype: 'custom-date-time', format: 'DD/MM/YYYY hh:mm:ss A' },
        '08/04/2023 14:30': { datatype: 'custom-date-time', format: 'DD/MM/YYYY hh:mm' },
        '08/04/2023 02:30 PM': { datatype: 'custom-date-time', format: 'DD/MM/YYYY hh:mm A' },
        '04-08-2023 14:30:00': { datatype: 'custom-date-time', format: 'MM-DD-YYYY hh:mm:ss' },
        '04-08-2023 02:30:00 PM': { datatype: 'custom-date-time', format: 'MM-DD-YYYY hh:mm:ss A' },
        '04-08-2023 14:30': { datatype: 'custom-date-time', format: 'MM-DD-YYYY hh:mm' },
        '04-08-2023 02:30 PM': { datatype: 'custom-date-time', format: 'MM-DD-YYYY hh:mm A' },
        '2023/04/08 14:30:00': { datatype: 'custom-date-time', format: 'YYYY/MM/DD hh:mm:ss' },
        '2023/04/08 02:30:00 PM': { datatype: 'custom-date-time', format: 'YYYY/MM/DD hh:mm:ss A' },
        '2023/04/08 14:30': { datatype: 'custom-date-time', format: 'YYYY/MM/DD hh:mm' },
        '2023/04/08 14:30 PM': { datatype: 'custom-date-time', format: 'YYYY/MM/DD hh:mm A' },
    }
    const pattern = new RegExp(regex);
    for (const [sample, result] of Object.entries(samples)) {
        if (pattern.test(sample)) {
            return result
        }
    }
    return { datatype: null, format: null }
}

export default getDatatypeFromRegex;