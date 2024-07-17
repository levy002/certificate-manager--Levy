const convertTableHeaders = (key: string): string => {
    let result = '';
    for (let i = 0; i < key.length; i++) {
        if (key[i] === key[i].toUpperCase() && i !== 0) {
            result += ' ' + key[i].toLowerCase();
        } else {
            result += key[i];
        }
    }
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export default convertTableHeaders;
