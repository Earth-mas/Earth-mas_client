export const GetDate = (myDate: any) => {
  const aaa = new Date(myDate);
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate();
  // const hh = aaa.getHours()
  // const tt = aaa.getMinutes()
  // return `${yyyy}-${mm}-${dd}-${hh}:${tt}`
  return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(
    2,
    '0',
  )}`;
};
