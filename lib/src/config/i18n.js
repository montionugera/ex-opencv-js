export default {
  fallbackLng: 'th',
  whitelist: ['th', 'en'],
  ns: ['validation', 'common', 'attachment', 'command', 'payment', 'dialog', 'car', 'health'],
  defaultNS: 'common',
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json',
  },
  nonExplicitWhitelist: true,
  debug: false,
  react: {
    useSuspense: false,
  },
}
