module.exports = {
  defaultValue: (locale, namespace, key, value) => value || key,
  indentation: 2,
  keepRemoved: false,
  keySeparator: false,
  namespaceSeparator: false,
  output: 'src/features/pride/$NAMESPACE/i18n/$LOCALE.json',
  locales: ['en'],
  sort: true,
  useKeysAsDefaultValue: true,
  verbose: true,
};
