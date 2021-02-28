import _dateFormat from 'date-fns/format';

export const dateFormat = (date = null, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (date === null || date === undefined) {
    date = new Date();
  }
  const t = date instanceof Date ? date : new Date(date);
  return dateFormat(t, format);
};
