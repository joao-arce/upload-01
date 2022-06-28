import { utcToZonedTime, format } from 'date-fns-tz';

export const getBrazilianDate = () => {
  // Obtain a Date instance that will render the equivalent
  // São Paulo time for the UTC date
  const date = new Date();
  const timeZone = 'America/Sao_Paulo';
  const zonedDate = utcToZonedTime(date, timeZone);
  // zonedDate could be used to initialize a
  // date picker or display the formatted local date/time

  // Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
  const pattern = 'yyyy-MM-dd';
  return format(zonedDate, pattern);
};
