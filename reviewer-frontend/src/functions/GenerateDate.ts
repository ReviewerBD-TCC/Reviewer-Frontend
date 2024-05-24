import { format } from "date-fns";

  export function generateDateWithYear(year: number): string {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const fullDate = new Date(year, currentMonth - 1, currentDay);

    return format(fullDate, "yyyy-MM-dd");
  }