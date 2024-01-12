import _ from 'lodash';

export function isNullOrUndef(obj: any) {
  return obj === null || obj === undefined;
}

export function getStr(data: any): string {
  return (data as string)?.toString()?.trim();
}

export function getStrLower(data: any): string {
  return getStr(data)?.toLowerCase();
}

export function strCmp(str1: any, str2: any): boolean {
  return getStrLower(str1) === getStrLower(str2);
}

export function isPropEmpty(val: any): boolean {
  return (
    isNullOrUndef(val) ||
    (typeof val === 'number' && val < 0) ||
    (typeof val === 'string' && !val?.trim()?.length) ||
    (Array.isArray(val) && !val?.filter(Boolean)?.length) ||
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    (typeof val === 'boolean' && val !== true && _.isEmpty(val))
  );
}

export function handleTableCellData(val: any): any {
  if (isPropEmpty(val)) {
    return '―';
  } else {
    return val;
  }
}

export function convertMsIntoDayHrMinFormat(ms: number) {
  if (isPropEmpty(ms)) {
    return;
  }

  const totalDayMS = 24 * 60 * 60 * 1000;
  const totalHrMS = 60 * 60 * 1000;
  const totalMinMS = 60 * 1000;
  const totalSecMS = 1000;

  // let day = Math.floor(ms / totalDayMS);
  let hr = Math.floor(ms / totalHrMS);
  let min = Math.floor((ms - hr * totalHrMS) / totalMinMS);
  let sec = Math.abs(Math.ceil((ms - hr * totalHrMS - min * totalMinMS) / totalSecMS));

  if (sec === 60) {
    min++;
    sec = 0;
  }

  if (min === 60) {
    hr++;
    min = 0;
  }

  // if (hr === 24) {
  //   day++;
  //   hr = 0;
  // }
  const paddedStr = (time: number) => time.toString().padStart(2, '0');

  return `${paddedStr(hr)}:${paddedStr(min)}:${paddedStr(sec)}`;
}

export function getDateTime(timeStamp: number): { date: string; time: string } {
  const dateTime = new Date(timeStamp);

  const year = dateTime?.getFullYear();
  const month = dateTime?.getMonth() + 1;
  const day = dateTime?.getDate();
  const hr = dateTime?.getHours();
  const min = dateTime?.getMinutes();

  const date = `${day}-${month}-${year}`;
  const time = `${hr}:${min}`;

  return { date, time };
}
