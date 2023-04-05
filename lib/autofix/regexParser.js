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