export const getPrice = (price: number) => {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const DateToString = (dateTime: string) => {
  let dateString = '';
  const date = new Date(dateTime);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diff / (1000 * 60 * 60));
  const diffMin = Math.floor(diff / (1000 * 60));

  if (diffMin < 60) dateString = `${diffMin}분 전`;
  else if (diffHour < 24) dateString = `${diffHour}시간 전`;
  else if (diffDay < 8) dateString = `${diffDay}일 전`;
  // else dateString = dateTime.split('T')[0];

  return dateString;
};

export const getDate = (myDate: string | number | Date) => {
  const aaa = new Date(myDate);
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate();

  return `${yyyy}. ${mm}. ${dd}`;
};

export const getTime = (myDate: string | number | Date) => {
  let allDay = '';
  const aaa = new Date(myDate);
  const hh = aaa.getHours();
  const mm = aaa.getMinutes();
  // const dd = aaa.getDate();

  if (hh === 0) allDay = `오전 ${hh + 12}시 ${mm}분`;
  else if (hh < 13) allDay = `오전 ${hh}시 ${mm}분`;
  else if (hh > 12) allDay = `오후 ${hh - 12}시 ${mm}분`;

  return allDay;
};
