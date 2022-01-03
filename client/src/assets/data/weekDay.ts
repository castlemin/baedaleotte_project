interface DayObj {
  [index: string]: string;
}

const data = new Date();

const DAYS: DayObj = {
  Sun: '일요일',
  Mon: '월요일',
  Tue: '화요일',
  Wed: '수요일',
  Thu: '목요일',
  Fri: '금요일',
  Sat: '토요일',
};

export const weekDay = DAYS[data.toString().split(' ')[0]];
export const hour: number = data.getHours();
