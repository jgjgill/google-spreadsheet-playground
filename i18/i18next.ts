import i18next from "i18next";
import en from "./locales/en-US/translation.json";
import ko from "./locales/ko-KR/translation.json";

i18next.init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    ko: {
      tranlation: ko,
    },
  },
  keySeparator: false,
  ns: "translation",
});
