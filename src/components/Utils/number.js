export const compact = (n) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(n);
