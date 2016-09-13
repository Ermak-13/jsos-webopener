var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
global.OS.installModule('Webopener', {
  Widget: Widget,
  Shortcut: Shortcut
});
