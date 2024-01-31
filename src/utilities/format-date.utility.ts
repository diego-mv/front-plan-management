import moment from 'moment';

export const FormatDate = (date: Date): string => {
    if (!date) {
        return '';
    }
    return moment(date).format('DD/MM/YYYY');
}