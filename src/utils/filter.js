import dayjs from 'dayjs';

export const timeFilter = v => v ? dayjs(new Date(v * 1000)).format('YYYY-MM-DD HH:mm:ss') : '/';