import { startOfWeek, endOfWeek, eachDayOfInterval, format, type Locale } from 'date-fns'
import { zhTW } from 'date-fns/locale'


export const getWeekDays = ({ locale }: { locale: Locale} = { locale: zhTW }): string[] => {
  const now = new Date();
  const weekDays: string[] = [];
  const start = startOfWeek(now, { locale });
  const end = endOfWeek(now, { locale });
  eachDayOfInterval({ start, end }).forEach(day => {
      weekDays.push(format(day, "EEEEEE", { locale }));
  });
  return weekDays;
};
