export const getMoney = (price?: number) => {
  if (price) return Number(price).toLocaleString();
};

export const getPercent = (origin?: number, discount?: number) => {
  if (origin && discount) {
    const discountRate = ((origin - discount) / origin) * 100;
    return Math.round(discountRate);
  }
};
