import i18n from "@/core/i18n";

const { t, n, te, d } = i18n.global;

/**
 * format numbers
 * @returns {string}
 */
export const formatNumbers = (number: number): string => {
  return n(parseFloat(number.toString()), "currency");
};
