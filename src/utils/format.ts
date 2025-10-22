export const formatPrice = (price: number, currency: string) => {
  return Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
  }).format(price);
};
