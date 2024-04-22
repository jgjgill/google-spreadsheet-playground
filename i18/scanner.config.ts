import path from "path";

const COMMON_EXTENSIONS = "/**/*.{js,jsx,ts,tsx,html}";

export default {
  input: ["./examples/**/*.{js,jsx,ts,tsx}"],
  options: {
    defaultLng: "ko-KR",
    lngs: ["ko-KR", "en-US", "ja-JP"],
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    resource: {
      loadPath: path.join(__dirname, "locales/{{lng}}/{{ns}}.json"),
      savePath: path.join(__dirname, "locales/{{lng}}/{{ns}}.json"),
    },
    defaultValue(lng, ns, key) {
      const keyAsDefaultValue = ["ko"];

      if (keyAsDefaultValue.includes(lng)) {
        const separator = "~~";
        const value = key.includes(separator) ? key.split(separator)[1] : key;

        return value;
      }

      return "";
    },
    compatibilityJSON: "v4", //https://github.com/i18next/i18next-scanner/pull/252
    keySeparator: false,
    nsSeparator: false,
    prefix: "%{",
    suffix: "}",
  },
};
