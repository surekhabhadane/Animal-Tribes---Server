import moment from 'moment'
export const convertDate = (dateStr) => moment(new Date(dateStr)).format('MM-DD-YYYY');