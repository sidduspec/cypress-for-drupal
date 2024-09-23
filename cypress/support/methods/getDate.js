export function getFormattedDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    return formattedDate;
}

export function convertDateToISOFormat(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}
