export const getPrice = (price: number) => {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
