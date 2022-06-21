export const getAvg = (total?: number, quotient?: number) => {
  if (total && quotient) return (total / quotient).toFixed(1);
  return 0;
};

export const getAvgStar = (total?: number, quotient?: number) => {
  const Avg = Number(getAvg(total, quotient));
  return (Avg / 5) * 100;
};
