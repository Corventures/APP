const { withAndroidStyles } = require("expo/config-plugins");

module.exports = function withAndroidAutofill(config) {
  return withAndroidStyles(config, (config) => {
    const styleItem = {
      $: { name: "android:autofilledHighlight" },
      _: "@android:color/transparent",
    };

    const mainTheme = config.modResults.resources.style.find(
      (s) => s.$.name === "AppTheme",
    );
    if (mainTheme) {
      mainTheme.item.push(styleItem);
    }
    return config;
  });
};
