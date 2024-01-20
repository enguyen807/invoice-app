/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ee from "./locales/ee.json";

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  ee: {
    currency: {
      style: "currency",
      currency: "EUR",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  lt: {
    currency: {
      style: "currency",
      currency: "EUR",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  ja: {
    currency: {
      style: "currency",
      currency: "JPY",
      useGrouping: true,
      currencyDisplay: "symbol",
    },
    decimal: {
      style: "decimal",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 5,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ee",
  globalInjection: true,
  messages: {
    ee,
    en,
  },
  datetimeFormats: {
    en: {
      short: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
    et: {
      short: {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
  },
  numberFormats: numberFormats,
});

export default i18n;
